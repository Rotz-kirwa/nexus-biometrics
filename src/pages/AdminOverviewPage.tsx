import StatCard from "@/components/dashboard/StatCard";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const monthlyData = [
  { month: "Sep", users: 42 }, { month: "Oct", users: 45 },
  { month: "Nov", users: 48 }, { month: "Dec", users: 44 },
  { month: "Jan", users: 52 }, { month: "Feb", users: 56 },
];

const deptData = [
  { name: "Engineering", value: 24, color: "hsl(224 80% 40%)" },
  { name: "Operations", value: 18, color: "hsl(199 89% 48%)" },
  { name: "Marketing", value: 12, color: "hsl(142 76% 36%)" },
  { name: "Sales", value: 8, color: "hsl(38 92% 50%)" },
];

const AdminOverviewPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => adminService.getStats(),
  });

  if (isLoading) {
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-sm text-muted-foreground">System-wide attendance analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={Users} />
        <StatCard title="Active Today" value={stats?.activeToday || 0} icon={UserCheck} variant="success" />
        <StatCard title="Checked In Now" value={stats?.checkedInNow || 0} icon={Clock} />
        <StatCard title="Avg Hours" value={stats?.avgHoursToday ? `${stats.avgHoursToday}h` : '0h'} icon={TrendingUp} variant="info" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold mb-4">Active Users — Last 6 Months</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="users" fill="hsl(224 80% 40%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-xl bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold mb-4">Department Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {deptData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-3 justify-center">
            {deptData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
