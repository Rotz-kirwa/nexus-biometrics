import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="rounded-xl bg-card shadow-card p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors">
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
          <div>
            <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-muted-foreground">{user?.position} • {user?.department}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input defaultValue={user?.first_name} />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input defaultValue={user?.last_name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={user?.phone} />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Input defaultValue={user?.department} />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input defaultValue={user?.position} />
          </div>
        </div>

        <Button onClick={handleSave} className="gradient-primary text-primary-foreground gap-2">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      {/* Password section */}
      <div className="rounded-xl bg-card shadow-card p-6 space-y-4">
        <h2 className="font-semibold">Change Password</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" />
          </div>
          <div />
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input type="password" />
          </div>
        </div>
        <Button variant="outline">Update Password</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
