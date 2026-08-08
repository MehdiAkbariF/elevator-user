// src/theme/colors.ts

export const lightColors = {
  background: '#F8FAFC',       // Slate 50
  surface: '#FFFFFF',          // سفید برای کارت‌ها
  surfaceDim: '#E2E8F0',       // Slate 200
  primary: '#0F172A',          // Slate 900 (صنعتی و جدی)
  onPrimary: '#FFFFFF',
  secondary: '#D97706',        // Amber 600 (رنگ اکشن ثانویه / صنعتی)
  onSecondary: '#FFFFFF',
  accent: '#F59E0B',           // رنگ آلارم و وضعیت خاص
  error: '#EF4444',            // Red 500
  onError: '#FFFFFF',
  textPrimary: '#0F172A',      // Slate 900 برای متون اصلی
  textSecondary: '#64748B',    // Slate 500 برای متون فرعی
  border: '#E2E8F0',           // Slate 200 برای خطوط باریک مرزی
  outline: '#94A3B8',          // Slate 400
};

export const darkColors: typeof lightColors = {
  background: '#0F172A',       // Slate 900 (تاریک عمیق)
  surface: '#1E293B',          // Slate 800 برای کارت‌ها در دارک مود
  surfaceDim: '#334155',       // Slate 700
  primary: '#F8FAFC',          // Slate 50 (رنگ سفیدِ مات در حالت تاریک)
  onPrimary: '#0F172A',
  secondary: '#F59E0B',        // Amber 500
  onSecondary: '#0F172A',
  accent: '#FBBF24',
  error: '#F87171',            // Red 400
  onError: '#FFFFFF',
  textPrimary: '#F1F5F9',      // Slate 100 برای خوانایی بالا
  textSecondary: '#94A3B8',    // Slate 400 برای متون فرعی
  border: '#334155',           // Slate 700 برای خطوط باریک مرزی دارک مود
  outline: '#475569',          // Slate 600
};