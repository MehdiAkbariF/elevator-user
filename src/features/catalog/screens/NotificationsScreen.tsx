// src/features/catalog/screens/NotificationsScreen.tsx

import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const NotificationsScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // شبیه‌سازی وضعیت خوانده‌شدن اعلان اول به صورت پویا
  const [isUnread, setIsUnread] = useState(true);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  };

  const handleMarkAllRead = () => {
    setIsUnread(false);
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی با ناوبری و دکمه همه‌خوانده شد */}
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
            اطلاعیه‌ها
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <TouchableOpacity
            onPress={handleMarkAllRead}
            activeOpacity={0.7}
            style={styles.markReadBtn}
          >
            <AppText variant="button" color="secondary">
              همه خوانده شد
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingBottom: 100 + insets.bottom,
          },
        ]}
      >
        {/* هدر بخش اول: امروز */}
        <View
          style={[styles.sectionHeader, { backgroundColor: colors.surfaceDim }]}
        >
          <AppText variant="labelSm" color="muted" style={styles.sectionTitle}>
            امروز
          </AppText>
        </View>

        {/* لیست اعلان‌های امروز */}
        <View style={styles.listContainer}>
          {/* اعلان خوانده‌نشده فنی (دارای افکت پالس آبی و بردر راست) */}
          <TouchableOpacity
            onPress={() => setIsUnread(false)}
            activeOpacity={0.9}
            style={[
              styles.notificationItem,
              isUnread
                ? { backgroundColor: colors.surfaceDim }
                : { backgroundColor: colors.surface },
              { borderBottomColor: colors.border },
            ]}
          >
            {isUnread && (
              <View
                style={[styles.unreadBar, { backgroundColor: "#3B82F6" }]}
              />
            )}

            <View style={styles.itemPadding}>
              <View style={styles.itemContentRow}>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <AppText
                      variant={isUnread ? "h2" : "body"}
                      style={{ color: colors.textPrimary }}
                    >
                      تکنسین به محل رسید
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.timeText}
                    >
                      ۱۰ دقیقه پیش
                    </AppText>
                  </View>
                  <AppText variant="body" color="muted" style={styles.descText}>
                    تکنسین اعزامی (مهندس مهدی احمدی) وارد ساختمان پزشکان آرش شد
                    و عیب‌یابی را آغاز کرد.
                  </AppText>
                </View>

                {/* دایره آیکون در سمت راست */}
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Ionicons
                    name="construct"
                    size={18}
                    color={colors.secondary}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* اعلان خوانده‌شده خرید قطعه */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.notificationItem,
              {
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.itemPadding}>
              <View style={styles.itemContentRow}>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <AppText
                      variant="body"
                      style={{ color: colors.textPrimary }}
                    >
                      سفارش قطعه ارسال شد
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.timeText}
                    >
                      ۲ ساعت پیش
                    </AppText>
                  </View>
                  <AppText variant="body" color="muted" style={styles.descText}>
                    مرسوله شما شامل قفل درب شیندلر تحویل باربری کشوری (جناب رضا
                    علوی) گردید.
                  </AppText>
                </View>

                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.surfaceDim },
                  ]}
                >
                  <Ionicons name="bus" size={18} color={colors.textPrimary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* هدر بخش دوم: دیروز */}
        <View
          style={[
            styles.sectionHeader,
            { backgroundColor: colors.surfaceDim, marginTop: spacing.md },
          ]}
        >
          <AppText variant="labelSm" color="muted" style={styles.sectionTitle}>
            دیروز
          </AppText>
        </View>

        {/* لیست اعلان‌های دیروز */}
        <View style={styles.listContainer}>
          {/* اعلان خوانده‌شده تراکنش مالی */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.notificationItem,
              {
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.itemPadding}>
              <View style={styles.itemContentRow}>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <AppText
                      variant="body"
                      style={{ color: colors.textPrimary }}
                    >
                      پرداخت خودکار موفق
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.timeText}
                    >
                      دیروز
                    </AppText>
                  </View>
                  <AppText variant="body" color="muted" style={styles.descText}>
                    تراکنش برداشت خودکار بابت تمدید پلان نقره‌ای سرویس دوره‌ای
                    (#MNT-۴۰۴) با موفقیت انجام شد.
                  </AppText>
                </View>

                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: "rgba(34, 197, 94, 0.1)" },
                  ]}
                >
                  <Ionicons name="card" size={18} color="#22C55E" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* اعلان خوانده‌شده عمومی کاتالوگ */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.notificationItem,
              {
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.itemPadding}>
              <View style={styles.itemContentRow}>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <AppText
                      variant="body"
                      style={{ color: colors.textPrimary }}
                    >
                      مقررات جدید بازرسی استاندارد
                    </AppText>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.timeText}
                    >
                      دیروز
                    </AppText>
                  </View>
                  <AppText variant="body" color="muted" style={styles.descText}>
                    دستورالعمل‌های جدید سازمان شهرداری و خدمات آتش‌نشانی برای
                    دریافت پایان‌کار آسانسورها را مطالعه کنید.
                  </AppText>
                </View>

                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.surfaceDim },
                  ]}
                >
                  <Ionicons
                    name="notifications"
                    size={18}
                    color={colors.textPrimary}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ناوبری پایینی سراسری */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default NotificationsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
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
  markReadBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeader: {
    width: "100%",
    height: 36,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    textAlign: "right",
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  listContainer: {
    width: "100%",
  },
  notificationItem: {
    position: "relative",
    borderBottomWidth: 1,
  },
  unreadBar: {
    position: "absolute",
    right: 0, // قرارگیری نشانگر باریک خوانده‌نشده در لبه راست RTL فارسی
    top: 0,
    bottom: 0,
    width: 4,
  },
  itemPadding: {
    padding: 16,
    paddingRight: 20,
  },
  itemContentRow: {
    flexDirection: "row-reverse", // تراز راست به چپ کل ردیف اعلان
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    paddingRight: 16, // ایجاد فاصله تا آیکون سمت راست در RTL
  },
  titleRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 6,
  },
  timeText: {
    fontSize: 10,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  descText: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 18,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});
