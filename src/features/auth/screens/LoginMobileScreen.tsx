// src/features/auth/screens/LoginMobileScreen.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/theme/ThemeContext';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { AppButton } from '@/src/components/common/AppButton';
import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';

export const LoginMobileScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  // معتبرسازی شماره تلفن ایران (مثال: شروع با ۰۹ و دارای ۱۱ رقم)
  const isPhoneNumberValid = /^09[0-9]{9}$/.test(phoneNumber);

  const handleContinue = () => {
    if (isPhoneNumberValid) {
      // هدایت به صفحه تایید کد پیامکی (OTP)
      router.push('/verify');
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={[styles.mainWrapper, { paddingHorizontal: spacing.lg }]}>
          
          {/* هدر بالایی با چیدمان راست‌به‌چپ فارسی */}
          <header style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.closeButton,
                { backgroundColor: colors.surfaceDim, borderRadius: borderRadius.full },
              ]}
            >
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            
            {/* دکمه تغییر تم تعبیه شده در هدر */}
            <ThemeToggleButton />
          </header>

          {/* محتوای اصلی */}
          <View style={[styles.content, { marginTop: spacing.xl }]}>
            <View style={styles.textContainer}>
              <AppText variant="h1" style={[styles.title, { color: colors.textPrimary }]}>
                ورود شماره موبایل
              </AppText>
              <AppText variant="body" color="muted" style={styles.subtitle}>
                برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید تا کد تأیید ارسال شود.
              </AppText>
            </View>

            {/* فیلد ورودی شماره همراه به صورت RTL */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              {/* بخش ثابت کد کشور در سمت راست به عنوان استاندارد فارسی */}
              <View style={[styles.countryCode, { borderLeftColor: colors.border }]}>
                <AppText variant="body" style={styles.countryText}>
                  +۹۸
                </AppText>
                <Ionicons name="arrow-down" size={12} color={colors.textSecondary} />
              </View>

              {/* کادر ورود متن شماره همراه در سمت چپ */}
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="۰۹۱۲XXXXXXX"
                placeholderTextColor={colors.textSecondary}
                maxLength={11}
                style={[styles.textInput, { color: colors.textPrimary }]}
              />
            </View>
          </View>

          {/* دکمه پایین صفحه */}
          <View style={[styles.footer, { paddingBottom: spacing.lg }]}>
            <AppButton
              title="ادامه"
              onPress={handleContinue}
              disabled={!isPhoneNumberValid}
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 56,
    flexDirection: 'row-reverse', // کاملاً راست به چپ
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'right', // راست‌چین متون فارسی
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'right', // راست‌چین متون فارسی
    lineHeight: 22,
  },
  inputWrapper: {
    height: 56,
    borderWidth: 1,
    flexDirection: 'row-reverse', // فیلد کشور راست، اینپوت چپ
    alignItems: 'center',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
  },
  countryText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    textAlign: 'left', // شماره به انگلیسی تایپ شود ولی به کمک فونت فارسی نمایش یابد
    fontSize: 16,
  },
  footer: {
    width: '100%',
  },
});