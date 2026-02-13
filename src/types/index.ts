export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "user";
  department?: string;
  position?: string;
  phone?: string;
  avatar?: string;
  is_active: boolean;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  user_id: string;
  user_name?: string;
  check_in: string;
  check_out?: string | null;
  status: "checked-in" | "checked-out" | "absent";
  location?: string;
  device?: string;
  total_hours?: number;
  date: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  activeToday: number;
  avgHoursToday: number;
  checkedInNow: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department?: string;
  position?: string;
  phone?: string;
}
