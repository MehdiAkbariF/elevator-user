// src/features/catalog/screens/WalletScreen.tsx

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
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const convertToEnglishDigits = (str: string) => {
  const persianDigits = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicDigits = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  let clean = str;
  for (let i = 0; i < 10; i++) {
    clean = clean
      .replace(persianDigits[i], i.toString())
      .replace(arabicDigits[i], i.toString());
  }
  return clean;
};

export const WalletScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const [topUpAmount, setTopUpAmount] = useState("");
  const [voucherCode, setVoucherCode] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const handleQuickAdd = (amount: number) => {
    setTopUpAmount(amount.toString());
  };

  const handleRechargePress = () => {
    // ناوبری هوشمند به صفحه جدید فاکتور نهایی و درگاه بانکی
    router.push("/recharge");
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
            کیف پول من
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
        {/* ۱. کارت اصلی موجودی اعتبار */}
        <View
          style={[
            styles.balanceCard,
            { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
          ]}
        >
          <View style={styles.balanceContent}>
            <AppText
              variant="labelSm"
              style={{ color: "#94A3B8", textAlign: "right" }}
            >
              اعتبار موجود کیف پول
            </AppText>
            <AppText
              variant="h1"
              style={[
                styles.balanceText,
                { color: "#10B981", fontFamily: "IRANYekanXFaNum-Bold" },
              ]}
            >
              ۱۲۵,۰۰۰ تومان
            </AppText>
            <AppText
              variant="body"
              style={{
                color: "#94A3B8",
                fontSize: 11,
                textAlign: "right",
                marginTop: 4,
                lineHeight: 16,
              }}
            >
              استفاده شده برای تسویه سریع هزینه‌ها و پرداخت خودکار فاکتورهای
              سرویس دوره‌ای آسانسور.
            </AppText>
          </View>
        </View>

        {/* ۲. بخش افزایش اعتبار و شارژ سریع */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            افزایش اعتبار / شارژ کیف پول
          </AppText>

          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: colors.surfaceDim,
                borderColor: colors.border,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <AppText variant="body" color="muted" style={styles.currencyLabel}>
              تومان
            </AppText>
            <TextInput
              value={topUpAmount}
              onChangeText={(text) =>
                setTopUpAmount(
                  convertToEnglishDigits(text).replace(/[^0-9]/g, ""),
                )
              }
              keyboardType="number-pad"
              placeholder="مبلغ دلخواه خود را وارد کنید"
              placeholderTextColor={colors.outline}
              style={[
                styles.textInput,
                {
                  color: colors.textPrimary,
                  fontFamily: "IRANYekanXFaNum-Regular",
                },
              ]}
            />
          </View>

          <View style={styles.quickPillsRow}>
            <TouchableOpacity
              onPress={() => handleQuickAdd(200000)}
              activeOpacity={0.8}
              style={[
                styles.pillBtn,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  fontFamily: "IRANYekanXFaNum-Bold",
                }}
              >
                +۲۰۰,۰۰۰
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleQuickAdd(100000)}
              activeOpacity={0.8}
              style={[
                styles.pillBtn,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  fontFamily: "IRANYekanXFaNum-Bold",
                }}
              >
                +۱۰۰,۰۰۰
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleQuickAdd(50000)}
              activeOpacity={0.8}
              style={[
                styles.pillBtn,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  fontFamily: "IRANYekanXFaNum-Bold",
                }}
              >
                +۵۰,۰۰۰
              </AppText>
            </TouchableOpacity>
          </View>

          {/* کلید درگاه پرداخت متصل شده به ناوبری فاکتور نهایی */}
          <TouchableOpacity
            onPress={handleRechargePress}
            activeOpacity={0.8}
            style={[
              styles.submitBtn,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <AppText variant="button" style={{ color: colors.onPrimary }}>
              شارژ کیف پول و انتقال به درگاه پرداخت
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ۳. بخش اعمال کارت هدیه */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              marginTop: spacing.lg,
            },
          ]}
        >
          <View style={styles.promoRow}>
            <TextInput
              value={voucherCode}
              onChangeText={setVoucherCode}
              placeholder="کد هدیه یا کوپن تخفیف"
              placeholderTextColor={colors.outline}
              style={[
                styles.promoInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                },
              ]}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.promoBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                ثبت کد
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۴. تاریخچه تراکنش‌ها */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              marginTop: spacing.lg,
            },
          ]}
        >
          <AppText variant="body" color="muted" style={styles.sectionHeading}>
            تاریخچه تراکنش‌های کیف پول
          </AppText>

          <View style={styles.transactionList}>
            <View
              style={[
                styles.transactionRow,
                { borderBottomColor: colors.surfaceDim },
              ]}
            >
              <AppText
                variant="button"
                style={[
                  styles.priceText,
                  {
                    color: colors.textPrimary,
                    fontFamily: "IRANYekanXFaNum-Bold",
                  },
                ]}
              >
                -۸۰,۰۰۰ تومان
              </AppText>
              <View style={styles.transactionInfo}>
                <AppText
                  variant="button"
                  numberOfLines={1}
                  style={[
                    styles.transactionTitle,
                    { color: colors.textPrimary },
                  ]}
                >
                  پرداخت خودکار: هزینه سرویس دوره‌ای #MNT-۴۰۴
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={styles.transactionDate}
                >
                  امروز، ساعت ۱۰:۰۰ صبح
                </AppText>
              </View>
            </View>

            <View
              style={[
                styles.transactionRow,
                { borderBottomColor: colors.surfaceDim },
              ]}
            >
              <AppText
                variant="button"
                style={[
                  styles.priceText,
                  { color: "#10B981", fontFamily: "IRANYekanXFaNum-Bold" },
                ]}
              >
                +۱۰۰,۰۰۰ تومان
              </AppText>
              <View style={styles.transactionInfo}>
                <AppText
                  variant="button"
                  numberOfLines={1}
                  style={[
                    styles.transactionTitle,
                    { color: colors.textPrimary },
                  ]}
                >
                  شارژ آنلاین حساب (درگاه بانکی)
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={styles.transactionDate}
                >
                  ۲۲ مهر ۱۴۰۳
                </AppText>
              </View>
            </View>

            <View style={styles.transactionRow}>
              <AppText
                variant="button"
                style={[
                  styles.priceText,
                  { color: "#10B981", fontFamily: "IRANYekanXFaNum-Bold" },
                ]}
              >
                +۴۵,۰۰۰ تومان
              </AppText>
              <View style={styles.transactionInfo}>
                <AppText
                  variant="button"
                  numberOfLines={1}
                  style={[
                    styles.transactionTitle,
                    { color: colors.textPrimary },
                  ]}
                >
                  استرداد وجه: لغو سفارش قطعه #ORD-۴۵۰
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={styles.transactionDate}
                >
                  ۱۹ مهر ۱۴۰۳
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ناوبری پایینی سراسری با زبانه فعال پروفایل */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

export default WalletScreen;

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
  balanceCard: {
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  balanceContent: {
    alignItems: "flex-end",
    width: "100%",
  },
  balanceText: {
    fontSize: 28,
    marginTop: 4,
    marginBottom: 4,
  },
  sectionCard: {
    borderWidth: 1,
    padding: 16,
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  inputWrapper: {
    height: 48,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 16,
  },
  currencyLabel: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    textAlign: "right",
    fontSize: 15,
  },
  quickPillsRow: {
    flexDirection: "row-reverse",
    gap: 8,
    width: "100%",
    marginBottom: 16,
  },
  pillBtn: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  promoRow: {
    flexDirection: "row-reverse",
    gap: 8,
    width: "100%",
  },
  promoInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: "right",
    fontSize: 13,
  },
  promoBtn: {
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionList: {
    width: "100%",
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  priceText: {
    fontSize: 14,
  },
  transactionInfo: {
    flex: 1,
    alignItems: "flex-end",
    paddingLeft: 16,
  },
  transactionTitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "right",
  },
  transactionDate: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
});
