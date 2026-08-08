// src/features/dashboard/screens/DashboardScreen.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { AppBottomNav } from '@/src/components/layout/AppBottomNav';

export const DashboardScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <ScreenWrapper>
      {/* هدر سراسری مستقل و عمومی */}
      <AppHeader />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }} // جلوگیری از تداخل محتوا با نوار پایینی
      >
        
        {/* ابزارک جدید UX: پنل خلاصه وضعیت آسانسورها و دستگاه‌های کاربر */}
        <View style={[styles.fleetStatusCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg, marginHorizontal: spacing.lg, marginTop: spacing.lg }]}>
          <View style={styles.statusRow}>
            <View style={[styles.badge, { backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: borderRadius.sm }]}>
              <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
              <AppText variant="labelSm" style={{ color: '#22C55E' }}>همه فعال و ایمن</AppText>
            </View>
            <AppText variant="h2" style={styles.statusTitle}>وضعیت آسانسورهای شما</AppText>
          </View>
          <AppText variant="body" color="muted" style={styles.statusSubtitle}>
            ساختمان نگین: ۳ آسانسور تحت پوشش بیمه و سرویس منظم فعال هستند.
          </AppText>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.statusFooter}>
            <AppText variant="labelSm" color="muted">سرویس دوره‌ای بعدی: ۲۴ اسفند (۹ روز دیگر)</AppText>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
          </View>
        </View>

        {/* ۱. بخش هیرو (Hero Section) */}
        <View style={[styles.heroSection, { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl }]}>
          <AppText variant="h1" style={styles.heroTitle}>
            مراقبت هوشمند از آسانسور و قطعات یدکی استاندارد
          </AppText>
          <AppText variant="body" color="muted" style={styles.heroSubtitle}>
            اعزام فوق‌سریع کارشناس فنی ۲۴ ساعته و تأمین بدون واسطه قطعات اصلی گواهی‌شده.
          </AppText>
          
          <View style={styles.heroActionContainer}>
            {/* دکمه امداد اضطراری */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.emergencyButton, { backgroundColor: colors.secondary, borderRadius: borderRadius.md }]}
            >
              <Ionicons name="alert-circle" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              <AppText variant="button" style={{ color: '#FFFFFF' }}>
                درخواست اعزام فوری تکنسین
              </AppText>
            </TouchableOpacity>

            {/* دکمه کاتالوگ قطعات با اصلاح بردر ملایم */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.catalogButton, { borderColor: colors.border, borderRadius: borderRadius.md, backgroundColor: colors.surface }]}
            >
              <Ionicons name="arrow-back" size={18} color={colors.textPrimary} style={{ marginLeft: 8 }} />
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                جستجوی قطعات یدکی
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۲. بخش خدمات ما با اصلاح بردارهای فوق‌العاده ملایم و لوکس */}
        <View style={[styles.section, { backgroundColor: colors.surfaceDim, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, borderColor: colors.border }]}>
          <AppText variant="h2" style={styles.sectionTitle}>
            خدمات نگهداری و اورهال ورتییکال‌کِر
          </AppText>
          
          <View style={[styles.servicesStack, { gap: spacing.md }]}>
            {/* خدمت اول */}
            <View style={[styles.serviceCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
              <View style={[styles.iconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Ionicons name="calendar" size={24} color={colors.textPrimary} />
              </View>
              <AppText variant="h2" style={styles.serviceTitle}>
                سرویس و نگهداری سالانه
              </AppText>
              <AppText variant="body" color="muted" style={styles.serviceDescription}>
                بازدیدهای دوره‌ای منظم و مراقبت‌های پیشگیرانه جهت حفظ استانداردها و افزایش طول عمر قطعات.
              </AppText>
            </View>

            {/* خدمت دوم */}
            <View style={[styles.serviceCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
              <View style={[styles.iconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Ionicons name="construct" size={24} color={colors.secondary} />
              </View>
              <AppText variant="h2" style={styles.serviceTitle}>
                تعمیرات فوق‌سریع شبانه‌روزی
              </AppText>
              <AppText variant="body" color="muted" style={styles.serviceDescription}>
                اعزام فوری تکنسین‌های تاییدشده در زمان وقوع خرابی‌های بحرانی و توقف آسانسور در هر ساعت از شبانه‌روز.
              </AppText>
            </View>

            {/* خدمت سوم */}
            <View style={[styles.serviceCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
              <View style={[styles.iconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Ionicons name="trending-up" size={24} color={colors.textPrimary} />
              </View>
              <AppText variant="h2" style={styles.serviceTitle}>
                بازسازی و نوسازی (مدرن‌سازی)
              </AppText>
              <AppText variant="body" color="muted" style={styles.serviceDescription}>
                ارتقای کامل سیستم‌های قدیمی جهت بهبود کارایی، ارتقای ایمنی و نوسازی دکوراسیون داخلی کابین.
              </AppText>
            </View>
          </View>
        </View>

        {/* ۳. کاتالوگ چرخشی قطعات برجسته */}
        <View style={{ paddingVertical: spacing.xl }}>
          <View style={[styles.carouselHeader, { paddingHorizontal: spacing.lg }]}>
            <AppText variant="h2" style={styles.carouselTitle}>
              قطعات برجسته و پرتقاضا
            </AppText>
            <TouchableOpacity>
              <AppText variant="labelSm" color="secondary">
                مشاهده کاتالوگ
              </AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.carouselScroll, { paddingHorizontal: spacing.lg }]}
          >
            {/* قطعه ۱ */}
            <View style={[styles.partCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
              <View style={[styles.partImageContainer, { borderBottomColor: colors.border }]}>
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyPwVcCRRkqBx1sKo_5rvZKEbjyHucB_jlw-WtkCdhV_33MHNtukk0E7dtc8x-PDaVp4CGM93D1D0edg5mBcRAG3dosAn6K1vd2QpBgmmJzjwkierlt1XkpYxfMLzXh440p8lVdW29msBW4A7YdbktyuDlIBq2lfIFA1eiO2FQB0VZFKHGnEeRx_vtzd8ZSHvBKB9EHRm_Zb2D20rYUu_CqNnBB_iNqSDHpwutOjemExBBZn501kLNQ' }}
                  style={styles.partImage}
                />
                <View style={styles.tagContainer}>
                  <AppText variant="labelSm" style={styles.tagText}>Orona OEM</AppText>
                </View>
              </View>
              <View style={styles.partInfo}>
                <AppText variant="h2" style={styles.partName}>قفل درب آسانسور</AppText>
                <AppText variant="body" color="muted" style={styles.partDesc}>مکانیزم تاییدشده قفل ایمنی درب کابین.</AppText>
                <TouchableOpacity style={[styles.priceButton, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
                  <AppText variant="button" style={{ color: colors.textPrimary }}>استعلام قیمت</AppText>
                </TouchableOpacity>
              </View>
            </View>

            {/* قطعه ۲ */}
            <View style={[styles.partCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
              <View style={[styles.partImageContainer, { borderBottomColor: colors.border }]}>
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqlTIVIYkBFuSel_rgxQ41WAUlTSkTyxA6joneyzT89nf0J6vcoIdNHRwfFAUYP8go1zP8TVEH2BTYEU-Ttt5zVECDDaXsn4degBLelXw8ZoIQHV-8YrD-r-tkKDHmUgBZVnXzwHieHAIlm4kMsqDEoPPFj23Cs2kjhtzJPK51kDjwz69e2pCFIj9G-wlxjLmeMXEfvsGW37maAxbNa1xq2Z3Di0gUU0h08_WG7ftOhwwnToAUynVTQ' }}
                  style={styles.partImage}
                />
                <View style={styles.tagContainer}>
                  <AppText variant="labelSm" style={styles.tagText}>Universal</AppText>
                </View>
              </View>
              <View style={styles.partInfo}>
                <AppText variant="h2" style={styles.partName}>سیم بکسل کششی فولادی</AppText>
                <AppText variant="body" color="muted" style={styles.partDesc}>کابل‌های بافته‌شده با هسته فولادی مستحکم.</AppText>
                <TouchableOpacity style={[styles.priceButton, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
                  <AppText variant="button" style={{ color: colors.textPrimary }}>استعلام قیمت</AppText>
                </TouchableOpacity>
              </View>
            </View>

            {/* قطعه ۳ */}
            <View style={[styles.partCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
              <View style={[styles.partImageContainer, { borderBottomColor: colors.border }]}>
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1tjHZ_JLpwbxMivJ60eHMVoE0Z848L0di1qczuYajVk3MwCeeCXNqTf6hzPyaAnQuh_5EkE2xtdy1k9XY5uhAR6nQLbEF-jIdHXrQYFezUlx7iG3slwzf4_KT2UZtHrBdM6ZbDlSn5HWxarAHAukOpcK3XyBrq_AQ8LRWydZeu33qnTkQ3yj_ZN6xIb382l3nHQ181d6SueG5Zoqv3F0fBWxq0_sv0hYm12U1zxpXhkNk2gXPydKIgA' }}
                  style={styles.partImage}
                />
                <View style={styles.tagContainer}>
                  <AppText variant="labelSm" style={styles.tagText}>Schindler</AppText>
                </View>
              </View>
              <View style={styles.partInfo}>
                <AppText variant="h2" style={styles.partName}>شستی احضار و پنل کابین</AppText>
                <AppText variant="body" color="muted" style={styles.partDesc}>کلیدهای استیل ضدزنگ به همراه خط بریل برجسته.</AppText>
                <TouchableOpacity style={[styles.priceButton, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
                  <AppText variant="button" style={{ color: colors.textPrimary }}>استعلام قیمت</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ۴. نشان‌های اعتماد و اصالت با کادربندی‌های Slate ملایم */}
        <View style={[styles.trustSection, { backgroundColor: colors.surface, borderColor: colors.border, paddingHorizontal: spacing.lg }]}>
          <View style={styles.trustBadge}>
            <Ionicons name="checkmark-seal-outline" size={28} color={colors.textPrimary} style={{ marginLeft: spacing.sm }} />
            <AppText variant="button" style={{ color: colors.textPrimary }}>تکنسین‌های مجرب و تایید‌شده</AppText>
          </View>
          <View style={[styles.trustBadge, { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }]}>
            <Ionicons name="shield-checkmark-outline" size={28} color={colors.textPrimary} style={{ marginLeft: spacing.sm }} />
            <AppText variant="button" style={{ color: colors.textPrimary }}>تضمین ۱۰۰٪ اصالت قطعات یدکی</AppText>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="receipt-outline" size={28} color={colors.textPrimary} style={{ marginLeft: spacing.sm }} />
            <AppText variant="button" style={{ color: colors.textPrimary }}>قیمت‌گذاری شفاف و تعرفه مصوب</AppText>
          </View>
        </View>
      </ScrollView>

      {/* ناوبری پایینی سراسری، ماژولار و قابل استفاده مجدد */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  fleetStatusCard: {
    borderWidth: 1,
    padding: 16,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontWeight: '700',
  },
  badge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 6,
  },
  statusSubtitle: {
    textAlign: 'right',
    lineHeight: 20,
    fontSize: 13,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 12,
  },
  statusFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heroSection: {
    width: '100%',
  },
  heroTitle: {
    textAlign: 'right',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroSubtitle: {
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 24,
  },
  heroActionContainer: {
    width: '100%',
    gap: 12,
  },
  emergencyButton: {
    height: 48,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  catalogButton: {
    height: 48,
    borderWidth: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    textAlign: 'right',
    marginBottom: 16,
  },
  servicesStack: {
    width: '100%',
  },
  serviceCard: {
    padding: 20,
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'flex-end',
  },
  serviceTitle: {
    textAlign: 'right',
    marginBottom: 8,
  },
  serviceDescription: {
    textAlign: 'right',
    lineHeight: 22,
  },
  carouselHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  carouselTitle: {
    fontWeight: '700',
  },
  carouselScroll: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  partCard: {
    width: 280,
    borderWidth: 1,
    overflow: 'hidden',
  },
  partImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    borderBottomWidth: 1,
  },
  partImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  partInfo: {
    padding: 16,
  },
  partName: {
    textAlign: 'right',
    marginBottom: 4,
  },
  partDesc: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  priceButton: {
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustSection: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 24,
  },
  trustBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
  },
});