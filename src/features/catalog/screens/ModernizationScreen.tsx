// src/features/catalog/screens/ModernizationScreen.tsx

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

export const ModernizationScreen = () => {
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

  const handleRequestQuote = () => {
    router.push('/project-inquiry');
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
            name="construct-outline"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: spacing.sm }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            نوسازی و مدرن‌سازی
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
        {/* بخش تصویر مقایسه */}
        <View style={styles.imageComparisonContainer}>
          <View style={styles.imageRow}>
            {/* تصویر قبل */}
            <View
              style={[
                styles.imageHalf,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRightWidth: 1,
                  borderRightColor: colors.border,
                },
              ]}
            >
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2jDaBdlcr2SYPRReegW-gFVAicj8CpNi1NTxkzR9eDo10h5hYfGTBQhipOLmIEJ63LZLI08gXobNqZEhDtnn6tHgUO7drjeLc9kipS60rLi68S1WwphUuuCgmecqvya63GprjIqxuYZEsmFkqsvoW6KJfRDogYozlPjjVls3y3RkgMyM2_m5q8_oTld37C7IhsQQNVp8MO7E6QUdbCzNyJSkVINWyuxdLnvkRT_ltvh1yQRJRjSsZFw',
                }}
                style={styles.comparisonImage}
                resizeMode="cover"
              />
              <View
                style={[
                  styles.comparisonLabel,
                  {
                    position: 'absolute',
                    bottom: spacing.md,
                    left: spacing.md,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xxs,
                    borderRadius: borderRadius.sm,
                  },
                ]}
              >
                <AppText variant="labelSm" style={{ color: '#FFFFFF', fontSize: 10 }}>
                  قبل
                </AppText>
              </View>
            </View>

            {/* تصویر بعد */}
            <View
              style={[
                styles.imageHalf,
                {
                  backgroundColor: colors.surfaceDim,
                },
              ]}
            >
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2suG0CxULWIDTn594lqJeHBY8pfSz-17H7H2EVBwUHnuEaNfYM25c00KUzJudHeHTGeiVW67hO8sh8xET_HIHtpJvrVYF9DQ-gCQj4CA4suk-gHBrednt8NudxaMXooPF1gEGHQJr4xYsPMXe-l1zv3XmKP-1aH4Aw4wfRdlQlgCD2tPT2pkjtKsCl4f5rZc8SKWMyuLTGJnF1biGN5WIW2Jc69GYEIbe33Hy1SDXqKMUUpTpbTbzRw',
                }}
                style={styles.comparisonImage}
                resizeMode="cover"
              />
              <View
                style={[
                  styles.comparisonLabel,
                  {
                    position: 'absolute',
                    bottom: spacing.md,
                    left: spacing.md,
                    backgroundColor: colors.secondary,
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xxs,
                    borderRadius: borderRadius.sm,
                  },
                ]}
              >
                <AppText variant="labelSm" style={{ color: '#FFFFFF', fontSize: 10 }}>
                  بعد
                </AppText>
              </View>
            </View>
          </View>

          {/* برچسب VS */}
          <View
            style={[
              styles.vsBadge,
              {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -20 }, { translateY: -20 }],
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.full,
                borderWidth: 1,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <AppText
              variant="labelSm"
              style={{
                color: colors.textPrimary,
                fontSize: 11,
                fontWeight: 'bold',
              }}
            >
              VS
            </AppText>
          </View>
        </View>

        {/* توضیحات */}
        <View style={[styles.heroTextContainer, { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }]}>
          <AppText
            variant="h1"
            style={[
              styles.heroTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.sm,
              },
            ]}
          >
            قلب ساختمان خود را مدرن و ایمن کنید
          </AppText>
          <AppText
            variant="body"
            style={[
              styles.heroDescription,
              {
                color: colors.textSecondary,
                lineHeight: 22,
              },
            ]}
          >
            آسانسورهای قدیمی انرژی زیادی مصرف می‌کنند، مکرراً خراب می‌شوند و جذابیت
            ظاهری خود را از دست می‌دهند. بسته‌های نوسازی ما عملکرد، ظاهر و ایمنی را
            ارتقا می‌دهند.
          </AppText>
        </View>

        {/* نشانه‌های هشدار */}
        <View
          style={[
            styles.warningSection,
            {
              backgroundColor: colors.surfaceDim,
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
                marginBottom: spacing.md,
              },
            ]}
          >
            نشانه‌های کلیدی فرسودگی آسانسور
          </AppText>

          <View style={styles.warningGrid}>
            <View
              style={[
                styles.warningCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  width: (width - spacing.lg * 2 - spacing.md) / 2,
                  alignItems: 'flex-end',
                },
              ]}
            >
              <Ionicons
                name="construct-outline"
                size={24}
                color={colors.error}
                style={{ marginBottom: spacing.xs }}
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.warningTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                    textAlign: 'right',
                    marginBottom: spacing.xxs,
                  },
                ]}
              >
                خرابی مکرر
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.warningDesc,
                  {
                    color: colors.textSecondary,
                    textAlign: 'right',
                    fontSize: 12,
                  },
                ]}
              >
                توقف بیش از یک بار در ماه
              </AppText>
            </View>

            <View
              style={[
                styles.warningCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  width: (width - spacing.lg * 2 - spacing.md) / 2,
                  alignItems: 'flex-end',
                },
              ]}
            >
              <Ionicons
                name="flash-outline"
                size={24}
                color={colors.secondary}
                style={{ marginBottom: spacing.xs }}
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.warningTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                    textAlign: 'right',
                    marginBottom: spacing.xxs,
                  },
                ]}
              >
                قبض انرژی بالا
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.warningDesc,
                  {
                    color: colors.textSecondary,
                    textAlign: 'right',
                    fontSize: 12,
                  },
                ]}
              >
                موتورهای قدیمی تا ۴۰٪ بیشتر مصرف می‌کنند
              </AppText>
            </View>

            <View
              style={[
                styles.warningCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  width: (width - spacing.lg * 2 - spacing.md) / 2,
                  alignItems: 'flex-end',
                },
              ]}
            >
              <Ionicons
                name="cellular-outline"
                size={24}
                color={colors.textSecondary}
                style={{ marginBottom: spacing.xs }}
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.warningTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                    textAlign: 'right',
                    marginBottom: spacing.xxs,
                  },
                ]}
              >
                حرکت ناهموار و پرصدا
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.warningDesc,
                  {
                    color: colors.textSecondary,
                    textAlign: 'right',
                    fontSize: 12,
                  },
                ]}
              >
                لرزش شدید کابین و صدای گیربکس
              </AppText>
            </View>

            <View
              style={[
                styles.warningCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  width: (width - spacing.lg * 2 - spacing.md) / 2,
                  alignItems: 'flex-end',
                },
              ]}
            >
              <Ionicons
                name="image-outline"
                size={24}
                color={colors.textSecondary}
                style={{ marginBottom: spacing.xs }}
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.warningTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                    textAlign: 'right',
                    marginBottom: spacing.xxs,
                  },
                ]}
              >
                نمای داخلی قدیمی
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.warningDesc,
                  {
                    color: colors.textSecondary,
                    textAlign: 'right',
                    fontSize: 12,
                  },
                ]}
              >
                چوب خش‌دار، دکمه‌های آسیب‌دیده و نور ضعیف
              </AppText>
            </View>
          </View>
        </View>

        {/* مزایا */}
        <View
          style={[
            styles.benefitsSection,
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
            پس از نوسازی چه به دست می‌آورید؟
          </AppText>

          {[
            {
              icon: 'battery-charging-outline',
              title: 'صرفه‌جویی ۴۰٪ در انرژی',
              desc: 'ارتقا با موتورهای گیرلس و اینورتر با راندمان بالا',
            },
            {
              icon: 'move-outline',
              title: 'کنترل فوق‌العاده نرم',
              desc: 'پنل‌های کنترل هوشمند مدرن به معنای عدم لرزش است',
            },
            {
              icon: 'trending-up-outline',
              title: 'افزایش ارزش ملک',
              desc: 'کابین‌های لوکس مدرن ارزش کلی ساختمان را افزایش می‌دهند',
            },
            {
              icon: 'shield-checkmark-outline',
              title: 'گارانتی جدید',
              desc: 'گارانتی معتبر برای قطعات اصلی جدید تعویض‌شده',
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[
                styles.benefitItem,
                {
                  flexDirection: 'row-reverse',
                  alignItems: 'flex-start',
                  paddingVertical: spacing.md,
                  borderBottomWidth: index < 3 ? 1 : 0,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={colors.textPrimary}
                style={{ marginLeft: spacing.md, marginTop: 2 }}
              />
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <AppText
                  variant="labelSm"
                  style={[
                    styles.benefitTitle,
                    {
                      color: colors.textPrimary,
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
                    styles.benefitDesc,
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

        {/* فرآیند */}
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
            فرآیند نوسازی
          </AppText>

          <View style={styles.processContainer}>
            {[
              { step: '۱', title: 'تشخیص و ارزیابی', desc: 'بررسی ایمنی و تحلیل فرسودگی فنی' },
              { step: '۲', title: 'پیشنهاد سفارشی', desc: 'گزینه‌های طراحی مکانیکی/داخلی و بودجه‌بندی' },
              { step: '۳', title: 'نصب و بازسازی', desc: 'تعویض موتور، کنترل‌رها و استایل کابین' },
              { step: '۴', title: 'گواهینامه مجدد', desc: 'تحویل با استانداردهای رسمی جدید ایمنی' },
            ].map((item, index) => (
              <View
                key={index}
                style={[
                  styles.processStep,
                  {
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    marginBottom: index < 3 ? spacing.lg : 0,
                    position: 'relative',
                  },
                ]}
              >
                {index < 3 && (
                  <View
                    style={[
                      styles.processLine,
                      {
                        position: 'absolute',
                        right: 18,
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
                      width: 36,
                      height: 36,
                      borderRadius: borderRadius.full,
                      backgroundColor: index === 0 ? colors.secondary : colors.surface,
                      borderWidth: 2,
                      borderColor: index === 0 ? colors.secondary : colors.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: spacing.md,
                      marginTop: 2,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{
                      color: index === 0 ? '#FFFFFF' : colors.textPrimary,
                      fontWeight: 'bold',
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
                        color: index === 0 ? colors.secondary : colors.textPrimary,
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
            styles.submitButton,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.md,
              paddingVertical: spacing.md,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
            },
          ]}
          onPress={handleRequestQuote}
        >
          <AppText
            variant="button"
            style={{
              color: colors.onPrimary,
           
            }}
          >
            درخواست بازدید و استعلام رایگان
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
  imageComparisonContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  imageRow: {
    flexDirection: 'row',
    height: '100%',
  },
  imageHalf: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  comparisonImage: {
    width: '100%',
    height: '100%',
  },
  comparisonLabel: {},
  vsBadge: {},
  heroTextContainer: {},
  heroTitle: {
    textAlign: 'right',
    fontSize: 22,
    lineHeight: 30,
  },
  heroDescription: {
    textAlign: 'right',
  },
  warningSection: {},
  sectionTitle: {
    textAlign: 'right',
  },
  warningGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  warningCard: {
    alignItems: 'flex-end',
  },
  warningTitle: {},
  warningDesc: {},
  benefitsSection: {},
  benefitItem: {},
  benefitTitle: {},
  benefitDesc: {},
  processSection: {},
  processContainer: {},
  processStep: {},
  processLine: {},
  processDot: {},
  processTitle: {},
  processDesc: {},
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  submitButton: {
    width: '100%',
  },
});