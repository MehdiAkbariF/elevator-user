// src/features/catalog/screens/ProductDetailScreen.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/theme/ThemeContext';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 350; // ارتفاع ثابت تصویر پس‌زمینه

export const ProductDetailScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/catalog');
    }
  };

  return (
    <ScreenWrapper>
      {/* ۱. هدر چسبنده بالایی با اولویت لایه‌ای بالا (zIndex: 100) */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
          
          <TouchableOpacity activeOpacity={0.7} style={[styles.headerButton, { marginLeft: spacing.xs }]}>
            <Ionicons name="share-social-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={[styles.headerButton, { marginLeft: spacing.xs }]}>
            <Ionicons name="heart-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ۲. لایه پس‌زمینه فیکس شده (پایین‌ترین لایه بصری - zIndex: 1) */}
      <View style={[styles.imageGalleryBackground, { backgroundColor: colors.surfaceDim, height: IMAGE_HEIGHT }]}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBciiNHmbwI70GkRaFNTcLQdydKCwSoF4BQSpZURFP8ZQdZgT_icxvtICmLexDU2pTxGM4ss2QOm57ujT2TTNyAF3p_ugXUD5rEzViJliYztHtxcsbFPkQUd-wtBWAFjAczI1vR2dOrbJoWCwXke5Ia-HOdkpHAXI6g3n-6MDr0oeYPb01zbhy-CKIyZX7wR4adbvBPjrlXilzKgHano84DlHD6xDk7gwcEKjaJpwOopQH-jCiFihzODA' }}
          style={styles.productImage}
        />
        {/* دات‌های وضعیت گالری */}
        <View style={styles.dotContainer}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
        </View>
      </View>

      {/* ۳. کانتینر اصلی اسکرول با اولویت لایه‌ای میانی (zIndex: 10) روی عکس */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* هدر اسپیسر کاملاً شفاف جهت دیده شدن عکس زیرین */}
        <View style={styles.transparentSpacer} />

        {/* بدنه و مشخصات فنی محصول با پس‌زمینه جامد */}
        <View style={[styles.contentCard, { backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.lg }]}>
          
          {/* بخش اطلاعات اصلی محصول */}
          <View style={styles.sectionInfo}>
            <AppText variant="labelSm" color="secondary" style={styles.brandTag}>
              سیکور - ایتالیا (SICOR - ITALY)
            </AppText>
            <AppText variant="h1" style={[styles.productTitle, { color: colors.textPrimary }]}>
              موتور گیرلس آسانسور مدل SG10
            </AppText>
            
            {/* امتیازدهی و وضعیت موجودی */}
            <View style={styles.ratingRow}>
              <View style={[styles.stockBadge, { backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: borderRadius.sm }]}>
                <AppText variant="labelSm" style={{ color: '#22C55E' }}>موجود در انبار</AppText>
              </View>
              <View style={[styles.dotSpacer, { backgroundColor: colors.border }]} />
              <View style={styles.ratingInfo}>
                <AppText variant="body" color="muted" style={{ fontSize: 12 }}>(۲۴ نظر)</AppText>
                <AppText variant="button" style={{ color: colors.textPrimary, marginRight: 4, fontFamily: 'IRANYekanXFaNum-Bold' }}>۴.۸</AppText>
                <Ionicons name="star" size={16} color="#D97706" />
              </View>
            </View>
          </View>

          {/* ابزارک تایید سازگاری */}
          <View style={[styles.compatibilityCard, { backgroundColor: colors.surfaceDim, borderColor: colors.border, borderRadius: borderRadius.lg }]}>
            <View style={styles.compatibilityHeader}>
              <Ionicons name="construct-outline" size={20} color={colors.textPrimary} style={{ marginLeft: 8 }} />
              <AppText variant="body" style={[styles.compatibilityText, { color: colors.textPrimary }]}>
                سازگاری موتور را با آسانسور ساختمان خود بررسی کنید.
              </AppText>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.compatibilityLink}>
              <AppText variant="button" color="secondary">انتخاب مدل آسانسور ساختمان</AppText>
              <Ionicons name="arrow-back-outline" size={16} color={colors.secondary} style={{ marginRight: 4 }} />
            </TouchableOpacity>
          </View>

          {/* جدول مشخصات فنی */}
          <View style={styles.specsSection}>
            <AppText variant="h2" style={[styles.sectionHeading, { color: colors.textPrimary }]}>
              مشخصات فنی قطعه
            </AppText>
            
            <View style={styles.table}>
              <View style={[styles.tableRow, { borderBottomColor: colors.surfaceDim }]}>
                <AppText variant="body" color="muted">ظرفیت باربری آسانسور</AppText>
                <AppText variant="button" style={[styles.specVal, { color: colors.textPrimary }]}>۳۲۰ الی ۴۵۰ کیلوگرم</AppText>
              </View>
              <View style={[styles.tableRow, { borderBottomColor: colors.surfaceDim }]}>
                <AppText variant="body" color="muted">سرعت نامی موتور</AppText>
                <AppText variant="button" style={[styles.specVal, { color: colors.textPrimary }]}>۱.۰ متر بر ثانیه</AppText>
              </View>
              <View style={[styles.tableRow, { borderBottomColor: colors.surfaceDim }]}>
                <AppText variant="body" color="muted">ولتاژ تغذیه کارکرد</AppText>
                <AppText variant="button" style={[styles.specVal, { color: colors.textPrimary }]}>۳۸۰ ولت (۳ فاز)</AppText>
              </View>
              <View style={[styles.tableRow, { borderBottomColor: colors.surfaceDim }]}>
                <AppText variant="body" color="muted">گارانتی اصالت</AppText>
                <AppText variant="button" style={[styles.specVal, { color: colors.textPrimary }]}>۱۲ ماه گارانتی رسمی طلایی</AppText>
              </View>
            </View>
          </View>

          {/* مرور کلی محصول */}
          <View style={styles.overviewSection}>
            <AppText variant="h2" style={[styles.sectionHeading, { color: colors.textPrimary }]}>
              مرور کلی قطعه
            </AppText>
            <AppText variant="body" color="muted" style={styles.overviewText}>
              موتور گیرلس آسانسور مدل SG10 با مهندسی پیشرفته ایتالیا، طراحی شده برای ساختمان‌های مسکونی و تجاری مرتفع است. این موتور دوام فوق‌العاده بالا، سطح نویز نزدیک به صفر و صرفه‌جویی چشمگیر در مصرف برق را ارائه می‌دهد. بهترین انتخاب برای پروژه‌های بازسازی و نوسازی نیازمند سیستم بدون موتورخانه (MRL).
            </AppText>
          </View>

        </View>
      </ScrollView>

      {/* ۴. نوار چسبنده پایینی خرید با بالاترین اولویت لایه‌ای (zIndex: 110) */}
      <View style={[styles.bottomActionBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        
        {/* قیمت (با حذف flex اضافی جهت پخش کامل چپ و راست) */}
        <View style={styles.priceContainer}>
          <AppText variant="labelSm" color="muted" style={styles.totalPriceLabel}>قیمت کل</AppText>
          <AppText variant="h1" style={[styles.totalPriceText, { color: colors.textPrimary }]}>
            ۱۲۰,۰۰۰,۰۰۰ تومان
          </AppText>
        </View>

        {/* دکمه افزودن به سبد خرید (بدون عرض اجباری جهت فاصله امن تا قیمت) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.addToCartBtn, { backgroundColor: colors.primary, borderRadius: borderRadius.md }]}
        >
          <Ionicons name="bag-handle" size={20} color={colors.onPrimary} style={{ marginLeft: spacing.sm }} />
          <AppText variant="button" style={{ color: colors.onPrimary, fontWeight: '700' }}>
            افزودن به سبد خرید
          </AppText>
        </TouchableOpacity>
      </View>
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
    zIndex: 100,
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
  imageGalleryBackground: {
    width: width,
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  transparentSpacer: {
    height: IMAGE_HEIGHT - 20,
    backgroundColor: 'transparent',
  },
  contentCard: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  sectionInfo: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  brandTag: {
    fontWeight: '700',
    marginBottom: 4,
  },
  productTitle: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dotSpacer: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 12,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 24,
  },
  compatibilityHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  compatibilityText: {
    textAlign: 'right',
    flex: 1,
    lineHeight: 20,
  },
  compatibilityLink: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  specsSection: {
    marginBottom: 24,
  },
  sectionHeading: {
    textAlign: 'right',
    fontWeight: '700',
    marginBottom: 12,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  specVal: {
    fontFamily: 'IRANYekanXFaNum-Bold',
  },
  overviewSection: {
    marginBottom: 24,
  },
  overviewText: {
    textAlign: 'right',
    lineHeight: 24,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderTopWidth: 1,
    elevation: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    zIndex: 110,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  totalPriceLabel: {
    textAlign: 'left',
  },
  totalPriceText: {
    fontFamily: 'IRANYekanXFaNum-Bold',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'left',
  },
  addToCartBtn: {
    height: 48,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});