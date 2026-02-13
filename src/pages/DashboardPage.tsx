import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import { Users, UserCheck, Clock, TrendingUp, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { attendanceService } from "@/services/attendance.service";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: todayStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['todayStatus'],
    queryFn: () => attendanceService.getTodayStatus(),
  });

  const { data: attendanceHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ['attendanceHistory', 7],
    queryFn: () => attendanceService.getHistory(7, 0),
  });

  const weekData = attendanceHistory.slice(0, 7).reverse().map((record, i) => {
    const date = new Date(record.check_in);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      hours: record.total_hours || 0,
    };
  });

  const recentActivity = attendanceHistory.slice(0, 5).map((record) => {
    const date = new Date(record.check_in);
    const isToday = date.toDateString() === new Date().toDateString();
    return {
      date: isToday ? 'Today' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      checkIn: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      checkOut: record.check_out ? new Date(record.check_out).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—',
      hours: record.total_hours ? `${record.total_hours}h` : 'Ongoing',
      status: record.status,
    };
  });

  const totalHours = attendanceHistory.reduce((sum, r) => sum + (r.total_hours || 0), 0);
  const daysPresent = attendanceHistory.filter(r => r.status === 'checked-out').length;

  const statusColors = {
    "checked-in": "bg-success/10 text-success",
    "checked-out": "bg-info/10 text-info",
    absent: "bg-destructive/10 text-destructive",
  };

  if (statusLoading || historyLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Good morning, {user?.first_name} 👋
          </h1>
          <p className="text-sm text-muted-foreground">Here's your attendance overview for today.</p>
        </div>
        <Button onClick={() => navigate("/check-in")} className="gradient-primary text-primary-foreground gap-2">
          <Fingerprint className="h-4 w-4" /> Quick Check-In
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Status" 
          value={todayStatus?.status === 'checked-in' ? 'Checked In' : 'Not Checked In'} 
          subtitle={todayStatus ? `Since ${new Date(todayStatus.check_in).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` : 'No activity today'} 
          icon={UserCheck} 
          variant={todayStatus?.status === 'checked-in' ? 'success' : 'default'} 
        />
        <StatCard 
          title="Today's Hours" 
          value={todayStatus?.total_hours ? `${todayStatus.total_hours}h` : '0h'} 
          subtitle="Current session" 
          icon={Clock} 
        />
        <StatCard 
          title="This Week" 
          value={`${totalHours.toFixed(1)}h`} 
          subtitle="Total hours" 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Days Present" 
          value={`${daysPresent} / 7`} 
          subtitle="This week" 
          icon={Users} 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold mb-4">Weekly Hours</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(224 80% 40%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(224 80% 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="hours" stroke="hsl(224 80% 40%)" fill="url(#areaGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-xl bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.length > 0 ? recentActivity.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{r.date}</p>
                  <p className="text-xs text-muted-foreground">{r.checkIn} → {r.checkOut}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs">{r.hours}</p>
                  <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[r.status]}`}>
                    {r.status.replace("-", " ")}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
