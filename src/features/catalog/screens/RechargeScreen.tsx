// src/features/catalog/screens/RechargeScreen.tsx

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
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const RechargeScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // مدیریت انتخاب درگاه بانکی فعال به صورت پویا
  const [selectedGateway, setSelectedGateway] = useState<"saman" | "mellat">(
    "saman",
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/wallet"); // بازگشت ایمن به کیف پول
    }
  };

  const handleProceedToGateway = () => {
    // در فاز دوم به SDK پرداخت بانکی یا وب‌ویو متصل می‌شود
    router.replace("/payment-callback");
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی با ناوبری بومی و دکمه برگشت چپ‌چین شده */}
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
            شارژ کیف پول
          </AppText>
        </View>
        <View style={{ width: 40 }} /> {/* اسپیسر متقارن هدر */}
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
        {/* ۱. کارت خلاصه فاکتور افزایش اعتبار (The Invoice) */}
        <View
          style={[
            styles.invoiceCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            خلاصه فاکتور افزایش اعتبار
          </AppText>

          <View style={styles.invoiceRow}>
            <AppText
              variant="button"
              style={{
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Bold",
              }}
            >
              ۱۰۰,۰۰۰ تومان
            </AppText>
            <AppText variant="body" color="muted">
              مبلغ شارژ کیف پول
            </AppText>
          </View>

          <View style={styles.invoiceRow}>
            <AppText
              variant="body"
              style={{ color: "#10B981", fontFamily: "IRANYekanXFaNum-Bold" }}
            >
              رایگان (۰ درصد)
            </AppText>
            <AppText variant="body" color="muted">
              کارمزد تراکنش بانکی
            </AppText>
          </View>

          <View
            style={[styles.cardDivider, { backgroundColor: colors.border }]}
          />

          <View style={[styles.totalRow, { marginTop: spacing.xs }]}>
            <AppText
              variant="h1"
              style={{
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Bold",
              }}
            >
              ۱۰۰,۰۰۰ تومان
            </AppText>
            <AppText variant="h2" style={{ color: colors.textPrimary }}>
              مبلغ قابل پرداخت
            </AppText>
          </View>
        </View>

        {/* ۲. بخش انتخاب درگاه پرداخت بانکی (شبیه‌ساز هوشمند رادیوباتن‌ها به صورت RTL) */}
        <View style={styles.gatewaySection}>
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            درگاه پرداخت بانکی را انتخاب کنید
          </AppText>

          <View style={[styles.gatewayContainer, { gap: spacing.md }]}>
            {/* درگاه بانک سامان */}
            <TouchableOpacity
              onPress={() => setSelectedGateway("saman")}
              activeOpacity={0.8}
              style={[
                styles.gatewayCard,
                {
                  backgroundColor: colors.surface,
                  borderColor:
                    selectedGateway === "saman"
                      ? colors.primary
                      : colors.border,
                  borderWidth: selectedGateway === "saman" ? 2 : 1,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              {/* دکمه دایره رادیویی فعال */}
              <View
                style={[
                  styles.radioCircle,
                  {
                    borderColor:
                      selectedGateway === "saman"
                        ? colors.primary
                        : colors.outline,
                  },
                ]}
              >
                {selectedGateway === "saman" && (
                  <View
                    style={[
                      styles.radioDot,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                )}
              </View>

              {/* عنوان و آیکون درگاه */}
              <View style={styles.gatewayInfo}>
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  درگاه امن پرداخت بانک سامان
                </AppText>
                <View
                  style={[
                    styles.gatewayIconBox,
                    {
                      backgroundColor: colors.surfaceDim,
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color={colors.textPrimary}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* درگاه بانک ملت */}
            <TouchableOpacity
              onPress={() => setSelectedGateway("mellat")}
              activeOpacity={0.8}
              style={[
                styles.gatewayCard,
                {
                  backgroundColor: colors.surface,
                  borderColor:
                    selectedGateway === "mellat"
                      ? colors.primary
                      : colors.border,
                  borderWidth: selectedGateway === "mellat" ? 2 : 1,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              {/* دکمه دایره رادیویی غیرفعال */}
              <View
                style={[
                  styles.radioCircle,
                  {
                    borderColor:
                      selectedGateway === "mellat"
                        ? colors.primary
                        : colors.outline,
                  },
                ]}
              >
                {selectedGateway === "mellat" && (
                  <View
                    style={[
                      styles.radioDot,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                )}
              </View>

              <View style={styles.gatewayInfo}>
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  درگاه امن پرداخت بانک ملت
                </AppText>
                <View
                  style={[
                    styles.gatewayIconBox,
                    {
                      backgroundColor: colors.surfaceDim,
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color={colors.textPrimary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۳. پیام امنیتی شاپرک */}
        <View style={styles.securityNotice}>
          <Ionicons
            name="lock-closed"
            size={16}
            color={colors.textSecondary}
            style={{ marginLeft: 6 }}
          />
          <AppText variant="labelSm" color="muted" style={styles.securityText}>
            اتصال امن و رمزنگاری‌شده به درگاه رسمی شاپرک تحت نظارت بانک مرکزی.
          </AppText>
        </View>
      </ScrollView>

      {/* ۴. دکمه چسبناک پایینی انتقال به درگاه بانکی با حاشیه امن پویا */}
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
          onPress={handleProceedToGateway}
          activeOpacity={0.8}
          style={[
            styles.submitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.md },
          ]}
        >
          <Ionicons
            name="card-outline"
            size={18}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            انتقال به درگاه امن بانکی
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی پروژه
export default RechargeScreen;

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
  invoiceCard: {
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    elevation: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  invoiceRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardDivider: {
    height: 1,
    width: "100%",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gatewaySection: {
    width: "100%",
  },
  gatewayContainer: {
    width: "100%",
  },
  gatewayCard: {
    padding: 16,
    flexDirection: "row", // تراز رادیو در چپ، عنوان در راست به صورت RTL
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  gatewayInfo: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  gatewayIconBox: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  securityNotice: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 24,
    paddingHorizontal: 16,
  },
  securityText: {
    textAlign: "center",
    lineHeight: 18,
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
