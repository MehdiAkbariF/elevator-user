// src/components/layout/ScreenWrapper.tsx

import React from 'react';
import { StyleSheet, View, ViewStyle, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/theme/ThemeContext';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets(); // دریافت پویای فاصله ناچ دوربین از سیستم‌عامل

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          // اعمال خودکار پدینگ بالا برای جلوگیری از نفوذ هدر به زیر دوربین و ناچ در اندروید و iOS
          paddingTop: insets.top,
        },
        style,
      ]}
    >
      {/* هماهنگ‌سازی استایل نوتیفیکیشن‌بار گوشی */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.innerContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    ...Platform.select({
      web: {
        maxWidth: 440, // رعایت مکس‌وید روی وب
      }
    })
  },
});