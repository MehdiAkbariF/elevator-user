// src/features/auth/screens/LoginVerifyOtpScreen.tsx

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/theme/ThemeContext';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { AppButton } from '@/src/components/common/AppButton';
import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';

export const LoginVerifyOtpScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  // در چیدمان فارسی خانه‌های کد از راست به چپ لود می‌شوند (اندکس ۰ دورترین سمت راست است)
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    const cleanText = text.replace(/[^0-9]/g, '');
    newCode[index] = cleanText.substring(cleanText.length - 1);
    setCode(newCode);

    // حرکت فوکوس به کادر سمت چپ (در RTL هدایت به خانه با اندکس بالاتر است)
    if (cleanText && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    // برگشت فوکوس به خانه سمت راست در زمان پاک کردن فیلدها
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = code.join('');
    if (otpValue.length === 4) {
      // عملیات تایید نهایی
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.mainContainer, { paddingHorizontal: spacing.lg }]}>
          
          {/* هدر راست‌به‌چپ */}
          <header style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              style={[
                styles.closeButton,
                { backgroundColor: colors.surfaceDim, borderRadius: borderRadius.full },
              ]}
            >
              <Ionicons name="arrow-forward" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            
            <ThemeToggleButton />
          </header>

          {/* فرم اصلی */}
          <View style={[styles.contentArea, { marginTop: spacing.xl }]}>
            <View style={{ marginBottom: spacing.xl }}>
              <AppText variant="h1" style={[styles.title, { color: colors.textPrimary }]}>
                تأیید شماره تلفن
              </AppText>
              
              <AppText variant="body" color="muted" style={styles.subtitle}>
                کد تأیید ۴ رقمی ارسال شده به شماره ۰۹۱۲***۳۴۵۶ را وارد کنید.
              </AppText>
              
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={styles.editNumberBtn}
              >
                <AppText variant="button" color="secondary">
                  ویرایش شماره همراه
                </AppText>
              </TouchableOpacity>
            </View>

            {/* فیلدهای تایید کد به صورت ردیف معکوس برای هماهنگی با RTL */}
            <View style={[styles.otpContainer, { gap: spacing.md }]}>
              {code.map((digit, index) => {
                const isFocused = focusedIndex === index;
                const borderStyle = {
                  borderColor: isFocused 
                    ? colors.primary 
                    : digit ? colors.primary : colors.border,
                  borderWidth: isFocused || digit ? 2 : 1,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                };

                return (
                  <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    value={digit}
                    onChangeText={(text) => handleTextChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    style={[styles.otpInput, borderStyle]}
                    placeholderTextColor={colors.textSecondary}
                  />
                );
              })}
            </View>

            {/* بخش پیام تایمر */}
            <View style={[styles.timerContainer, { marginTop: spacing.xl }]}>
              <AppText variant="body" color="muted">
                ارسال مجدد کد تا ۰۱:۵۹
              </AppText>
            </View>
          </View>

          {/* دکمه نهایی ادامه */}
          <View style={[styles.bottomButtonContainer, { paddingBottom: spacing.lg }]}>
            <AppButton
              title="ادامه"
              onPress={handleVerify}
              disabled={code.some((val) => val === '')}
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 56,
    flexDirection: 'row-reverse',
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
  contentArea: {
    flex: 1,
  },
  title: {
    textAlign: 'right',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'right',
    lineHeight: 22,
  },
  editNumberBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  otpContainer: {
    flexDirection: 'row-reverse', // چیدمان خانه‌ها از راست به چپ
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    width: 56,
    height: 56,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    backgroundColor: 'transparent',
  },
  timerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  bottomButtonContainer: {
    width: '100%',
  },
});