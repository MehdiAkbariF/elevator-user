// src/features/catalog/screens/ServiceHistoryScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const ServiceHistoryScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // استیت‌های فیلتر فعال ساختمان و نوع سرویس
  const [activeBuilding, setActiveBuilding] = useState("all");
  const [activeLogType, setActiveLogType] = useState("all");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const handleViewReport = () => {
    // هدایت هوشمند به فاکتور تفصیلی و گزارش کالیبراسیون قطعات
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
            سوابق خدمات فنی
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
        </View>
      </View>

      {/* فیلترهای دوگانه افقی با چسبندگی بالا روی نقشه */}
      <View
        style={[
          styles.filterSection,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        {/* ردیف فیلتر اول: انتخاب ساختمان (RTL) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.filterScroll,
            { paddingHorizontal: spacing.lg },
          ]}
        >
          {[
            { id: "all", title: "همه ساختمان‌ها" },
            { id: "home", title: "آپارتمان مسکونی" },
            { id: "office", title: "دفتر ونک" },
          ].map((item) => {
            const active = activeBuilding === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActiveBuilding(item.id)}
                activeOpacity={0.8}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.full,
                  },
                ]}
              >
                <AppText
                  variant="button"
                  style={{
                    color: active ? colors.onPrimary : colors.textSecondary,
                  }}
                >
                  {item.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ردیف فیلتر دوم: نوع سرویس (RTL) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.filterScroll,
            { paddingHorizontal: spacing.lg, marginTop: 8 },
          ]}
        >
          {[
            { id: "all", title: "همه لاگ‌ها" },
            { id: "scheduled", title: "سرویس‌های دوره‌ای" },
            { id: "emergency", title: "تعمیرات اضطراری" },
          ].map((item) => {
            const active = activeLogType === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActiveLogType(item.id)}
                activeOpacity={0.8}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.full,
                  },
                ]}
              >
                <AppText
                  variant="button"
                  style={{
                    color: active ? colors.onPrimary : colors.textSecondary,
                  }}
                >
                  {item.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // محاسبه ریاضی حاشیه امن انتهایی: ارتفاع منو + ۸۰ پیکسل حاشیه سفید خالی
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 80 + (64 + insets.bottom),
          },
        ]}
      >
        {/* لیست سوابق خدمات فنی با استفاده از کامپوننت بومی View */}
        <View style={[styles.logsList, { gap: spacing.lg }]}>
          {/* لاگ ۱: تعمیرات اضطراری */}
          <View
            style={[
              styles.logCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View style={styles.cardHeaderRow}>
              <View style={styles.serviceMeta}>
                <AppText variant="h2" style={{ color: colors.textPrimary }}>
                  تعمیرات اضطراری آسانسور
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={styles.dateText}
                >
                  ۲۱ مهر ۱۴۰۳
                </AppText>
              </View>

              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "rgba(239, 68, 68, 0.1)" },
                ]}
              >
                <Ionicons name="build" size={18} color={colors.error} />
              </View>
            </View>

            <View
              style={[
                styles.assetBox,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                دستگاه: آپارتمان مسکونی - آسانسور اصلی (۵ توقف)
              </AppText>
            </View>

            <AppText variant="body" color="muted" style={styles.summaryText}>
              تعویض کنتاکتورهای سوئیچ حد درب طبقات و کالیبراسیون مجدد سنسورهای
              هم‌سطح‌سازی طبقه سوم کابین.
            </AppText>

            <View
              style={[
                styles.techRow,
                {
                  borderTopColor: colors.border,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <AppText
                variant="button"
                style={[
                  styles.costText,
                  {
                    color: colors.textPrimary,
                    fontFamily: "IRANYekanXFaNum-Bold",
                  },
                ]}
              >
                ۴,۲۵۰,۰۰۰ تومان
              </AppText>
              <View style={styles.techMeta}>
                <AppText variant="body" color="muted">
                  تکنسین: مهندس مهدی احمدی
                </AppText>
                <Ionicons
                  name="person-outline"
                  size={14}
                  color={colors.textSecondary}
                  style={{ marginLeft: 6 }}
                />
              </View>
            </View>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderColor: "rgba(16, 185, 129, 0.2)",
                },
              ]}
            >
              <AppText variant="labelSm" style={{ color: "#10B981" }}>
                دارای تاییدیه رسمی استاندارد
              </AppText>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color="#10B981"
                style={{ marginLeft: 6 }}
              />
            </View>

            <View style={[styles.actionRow, { gap: spacing.md }]}>
              <TouchableOpacity
                onPress={handleViewReport}
                activeOpacity={0.8}
                style={[
                  styles.actionBtn,
                  { borderColor: colors.border, borderRadius: borderRadius.md },
                ]}
              >
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  مشاهده گزارش کامل فنی
                </AppText>
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color={colors.textPrimary}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.actionBtn,
                  {
                    borderColor: colors.border,
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.surfaceDim,
                  },
                ]}
              >
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  دانلود فاکتور PDF
                </AppText>
                <Ionicons
                  name="download-outline"
                  size={16}
                  color={colors.textPrimary}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* لاگ ۲: سرویس دوره‌ای ماهیانه */}
          <View
            style={[
              styles.logCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View style={styles.cardHeaderRow}>
              <View style={styles.serviceMeta}>
                <AppText variant="h2" style={{ color: colors.textPrimary }}>
                  سرویس دوره‌ای منظم ماهانه
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={styles.dateText}
                >
                  ۱۰ شهریور ۱۴۰۳
                </AppText>
              </View>

              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "rgba(59, 130, 246, 0.1)" },
                ]}
              >
                <Ionicons name="shield-checkmark" size={18} color="#3B82F6" />
              </View>
            </View>

            <View
              style={[
                styles.assetBox,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                دستگاه: آپارتمان مسکونی - آسانسور اصلی (۵ توقف)
              </AppText>
            </View>

            <AppText variant="body" color="muted" style={styles.summaryText}>
              انجام چک‌لیست ۲۵ گانه ایمنی، آچارکشی و روغن‌کاری ریل‌های راهنما و
              تنظیم کفشک ترمز موتور گیربکس.
            </AppText>

            <View
              style={[
                styles.techRow,
                {
                  borderTopColor: colors.border,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <AppText
                variant="button"
                style={[styles.costText, { color: colors.textPrimary }]}
              >
                قرارداد ماهیانه (رایگان)
              </AppText>
              <View style={styles.techMeta}>
                <AppText variant="body" color="muted">
                  تکنسین: جناب سعید کریمی
                </AppText>
                <Ionicons
                  name="person-outline"
                  size={14}
                  color={colors.textSecondary}
                  style={{ marginLeft: 6 }}
                />
              </View>
            </View>

            <View style={[styles.actionRow, { gap: spacing.md }]}>
              <TouchableOpacity
                onPress={handleViewReport}
                activeOpacity={0.8}
                style={[
                  styles.actionBtn,
                  {
                    borderColor: colors.border,
                    borderRadius: borderRadius.md,
                    width: "100%",
                  },
                ]}
              >
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  مشاهده گزارش کامل فنی
                </AppText>
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color={colors.textPrimary}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* دکمه ثابت و چسبناک دانلود کل لاگ‌بوک آسانسور */}
      <View
        style={[
          styles.floatingButtonContainer,
          { bottom: 64 + insets.bottom + 16, paddingHorizontal: spacing.lg },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.floatingSubmitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
          ]}
        >
          <Ionicons
            name="download"
            size={20}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            دانلود دفترچه کامل سوابق فنی آسانسور (PDF)
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی سراسری با تب فعال پروفایل */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

export default ServiceHistoryScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 110,
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
  filterSection: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterScroll: {
    flexDirection: "row-reverse",
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  logsList: {
    width: "100%",
  },
  logCard: {
    borderWidth: 1,
    padding: 20,
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  serviceMeta: {
    alignItems: "flex-end",
    flex: 1,
    paddingLeft: 12,
  },
  dateText: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  assetBox: {
    borderWidth: 1,
    padding: 12,
    width: "100%",
    marginBottom: 12,
  },
  summaryText: {
    textAlign: "right",
    lineHeight: 22,
    fontSize: 13,
    marginBottom: 16,
  },
  techRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  techMeta: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  costText: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  floatingSubmitBtn: {
    height: 48,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    ...Platform.select({
      web: {
        maxWidth: 440,
      },
    }),
  },
});
