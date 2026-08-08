// src/features/catalog/screens/ContactUsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';
import { AppBottomNav } from '@/src/components/layout/AppBottomNav';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

export const ContactUsScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim() || !message.trim()) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید.');
      return;
    }
    Alert.alert('موفق', 'پیام شما با موفقیت ارسال شد.');
    setName('');
    setContact('');
    setMessage('');
  };

  const handleCallEmergency = () => {
    Linking.openURL('tel:+982188XXXXXX');
  };

  const handleCallOffice = () => {
    Linking.openURL('tel:+982188XXXXXX');
  };

  const handleOpenMap = () => {
    Linking.openURL('https://maps.google.com/maps?q=Tehran,Iran');
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <Ionicons
            name="call-outline"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: spacing.sm }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            تماس با ما
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 80 + (64 + insets.bottom),
          },
        ]}
      >
        {/* بنر اورژانس ۲۴/۷ */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.emergencyBanner,
            {
              backgroundColor: isDark ? '#3D2A00' : '#FFDCC3',
              borderColor: isDark ? '#5C3D00' : '#FFB77D',
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              marginBottom: spacing.xl,
            },
          ]}
          onPress={handleCallEmergency}
        >
          <View style={styles.emergencyText}>
            <AppText
              variant="button"
              style={[
                styles.emergencyTitle,
                {
                  color: isDark ? '#FFDCC3' : colors.textPrimary,
                  fontWeight: 'bold',
                },
              ]}
            >
              امداد اضطراری ۲۴/۷
            </AppText>
            <AppText
              variant="body"
              style={[
                styles.emergencySubtitle,
                {
                  color: isDark ? '#94A3B8' : colors.textSecondary,
                  fontSize: 13,
                },
              ]}
            >
              در صورت گیر کردن در کابین یا تعمیرات فوری تماس بگیرید
            </AppText>
          </View>

          <View
            style={[
              styles.emergencyButton,
              {
                backgroundColor: colors.secondary,
                borderRadius: borderRadius.full,
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: colors.secondary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              },
            ]}
          >
            <Ionicons
              name="call"
              size={24}
              color={colors.onPrimary}
            />
          </View>
        </TouchableOpacity>

        {/* شبکه ارتباطی - ۲ ستون */}
        <View style={[styles.gridContainer, { gap: spacing.md, marginBottom: spacing.xl }]}>
          {/* چت آنلاین */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.contactCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                borderWidth: 1,
                flex: 1,
                alignItems: 'flex-start',
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDark ? '#334155' : '#DAE2FD',
                  borderRadius: borderRadius.full,
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: spacing.sm,
                },
              ]}
            >
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color={isDark ? '#F1F5F9' : '#0F172A'}
              />
            </View>
            <AppText
              variant="button"
              style={[
                styles.contactTitle,
                {
                  color: colors.textPrimary,
                  fontWeight: 'bold',
                },
              ]}
            >
              چت آنلاین
            </AppText>
            <AppText
              variant="labelSm"
              style={[
                styles.contactSubtitle,
                {
                  color: colors.textSecondary,
                  marginTop: spacing.xs,
                },
              ]}
            >
              پاسخ در ۲ دقیقه
            </AppText>
          </TouchableOpacity>

          {/* تلفن دفتر مرکزی */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.contactCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                borderWidth: 1,
                flex: 1,
                alignItems: 'flex-start',
              },
            ]}
            onPress={handleCallOffice}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDark ? '#334155' : '#E4E2E4',
                  borderRadius: borderRadius.full,
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: spacing.sm,
                },
              ]}
            >
              <Ionicons
                name="business-outline"
                size={22}
                color={colors.textPrimary}
              />
            </View>
            <AppText
              variant="button"
              style={[
                styles.contactTitle,
                {
                  color: colors.textPrimary,
                  fontWeight: 'bold',
                },
              ]}
            >
              دفتر مرکزی
            </AppText>
            <AppText
              variant="labelSm"
              style={[
                styles.contactSubtitle,
                {
                  color: colors.textSecondary,
                  marginTop: spacing.xs,
                },
              ]}
            >
              +۹۸ ۲۱ ۸۸XX XXXX
            </AppText>
          </TouchableOpacity>
        </View>

        {/* آدرس و نقشه */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.mapCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              borderWidth: 1,
              overflow: 'hidden',
              marginBottom: spacing.xl,
            },
          ]}
          onPress={handleOpenMap}
        >
          <View
            style={[
              styles.mapHeader,
              {
                padding: spacing.lg,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: spacing.sm,
              },
            ]}
          >
            <Ionicons
              name="business"
              size={20}
              color={colors.textSecondary}
            />
            <AppText
              variant="button"
              style={[
                styles.mapTitle,
                {
                  color: colors.textPrimary,
                  fontWeight: 'bold',
                },
              ]}
            >
              دفتر مرکزی
            </AppText>
          </View>

          <View
            style={[
              styles.mapImageContainer,
              {
                height: 140,
                backgroundColor: colors.surfaceDim,
                position: 'relative',
              },
            ]}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAPO7ZDltGhA0tfPzxF3ZVmosiHp4aUK_y-_tQE63yzwXgbqwxwe6SXhPJe_Kmh9rtHqqv6_lytDf2rUCvFbWXpc9RrZzUl98eKlQdDarfUeEOPf_QWnuhe83q_jA2XkW9KAzSmOI99FCR48NNEw9KbDaErCqXUE6IBpExGkcMqh1vIDk_1ukgYW4VPAO3ZYgNaWvPTN9LRMx8qWs4iOU1ch806rIpYx5c4TmRc1fPEBKzm8O28xEl5Q',
              }}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View
              style={[
                styles.mapOverlay,
                {
                  position: 'absolute',
                  bottom: spacing.md,
                  left: spacing.md,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: borderRadius.sm,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xxs,
                },
              ]}
            >
              <AppText
                variant="labelSm"
                style={{ color: '#FFFFFF', fontSize: 10 }}
              >
                تهران، میدان ونک
              </AppText>
            </View>
          </View>
        </TouchableOpacity>

        {/* فرم ارسال پیام */}
        <View
          style={[
            styles.formCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              borderWidth: 1,
              padding: spacing.lg,
              marginBottom: spacing.xl,
            },
          ]}
        >
          <View
            style={[
              styles.formHeader,
              {
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: spacing.sm,
                marginBottom: spacing.md,
              },
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.textSecondary}
            />
            <AppText
              variant="h2"
              style={[
                styles.formTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              ارسال پیام
            </AppText>
          </View>

          <View style={styles.formGroup}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="نام و نام خانوادگی"
              placeholderTextColor={colors.outline}
              style={[
                styles.formInput,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  fontSize: 14,
                  borderWidth: 1,
                  marginBottom: spacing.md,
                  textAlign: 'right',
                },
              ]}
            />

            <TextInput
              value={contact}
              onChangeText={setContact}
              placeholder="شماره تماس / ایمیل"
              placeholderTextColor={colors.outline}
              keyboardType="phone-pad"
              style={[
                styles.formInput,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  fontSize: 14,
                  borderWidth: 1,
                  marginBottom: spacing.md,
                  textAlign: 'right',
                },
              ]}
            />

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="چگونه می‌توانیم به شما کمک کنیم؟"
              placeholderTextColor={colors.outline}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={[
                styles.formInput,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  fontSize: 14,
                  borderWidth: 1,
                  height: 120,
                  textAlign: 'right',
                },
              ]}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.submitButton,
                {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md,
                  paddingVertical: spacing.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: spacing.sm,
                },
              ]}
              onPress={handleSubmit}
            >
              <AppText
                variant="button"
                style={{
                  color: colors.onPrimary,
                  fontWeight: 'bold',
                }}
              >
                ارسال پیام
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
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
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingTop: 16,
  },
  emergencyBanner: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emergencyText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emergencyTitle: {
    textAlign: 'right',
  },
  emergencySubtitle: {
    textAlign: 'right',
  },
  emergencyButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  contactCard: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTitle: {
    textAlign: 'right',
  },
  contactSubtitle: {
    textAlign: 'right',
  },
  mapCard: {
    overflow: 'hidden',
  },
  mapHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  mapTitle: {
    textAlign: 'right',
  },
  mapImageContainer: {
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
  },
  formCard: {},
  formHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  formTitle: {
    textAlign: 'right',
  },
  formGroup: {
    width: '100%',
  },
  formInput: {},
  submitButton: {},
});