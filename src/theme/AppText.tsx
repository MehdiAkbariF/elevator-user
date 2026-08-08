// src/components/common/AppText.tsx

import { useTheme } from "@/src/theme/ThemeContext";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  variant?: "h1" | "h2" | "body" | "button" | "labelSm";
  color?: "primary" | "secondary" | "error" | "muted";
  style?: TextStyle | TextStyle[];
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = "body",
  color = "primary",
  style,
  ...props
}) => {
  const { colors, typography } = useTheme();

  const textStyle = typography[variant];

  let textColor = colors.textPrimary;
  if (color === "secondary") textColor = colors.secondary;
  if (color === "error") textColor = colors.error;
  if (color === "muted") textColor = colors.textSecondary;

  return (
    <Text style={[{ color: textColor }, textStyle, style]} {...props}>
      {children}
    </Text>
  );
};
