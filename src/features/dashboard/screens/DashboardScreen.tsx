// src/features/dashboard/screens/DashboardScreen.tsx

import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { AppHeader } from "@/src/components/layout/AppHeader";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export const DashboardScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <ScreenWrapper>
      {/* هدر سراسری مستقل */}
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }} // حاشیه پایینی برای اسکرول کامل و عدم تداخل با فوتر و نوار پایینی
      >
        {/* ۱. ابزارک خلاصه وضعیت آسانسورهای کاربر */}
        <View
          style={[
            styles.fleetStatusCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              marginHorizontal: spacing.lg,
              marginTop: spacing.lg,
            },
          ]}
        >
          <View style={styles.statusRow}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderRadius: borderRadius.sm,
                },
              ]}
            >
              <View style={[styles.dot, { backgroundColor: "#22C55E" }]} />
              <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                همه فعال و ایمن
              </AppText>
            </View>
            <AppText variant="h2" style={styles.statusTitle}>
              وضعیت آسانسورهای شما
            </AppText>
          </View>
          <AppText variant="body" color="muted" style={styles.statusSubtitle}>
            ساختمان نگین: ۳ آسانسور تحت پوشش بیمه و سرویس دوره‌ای منظم فعال
            هستند.
          </AppText>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.statusFooter}>
            <AppText variant="labelSm" color="muted">
              سرویس دوره‌ای بعدی: ۲۴ اسفند (۹ روز دیگر)
            </AppText>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.textSecondary}
            />
          </View>
        </View>

        {/* ۲. بخش هیرو (Hero Section) */}
        <View
          style={[
            styles.heroSection,
            { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
          ]}
        >
          <AppText variant="h1" style={styles.heroTitle}>
            مراقبت هوشمند از آسانسور و قطعات یدکی استاندارد
          </AppText>
          <AppText variant="body" color="muted" style={styles.heroSubtitle}>
            اعزام فوق‌سریع کارشناس فنی ۲۴ ساعته و تأمین بدون واسطه قطعات اصلی
            گواهی‌شده.
          </AppText>

          <View style={styles.heroActionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.emergencyButton,
                {
                  backgroundColor: colors.secondary,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <Ionicons
                name="alert-circle"
                size={20}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
              <AppText variant="button" style={{ color: "#FFFFFF" }}>
                درخواست اعزام فوری تکنسین
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.catalogButton,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={colors.textPrimary}
                style={{ marginLeft: 8 }}
              />
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                جستجوی قطعات یدکی
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۳. بخش خدمات ما با کادربندی‌های لوکس و ملایم */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.surfaceDim,
              paddingVertical: spacing.xl,
              paddingHorizontal: spacing.lg,
              borderColor: colors.border,
            },
          ]}
        >
          <AppText variant="h2" style={styles.sectionTitle}>
            خدمات نگهداری و اورهال ایکس الوتور
          </AppText>

          <View style={[styles.servicesStack, { gap: spacing.md }]}>
            <View
              style={[
                styles.serviceCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="calendar"
                  size={24}
                  color={colors.textPrimary}
                />
              </View>
              <AppText variant="h2" style={styles.serviceTitle}>
                سرویس و نگهداری سالانه
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={styles.serviceDescription}
              >
                بازدیدهای دوره‌ای منظم و مراقبت‌های پیشگیرانه جهت حفظ
                استانداردها و افزایش طول عمر قطعات.
              </AppText>
            </View>

            <View
              style={[
                styles.serviceCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons name="construct" size={24} color={colors.secondary} />
              </View>
              <AppText variant="h2" style={styles.serviceTitle}>
                تعمیرات فوق‌سریع شبانه‌روزی
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={styles.serviceDescription}
              >
                اعزام فوری تکنسین‌های تاییدشده در زمان وقوع خرابی‌های بحرانی و
                توقف آسانسور در هر ساعت از شبانه‌روز.
              </AppText>
            </View>

            <View
              style={[
                styles.serviceCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="trending-up"
                  size={24}
                  color={colors.textPrimary}
                />
              </View>
              <AppText variant="h2" style={styles.serviceTitle}>
                بازسازی و نوسازی (مدرن‌سازی)
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={styles.serviceDescription}
              >
                ارتقای کامل سیستم‌های قدیمی جهت بهبود کارایی، ارتقای ایمنی و
                نوسازی دکوراسیون داخلی کابین.
              </AppText>
            </View>
          </View>
        </View>

        {/* ۴. کاتالوگ چرخشی قطعات برجسته */}
        <View style={{ paddingVertical: spacing.xl }}>
          <View
            style={[styles.carouselHeader, { paddingHorizontal: spacing.lg }]}
          >
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
            contentContainerStyle={[
              styles.carouselScroll,
              { paddingHorizontal: spacing.lg },
            ]}
          >
            {/* قطعه ۱ */}
            <View
              style={[
                styles.partCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.partImageContainer,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLyPwVcCRRkqBx1sKo_5rvZKEbjyHucB_jlw-WtkCdhV_33MHNtukk0E7dtc8x-PDaVp4CGM93D1D0edg5mBcRAG3dosAn6K1vd2QpBgmmJzjwkierlt1XkpYxfMLzXh440p8lVdW29msBW4A7YdbktyuDlIBq2lfIFA1eiO2FQB0VZFKHGnEeRx_vtzd8ZSHvBKB9EHRm_Zb2D20rYUu_CqNnBB_iNqSDHpwutOjemExBBZn501kLNQ",
                  }}
                  style={styles.partImage}
                />
                <View style={styles.tagContainer}>
                  <AppText variant="labelSm" style={styles.tagText}>
                    Orona OEM
                  </AppText>
                </View>
              </View>
              <View style={styles.partInfo}>
                <AppText variant="h2" style={styles.partName}>
                  قفل درب آسانسور
                </AppText>
                <AppText variant="body" color="muted" style={styles.partDesc}>
                  مکانیزم تاییدشده قفل ایمنی درب کابین.
                </AppText>
                <TouchableOpacity
                  style={[
                    styles.priceButton,
                    {
                      borderColor: colors.border,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <AppText
                    variant="button"
                    style={{ color: colors.textPrimary }}
                  >
                    استعلام قیمت
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>

            {/* قطعه ۲ */}
            <View
              style={[
                styles.partCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.partImageContainer,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPqlTIVIYkBFuSel_rgxQ41WAUlTSkTyxA6joneyzT89nf0J6vcoIdNHRwfFAUYP8go1zP8TVEH2BTYEU-Ttt5zVECDDaXsn4degBLelXw8ZoIQHV-8YrD-r-tkKDHmUgBZVnXzwHieHAIlm4kMsqDEoPPFj23Cs2kjhtzJPK51kDjwz69e2pCFIj9G-wlxjLmeMXEfvsGW37maAxbNa1xq2Z3Di0gUU0h08_WG7ftOhwwnToAUynVTQ",
                  }}
                  style={styles.partImage}
                />
                <View style={styles.tagContainer}>
                  <AppText variant="labelSm" style={styles.tagText}>
                    Universal
                  </AppText>
                </View>
              </View>
              <View style={styles.partInfo}>
                <AppText variant="h2" style={styles.partName}>
                  سیم بکسل کششی فولادی
                </AppText>
                <AppText variant="body" color="muted" style={styles.partDesc}>
                  کابل‌های بافته‌شده با هسته فولادی مستحکم.
                </AppText>
                <TouchableOpacity
                  style={[
                    styles.priceButton,
                    {
                      borderColor: colors.border,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <AppText
                    variant="button"
                    style={{ color: colors.textPrimary }}
                  >
                    استعلام قیمت
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ۵. کامپوننت بیزینسی جدید اول: بنر تخمین هوشمند هزینه بازسازی آسانسور (جذب مشتری) */}
        <View
          style={[
            styles.modernizationBanner,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.lg,
              marginHorizontal: spacing.lg,
              padding: spacing.lg,
            },
          ]}
        >
          <View style={styles.bannerTextContent}>
            <AppText
              variant="h2"
              style={{
                color: colors.onPrimary,
                textAlign: "right",
                marginBottom: 6,
              }}
            >
              آیا آسانسور شما قدیمی شده است؟
            </AppText>
            <AppText
              variant="body"
              style={{
                color: colors.onPrimary,
                opacity: 0.8,
                textAlign: "right",
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              با سیستم تخمین آنلاین ایکس الوتور، هزینه بازسازی، تزئینات
              دکوراسیون و ارتقای ایمنی آسانسور خود را در کمتر از ۲ دقیقه برآورد
              کنید.
            </AppText>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.bannerButton,
              {
                backgroundColor: colors.secondary,
                borderRadius: borderRadius.md,
                marginTop: spacing.md,
              },
            ]}
          >
            <AppText variant="button" style={{ color: "#FFFFFF" }}>
              محاسبه آنلاین هزینه بازسازی
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ۶. کامپوننت بیزینسی جدید دوم: مقالات آموزشی و هاب ایمنی آسانسور (افزایش اعتماد کاربر) */}
        <View style={{ paddingVertical: spacing.xl }}>
          <View
            style={[styles.carouselHeader, { paddingHorizontal: spacing.lg }]}
          >
            <AppText variant="h2" style={styles.carouselTitle}>
              آموزش و نکات ایمنی آسانسور
            </AppText>
            <TouchableOpacity>
              <AppText variant="labelSm" color="secondary">
                همه مقالات
              </AppText>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.articlesContainer,
              { paddingHorizontal: spacing.lg, gap: spacing.md },
            ]}
          >
            {/* مقاله ۱ */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.articleRow,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <View style={styles.articleTextContainer}>
                <AppText variant="labelSm" color="secondary">
                  مراقبت و نگهداری
                </AppText>
                <AppText
                  variant="h2"
                  style={[
                    styles.articleTitle,
                    { color: colors.textPrimary, fontSize: 14 },
                  ]}
                >
                  ۵ نشانه کلیدی که زنگ خطری برای تعویض سیم‌بکسل آسانسور است
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  numberOfLines={1}
                  style={{ fontSize: 12, textAlign: "right" }}
                >
                  بررسی فنی علائم سایش و خوردگی کابل‌های کششی آسانسور...
                </AppText>
              </View>
              <View style={styles.articleIconCircle}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
            </TouchableOpacity>

            {/* مقاله ۲ */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.articleRow,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <View style={styles.articleTextContainer}>
                <AppText variant="labelSm" color="secondary">
                  استانداردها
                </AppText>
                <AppText
                  variant="h2"
                  style={[
                    styles.articleTitle,
                    { color: colors.textPrimary, fontSize: 14 },
                  ]}
                >
                  مقررات جدید آتش‌نشانی برای دریافت پایان‌کار آسانسور سال ۱۴۰۵
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  numberOfLines={1}
                  style={{ fontSize: 12, textAlign: "right" }}
                >
                  جدیدترین تغییرات در قوانین درب‌های لولایی و اتوماتیک
                  اضطراری...
                </AppText>
              </View>
              <View style={styles.articleIconCircle}>
                <Ionicons
                  name="shield-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۷. نشان‌های اعتماد و اصالت */}
        <View
          style={[
            styles.trustSection,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              paddingHorizontal: spacing.lg,
            },
          ]}
        >
          <View style={styles.trustBadge}>
            <Ionicons
              name="checkmark-seal-outline"
              size={28}
              color={colors.textPrimary}
              style={{ marginLeft: spacing.sm }}
            />
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              تکنسین‌های مجرب و تایید‌شده
            </AppText>
          </View>
          <View
            style={[
              styles.trustBadge,
              {
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color={colors.textPrimary}
              style={{ marginLeft: spacing.sm }}
            />
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              تضمین ۱۰۰٪ اصالت قطعات یدکی
            </AppText>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons
              name="receipt-outline"
              size={28}
              color={colors.textPrimary}
              style={{ marginLeft: spacing.sm }}
            />
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              قیمت‌گذاری شفاف و تعرفه مصوب
            </AppText>
          </View>
        </View>

        {/* ۸. طراحی فوتر لوکس و پرستیژ برند (Footer Component) */}
        <View
          style={[
            styles.footerContainer,
            {
              backgroundColor: colors.surfaceDim,
              borderTopColor: colors.border,
            },
          ]}
        >
          <View style={styles.footerBrandRow}>
            <AppText
              variant="h1"
              style={[styles.footerBrandText, { color: colors.textPrimary }]}
            >
              ایکس الوتور
            </AppText>
            <Ionicons
              name="construct-outline"
              size={24}
              color={colors.secondary}
            />
          </View>

          <AppText
            variant="body"
            color="muted"
            style={styles.footerDescription}
          >
            پلتفرم تخصصی پایش، سرویس نگهداری و تأمین بدون واسطه قطعات یدکی انواع
            آسانسورهای کششی و هیدرولیک در سراسر کشور.
          </AppText>

          {/* لینک‌های راهنما به سبک وب‌اپلیکیشن‌های برتر */}
          <View style={styles.footerLinksGrid}>
            <TouchableOpacity>
              <AppText variant="labelSm" color="muted">
                قوانین و مقررات
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity>
              <AppText variant="labelSm" color="muted">
                سوالات متداول
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity>
              <AppText variant="labelSm" color="muted">
                درخواست پشتیبانی
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity>
              <AppText variant="labelSm" color="muted">
                کاتالوگ برندها
              </AppText>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.footerDivider, { backgroundColor: colors.border }]}
          />

          {/* کپی‌رایت رسمی */}
          <AppText variant="labelSm" color="muted" style={styles.copyrightText}>
            © ۱۴۰۵ تمامی حقوق مادی و معنوی متعلق به ایکس الوتور می‌باشد.
          </AppText>
        </View>
      </ScrollView>

      {/* ناوبری پایینی موبایل */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  fleetStatusCard: {
    borderWidth: 1,
    padding: 16,
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusTitle: {
    // حذف اورراید وزن قلم بومی اندروید
  },
  badge: {
    flexDirection: "row-reverse",
    alignItems: "center",
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
    textAlign: "right",
    lineHeight: 20,
    fontSize: 13,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 12,
  },
  statusFooter: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heroSection: {
    width: "100%",
  },
  heroTitle: {
    textAlign: "right",
    fontSize: 26,
    // حذف اورراید وزن قلم بومی اندروید
    lineHeight: 36,
    marginBottom: 12,
  },
  heroSubtitle: {
    textAlign: "right",
    lineHeight: 24,
    marginBottom: 24,
  },
  heroActionContainer: {
    width: "100%",
    gap: 12,
  },
  emergencyButton: {
    height: 48,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  catalogButton: {
    height: 48,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  section: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    textAlign: "right",
    marginBottom: 16,
  },
  servicesStack: {
    width: "100%",
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    alignSelf: "flex-end",
  },
  serviceTitle: {
    textAlign: "right",
    marginBottom: 8,
  },
  serviceDescription: {
    textAlign: "right",
    lineHeight: 22,
  },
  carouselHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  carouselTitle: {
    // حذف اورراید وزن قلم بومی اندروید
  },
  carouselScroll: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  partCard: {
    width: 280,
    borderWidth: 1,
    overflow: "hidden",
  },
  partImageContainer: {
    height: 180,
    width: "100%",
    position: "relative",
    borderBottomWidth: 1,
  },
  partImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tagContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  partInfo: {
    padding: 16,
  },
  partName: {
    textAlign: "right",
    marginBottom: 4,
  },
  partDesc: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  priceButton: {
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modernizationBanner: {
    paddingVertical: 24,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bannerTextContent: {
    width: "100%",
  },
  bannerButton: {
    height: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  articlesContainer: {
    width: "100%",
  },
  articleRow: {
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  articleTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  articleTitle: {
    textAlign: "right",

    lineHeight: 20,
    marginTop: 4,
    marginBottom: 6,
  },
  articleIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(15, 23, 42, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  trustSection: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 24,
  },
  trustBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
  },
  footerContainer: {
    borderTopWidth: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "flex-end",
  },
  footerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  footerBrandText: {
    // حذف اورراید وزن قلم بومی اندروید
    marginRight: 8,
  },
  footerDescription: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 24,
  },
  footerLinksGrid: {
    width: "100%",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "flex-start",
    marginBottom: 24,
  },
  footerDivider: {
    height: 1,
    width: "100%",
    marginBottom: 16,
  },
  copyrightText: {
    textAlign: "right",
    fontSize: 10,
    width: "100%",
  },
  brandText: {
    // حذف اورراید وزن قلم بومی اندروید
    marginRight: 6,
  },
});
