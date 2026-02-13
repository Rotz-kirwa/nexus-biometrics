import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Fingerprint,
  Clock,
  UserCircle,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const userLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/check-in", icon: Fingerprint, label: "Check In / Out" },
  { to: "/attendance", icon: Clock, label: "My Attendance" },
  { to: "/profile", icon: UserCircle, label: "Profile" },
];

const adminLinks = [
  { to: "/admin", icon: BarChart3, label: "Admin Overview" },
  { to: "/admin/users", icon: Users, label: "User Management" },
  { to: "/admin/reports", icon: Clock, label: "Attendance Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/dashboard" && location.pathname.startsWith(path));

  return (
    <aside
      className={cn(
        "gradient-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 relative z-30",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-sidebar-border">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-primary">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-bold text-sidebar-foreground tracking-wide">NEXUS</h1>
            <p className="text-[10px] text-sidebar-muted tracking-widest uppercase">Biometrics</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <p className={cn("px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase text-sidebar-muted", collapsed && "sr-only")}>
          Main
        </p>
        {userLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(link.to)
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <link.icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span className="animate-fade-in">{link.label}</span>}
          </NavLink>
        ))}

        {user?.role === "admin" && (
          <>
            <div className="my-4 mx-3 border-t border-sidebar-border" />
            <p className={cn("px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase text-sidebar-muted", collapsed && "sr-only")}>
              Admin
            </p>
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(link.to)
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <link.icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span className="animate-fade-in">{link.label}</span>}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;
