import { api } from './api';
import type { User, DashboardStats } from '@/types';

const FALLBACK_MODE = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL.includes('localhost');

export const adminService = {
  async getUsers(): Promise<User[]> {
    if (FALLBACK_MODE) {
      return [];
    }
    const { data } = await api.get('/api/users');
    return data.users.map((user: any) => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.is_admin ? 'admin' : 'user',
      department: user.department,
      position: user.position,
      phone: user.phone,
      is_active: user.is_active !== false,
      created_at: user.created_at,
    }));
  },

  async getStats(): Promise<DashboardStats> {
    if (FALLBACK_MODE) {
      return {
        totalUsers: 0,
        activeToday: 0,
        avgHoursToday: 0,
        checkedInNow: 0,
      };
    }
    const { data } = await api.get('/api/stats');
    return {
      totalUsers: data.stats.total_users || 0,
      activeToday: data.stats.today_checkins || 0,
      avgHoursToday: 0,
      checkedInNow: data.stats.today_checkins || 0,
    };
  },
};
