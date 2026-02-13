import { api } from './api';
import type { AttendanceRecord } from '@/types';

const FALLBACK_MODE = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL.includes('localhost');

export const attendanceService = {
  async checkIn(data: { location?: string; device_id?: string; method?: string }) {
    if (FALLBACK_MODE) {
      return {
        attendance_id: String(Date.now()),
        check_in_time: new Date().toISOString(),
        success: true,
      };
    }
    const response = await api.post('/api/check-in', {
      location: data.location || 'Main Office — Floor 3',
      device_id: data.device_id || 'web-browser',
      method: data.method || 'manual',
    });
    return response.data;
  },

  async checkOut(attendanceId: string) {
    if (FALLBACK_MODE) {
      return {
        check_out_time: new Date().toISOString(),
        total_hours: 8.5,
        success: true,
      };
    }
    const response = await api.post(`/api/check-out/${attendanceId}`);
    return response.data;
  },

  async getHistory(limit = 30, skip = 0): Promise<AttendanceRecord[]> {
    if (FALLBACK_MODE) {
      return [];
    }
    const { data } = await api.get('/api/attendance', {
      params: { limit, skip },
    });
    
    return data.records.map((record: any) => ({
      id: record.id,
      user_id: record.user_id || '',
      check_in: record.check_in_time,
      check_out: record.check_out_time || null,
      status: !record.check_out_time ? 'checked-in' : 'checked-out',
      location: record.location,
      device: record.device_id,
      total_hours: record.total_hours,
      date: record.check_in_time,
    }));
  },

  async getTodayStatus() {
    const records = await this.getHistory(1, 0);
    if (records.length > 0) {
      const today = new Date().toDateString();
      const recordDate = new Date(records[0].check_in).toDateString();
      if (today === recordDate) {
        return records[0];
      }
    }
    return null;
  },
};
