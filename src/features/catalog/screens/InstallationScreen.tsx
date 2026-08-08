// src/features/catalog/screens/InstallationScreen.tsx

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';
import { AppBottomNav } from '@/src/components/layout/AppBottomNav';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

const { width } = Dimensions.get('window');

export const InstallationScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const handleRequestInspection = () => {
    router.push('/project-inquiry');
  };

  const architectures = [
    {
      id: 'traction',
      icon: 'settings-outline',
      title: 'سیستم‌های کششی',
      desc: 'راه‌حل‌های سرعت بالا برای ساختمان‌های میان‌مرتبه و بلند',
    },
    {
      id: 'hydraulic',
      icon: 'water-outline',
      title: 'آسانسورهای هیدرولیک',
      desc: 'ظرفیت بار سنگین برای استفاده تجاری کم‌ارتفاع',
    },
    {
      id: 'mrl',
      icon: 'grid-outline',
      title: 'راه‌حل‌های بدون موتورخانه',
      desc: 'طراحی بدون موتورخانه برای بهینه‌سازی فضای ساختمان',
    },
    {
      id: 'home',
      icon: 'home-outline',
      title: 'آسانسورهای ویلایی',
      desc: 'راه‌حل‌های جمع‌وجور و زیبا برای تحرک مسکونی',
    },
  ];

  const steps = [
    { step: '۱', title: 'بررسی سایت', desc: 'ارزیابی سازه و نقشه‌برداری فضایی' },
    { step: '۲', title: 'محاسبات مهندسی', desc: 'مدل‌سازی توزیع بار و فاکتورهای ایمنی' },
    { step: '۳', title: 'مونتاژ شفت', desc: 'نصب ریل‌های راهنما و تقویت سازه' },
    { step: '۴', title: 'راه‌اندازی مکانیکی', desc: 'سیستم محرک، قرارگیری کابین و سیم‌کشی برق' },
    { step: '۵', title: 'تحویل پروژه', desc: 'تست‌های ایمنی سخت‌گیرانه و تحویل گواهینامه', isLast: true },
  ];

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
            name="construct-outline"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: spacing.sm }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            خدمات نصب
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
            paddingBottom: 120 + insets.bottom,
          },
        ]}
      >
        {/* بخش Hero با تصویر */}
        <View style={styles.heroContainer}>
          <View
            style={[
              styles.heroImageContainer,
              {
                height: 200,
                backgroundColor: colors.surfaceDim,
                position: 'relative',
              },
            ]}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOVvPuusJQLnoVXuhozsyXHFVxvja3JfATC6PI0NwExqiqcq604oWT_zAhCAOV1158A4QIZR3pHKhk4COt1-T4TdJJHqAiBep_QPdfkmq7_uW3pUnmPs_CN5u5hrfeqNt_u7yY6Gp_acv5eRD6H638fgyDM2n-QBi_9tvWHqT_gEmq1ytDBQfMScY0KlpbzHksaDRCXjUcZ_W7IeWyKQsI9g-qHiHMyGcsA3u0GNJyFP3PHxJUU-wETQ',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View
              style={[
                styles.heroOverlay,
                {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: spacing.lg,
                  paddingBottom: spacing.md,
                  backgroundColor: 'rgba(15,23,42,0.85)',
                },
              ]}
            >
              <AppText
                variant="h1"
                style={{
                  color: '#FFFFFF',
                  marginBottom: spacing.xs,
                  fontSize: 22,
                  lineHeight: 30,
                }}
              >
                نصب تاییدشده مهندسی برای هر معماری
              </AppText>
              <AppText
                variant="body"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 13,
                }}
              >
                طراحی دقیق، محاسبه بار و انطباق کامل با استانداردهای ایمنی
              </AppText>
            </View>
          </View>
        </View>

        {/* سیستم‌های معماری */}
        <View
          style={[
            styles.section,
            {
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.xl,
            },
          ]}
        >
          <AppText
            variant="h2"
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.md,
              },
            ]}
          >
            معماری‌های اصلی
          </AppText>

          <View style={styles.architecturesGrid}>
            {architectures.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.architectureCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                    borderWidth: 1,
                    padding: spacing.md,
                    width: (width - spacing.lg * 2 - spacing.md) / 2,
                    alignItems: 'flex-end',
                    gap: spacing.xs,
                  },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={colors.textPrimary}
                />
                <AppText
                  variant="button"
                  style={[
                    styles.architectureTitle,
                    {
                      color: colors.textPrimary,
                      fontWeight: '600',
                      textAlign: 'right',
                    },
                  ]}
                >
                  {item.title}
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.architectureDesc,
                    {
                      color: colors.textSecondary,
                      textAlign: 'right',
                      fontSize: 11,
                      lineHeight: 16,
                    },
                  ]}
                >
                  {item.desc}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* فرآیند نصب */}
        <View
          style={[
            styles.processSection,
            {
              backgroundColor: colors.surface,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.xl,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
            },
          ]}
        >
          <AppText
            variant="h2"
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.lg,
              },
            ]}
          >
            چرخه نصب
          </AppText>

          <View style={styles.processContainer}>
            {steps.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.processStep,
                  {
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    marginBottom: index < steps.length - 1 ? spacing.lg : 0,
                    position: 'relative',
                    paddingRight: spacing.md,
                  },
                ]}
              >
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.processLine,
                      {
                        position: 'absolute',
                        right: 14,
                        top: 28,
                        width: 2,
                        height: 30,
                        backgroundColor: colors.border,
                      },
                    ]}
                  />
                )}
                <View
                  style={[
                    styles.processDot,
                    {
                      width: 28,
                      height: 28,
                      borderRadius: borderRadius.full,
                      backgroundColor: item.isLast ? colors.secondary : colors.surface,
                      borderWidth: 2,
                      borderColor: item.isLast ? colors.secondary : colors.textPrimary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: spacing.md,
                      marginTop: 2,
                      shadowColor: item.isLast ? colors.secondary : 'transparent',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: item.isLast ? 0.4 : 0,
                      shadowRadius: 8,
                      elevation: item.isLast ? 4 : 0,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{
                      color: item.isLast ? '#FFFFFF' : colors.textPrimary,
                      fontWeight: 'bold',
                      fontSize: 11,
                    }}
                  >
                    {item.step}
                  </AppText>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <AppText
                    variant="labelSm"
                    style={[
                      styles.processTitle,
                      {
                        color: item.isLast ? colors.secondary : colors.textPrimary,
                        fontWeight: '600',
                        textAlign: 'right',
                        marginBottom: spacing.xxs,
                      },
                    ]}
                  >
                    {item.title}
                  </AppText>
                  <AppText
                    variant="body"
                    style={[
                      styles.processDesc,
                      {
                        color: colors.textSecondary,
                        textAlign: 'right',
                        fontSize: 13,
                      },
                    ]}
                  >
                    {item.desc}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* کارت گواهینامه */}
        <View
          style={[
            styles.certificationSection,
            {
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.xl,
            },
          ]}
        >
          <View
            style={[
              styles.certificationCard,
              {
                backgroundColor: isDark ? '#1A1A2E' : '#F8FAFC',
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                borderWidth: 1,
                padding: spacing.lg,
                flexDirection: 'row-reverse',
                alignItems: 'flex-start',
                gap: spacing.md,
              },
            ]}
          >
            <View
              style={[
                styles.certificationIconContainer,
                {
                  backgroundColor: colors.surface,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: spacing.sm,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                },
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={28}
                color={colors.textPrimary}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <AppText
                variant="button"
                style={[
                  styles.certificationTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                    textAlign: 'right',
                    marginBottom: spacing.xxs,
                  },
                ]}
              >
                منطبق با ISO و تحت پوشش بیمه
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.certificationDesc,
                  {
                    color: colors.textSecondary,
                    textAlign: 'right',
                    fontSize: 13,
                    lineHeight: 20,
                  },
                ]}
              >
                تمامی نصب‌ها مطابق با استانداردهای ISO 9001 و ISO 8100 هستند. به طور کامل تحت پوشش بیمه مسئولیت جامع برای محافظت از دارایی شما در طول ساخت‌وساز.
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* دکمه ثابت پایین */}
      <View
        style={[
          styles.fixedBottom,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            paddingBottom: 64 + insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.requestButton,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.md,
              paddingVertical: spacing.md,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: spacing.lg,
            },
          ]}
          onPress={handleRequestInspection}
        >
          <AppText
            variant="button"
            style={{
              color: colors.onPrimary,
              fontWeight: 'bold',
            }}
          >
            درخواست بازدید و برآورد رایگان
          </AppText>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={colors.onPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

export default InstallationScreen;

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
    paddingTop: 0,
  },
  heroContainer: {},
  heroImageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {},
  section: {},
  sectionTitle: {
    textAlign: 'right',
    marginBottom: 12,
  },
  architecturesGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  architectureCard: {
    alignItems: 'flex-end',
    padding: 12,
    gap: 4,
  },
  architectureTitle: {
    textAlign: 'right',
    fontWeight: '600',
  },
  architectureDesc: {
    textAlign: 'right',
    fontSize: 11,
    lineHeight: 16,
  },
  processSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  processContainer: {},
  processStep: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 12,
    position: 'relative',
    paddingRight: 12,
  },
  processLine: {
    position: 'absolute',
    right: 14,
    top: 28,
    width: 2,
    height: 30,
  },
  processDot: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginTop: 2,
  },
  processTitle: {
    textAlign: 'right',
    fontWeight: '600',
  },
  processDesc: {
    textAlign: 'right',
    fontSize: 13,
  },
  certificationSection: {},
  certificationCard: {
    padding: 16,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: 12,
  },
  certificationIconContainer: {
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  certificationTitle: {
    textAlign: 'right',
    fontWeight: '600',
  },
  certificationDesc: {
    textAlign: 'right',
    fontSize: 13,
    lineHeight: 20,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  requestButton: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});