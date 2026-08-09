// src/features/catalog/screens/ServiceReportScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

const ServiceReportScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/orders"); // بازگشت ایمن به سوابق سفارشات
    }
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی گزارش فنی */}
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
            گزارش فنی و فاکتور خدمات
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
            paddingBottom: 100 + insets.bottom, // ممانعت از تداخل با دکمه فیکس دانلود پایین صفحه
          },
        ]}
      >
        {/* ۱. کادر متادیتای کار (شناسه کار، وضعیت و تاریخ به شمسی) */}
        <View
          style={[
            styles.metaCard,
            {
              backgroundColor: colors.surfaceDim,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <View style={styles.metaRow}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderRadius: borderRadius.sm,
                },
              ]}
            >
              <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                انجام شده
              </AppText>
            </View>
            <AppText
              variant="h2"
              style={{
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Bold",
              }}
            >
              #SRV-۹۰۱۲۲
            </AppText>
          </View>

          <View style={styles.addressRow}>
            <AppText variant="body" color="muted" style={styles.addressText}>
              مجتمع مسکونی نگین، آسانسور بلوک B
            </AppText>
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.textSecondary}
              style={{ marginLeft: 6 }}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* فواصل و مقادیر کارکرد فنی به صورت کاملاً RTL */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText variant="labelSm" color="muted">
                مدت زمان تعمیر
              </AppText>
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  marginTop: 4,
                  fontFamily: "IRANYekanXFaNum-Bold",
                }}
              >
                ۱ ساعت و ۲۴ دقیقه
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText variant="labelSm" color="muted">
                تاریخ بازدید
              </AppText>
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  marginTop: 4,
                  fontFamily: "IRANYekanXFaNum-Regular",
                }}
              >
                ۲۱ مهر ۱۴۰۳
              </AppText>
            </View>
          </View>
        </View>

        {/* ۲. کارت اطلاعات تکنسین مجاز اعزام‌شده */}
        <View style={[styles.techRow, { borderBottomColor: colors.border }]}>
          <View
            style={[
              styles.ratingBadge,
              {
                backgroundColor: "rgba(217, 119, 6, 0.1)",
                borderColor: "rgba(217, 119, 6, 0.2)",
                borderRadius: borderRadius.full,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color: colors.secondary,
                fontFamily: "IRANYekanXFaNum-Bold",
                marginRight: 4,
              }}
            >
              ۵.۰
            </AppText>
            <Ionicons name="star" size={14} color={colors.secondary} />
          </View>

          <View style={styles.techInfo}>
            <AppText variant="h2" style={{ color: colors.textPrimary }}>
              مهندس مهدی احمدی
            </AppText>
            <AppText variant="body" color="muted">
              تکنسین ارشد تاییدشده ایکس الوتور
            </AppText>
          </View>

          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJCn6gyraLZdkl3UQudkwu8PjFxfx79ywhmeW5JhEojjesd8zH7E81heft13d9Dl41pQu1sBAYgVLWu85nJhuxX_WIIU55n3-O0KG58gUub8TlPAHm7S8nhCxK6W-I70JL4EMNw973J5iriC0Uo3XaQR4c00KWtcK4wqdh9ZDf4nDWsCBXp7V1641Z_c5jjszYZvUbb15yQqn23o-ctF3vKhJHQKt643Zq6iNf1PuhQXvfZ0K7_HDfbQ",
            }}
            style={[styles.techAvatar, { borderColor: colors.border }]}
          />
        </View>

        {/* ۳. لیست کارهای انجام شده در بازدید فنی */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            گزارش خدمات انجام‌شده
          </AppText>

          <View
            style={[
              styles.checklistCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            {[
              "سیم‌کشی مجدد رله‌های سنسور آهنربایی درب کابین",
              "تنظیم و کالیبراسیون سرعت بسته‌شدن موتور درب طبقات",
              "هم‌سطح‌سازی و تراز سنسورهای مگنت طبقه چهارم",
              "انجام تست بارگیری استاندارد کابین آسانسور پس از تعمیرات",
            ].map((item, index, arr) => {
              const isLast = index === arr.length - 1;
              return (
                <View
                  key={index}
                  style={[
                    styles.checkRow,
                    !isLast && {
                      borderBottomColor: colors.border,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <AppText
                    variant="body"
                    color="muted"
                    style={styles.checkText}
                  >
                    {item}
                  </AppText>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#22C55E"
                    style={{ marginLeft: 12 }}
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* ۴. جدول قطعات تعویض شده به صورت RTL */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            قطعات تعویض‌شده در پروژه
          </AppText>

          <View
            style={[
              styles.tableCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            {/* سربرگ جدول */}
            <View
              style={[
                styles.tableHeader,
                {
                  backgroundColor: colors.surfaceDim,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <AppText
                variant="labelSm"
                color="muted"
                style={{ flex: 1, textAlign: "left" }}
              >
                قیمت
              </AppText>
              <AppText
                variant="labelSm"
                color="muted"
                style={{ width: 50, textAlign: "center" }}
              >
                تعداد
              </AppText>
              <AppText
                variant="labelSm"
                color="muted"
                style={{ flex: 2, textAlign: "right" }}
              >
                نام قطعه یدکی
              </AppText>
            </View>

            {/* سطر اول جدول */}
            <View
              style={[styles.tableRow, { borderBottomColor: colors.border }]}
            >
              <AppText
                variant="button"
                style={[styles.tablePrice, { color: colors.textPrimary }]}
              >
                ۴۵,۰۰۰ تومان
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={{
                  width: 50,
                  textAlign: "center",
                  fontFamily: "IRANYekanXFaNum-Regular",
                }}
              >
                ۱
              </AppText>
              <View style={styles.tableNameCol}>
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  سوئیچ مگنت درب طبقات
                </AppText>
                <AppText
                  variant="labelSm"
                  style={{ color: "#22C55E", marginTop: 2 }}
                >
                  دارای ۱۲ ماه گارانتی طلایی
                </AppText>
              </View>
            </View>

            {/* سطر دوم جدول */}
            <View style={styles.tableRow}>
              <AppText
                variant="button"
                style={[styles.tablePrice, { color: colors.textPrimary }]}
              >
                ۶۰,۰۰۰ تومان
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={{
                  width: 50,
                  textAlign: "center",
                  fontFamily: "IRANYekanXFaNum-Regular",
                }}
              >
                ۲
              </AppText>
              <View style={styles.tableNameCol}>
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  رله کنترل فیندر ۲۴ ولت
                </AppText>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.textSecondary, marginTop: 2 }}
                >
                  دارای ۶ ماه گارانتی شرکتی
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* ۵. بخش مستندات تصویری قطعات سوخته و نصب‌شده */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            مستندات تصویری گزارش فنی
          </AppText>

          <View style={styles.evidenceGrid}>
            {/* تصویر اول: قطعه فرسوده */}
            <View style={styles.evidenceItem}>
              <View
                style={[
                  styles.evidenceImageWrapper,
                  { borderColor: colors.border, borderRadius: borderRadius.lg },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW_H9GHHMlt3dp9uVnmvYGIF5kWX3MPeZbRw9dwHmecepx7618nzGDxIrTFQDnP4wV8CKkyrvr5z4EG21BvSatnUOT4xsJR3BJG5d5-WfUQ4p7de6rCy4qKls3I3HsdzrKFWvDcoWCxutZ5iQNwa8-DepHRmGKFoOV3BpNCc1ahUhEXd2hiuAYR7FNe26BVR4UU4KF7svjWxdtch-PKNvsiwrGWrVxevR3tLCkMvav35MXRErE-4AFBg",
                  }}
                  style={styles.evidenceImage}
                />
              </View>
              <AppText
                variant="labelSm"
                color="muted"
                style={styles.evidenceLabel}
              >
                قطعه فرسوده تعویض‌شده
              </AppText>
            </View>

            {/* تصویر دوم: قطعه نو */}
            <View style={styles.evidenceItem}>
              <View
                style={[
                  styles.evidenceImageWrapper,
                  { borderColor: colors.border, borderRadius: borderRadius.lg },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida/AP1WRLtHw2q1CzO8TYgI8rV7dsNwJMDteLZpfOH5czfHjZfvHwyqMmZn3PepSb38FFcM89SYxrPZWm3gqkxOUj7wQcYkaQuni5pJEw4KbV3U3SV3jLx76XmoaD2VrGiLl1XpJOktCh0Hi2pWmafvKsxw3auED0sEZUsnAELIo5Id38_nUcwyeSybdZqHhgnzMo_09NIlB_t9s7SJ0I3Ai9DAV86SkxeDEjtm22cxx1GF38yePQ_RVkDdtttp-5ie",
                  }}
                  style={styles.evidenceImage}
                />
              </View>
              <AppText
                variant="labelSm"
                color="muted"
                style={styles.evidenceLabel}
              >
                قطعه جدید نصب‌شده
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ۶. نوار چسبناک پایینی جهت دانلود PDF فاکتور با رنگ ملایم */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 64 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.submitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.md },
          ]}
        >
          <Ionicons
            name="download-outline"
            size={18}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            دانلود فاکتور و گزارش رسمی PDF
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// خروجی پیش‌فرض بومی برای ثبات ۱۰۰٪ در ساخت ویندوز و اندروید
export default ServiceReportScreen;

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
  metaCard: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addressRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  addressText: {
    textAlign: "right",
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    alignItems: "flex-end",
  },
  techRow: {
    flexDirection: "row", // عکس تکنسین در راست، بقیه چپ برای RTL
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  techInfo: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
  },
  techAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 12,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  checklistCard: {
    borderWidth: 1,
    padding: 16,
  },
  checkRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
  },
  checkText: {
    textAlign: "right",
    flex: 1,
  },
  tableCard: {
    borderWidth: 1,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
  },
  tableNameCol: {
    flex: 2,
    alignItems: "flex-end",
  },
  tablePrice: {
    flex: 1,
    textAlign: "left",
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  evidenceGrid: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
  },
  evidenceItem: {
    flex: 1,
    alignItems: "center",
  },
  evidenceImageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    overflow: "hidden",
  },
  evidenceImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  evidenceLabel: {
    fontSize: 10,
    marginTop: 8,
    textAlign: "center",
  },
  bottomActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    zIndex: 100,
  },
  submitBtn: {
    height: 48,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        maxWidth: 440,
      },
    }),
  },
});
