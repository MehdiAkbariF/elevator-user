// src/features/catalog/screens/MyElevatorsScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

export const MyElevatorsScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const handleRequestService = () => {
    router.push("/request-service");
  };

  const handleRegisterElevator = () => {
    router.push("/create-elevator");
  };

  const handleElevatorDetailPress = () => {
    router.push("/elevator-detail");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده مینیمال بالایی */}
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
            آسانسورهای من
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
            paddingBottom: 150 + (64 + insets.bottom),
          },
        ]}
      >
        {/* کادر ۱ مینیمال: آپارتمان مسکونی */}
        <View
          style={[
            styles.elevatorCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <View style={styles.cardPadding}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.metaInfo}>
                <AppText variant="h2" style={{ color: colors.textPrimary }}>
                  آپارتمان مسکونی - آسانسور اصلی
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={styles.addressText}
                >
                  تهران، خیابان ونک، پلاک ۴۵، مجتمع نگین
                </AppText>
              </View>

              <View style={styles.statusBadge}>
                <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                  فعال و ایمن
                </AppText>
                <View
                  style={[styles.statusDot, { backgroundColor: "#22C55E" }]}
                />
              </View>
            </View>

            <View style={styles.inlineSpecsRow}>
              <AppText variant="labelSm" color="muted">
                موتور کششی • ۵ ایستگاه • ظرفیت ۶ نفره (۴۵۰kg)
              </AppText>
            </View>

            <View style={styles.dateInfoContainer}>
              <View style={styles.dateRow}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.textSecondary}
                  style={{ marginLeft: 8 }}
                />
                <AppText variant="body" color="muted">
                  تاریخ بازدید بعدی: ۱۸ آبان (۹ روز دیگر)
                </AppText>
              </View>
              <View style={[styles.dateRow, { marginTop: 6 }]}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={16}
                  color={colors.textSecondary}
                  style={{ marginLeft: 8 }}
                />
                <AppText variant="body" color="muted">
                  آخرین بازدید سرویس دوره‌ای: ۱۸ مهر ۱۴۰۳
                </AppText>
              </View>
            </View>

            <View
              style={[styles.cardDivider, { backgroundColor: colors.border }]}
            />

            <View style={[styles.actionRow, { gap: spacing.sm }]}>
              <TouchableOpacity
                onPress={handleRequestService}
                activeOpacity={0.8}
                style={[
                  styles.actionBtn,
                  { borderColor: colors.border, borderRadius: borderRadius.md },
                ]}
              >
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  درخواست سرویس دوره‌ای
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleElevatorDetailPress}
                activeOpacity={0.7}
                style={[
                  styles.historyLinkBtn,
                  {
                    borderColor: colors.border,
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.surfaceDim,
                  },
                ]}
              >
                <Ionicons
                  name="arrow-back-outline"
                  size={16}
                  color={colors.secondary}
                  style={{ marginLeft: 8 }}
                />
                <AppText variant="button" color="secondary">
                  مشاهده شناسنامه فنی آسانسور
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* کادر ۲ مینیمال: برج اداری آرش */}
        <View
          style={[
            styles.elevatorCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <View style={styles.cardPadding}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.metaInfo}>
                <AppText variant="h2" style={{ color: colors.textPrimary }}>
                  برج آرش - آسانسور بلوک B
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={styles.addressText}
                >
                  تهران، خیابان جردن، برج اداری تجاری آرش
                </AppText>
              </View>

              <View style={styles.statusBadge}>
                <AppText variant="labelSm" style={{ color: "#D97706" }}>
                  دارای خرابی فعال
                </AppText>
                <View
                  style={[styles.statusDot, { backgroundColor: "#D97706" }]}
                />
              </View>
            </View>

            <View style={styles.inlineSpecsRow}>
              <AppText variant="labelSm" color="muted">
                گیرلس بدون موتورخانه (MRL) • ۱۲ ایستگاه • ۱۰ نفره (۸۰۰kg)
              </AppText>
            </View>

            <View style={styles.dateInfoContainer}>
              <View style={styles.dateRow}>
                <Ionicons
                  name="warning-outline"
                  size={16}
                  color="#D97706"
                  style={{ marginLeft: 8 }}
                />
                <AppText variant="body" style={{ color: "#92400E" }}>
                  خطای فعال: گیر کردن درب کابین در طبقه چهارم
                </AppText>
              </View>
              <View style={[styles.dateRow, { marginTop: 6 }]}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.textSecondary}
                  style={{ marginLeft: 8 }}
                />
                <AppText variant="body" color="muted">
                  آخرین بازدید دوره‌ای: ۲۴ شهریور ۱۴۰۳
                </AppText>
              </View>
            </View>

            <View
              style={[styles.cardDivider, { backgroundColor: colors.border }]}
            />

            <View style={[styles.actionRow, { gap: spacing.sm }]}>
              <TouchableOpacity
                onPress={handleRequestService}
                activeOpacity={0.8}
                style={[
                  styles.actionBtn,
                  {
                    backgroundColor: colors.secondary,
                    borderColor: colors.secondary,
                    borderRadius: borderRadius.md,
                  },
                ]}
              >
                <AppText variant="button" style={{ color: "#FFFFFF" }}>
                  اعزام فوری تکنسین اضطراری
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleElevatorDetailPress}
                activeOpacity={0.7}
                style={[
                  styles.historyLinkBtn,
                  {
                    borderColor: colors.border,
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.surfaceDim,
                  },
                ]}
              >
                <Ionicons
                  name="receipt-outline"
                  size={16}
                  color={colors.secondary}
                  style={{ marginLeft: 8 }}
                />
                <AppText variant="button" color="secondary">
                  مشاهده شناسنامه فنی آسانسور
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.floatingButtonContainer,
          { bottom: 64 + insets.bottom + 16, paddingHorizontal: spacing.lg },
        ]}
      >
        <TouchableOpacity
          onPress={handleRegisterElevator}
          activeOpacity={0.9}
          style={[
            styles.floatingSubmitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
          ]}
        >
          <Ionicons
            name="add"
            size={20}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            ثبت ساختمان یا آسانسور جدید
          </AppText>
        </TouchableOpacity>
      </View>

      {/* تصحیح شد: تغییر ورودی زبانه فعال به elevators */}
      <AppBottomNav activeTab="elevators" />
    </ScreenWrapper>
  );
};

export default MyElevatorsScreen;

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
  elevatorCard: {
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardPadding: {
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  metaInfo: {
    alignItems: "flex-end",
    flex: 1,
    paddingLeft: 12,
  },
  addressText: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  inlineSpecsRow: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  dateInfoContainer: {
    width: "100%",
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardDivider: {
    height: 1,
    width: "100%",
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: "column",
    width: "100%",
  },
  actionBtn: {
    width: "100%",
    height: 44,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  historyLinkBtn: {
    width: "100%",
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
