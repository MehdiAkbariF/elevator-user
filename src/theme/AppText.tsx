// src/components/common/AppText.tsx

import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { useTheme } from './ThemeContext';

interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'button' | 'labelSm';
  color?: 'primary' | 'secondary' | 'error' | 'muted';
  style?: TextStyle | TextStyle[];
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  style,
  ...props
}) => {
  const { colors, typography } = useTheme();

  // مپ کردن استایل‌های تایپوگرافی
  const textStyle = typography[variant];

  // مپ کردن رنگ‌ها بر اساس تم جاری
  let textColor = colors.textPrimary;
  if (color === 'secondary') textColor = colors.secondary;
  if (color === 'error') textColor = colors.error;
  if (color === 'muted') textColor = colors.textSecondary;

  return (
    <Text style={[{ color: textColor }, textStyle, style]} {...props}>
      {children}
    </Text>
  );
};