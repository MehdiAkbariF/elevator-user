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

// مبدل هوشمند اعداد فارسی و عربی به انگلیسی جهت پردازش صحیح فرمت شماره همراه
const convertToEnglishDigits = (str: string) => {
  const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicDigits = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  let clean = str;
  for (let i = 0; i < 10; i++) {
    clean = clean.replace(persianDigits[i], i.toString()).replace(arabicDigits[i], i.toString());
  }
  return clean;
};

export const LoginMobileScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  // معتبرسازی شماره تلفن همراه ایران (شروع با ۰۹ و دارای ۱۱ رقم)
  const isPhoneNumberValid = /^09[0-9]{9}$/.test(phoneNumber);

  const handleTextChange = (text: string) => {
    // تبدیل ورودی به اعداد انگلیسی و حذف کاراکترهای مزاحم غیر عددی
    const cleanNumber = convertToEnglishDigits(text).replace(/[^0-9]/g, '');
    setPhoneNumber(cleanNumber);
  };

  const handleContinue = () => {
    if (isPhoneNumberValid) {
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
          
          {/* هدر بالایی با چیدمان ثابت */}
          <View style={styles.header}>
            {/* بستن در چپ */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>

            {/* تغییر تم در راست */}
            <ThemeToggleButton />
          </View>

          {/* محتوای اصلی فرم */}
          <View style={[styles.content, { marginTop: spacing.xl }]}>
            <View style={styles.textContainer}>
              <AppText variant="h1" style={[styles.title, { color: colors.textPrimary }]}>
                ورود شماره موبایل
              </AppText>
              <AppText variant="body" color="muted" style={styles.subtitle}>
                برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید تا کد تأیید ارسال شود.
              </AppText>
            </View>

            {/* فیلد ورودی شماره همراه به صورت LTR استاندارد بین‌المللی شماره‌ها */}
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
              {/* بخش ثابت کد کشور در سمت چپ */}
              <View style={[styles.countryCode, { borderRightColor: colors.border }]}>
                <AppText variant="body" style={styles.countryText}>
                  +۹۸
                </AppText>
                <Ionicons name="arrow-down" size={12} color={colors.textSecondary} style={{ marginRight: 4 }} />
              </View>

              {/* کادر ورود متن شماره همراه در سمت راست با فونت اعداد فارسی */}
              <TextInput
                value={phoneNumber}
                onChangeText={handleTextChange}
                keyboardType="phone-pad"
                placeholder="۰۹۱۲XXXXXXX"
                placeholderTextColor={colors.textSecondary}
                maxLength={11}
                style={[
                  styles.textInput,
                  {
                    color: colors.textPrimary,
                    fontFamily: 'IRANYekanXFaNum-Regular', // اعمال فونت جهت نمایش زیبای اعداد به فارسی
                  },
                ]}
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
    flexDirection: 'row',
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
    textAlign: 'right',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'right',
    lineHeight: 22,
  },
  inputWrapper: {
    height: 56,
    borderWidth: 1,
    flexDirection: 'row', // تغییر جهت به LTR برای قرار گرفتن کشور در چپ
    alignItems: 'center',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
    borderRightWidth: 1, // خط مرزی در سمت راست کد کشور
  },
  countryText: {
    marginRight: 4,
    fontWeight: '600',
    fontFamily: 'IRANYekanXFaNum-Bold',
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    textAlign: 'left', // شماره تماس چپ‌چین وارد می‌شود
    fontSize: 16,
  },
  footer: {
    width: '100%',
  },
});