import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, AuthState, LoginCredentials, RegisterData } from "@/types";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for frontend-only mode
const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@nexus.com",
    first_name: "Sarah",
    last_name: "Chen",
    role: "admin",
    department: "Engineering",
    position: "System Administrator",
    phone: "+1 555-0100",
    is_active: true,
    created_at: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    email: "user@nexus.com",
    first_name: "James",
    last_name: "Wilson",
    role: "user",
    department: "Operations",
    position: "Field Technician",
    phone: "+1 555-0101",
    is_active: true,
    created_at: "2024-03-01T08:00:00Z",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("nexus_token");
    const userData = localStorage.getItem("nexus_user");
    if (token && userData) {
      try {
        setState({
          user: JSON.parse(userData),
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem("nexus_token");
        localStorage.removeItem("nexus_user");
        setState((s) => ({ ...s, isLoading: false }));
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    const user = DEMO_USERS.find((u) => u.email === credentials.email);
    if (!user) throw new Error("Invalid email or password");
    const token = "demo_jwt_token_" + user.id;
    if (credentials.remember) {
      localStorage.setItem("nexus_token", token);
      localStorage.setItem("nexus_user", JSON.stringify(user));
    }
    setState({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 800));
    const user: User = {
      id: String(Date.now()),
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      role: "user",
      department: data.department,
      position: data.position,
      phone: data.phone,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    const token = "demo_jwt_token_" + user.id;
    localStorage.setItem("nexus_token", token);
    localStorage.setItem("nexus_user", JSON.stringify(user));
    setState({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("nexus_token");
    localStorage.removeItem("nexus_user");
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
