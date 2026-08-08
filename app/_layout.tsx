// app/_layout.tsx

import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '@/src/theme/ThemeContext';

export default function RootLayout() {
  // بارگذاری دقیق فایل‌های فونت به صورت آدرس‌دهی نسبی استاندارد مترو
  const [fontsLoaded, fontError] = useFonts({
    'IRANYekanXFaNum-Bold': require('../src/assets/fonts/IranYekan/woff2/IRANYekanXFaNum-Bold.woff2'),
    'IRANYekanXFaNum-Regular': require('../src/assets/fonts/IranYekan/woff2/IRANYekanXFaNum-Regular.woff2'),
    'IRANYekanWebFn-Medium': require('../src/assets/fonts/IranYekan/woff2/IRANYekanWebFn-Medium.woff2'),
  });

  // لاگ کردن خطای احتمالی برای عیب‌یابی سریع‌تر در وب‌باندلر
  useEffect(() => {
    if (fontError) {
      console.warn('مشکل لود فونت:', fontError);
    }
  }, [fontError]);

  // نمایش صفحه انتظار تا لود کامل فونت‌ها (جهت جلوگیری از اعمال نشدن فونت یا پریدن صفحه)
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
      </Stack>
    </ThemeProvider>
  );
}