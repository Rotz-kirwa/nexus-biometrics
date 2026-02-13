import { useState } from "react";
import { Clock, Download, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatCard from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

const records = Array.from({ length: 20 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - i);
  const absent = i === 4 || i === 11;
  return {
    id: String(i),
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    checkIn: absent ? "—" : `0${7 + (i % 2)}:${String(15 + (i * 7) % 45).padStart(2, "0")} AM`,
    checkOut: absent ? "—" : `0${4 + (i % 2)}:${String(10 + (i * 3) % 50).padStart(2, "0")} PM`,
    hours: absent ? 0 : +(7.5 + Math.random() * 2).toFixed(1),
    status: absent ? "absent" : i === 0 ? "checked-in" : "checked-out" as string,
  };
});

const statusBadge: Record<string, string> = {
  "checked-in": "bg-success/10 text-success",
  "checked-out": "bg-info/10 text-info",
  absent: "bg-destructive/10 text-destructive",
};

const AttendancePage = () => {
  const [search, setSearch] = useState("");

  const filtered = records.filter((r) =>
    r.date.toLowerCase().includes(search.toLowerCase())
  );

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
        <StatCard title="Days Present" value="18" subtitle="This month" icon={CalendarIcon} />
        <StatCard title="Total Hours" value="152.5h" subtitle="Avg 8.5h / day" icon={Clock} />
        <StatCard title="On-time Rate" value="94%" subtitle="2 late arrivals" icon={Filter} trend={{ value: 2, positive: true }} />
      </div>

      {/* Table */}
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
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{r.date}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.checkIn}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.checkOut}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.hours > 0 ? `${r.hours}h` : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", statusBadge[r.status])}>
                      {r.status.replace("-", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
