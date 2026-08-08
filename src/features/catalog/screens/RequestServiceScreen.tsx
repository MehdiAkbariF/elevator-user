// src/features/catalog/screens/RequestServiceScreen.tsx

import React, { useState } from 'react';
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

export const RequestServiceScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

 
const handleCallEmergency = () => {
  // هدایت به صفحه درخواست تکنسین
  router.push('/request-technician');
};
  const specialties = [
    {
      id: 'motor',
      icon: 'flash-outline',
      title: 'تعمیر موتور و کشش',
      desc: 'حل مشکل لرزش، صدای سنگین یا گرم شدن سیم‌پیچ‌ها',
    },
    {
      id: 'panel',
      icon: 'hardware-chip-outline',
      title: 'الکترونیک پنل کنترل',
      desc: 'رفع خطاهای مادربرد، مشکلات تراز و نوسانات برق',
    },
    {
      id: 'door',
      icon: 'door-open-outline',
      title: 'تنظیم درب اتوماتیک',
      desc: 'رفع گیر کردن درب، قفل‌های خراب و موتور اپراتور درب',
    },
    {
      id: 'rope',
      icon: 'barbell-outline',
      title: 'تعویض طناب و قرقره',
      desc: 'تعویض ایمن طناب‌های فولادی، قرقره‌ها و کفشک‌های راهنما',
    },
  ];

  const steps = [
    { step: '۱', title: 'اعزام سریع', desc: 'نزدیک‌ترین کارشناس مجرب را اعزام می‌کنیم' },
    { step: '۲', title: 'تشخیص دقیق', desc: 'با استفاده از ابزارهای مدرن، ریشه مشکل را پیدا می‌کنیم' },
    { step: '۳', title: 'تایید هزینه', desc: 'قبل از شروع کار، صورتحساب شفافی ارائه می‌دهیم' },
    { step: '۴', title: 'تست و تحویل', desc: 'پس از تعمیر، تست ایمنی با بار کامل انجام می‌دهیم' },
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
            تعمیر و عیب‌یابی
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
            paddingBottom: 160 + insets.bottom,
          },
        ]}
      >
        {/* بخش Hero با تصویر - چسبیده به هدر */}
        <View style={styles.heroContainer}>
          <View
            style={[
              styles.heroImageContainer,
              {
                height: 180,
                backgroundColor: colors.surfaceDim,
                position: 'relative',
              },
            ]}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu282NgHScyjEZH4cxAgm5xpNG8lLCcgzR9-zxoFy83Cq3tPSKAzPFcaI_Vm1n12aXJSPK412wqK-Z02pugpgo9gJWoVCA_OOmXNJVq55tZvlNystG-klAC_-SQe30ji-M-FjZ8PZ_1cYq-W0Oa5hg3bjR9wQOeMLGkP4mM3Z4f-KPhmE7c3K0EZoLdMcKDDGYnw4BnVsxeB3zCId5Lm27AYUVej_xwF3f5GNEDRiv3wpl1qNqTZrHYQ',
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
                  backgroundColor: 'rgba(0,0,0,0.5)',
                },
              ]}
            >
              <AppText
                variant="h1"
                style={{
                  color: '#FFFFFF',
                  marginBottom: spacing.xs,
                }}
              >
                تعمیر و عیب‌یابی
              </AppText>
              <AppText
                variant="body"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 13,
                }}
              >
                تشخیص سریع. راه‌حل‌های دائمی.
              </AppText>
            </View>
          </View>

          <View
            style={[
              styles.heroDescriptionContainer,
              {
                padding: spacing.lg,
              },
            ]}
          >
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
              آیا آسانسور شما دائماً خراب می‌شود یا کاملاً متوقف شده است؟ تکنسین‌های
              معتبر ما با پاسخگویی سریع، مجهز به تشخیص و تعمیر هر گونه خرابی مکانیکی
              یا الکتریکی هستند.
            </AppText>
          </View>
        </View>

        {/* تخصص‌های عیب‌یابی */}
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
            تخصص‌های عیب‌یابی ما
          </AppText>

          <View style={styles.specialtiesGrid}>
            {specialties.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={[
                  styles.specialtyCard,
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
                onPress={() => setSelectedSpecialty(item.id)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={colors.secondary}
                  style={{ marginBottom: spacing.xs }}
                />
                <AppText
                  variant="button"
                  style={[
                    styles.specialtyTitle,
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
                    styles.specialtyDesc,
                    {
                      color: colors.textSecondary,
                      textAlign: 'right',
                      fontSize: 12,
                      lineHeight: 16,
                    },
                  ]}
                >
                  {item.desc}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* تعهدات اعزام اضطراری */}
        <View
          style={[
            styles.commitmentSection,
            {
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
            },
          ]}
        >
          <View
            style={[
              styles.commitmentCard,
              {
                backgroundColor: isDark ? '#3D2A00' : '#FEF3C7',
                borderColor: isDark ? '#5C3D00' : '#FDE68A',
                borderRadius: borderRadius.lg,
                borderWidth: 1,
                padding: spacing.lg,
                gap: spacing.sm,
              },
            ]}
          >
            <View style={styles.commitmentRow}>
              <Ionicons
                name="timer-outline"
                size={20}
                color={colors.secondary}
                style={{ marginLeft: spacing.sm }}
              />
              <AppText
                variant="body"
                style={[
                  styles.commitmentText,
                  {
                    color: isDark ? '#FFDCC3' : colors.textPrimary,
                    fontWeight: '500',
                    flex: 1,
                    textAlign: 'right',
                  },
                ]}
              >
                میانگین زمان اعزام کمتر از ۳۰ دقیقه برای خرابی‌های فعال آسانسور
              </AppText>
            </View>
            <View style={styles.commitmentRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.secondary}
                style={{ marginLeft: spacing.sm }}
              />
              <AppText
                variant="body"
                style={[
                  styles.commitmentText,
                  {
                    color: isDark ? '#FFDCC3' : colors.textPrimary,
                    fontWeight: '500',
                    flex: 1,
                    textAlign: 'right',
                  },
                ]}
              >
                تعمیر در اولین بازدید: ون‌های خدماتی ما مجهز به ۵۰+ قطعه یدکی رایج
                هستند.
              </AppText>
            </View>
          </View>
        </View>

        {/* فرآیند تعمیر */}
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
            فرآیند تعمیر صادقانه ما
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
                  },
                ]}
              >
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.processLine,
                      {
                        position: 'absolute',
                        right: 16,
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
                      width: 32,
                      height: 32,
                      borderRadius: borderRadius.full,
                      backgroundColor: colors.surface,
                      borderWidth: 2,
                      borderColor: colors.secondary,
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
                      color: colors.secondary,
                      fontWeight: 'bold',
                      fontSize: 12,
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
            styles.emergencyButton,
            {
              backgroundColor: colors.secondary,
              borderRadius: borderRadius.md,
              paddingVertical: spacing.md,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
            },
          ]}
          onPress={handleCallEmergency}
        >
          <Ionicons
            name="call-outline"
            size={20}
            color={colors.onPrimary}
          />
          <AppText
            variant="button"
            style={{
              color: colors.onPrimary,
            
            }}
          >
            تماس با امداد اضطراری
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

export default RequestServiceScreen;

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
    paddingBottom: 160,
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
  heroDescriptionContainer: {
    padding: 16,
  },
  heroDescription: {
    textAlign: 'right',
    lineHeight: 22,
  },
  section: {},
  sectionTitle: {
    textAlign: 'right',
    marginBottom: 12,
  },
  specialtiesGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  specialtyCard: {
    alignItems: 'flex-end',
    padding: 12,
  },
  specialtyTitle: {
    textAlign: 'right',
    fontWeight: '600',
  },
  specialtyDesc: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 16,
  },
  commitmentSection: {},
  commitmentCard: {
    padding: 16,
    gap: 8,
  },
  commitmentRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
  },
  commitmentText: {
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
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
  },
  processLine: {
    position: 'absolute',
    right: 16,
    top: 28,
    width: 2,
    height: 30,
  },
  processDot: {
    width: 32,
    height: 32,
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
  emergencyButton: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});