import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import { Users, UserCheck, Clock, TrendingUp, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weekData = [
  { day: "Mon", hours: 8.2 },
  { day: "Tue", hours: 7.5 },
  { day: "Wed", hours: 8.8 },
  { day: "Thu", hours: 7.0 },
  { day: "Fri", hours: 8.5 },
  { day: "Sat", hours: 0 },
  { day: "Sun", hours: 0 },
];

const recentActivity = [
  { date: "Today", checkIn: "08:15 AM", checkOut: "—", hours: "Ongoing", status: "checked-in" as const },
  { date: "Yesterday", checkIn: "08:02 AM", checkOut: "05:35 PM", hours: "9h 33m", status: "checked-out" as const },
  { date: "Feb 11", checkIn: "07:55 AM", checkOut: "05:10 PM", hours: "9h 15m", status: "checked-out" as const },
  { date: "Feb 10", checkIn: "08:30 AM", checkOut: "05:45 PM", hours: "9h 15m", status: "checked-out" as const },
  { date: "Feb 9", checkIn: "—", checkOut: "—", hours: "—", status: "absent" as const },
];

const statusColors = {
  "checked-in": "bg-success/10 text-success",
  "checked-out": "bg-info/10 text-info",
  absent: "bg-destructive/10 text-destructive",
};

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Status" value="Checked In" subtitle="Since 08:15 AM" icon={UserCheck} variant="success" />
        <StatCard title="Today's Hours" value="5h 42m" subtitle="Avg: 8.2h" icon={Clock} />
        <StatCard title="This Week" value="32.5h" subtitle="Target: 40h" icon={TrendingUp} trend={{ value: 4.2, positive: true }} />
        <StatCard title="Days Present" value="18 / 20" subtitle="This month" icon={Users} />
      </div>

      {/* Charts + Activity */}
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
            {recentActivity.map((r, i) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
