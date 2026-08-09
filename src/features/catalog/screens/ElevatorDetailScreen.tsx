// src/features/catalog/screens/ElevatorDetailScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ElevatorDetailScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت پویای فاصله دکمه‌های پایینی موبایل

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/my-elevators"); // بازگشت به لیست آسانسورها
    }
  };

  const handleUrgentRepair = () => {
    // ناوبری به فرم درخواست اعزام تکنسین اضطراری
    router.push("/request-service");
  };

  const handleMonthlyService = () => {
    // ناوبری به پلان‌های سرویس دوره‌ای سالانه
    router.push("/maintenance");
  };

  const handleViewInvoice = () => {
    // ناوبری به فاکتور تفصیلی و گزارش کالیبراسیون مأموریت اخیر
    router.push("/audit");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی با ناوبری و دکمه‌های کنترلی اشتراک‌گذاری */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
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
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            شناسنامه فنی آسانسور
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.headerButton, { marginLeft: spacing.xs }]}
          >
            <Ionicons
              name="share-social-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 100 + insets.bottom,
          },
        ]}
      >
        {/* ۱. کارت وضعیت کلی آسانسور مسکونی ونک */}
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            {/* نشان فعال و تایید شده استاندارد */}
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderColor: "rgba(34, 197, 94, 0.2)",
                },
              ]}
            >
              <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                فعال و ایمن
              </AppText>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color="#22C55E"
                style={{ marginLeft: 6 }}
              />
            </View>

            <View style={styles.metaInfo}>
              <AppText
                variant="h1"
                style={[styles.elevatorName, { color: colors.textPrimary }]}
              >
                آپارتمان مسکونی - آسانسور اصلی
              </AppText>
              <View style={styles.addressRow}>
                <AppText
                  variant="body"
                  color="muted"
                  style={styles.addressText}
                >
                  تهران، خیابان ونک، پلاک ۴۵، مجتمع نگین
                </AppText>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={colors.textSecondary}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* ۲. دکمه‌های دوقلوی اقدامات فوری متصل شده به ناوبری‌های مربوطه */}
        <View style={[styles.actionRow, { gap: spacing.md }]}>
          {/* دکمه رزرو سرویس ماهیانه */}
          <TouchableOpacity
            onPress={handleMonthlyService}
            activeOpacity={0.8}
            style={[
              styles.secondaryActionBtn,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.md,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.textPrimary}
              style={{ marginLeft: 8 }}
            />
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              رزرو سرویس ماهیانه
            </AppText>
          </TouchableOpacity>

          {/* دکمه درخواست تعمیر اضطراری */}
          <TouchableOpacity
            onPress={handleUrgentRepair}
            activeOpacity={0.8}
            style={[
              styles.primaryActionBtn,
              {
                backgroundColor: colors.secondary,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <Ionicons
              name="alert-circle"
              size={18}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
            <AppText variant="button" style={{ color: "#FFFFFF" }}>
              تعمیر اضطراری آسانسور
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ۳. جدول فلت مشخصات فنی سیستم (Technical Passport) */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            مشخصات پاسپورت فنی آسانسور
          </AppText>

          <View
            style={[
              styles.specsTable,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View
              style={[
                styles.tableRow,
                { borderBottomColor: colors.surfaceDim },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                کششی سیم‌بکسلی (گیربکس)
              </AppText>
              <AppText variant="body" color="muted">
                نوع سیستم محرکه
              </AppText>
            </View>
            <View
              style={[
                styles.tableRow,
                { borderBottomColor: colors.surfaceDim },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                سیکور ایتالیا (Sicor)
              </AppText>
              <AppText variant="body" color="muted">
                برند موتور کششی
              </AppText>
            </View>
            <View
              style={[
                styles.tableRow,
                { borderBottomColor: colors.surfaceDim },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                آرین سه فاز درایودار (VVVF)
              </AppText>
              <AppText variant="body" color="muted">
                برند تابلو فرمان
              </AppText>
            </View>
            <View
              style={[
                styles.tableRow,
                { borderBottomColor: colors.surfaceDim },
              ]}
            >
              <AppText
                variant="button"
                style={[styles.specVal, { color: colors.textPrimary }]}
              >
                ۱۳۹۸ (طول عمر: ۵ سال)
              </AppText>
              <AppText variant="body" color="muted">
                سال راه‌اندازی دستگاه
              </AppText>
            </View>
            <View style={styles.tableRow}>
              <AppText variant="button" style={{ color: "#22C55E" }}>
                دارای اعتبار تا ۲۴ آذر ۱۴۰۳
              </AppText>
              <AppText variant="body" color="muted">
                گواهی استاندارد سالانه
              </AppText>
            </View>
          </View>
        </View>

        {/* ۴. تایم‌لاین عمودی تاریخچه سرویس‌ها به صورت کاملاً RTL */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            تاریخچه ثبت سرویس و تعمیرات
          </AppText>

          <View
            style={[
              styles.trackerSection,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
              },
            ]}
          >
            <View style={styles.timelineContainer}>
              {/* گره اول: مأموریت اضطراری اخیر با اتصال به فاکتور بومی */}
              <View style={styles.timelineItem}>
                {/* خط عمودی تایم‌لاین در سمت راست */}
                <View
                  style={[
                    styles.timelineLine,
                    { backgroundColor: colors.border },
                  ]}
                />
                <View
                  style={[
                    styles.node,
                    { backgroundColor: "#10B981", borderColor: "#10B981" },
                  ]}
                >
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
                <View style={styles.timelineContent}>
                  <AppText
                    variant="button"
                    style={{ color: colors.textPrimary }}
                  >
                    ۲۱ مهر ۱۴۰۳ - رفع خطای تراز کابین (اضطراری)
                  </AppText>

                  <View style={styles.techRow}>
                    <AppText variant="labelSm" color="muted">
                      تکنسین: مهندس مهدی احمدی
                    </AppText>
                    <Ionicons
                      name="person-outline"
                      size={12}
                      color={colors.textSecondary}
                      style={{ marginLeft: 6 }}
                    />
                  </View>

                  <AppText
                    variant="body"
                    color="muted"
                    style={styles.overviewText}
                  >
                    سوئیچ مغناطیسی آسیب‌دیده طبقه چهارم با موفقیت تعویض شد.
                  </AppText>

                  {/* کلید اتصال به فاکتور گزارش فنی */}
                  <TouchableOpacity
                    onPress={handleViewInvoice}
                    activeOpacity={0.7}
                    style={styles.invoiceButton}
                  >
                    <AppText variant="labelSm" color="secondary">
                      مشاهده فاکتور و گزارش فنی کار
                    </AppText>
                    <Ionicons
                      name="document-text-outline"
                      size={14}
                      color={colors.secondary}
                      style={{ marginRight: 6 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* گره دوم: سرویس دوره‌ای گذشته */}
              <View style={[styles.timelineItem, { paddingBottom: 0 }]}>
                <View
                  style={[
                    styles.node,
                    { backgroundColor: "#10B981", borderColor: "#10B981" },
                  ]}
                >
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
                <View style={styles.timelineContent}>
                  <AppText
                    variant="button"
                    style={{ color: colors.textPrimary }}
                  >
                    ۱۰ شهریور ۱۴۰۳ - سرویس دوره‌ای منظم ماهانه
                  </AppText>

                  <View style={styles.techRow}>
                    <AppText variant="labelSm" color="muted">
                      تکنسین: جناب سعید کریمی
                    </AppText>
                    <Ionicons
                      name="person-outline"
                      size={12}
                      color={colors.textSecondary}
                      style={{ marginLeft: 6 }}
                    />
                  </View>

                  <AppText
                    variant="body"
                    color="muted"
                    style={styles.overviewText}
                  >
                    ریل‌های راهنما آچارکشی و روغن‌کاری شدند؛ ترمزهای اضطراری تست
                    گردیدند.
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ناوبری پایینی سراسری با تب فعال پروفایل */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default ElevatorDetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 16,
  },
  header: {
    height: 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusCard: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  statusBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  metaInfo: {
    alignItems: "flex-end",
    flex: 1,
    paddingLeft: 12,
  },
  elevatorName: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 4,
  },
  addressText: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: "row", // چیدمان متقارن افقی دو دکمه
    width: "100%",
    marginBottom: 12,
  },
  primaryActionBtn: {
    flex: 1.2,
    height: 48,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 12,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  specsTable: {
    borderWidth: 1,
    padding: 16,
  },
  tableRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  specVal: {
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  trackerSection: {
    borderWidth: 1,
    width: "100%",
  },
  timelineContainer: {
    width: "100%",
    paddingRight: 12,
  },
  timelineItem: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    paddingBottom: 24,
    position: "relative",
    width: "100%",
  },
  timelineLine: {
    position: "absolute",
    right: 11,
    top: 24,
    bottom: -8,
    width: 2,
    zIndex: 1,
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  timelineContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
  },
  techRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 4,
  },
  overviewText: {
    textAlign: "right",
    lineHeight: 20,
    fontSize: 13,
    marginTop: 8,
  },
  invoiceButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
