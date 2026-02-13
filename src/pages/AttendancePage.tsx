import { useState } from "react";
import { Clock, Download, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatCard from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { attendanceService } from "@/services/attendance.service";
import { Skeleton } from "@/components/ui/skeleton";

const statusBadge: Record<string, string> = {
  "checked-in": "bg-success/10 text-success",
  "checked-out": "bg-info/10 text-info",
  absent: "bg-destructive/10 text-destructive",
};

const AttendancePage = () => {
  const [search, setSearch] = useState("");

  const { data: records = [], isLoading } = useQuery({
    queryKey: ['attendanceHistory', 30],
    queryFn: () => attendanceService.getHistory(30, 0),
  });

  const filtered = records.filter((r) => {
    const date = new Date(r.check_in).toLocaleDateString();
    return date.toLowerCase().includes(search.toLowerCase());
  });

  const daysPresent = records.filter(r => r.status === 'checked-out').length;
  const totalHours = records.reduce((sum, r) => sum + (r.total_hours || 0), 0);
  const avgHours = daysPresent > 0 ? (totalHours / daysPresent).toFixed(1) : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Attendance</h1>
          <p className="text-sm text-muted-foreground">View and export your attendance history</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Days Present" value={daysPresent.toString()} subtitle="Last 30 days" icon={CalendarIcon} />
        <StatCard title="Total Hours" value={`${totalHours.toFixed(1)}h`} subtitle={`Avg ${avgHours}h / day`} icon={Clock} />
        <StatCard title="Records" value={records.length.toString()} subtitle="Total entries" icon={Filter} />
      </div>

      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <Input
            placeholder="Search by date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Check In</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Check Out</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Hours</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r) => {
                const checkInDate = new Date(r.check_in);
                const checkOutDate = r.check_out ? new Date(r.check_out) : null;
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-4 py-3 font-mono text-xs">{checkInDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3 font-mono text-xs">{checkOutDate ? checkOutDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs">{r.total_hours ? `${r.total_hours}h` : '—'}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", statusBadge[r.status])}>
                        {r.status.replace("-", " ")}
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
