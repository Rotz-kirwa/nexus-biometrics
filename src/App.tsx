import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import CheckInPage from "@/pages/CheckInPage";
import AttendancePage from "@/pages/AttendancePage";
import ProfilePage from "@/pages/ProfilePage";
import AdminOverviewPage from "@/pages/AdminOverviewPage";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminReportsPage from "@/pages/AdminReportsPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/check-in" element={<CheckInPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminOverviewPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsersPage /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><AdminReportsPage /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettingsPage /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
