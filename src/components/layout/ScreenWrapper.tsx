
// src/components/layout/ScreenWrapper.tsx

import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ViewStyle, Platform } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    // شبیه‌سازی مکس‌وید (Max-Width) روی وب و تبلت برای حفظ ری‌پانسیو بودن
    ...Platform.select({
      web: {
        maxWidth: 440,
      }
    })
  },
});