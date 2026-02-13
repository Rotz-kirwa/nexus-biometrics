import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const reportData = Array.from({ length: 15 }, (_, i) => ({
  id: String(i),
  user: ["Sarah Chen", "James Wilson", "Emily Rodriguez", "Aisha Patel", "David Kim"][i % 5],
  department: ["Engineering", "Operations", "Marketing", "Engineering", "Operations"][i % 5],
  date: new Date(2026, 1, 13 - i).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  checkIn: `0${7 + (i % 2)}:${String(10 + (i * 7) % 50).padStart(2, "0")} AM`,
  checkOut: i === 0 ? "—" : `0${4 + (i % 2)}:${String(10 + (i * 3) % 50).padStart(2, "0")} PM`,
  hours: i === 0 ? "Ongoing" : `${(7.5 + Math.random() * 2).toFixed(1)}h`,
  status: i === 3 ? "absent" : i === 0 ? "checked-in" : "checked-out",
}));

const statusBadge: Record<string, string> = {
  "checked-in": "bg-success/10 text-success",
  "checked-out": "bg-info/10 text-info",
  absent: "bg-destructive/10 text-destructive",
};

const AdminReportsPage = () => {
  const [search, setSearch] = useState("");
  const filtered = reportData.filter((r) =>
    r.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Reports</h1>
          <p className="text-sm text-muted-foreground">Detailed attendance records across all users</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by user..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Dept</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">In</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Out</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Hours</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{r.user}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.department}</td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.checkIn}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.checkOut}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.hours}</td>
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

export default AdminReportsPage;
