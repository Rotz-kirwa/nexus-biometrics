import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Globe, Bell, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettingsPage = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-sm text-muted-foreground">Configure system-wide preferences</p>
      </div>

      <div className="rounded-xl bg-card shadow-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">General</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input defaultValue="Nexus Biometrics" />
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Input defaultValue="America/New_York" />
          </div>
          <div className="space-y-2">
            <Label>Work Hours Start</Label>
            <Input defaultValue="08:00" type="time" />
          </div>
          <div className="space-y-2">
            <Label>Work Hours End</Label>
            <Input defaultValue="17:00" type="time" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card shadow-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            ["Email notifications", "Send email alerts for check-in/out events"],
            ["Late arrival alerts", "Notify admins when employees arrive late"],
            ["Weekly summary", "Send weekly attendance summaries"],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card shadow-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Security</h2>
        </div>
        <div className="space-y-4">
          {[
            ["Two-factor authentication", "Require 2FA for all admin accounts"],
            ["Session timeout", "Auto-logout after 30 minutes of inactivity"],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="gradient-primary text-primary-foreground gap-2"
        onClick={() => toast({ title: "Settings saved", description: "Your changes have been applied." })}
      >
        <Save className="h-4 w-4" /> Save Settings
      </Button>
    </div>
  );
};

export default AdminSettingsPage;
