// src/features/catalog/screens/PaymentCallbackScreen.tsx

import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // پایش هوشمند پارامترهای پرداخت بانک
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PaymentCallbackScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // دریافت وضعیت تراکنش از آدرس ورودی (پیش‌فرض موفق است، مگر اینکه ?status=fail ارسال شود)
  const { status } = useLocalSearchParams();
  const isSuccess = status !== "fail";

  const handleGoToDashboard = () => {
    router.replace("/dashboard");
  };

  const handleGoToWallet = () => {
    router.replace("/wallet");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده ساده و مینیمال تراکنش */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <View style={{ width: 40 }} />
        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            نتیجه پرداخت
          </AppText>
        </View>
        <TouchableOpacity
          onPress={handleGoToDashboard}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
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
        {/* ۱. بخش انیمیشن وضعیت و پیام موفقیت/ناموفق بودن */}
        <View style={styles.statusSection}>
          <View
            style={[
              styles.statusIconCircle,
              {
                backgroundColor: isSuccess
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              },
            ]}
          >
            <Ionicons
              name={isSuccess ? "checkmark-circle" : "close-circle"}
              size={64}
              color={isSuccess ? "#22C55E" : "#EF4444"}
            />
          </View>

          <AppText
            variant="h1"
            style={[styles.statusTitle, { color: colors.textPrimary }]}
          >
            {isSuccess ? "پرداخت با موفقیت انجام شد" : "تراکنش ناموفق بود"}
          </AppText>

          <AppText variant="body" color="muted" style={styles.statusSubtitle}>
            {isSuccess
              ? "اعتبار کیف پول شما با موفقیت افزایش یافت و هم‌اکنون قابل استفاده است."
              : "عملیات پرداخت توسط درگاه بانکی تایید نشد. مبلغ کسر شده طی ۷۲ ساعت به حساب شما بازمی‌گردد."}
          </AppText>
        </View>

        {/* ۲. برگه فیش دیجیتال مشخصات بانکی تراکنش (Digital Receipt Card) */}
        <View
          style={[
            styles.receiptCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          {/* سطر اول: کد رهگیری بانکی */}
          <View
            style={[
              styles.receiptRow,
              { borderBottomColor: colors.surfaceDim },
            ]}
          >
            <AppText
              variant="button"
              style={[styles.receiptVal, { color: colors.textPrimary }]}
            >
              {isSuccess ? "۹۹۸۲-۷۴۶۲-۱۰" : "---"}
            </AppText>
            <AppText variant="body" color="muted">
              کد رهگیری تراکنش
            </AppText>
          </View>

          {/* سطر دوم: درگاه متصل */}
          <View
            style={[
              styles.receiptRow,
              { borderBottomColor: colors.surfaceDim },
            ]}
          >
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              درگاه بانک سامان
            </AppText>
            <AppText variant="body" color="muted">
              درگاه پرداخت متصل
            </AppText>
          </View>

          {/* سطر سوم: تاریخ شمسی فیش */}
          <View
            style={[
              styles.receiptRow,
              { borderBottomColor: colors.surfaceDim },
            ]}
          >
            <AppText
              variant="button"
              style={[styles.receiptVal, { color: colors.textPrimary }]}
            >
              ۲۳ مهر ۱۴۰۳، ۱۵:۳۰
            </AppText>
            <AppText variant="body" color="muted">
              تاریخ و ساعت تراکنش
            </AppText>
          </View>

          {/* سطر چهارم: مبلغ نهایی */}
          <View style={styles.receiptRow}>
            <AppText
              variant="h2"
              style={[
                styles.receiptVal,
                { color: isSuccess ? "#10B981" : colors.textPrimary },
              ]}
            >
              ۱۰۰,۰۰۰ تومان
            </AppText>
            <AppText variant="body" color="muted">
              مبلغ نهایی تراکنش
            </AppText>
          </View>
        </View>

        {/* ۳. پیام هشدار امنیتی و استعلام */}
        <View style={styles.infoBox}>
          <AppText variant="labelSm" color="muted" style={styles.infoText}>
            در صورت بروز هرگونه ابهام یا عدم ثبت اعتبار در کیف پول، می‌توانید با
            ارائه کد رهگیری فوق، با پشتیبانی فنی ۲۴ ساعته ایکس الوتور تماس
            بگیرید.
          </AppText>
        </View>

        {/* ۴. کلیدهای اکشن دوقلوی بازگشت متقارن */}
        <View style={[styles.actionRow, { gap: spacing.md }]}>
          {/* دکمه بازگشت به کیف پول */}
          <TouchableOpacity
            onPress={handleGoToWallet}
            activeOpacity={0.8}
            style={[
              styles.secondaryBtn,
              { borderColor: colors.border, borderRadius: borderRadius.md },
            ]}
          >
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              بازگشت به کیف پول
            </AppText>
          </TouchableOpacity>

          {/* دکمه ورود به داشبورد اصلی */}
          <TouchableOpacity
            onPress={handleGoToDashboard}
            activeOpacity={0.8}
            style={[
              styles.primaryBtn,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <AppText variant="button" style={{ color: colors.onPrimary }}>
              ورود به داشبورد
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی پروژه
export default PaymentCallbackScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 24,
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
  statusSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  statusIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,

    textAlign: "center",
    marginBottom: 8,
  },
  statusSubtitle: {
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 24,
    fontSize: 13,
  },
  receiptCard: {
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  receiptRow: {
    flexDirection: "row", // تراز راست‌به‌چپ: مقدار در چپ، لیبل در راست
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  receiptVal: {
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  infoBox: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoText: {
    textAlign: "center",
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: "row", // چیدمان متقارن دکمه‌ها در یک ردیف
    width: "100%",
  },
  primaryBtn: {
    flex: 1.2,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
