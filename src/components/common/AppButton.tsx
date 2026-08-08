// src/components/common/AppButton.tsx

import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '@/src/theme/AppText';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'emergency';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) => {
  const { colors, borderRadius } = useTheme();

  let backgroundColor = colors.primary;
  let textColor = colors.onPrimary;
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'secondary') {
    backgroundColor = colors.surface;
    textColor = colors.textPrimary;
    borderColor = colors.border;
    borderWidth = 1;
  } else if (variant === 'emergency') {
    backgroundColor = colors.error;
    textColor = colors.onError;
  }

  const buttonStyles = [
    styles.button,
    {
      backgroundColor,
      borderRadius: borderRadius.md,
      borderColor,
      borderWidth,
      opacity: disabled || loading ? 0.6 : 1,
    },
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={buttonStyles}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <AppText variant="button" style={{ color: textColor }}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});