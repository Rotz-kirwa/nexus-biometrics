import { useState, useEffect } from "react";
import { Fingerprint, MapPin, Monitor, Check, LogOut as LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceService } from "@/services/attendance.service";
import { Skeleton } from "@/components/ui/skeleton";

const CheckInPage = () => {
  const { toast } = useToast();
  const [time, setTime] = useState(new Date());
  const queryClient = useQueryClient();

  const { data: todayStatus, isLoading } = useQuery({
    queryKey: ['todayStatus'],
    queryFn: () => attendanceService.getTodayStatus(),
  });

  const checkInMutation = useMutation({
    mutationFn: () => attendanceService.checkIn({
      location: 'Main Office — Floor 3',
      device_id: 'web-browser',
      method: 'manual',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayStatus'] });
      queryClient.invalidateQueries({ queryKey: ['attendanceHistory'] });
      toast({ title: "Checked In", description: `Check-in recorded at ${time.toLocaleTimeString()}` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to check in. Please try again.", variant: "destructive" });
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: (attendanceId: string) => attendanceService.checkOut(attendanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayStatus'] });
      queryClient.invalidateQueries({ queryKey: ['attendanceHistory'] });
      toast({ title: "Checked Out", description: `Check-out recorded at ${time.toLocaleTimeString()}` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to check out. Please try again.", variant: "destructive" });
    },
  });

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleToggle = async () => {
    if (todayStatus?.status === 'checked-in') {
      checkOutMutation.mutate(todayStatus.id);
    } else {
      checkInMutation.mutate();
    }
  };

  const checkedIn = todayStatus?.status === 'checked-in';
  const loading = checkInMutation.isPending || checkOutMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] space-y-8">
        <Skeleton className="h-20 w-64" />
        <Skeleton className="h-44 w-44 rounded-full" />
      </div>
    );
  }

  const checkInTime = todayStatus ? new Date(todayStatus.check_in).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null;
  const hoursLogged = todayStatus?.total_hours || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] space-y-8">
      <div className="text-center space-y-1">
        <p className="text-5xl font-bold tracking-tight font-mono">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
        <p className="text-sm text-muted-foreground">
          {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className={cn(
        "rounded-full px-5 py-2 text-sm font-medium",
        checkedIn ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
      )}>
        {checkedIn ? `● Currently Checked In — Since ${checkInTime}` : "○ Not Checked In"}
      </div>

      <button
        onClick={handleToggle}
        disabled={loading}
        className={cn(
          "group relative flex h-44 w-44 items-center justify-center rounded-full shadow-elevated transition-all duration-300",
          "hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100",
          checkedIn
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : "gradient-primary text-primary-foreground"
        )}
      >
        <div className="absolute inset-0 rounded-full animate-pulse-soft opacity-30 bg-current" />
        <div className="relative flex flex-col items-center gap-2">
          {checkedIn ? <LogOutIcon className="h-10 w-10" /> : <Fingerprint className="h-10 w-10" />}
          <span className="text-sm font-bold uppercase tracking-wider">
            {loading ? "Processing..." : checkedIn ? "Check Out" : "Check In"}
          </span>
        </div>
      </button>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Main Office — Floor 3</span>
        </div>
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          <span>Web Browser</span>
        </div>
      </div>

      <div className="rounded-xl bg-card shadow-card p-5 w-full max-w-sm space-y-3">
        <h3 className="text-sm font-semibold">Today's Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Check-in</p>
            <p className="font-medium">{checkInTime || '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Hours logged</p>
            <p className="font-medium">{hoursLogged > 0 ? `${hoursLogged}h` : '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Break time</p>
            <p className="font-medium">—</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Status</p>
            <p className="font-medium flex items-center gap-1">
              {checkedIn ? (
                <><Check className="h-3.5 w-3.5 text-success" /> Active</>
              ) : (
                <span className="text-muted-foreground">Inactive</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInPage;
