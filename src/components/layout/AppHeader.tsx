// src/components/layout/AppHeader.tsx

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/theme/ThemeContext';
import { AppText } from '@/src/theme/AppText';
import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showThemeToggle?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'ورتییکال‌کِر',
  showBackButton = false,
  showThemeToggle = true,
}) => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      {/* دکمه‌های سمت چپ (تغییر تم) */}
      <View style={styles.leftContainer}>
        {showThemeToggle && <ThemeToggleButton />}
      </View>

      {/* عنوان وسط یا راست هدر */}
      <View style={styles.centerContainer}>
        <AppText variant="h2" style={styles.titleText}>
          {title}
        </AppText>
        {!showBackButton && (
          <Ionicons name="construct" size={20} color={colors.secondary} style={{ marginLeft: 6 }} />
        )}
      </View>

      {/* دکمه بازگشت یا بستن در سمت راست (مخصوص صفحات داخلی) */}
      <View style={styles.rightContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <Ionicons name="arrow-forward" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});