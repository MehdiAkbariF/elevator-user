// src/components/layout/AppBottomNav.tsx

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/theme/ThemeContext';
import { AppText } from '@/src/theme/AppText';

interface AppBottomNavProps {
  activeTab: 'home' | 'shop' | 'cart' | 'support' | 'fleet';
}

export const AppBottomNav: React.FC<AppBottomNavProps> = ({ activeTab }) => {
  const { colors } = useTheme();
  const router = useRouter();

  // ساختاردهی ۵ کلید ناوبری از چپ به راست در زبان فارسی
  const tabs = [
    { id: 'fleet', title: 'دستگاه‌های من', iconActive: 'business', iconInactive: 'business-outline' },
    { id: 'support', title: 'پشتیبانی', iconActive: 'information-circle', iconInactive: 'information-circle-outline' },
    { id: 'cart', title: 'سبد خرید', iconActive: 'cart', iconInactive: 'cart-outline' },
    { id: 'shop', title: 'فروشگاه', iconActive: 'grid', iconInactive: 'grid-outline' },
    { id: 'home', title: 'خانه', iconActive: 'home', iconInactive: 'home-outline' },
  ] as const;

  const handleTabPress = (tabId: typeof activeTab) => {
    if (tabId === 'home') {
      router.replace('/dashboard');
    } else if (tabId === 'shop') {
      router.replace('/catalog'); // هدایت پویا به کاتالوگ قطعات برند ایکس الواتور
    } else if (tabId === 'cart') {
      router.replace('/cart'); // مسیر سبد خرید (آماده برای مراحل بعدی)
    }
  };

  return (
    <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const tintColor = isActive ? colors.secondary : colors.textSecondary;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => handleTabPress(tab.id)}
            style={styles.navItem}
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.iconInactive}
              size={24}
              color={tintColor}
            />
            <AppText
              variant="labelSm"
              style={[styles.navText, { color: tintColor }]}
            >
              {tab.title}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    zIndex: 100,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navText: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '600',
  },
});