// app/_layout.tsx

import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '@/src/theme/ThemeContext';

export default function RootLayout() {
  // بارگذاری دقیق فایل‌های فونت بومی ttf از پوشه جدید واسط ttf
  const [fontsLoaded, fontError] = useFonts({
    'IRANYekanXFaNum-Bold': require('../src/assets/fonts/IranYekan/ttf/IRANYekanXFaNum-Bold.ttf'),
    'IRANYekanXFaNum-Regular': require('../src/assets/fonts/IranYekan/ttf/IRANYekanXFaNum-Regular.ttf'),
    'IRANYekanWebFn-Medium': require('../src/assets/fonts/IranYekan/ttf/IRANYekanWebFn-Medium.ttf'),
  });

  // مانیتور کردن خطای احتمالی لود فونت
  useEffect(() => {
    if (fontError) {
      console.warn('مشکل لود فونت روی موبایل:', fontError);
    }
  }, [fontError]);

  // نمایش لودینگ شکیل تا زمان لود کامل فایل‌های ttf
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#0F172A" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="verify" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="catalog" />
        <Stack.Screen name="product" />
      </Stack>
    </ThemeProvider>
  );
}