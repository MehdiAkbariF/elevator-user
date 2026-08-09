// src/features/catalog/screens/OrdersScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const YourOrdersScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const [activeSegment, setActiveSegment] = useState<"services" | "purchases">(
    "services",
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  };

  const handleTrackOnMap = () => {
    // ناوبری هوشمند به صفحه ردیابی زنده تکنسین روی نقشه
    router.push("/tracking");
  };

  const handleRateTech = () => {
    // ناوبری بومی به صفحه ثبت بازخورد تکنسین
    router.push("/feedback");
  };

  const handleTrackDelivery = () => {
    // ناوبری بومی به صفحه رهگیری سفارش قطعات
    router.push("/track-order");
  };

  const handleViewInvoice = () => {
    // ناوبری به گزارش فنی و فاکتور خدمات
    router.push("/audit");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی */}
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
            سفارشات و خدمات من
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
            paddingBottom: 100 + insets.bottom,
          },
        ]}
      >
        {/* ۱. سوئیچر سگمنتد کنترل برای تفکیک خدمات فنی و خرید قطعات */}
        <View
          style={[
            styles.segmentContainer,
            {
              backgroundColor: colors.surfaceDim,
              borderColor: colors.border,
              borderRadius: borderRadius.md,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setActiveSegment("purchases")}
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              activeSegment === "purchases" && {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color:
                  activeSegment === "purchases"
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              خرید قطعات
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveSegment("services")}
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              activeSegment === "services" && {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color:
                  activeSegment === "services"
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              خدمات فنی آسانسور
            </AppText>
          </TouchableOpacity>
        </View>

        {/* نمایش پویای محتوا بر اساس زبانه فعال */}
        {activeSegment === "services" ? (
          <View style={[styles.contentStack, { gap: spacing.lg }]}>
            {/* الف) کارت فعال اعزام اضطراری تکنسین (Tech in Transit) */}
            <View
              style={[
                styles.activeCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              {/* خط بردر عمقی نارنجی رنگ در سمت راست به عنوان نشانه وضعیت اضطراری */}
              <View
                style={[
                  styles.accentBorder,
                  { backgroundColor: colors.secondary },
                ]}
              />

              <View style={styles.cardPadding}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.metaInfo}>
                    <View style={styles.titleRow}>
                      <AppText
                        variant="h2"
                        style={{ color: colors.textPrimary }}
                      >
                        تعمیرات اضطراری آسانسور
                      </AppText>
                      <Ionicons
                        name="alert-circle"
                        size={18}
                        color={colors.error}
                        style={{ marginLeft: 6 }}
                      />
                    </View>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.codeText}
                    >
                      کد پیگیری: #SRV-901
                    </AppText>
                  </View>

                  {/* نشان وضعیت متحرک در راه بودن تکنسین */}
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: "rgba(217, 119, 6, 0.1)",
                        borderColor: "rgba(217, 119, 6, 0.2)",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: colors.secondary },
                      ]}
                    />
                    <AppText
                      variant="labelSm"
                      style={{ color: colors.secondary }}
                    >
                      تکنسین در مسیر
                    </AppText>
                  </View>
                </View>

                {/* آدرس ساختمان */}
                <View style={styles.addressRow}>
                  <AppText
                    variant="body"
                    color="primary"
                    style={styles.addressText}
                  >
                    نشانی: خیابان آرش غربی، پلاک ۱۲، ساختمان پزشکان آرش
                  </AppText>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={colors.textSecondary}
                    style={{ marginLeft: 8 }}
                  />
                </View>

                {/* دکمه‌های اکشن ردیابی و تماس */}
                <View style={[styles.actionRow, { gap: spacing.md }]}>
                  {/* دکمه تماس با تکنسین متصل شده به فاکتور بومی */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.secondaryActionBtn,
                      {
                        borderColor: colors.border,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                    onPress={handleViewInvoice}
                  >
                    <Ionicons
                      name="call-outline"
                      size={18}
                      color={colors.textPrimary}
                      style={{ marginLeft: 8 }}
                    />
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      تماس با تکنسین
                    </AppText>
                  </TouchableOpacity>

                  {/* دکمه ردیابی زنده روی نقشه */}
                  <TouchableOpacity
                    onPress={handleTrackOnMap}
                    activeOpacity={0.8}
                    style={[
                      styles.primaryActionBtn,
                      {
                        backgroundColor: colors.primary,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                  >
                    <Ionicons
                      name="map-outline"
                      size={18}
                      color={colors.onPrimary}
                      style={{ marginLeft: 8 }}
                    />
                    <AppText
                      variant="button"
                      style={{ color: colors.onPrimary }}
                    >
                      ردیابی روی نقشه
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ب) آرشیو سوابق گذشته سرویس‌ها (Past History) */}
            <View style={styles.historySection}>
              <AppText
                variant="body"
                color="muted"
                style={styles.sectionHeading}
              >
                سوابق پیشین خدمات فنی
              </AppText>

              <View
                style={[
                  styles.pastCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                  },
                ]}
              >
                <View
                  style={[
                    styles.pastHeaderRow,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <AppText
                    variant="h2"
                    style={[
                      styles.priceText,
                      {
                        color: colors.textPrimary,
                        fontFamily: "IRANYekanXFaNum-Bold",
                      },
                    ]}
                  >
                    ۴,۰۰۰,۰۰۰ تومان
                  </AppText>
                  <View style={styles.pastMeta}>
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      سرویس دوره‌ای منظم ماهانه
                    </AppText>
                    <View style={styles.dateRow}>
                      <AppText
                        variant="labelSm"
                        color="muted"
                        style={{ fontFamily: "IRANYekanXFaNum-Regular" }}
                      >
                        ۲۲ شهریور ۱۴۰۳
                      </AppText>
                      <Ionicons
                        name="calendar-outline"
                        size={12}
                        color={colors.textSecondary}
                        style={{ marginLeft: 4 }}
                      />
                    </View>
                  </View>
                </View>

                {/* اطلاعات تفصیلی فاکتور */}
                <View
                  style={[
                    styles.detailTable,
                    {
                      backgroundColor: colors.surfaceDim,
                      borderRadius: borderRadius.md,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.tableRow}>
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      آسانسور کلینیک سلامت
                    </AppText>
                    <AppText variant="body" color="muted">
                      موقعیت دستگاه
                    </AppText>
                  </View>
                  <View
                    style={[
                      styles.tableRow,
                      {
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      Saeed Karimi
                    </AppText>
                    <AppText variant="body" color="muted">
                      تکنسین اعزامی
                    </AppText>
                  </View>
                  <View style={styles.tableRow}>
                    <AppText
                      variant="button"
                      style={{
                        color: colors.textPrimary,
                        fontFamily: "IRANYekanXFaNum-Bold",
                      }}
                    >
                      ۴,۰۰۰,۰۰۰ تومان
                    </AppText>
                    <AppText variant="body" color="muted">
                      مبلغ کل فاکتور
                    </AppText>
                  </View>
                </View>

                {/* کلیدهای تعاملی فاکتور، امتیاز و رزرو مجدد */}
                <View style={[styles.pastActionsRow, { gap: spacing.xs }]}>
                  <TouchableOpacity
                    onPress={handleViewInvoice} // ناوبری به گزارش فنی و فاکتور
                    activeOpacity={0.8}
                    style={[
                      styles.pastBtn,
                      {
                        borderColor: colors.border,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                  >
                    <AppText variant="labelSm" color="primary">
                      دانلود فاکتور
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleRateTech} // ناوبری به ثبت امتیاز تکنسین
                    activeOpacity={0.8}
                    style={[
                      styles.pastBtn,
                      {
                        borderColor: colors.border,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                  >
                    <AppText variant="labelSm" color="primary">
                      امتیاز به تکنسین
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.pastBtn,
                      {
                        borderColor: colors.border,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                  >
                    <AppText variant="labelSm" color="primary">
                      سفارش مجدد
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* زبانه خرید قطعات (Active Parts Order) */
          <View style={[styles.contentStack, { gap: spacing.lg }]}>
            <View
              style={[
                styles.activeCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[styles.accentBorder, { backgroundColor: "#3B82F6" }]}
              />

              <View style={styles.cardPadding}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.metaInfo}>
                    <AppText variant="h2" style={{ color: colors.textPrimary }}>
                      خرید قطعه یدکی
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.codeText}
                    >
                      شماره سفارش: #ORD-4502
                    </AppText>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderColor: "rgba(59, 130, 246, 0.2)",
                      },
                    ]}
                  >
                    <Ionicons
                      name="bus-outline"
                      size={14}
                      color="#3B82F6"
                      style={{ marginLeft: 6 }}
                    />
                    <AppText variant="labelSm" style={{ color: "#3B82F6" }}>
                      ارسال با باربری
                    </AppText>
                  </View>
                </View>

                <View style={styles.addressRow}>
                  <AppText
                    variant="body"
                    color="primary"
                    style={styles.addressText}
                  >
                    ۱ عدد موتور گیرلس SG10، ۲ عدد قفل درب
                  </AppText>
                  <Ionicons
                    name="cube-outline"
                    size={18}
                    color={colors.textSecondary}
                    style={{ marginLeft: 8 }}
                  />
                </View>

                <View style={[styles.actionRow, { gap: spacing.md }]}>
                  {/* دکمه تماس با پشتیبانی */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.secondaryActionBtn,
                      {
                        borderColor: colors.border,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                  >
                    <Ionicons
                      name="headset-outline"
                      size={18}
                      color={colors.textPrimary}
                      style={{ marginLeft: 8 }}
                    />
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      تماس با پشتیبانی
                    </AppText>
                  </TouchableOpacity>

                  {/* دکمه رهگیری مرسوله */}
                  <TouchableOpacity
                    onPress={handleTrackDelivery} // ناوبری به صفحه پیگیری سفارش کالا
                    activeOpacity={0.8}
                    style={[
                      styles.primaryActionBtn,
                      {
                        backgroundColor: colors.primary,
                        borderRadius: borderRadius.md,
                      },
                    ]}
                  >
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color={colors.onPrimary}
                      style={{ marginLeft: 8 }}
                    />
                    <AppText
                      variant="button"
                      style={{ color: colors.onPrimary }}
                    >
                      رهگیری مرسوله
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ناوبری پایینی سراسری با زبانه فعال خانه */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض جهت تضمین کامل بیلد پروژه
export default YourOrdersScreen;

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
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  segmentContainer: {
    flexDirection: "row",
    padding: 4,
    width: "100%",
    borderWidth: 1,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  contentStack: {
    width: "100%",
  },
  activeCard: {
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },
  accentBorder: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardPadding: {
    padding: 16,
    paddingRight: 20,
  },
  cardHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 16,
  },
  metaInfo: {
    alignItems: "flex-end",
    flex: 1,
  },
  titleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  codeText: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  statusBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 6,
  },
  addressRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  addressText: {
    textAlign: "right",
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    width: "100%",
  },
  primaryActionBtn: {
    flex: 1.2,
    height: 44,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  historySection: {
    width: "100%",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 12,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  pastCard: {
    borderWidth: 1,
    padding: 16,
  },
  pastHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 16,
  },
  pastMeta: {
    alignItems: "flex-end",
  },
  dateRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 4,
  },
  detailTable: {
    borderWidth: 1,
    padding: 12,
    width: "100%",
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  pastActionsRow: {
    flexDirection: "row",
    width: "100%",
  },
  pastBtn: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
