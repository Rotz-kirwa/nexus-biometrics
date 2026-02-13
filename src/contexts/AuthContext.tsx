import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, AuthState, LoginCredentials, RegisterData } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("nexus_token");
    if (token) {
      authService.getCurrentUser()
        .then((user) => {
          setState({ user, token, isAuthenticated: true, isLoading: false });
          localStorage.setItem("nexus_user", JSON.stringify(user));
        })
        .catch(() => {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");
          setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
        });
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    const token = response.access_token;
    const user = await authService.getCurrentUser();
    
    if (credentials.remember) {
      localStorage.setItem("nexus_token", token);
      localStorage.setItem("nexus_user", JSON.stringify(user));
    }
    setState({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await authService.register(data);
    await login({ email: data.email, password: data.password, remember: true });
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout errors
    }
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
