// src/components/common/ThemeToggleButton.tsx

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';

export const ThemeToggleButton = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleTheme}
      style={styles.button}
    >
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={24} // سایز کمی بزرگ‌تر برای خوانایی بهتر بدون بک‌گراند
        color={colors.textPrimary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});