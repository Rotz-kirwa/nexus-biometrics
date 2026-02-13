import { api } from './api';
import type { LoginCredentials, RegisterData, User } from '@/types';

const FALLBACK_MODE = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL.includes('localhost');

const DEMO_ADMIN = {
  id: '1',
  email: 'admin@nexus.com',
  first_name: 'Admin',
  last_name: 'User',
  role: 'admin' as const,
  department: 'IT',
  position: 'System Administrator',
  phone: '+1 555-0100',
  is_active: true,
  created_at: new Date().toISOString(),
};

export const authService = {
  async login(credentials: LoginCredentials) {
    if (FALLBACK_MODE && credentials.email === 'admin@nexus.com' && credentials.password === 'Admin@123') {
      return {
        access_token: 'demo_token_' + Date.now(),
        user: DEMO_ADMIN,
      };
    }
    const { data } = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return data;
  },

  async register(userData: RegisterData) {
    if (FALLBACK_MODE) {
      return {
        user: {
          ...DEMO_ADMIN,
          id: String(Date.now()),
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          role: 'user' as const,
        },
      };
    }
    const { data } = await api.post('/auth/register', {
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      employee_id: `EMP${Date.now()}`,
      department: userData.department || '',
      position: userData.position || '',
      phone: userData.phone || '',
    });
    return data;
  },

  async getCurrentUser(): Promise<User> {
    if (FALLBACK_MODE) {
      const userData = localStorage.getItem('nexus_user');
      if (userData) {
        return JSON.parse(userData);
      }
      return DEMO_ADMIN;
    }
    const { data } = await api.get('/auth/me');
    return {
      id: data.user.id,
      email: data.user.email,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      role: data.user.is_admin ? 'admin' : 'user',
      department: data.user.department,
      position: data.user.position,
      phone: data.user.phone,
      is_active: data.user.is_active !== false,
      created_at: data.user.created_at,
    };
  },

  async logout() {
    if (FALLBACK_MODE) return;
    await api.post('/auth/logout');
  },
};
