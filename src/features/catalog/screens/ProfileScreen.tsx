// src/features/catalog/screens/ProfileScreen.tsx

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
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const ProfileScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<"services" | "orders">("services");

  const handleSignOut = () => {
    router.replace("/");
  };

  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  return (
    <ScreenWrapper>
      {/* هدر بالایی */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <ThemeToggleButton />

        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            حساب کاربری
          </AppText>
        </View>

        <TouchableOpacity
          onPress={handleSignOut}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 80 + (64 + insets.bottom),
          },
        ]}
      >
        {/* ۱. کارت اطلاعات پروفایل */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <View style={styles.profileRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.editBtn}
              onPress={() => router.push("/profile/edit")}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <View style={styles.profileInfo}>
              <AppText
                variant="h2"
                style={[styles.userName, { color: colors.textPrimary }]}
              >
                علی رضایی
              </AppText>
              <AppText variant="body" color="muted" style={styles.userPhone}>
                ۰۹۱۲۳۴۵۶۷۸۹
              </AppText>
            </View>

            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: colors.surfaceDim },
              ]}
            >
              <AppText variant="h1" style={{ color: colors.textPrimary }}>
                عر
              </AppText>
            </View>
          </View>
        </View>

        {/* ۲. گام مدیریت تجهیزات و آدرس‌ها */}
        <View style={[styles.gridContainer, { gap: spacing.md }]}>
          {/* کارت آسانسورهای من */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.shortcutCard,
              {
                width: cardWidth,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
            onPress={() => router.push("/my-elevators")}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceDim }]}
            >
              <Ionicons
                name="construct-outline"
                size={20}
                color={colors.textPrimary}
              />
            </View>
            <View style={styles.shortcutText}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                آسانسورهای من
              </AppText>
              <AppText
                variant="labelSm"
                color="muted"
                style={styles.shortcutSub}
              >
                ۲ دستگاه ثبت‌شده
              </AppText>
            </View>
          </TouchableOpacity>

          {/* کارت آدرس‌های من */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.shortcutCard,
              {
                width: cardWidth,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
            onPress={() => router.push("/addresses")}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceDim }]}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.textPrimary}
              />
            </View>
            <View style={styles.shortcutText}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                آدرس‌های من
              </AppText>
              <AppText
                variant="labelSm"
                color="muted"
                style={styles.shortcutSub}
              >
                ۳ آدرس ثبت‌شده
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* ۳. بخش تاریخچه و سوابق خدمات */}
        <View style={[styles.historySection, { marginTop: spacing.xl }]}>
          <View
            style={[
              styles.tabContainer,
              {
                backgroundColor: colors.surfaceDim,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("orders")}
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === "orders" && {
                  backgroundColor: colors.surface,
                  borderRadius: borderRadius.sm,
                },
              ]}
            >
              <AppText
                variant="button"
                style={{
                  color:
                    activeTab === "orders"
                      ? colors.textPrimary
                      : colors.textSecondary,
                }}
              >
                خرید قطعات
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("services")}
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === "services" && {
                  backgroundColor: colors.surface,
                  borderRadius: borderRadius.sm,
                },
              ]}
            >
              <AppText
                variant="button"
                style={{
                  color:
                    activeTab === "services"
                      ? colors.textPrimary
                      : colors.textSecondary,
                }}
              >
                سوابق سرویس‌ها
              </AppText>
            </TouchableOpacity>
          </View>

          {activeTab === "services" ? (
            <View style={[styles.historyList, { gap: spacing.md }]}>
              {/* رکورد ۱ سرویس */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.historyCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                  },
                ]}
                onPress={() => router.push("/service-history/1")}
              >
                <View
                  style={[
                    styles.historyHeaderRow,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <AppText
                    variant="h2"
                    style={[styles.priceText, { color: colors.textPrimary }]}
                  >
                    ۶,۰۰۰,۰۰۰ تومان
                  </AppText>
                  <View style={styles.historyInfo}>
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      اعزام تکنیسین اضطراری
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.historyDate}
                    >
                      ۲۱ مهر ۱۴۰۳
                    </AppText>
                  </View>
                </View>
                <View style={styles.historyFooterRow}>
                  <TouchableOpacity>
                    <AppText
                      variant="labelSm"
                      color="secondary"
                      style={styles.invoiceLink}
                    >
                      مشاهده فاکتور
                    </AppText>
                  </TouchableOpacity>
                  <View style={styles.statusBadge}>
                    <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                      انجام شده
                    </AppText>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#22C55E"
                      style={{ marginLeft: 6 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* رکورد ۲ سرویس */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.historyCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                  },
                ]}
                onPress={() => router.push("/service-history/2")}
              >
                <View
                  style={[
                    styles.historyHeaderRow,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <AppText
                    variant="h2"
                    style={[styles.priceText, { color: colors.textPrimary }]}
                  >
                    ۴,۰۰۰,۰۰۰ تومان
                  </AppText>
                  <View style={styles.historyInfo}>
                    <AppText
                      variant="button"
                      style={{ color: colors.textPrimary }}
                    >
                      سرویس دوره‌ای منظم ماهانه
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.historyDate}
                    >
                      ۱۰ شهریور ۱۴۰۳
                    </AppText>
                  </View>
                </View>
                <View style={styles.historyFooterRow}>
                  <TouchableOpacity>
                    <AppText
                      variant="labelSm"
                      color="secondary"
                      style={styles.invoiceLink}
                    >
                      مشاهده فاکتور
                    </AppText>
                  </TouchableOpacity>
                  <View style={styles.statusBadge}>
                    <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                      انجام شده
                    </AppText>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#22C55E"
                      style={{ marginLeft: 6 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                styles.emptyContainer,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <Ionicons
                name="cube-outline"
                size={48}
                color={colors.textSecondary}
                style={{ marginBottom: 12 }}
              />
              <AppText variant="body" color="muted">
                هنوز هیچ سفارش قطعه‌ای ثبت نشده است.
              </AppText>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.shopNowBtn,
                  {
                    backgroundColor: colors.secondary,
                    borderRadius: borderRadius.md,
                    paddingHorizontal: spacing.xl,
                    paddingVertical: spacing.sm,
                    marginTop: spacing.md,
                  },
                ]}
                onPress={() => router.push("/catalog")}
              >
                <AppText variant="button" style={{ color: "#FFFFFF" }}>
                  شروع خرید
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ۴. منوی تنظیمات کاربردی پایینی */}
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              marginTop: spacing.xl,
            },
          ]}
        >
          {/* سفارشات من */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/orders")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                سفارشات من
              </AppText>
              <Ionicons
                name="receipt-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* سوابق خدمات */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/service-history")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                سوابق خدمات
              </AppText>
              <Ionicons
                name="time-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* کیف پول من */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/wallet")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                کیف پول من
              </AppText>
              <Ionicons
                name="wallet-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* علاقه‌مندی‌ها */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/favorites")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                علاقه‌مندی‌ها
              </AppText>
              <Ionicons
                name="heart-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* اعلان‌ها */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                اعلان‌ها
              </AppText>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* راهنما و پشتیبانی فنی */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/support/tickets")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                راهنما و پشتیبانی فنی
              </AppText>
              <Ionicons
                name="headset-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* تنظیمات حساب */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/settings")}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                تنظیمات حساب
              </AppText>
              <Ionicons
                name="settings-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* حریم خصوصی و قوانین */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.settingTextRow}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                حریم خصوصی و قوانین ایکس الواتور
              </AppText>
              <Ionicons
                name="shield-outline"
                size={20}
                color={colors.textPrimary}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>

          {/* دکمه خروج */}
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.8}
            style={styles.settingRow}
          >
            <View
              style={[
                styles.settingTextRow,
                { width: "100%", justifyContent: "flex-end" },
              ]}
            >
              <AppText variant="button" style={{ color: colors.error }}>
                خروج از حساب کاربری
              </AppText>
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.error}
                style={{ marginLeft: 12 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 8,
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
  profileCard: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  editBtn: {
    padding: 4,
  },
  profileInfo: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
  },
  userName: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
  },
  userPhone: {
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    width: "100%",
  },
  shortcutCard: {
    borderWidth: 1,
    padding: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  shortcutText: {
    alignItems: "flex-end",
  },
  shortcutSub: {
    fontSize: 10,
    marginTop: 2,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  historySection: {
    width: "100%",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    width: "100%",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  historyList: {
    width: "100%",
  },
  historyCard: {
    borderWidth: 1,
    padding: 16,
  },
  historyHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  priceText: {
    fontSize: 15,
  },
  historyInfo: {
    alignItems: "flex-end",
  },
  historyDate: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  historyFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  invoiceLink: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyContainer: {
    borderWidth: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  shopNowBtn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  settingsCard: {
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    width: "100%",
  },
  settingTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});