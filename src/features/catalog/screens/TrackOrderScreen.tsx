// src/features/catalog/screens/TrackOrderScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
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
const IMAGE_HEIGHT = 350;

export const TrackOrderScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // سیستم انیمیشن بومی ری‌اکت نیتیو برای پالس آبی مرحله جاری
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 2.0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim, opacityAnim]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/orders"); // بازگشت ایمن به سوابق سفارشات
    }
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی کاتالوگ با ناوبری و دکمه تغییر تم */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        {/* دکمه بازگشت به چپ استاندارد */}
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            رهگیری سفارش قطعه
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
            paddingBottom: 100 + insets.bottom, // ممانعت از تداخل با دکمه دانلود فاکتور در پایین
          },
        ]}
      >
        {/* ۱. کادر متادیتای سفارش (شماره سفارش، مبلغ فاکتور و تاریخ) */}
        <View
          style={[
            styles.metaCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <View style={styles.metaRow}>
            <View style={styles.metaColLeft}>
              <AppText variant="labelSm" color="muted">
                مبلغ کل پرداختی
              </AppText>
              <AppText
                variant="h2"
                style={[styles.totalPrice, { color: "#10B981" }]}
              >
                ۱۲۲,۴۵۰,۰۰۰ تومان
              </AppText>
            </View>
            <View style={styles.metaColRight}>
              <AppText variant="labelSm" color="muted">
                شماره سفارش
              </AppText>
              <AppText
                variant="h2"
                style={[styles.orderNumber, { color: colors.textPrimary }]}
              >
                #ORD-۴۵۰۹۲
              </AppText>
            </View>
          </View>

          <View
            style={[styles.cardDivider, { backgroundColor: colors.border }]}
          />

          <View style={styles.metaFooter}>
            <View
              style={[
                styles.shippingBadge,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.sm,
                },
              ]}
            >
              <AppText variant="labelSm" color="muted">
                ارسال باربری کشوری
              </AppText>
            </View>
            <AppText
              variant="body"
              color="muted"
              style={{ fontFamily: "IRANYekanXFaNum-Regular" }}
            >
              ۲۳ مهر ۱۴۰۳
            </AppText>
          </View>
        </View>

        {/* ۲. بخش تایم‌لاین عمودی وضعیت تحویل به صورت کاملاً RTL */}
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
          <AppText
            variant="h2"
            style={[styles.sectionHeading, { color: colors.textPrimary }]}
          >
            وضعیت تحویل مرسوله
          </AppText>

          <View style={styles.timelineContainer}>
            {/* گره اول: ثبت سفارش (کامل شده) */}
            <View style={styles.timelineItem}>
              {/* خطوط عمودی اتصالی در سمت راست کادر */}
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
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  ثبت و پرداخت سفارش
                </AppText>
                <AppText variant="body" color="muted" style={styles.timeText}>
                  ۲۳ مهر، ساعت ۰۹:۳۰ صبح
                </AppText>
              </View>
            </View>

            {/* گره دوم: بسته‌بندی (کامل شده) */}
            <View style={styles.timelineItem}>
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
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  بسته‌بندی و تحویل به باربری
                </AppText>
                <AppText variant="body" color="muted" style={styles.timeText}>
                  ۲۳ مهر، ساعت ۱۴:۱۵ ظهر
                </AppText>
              </View>
            </View>

            {/* گره سوم: در حال حمل (فعال و دارای پالس تپنده رادار) */}
            <View style={styles.timelineItem}>
              <View
                style={[
                  styles.timelineLine,
                  { backgroundColor: colors.border },
                ]}
              />

              {/* دایره متحرک ضربان پشت گره فعال */}
              <View style={styles.nodeWrapper}>
                <Animated.View
                  style={[
                    styles.nodePulse,
                    {
                      backgroundColor: "#3B82F6",
                      transform: [{ scale: pulseAnim }],
                      opacity: opacityAnim,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.node,
                    { backgroundColor: "#3B82F6", borderColor: "#3B82F6" },
                  ]}
                >
                  <View style={styles.activeDot} />
                </View>
              </View>

              <View style={styles.timelineContent}>
                <AppText variant="h2" style={{ color: colors.textPrimary }}>
                  در حال حمل توسط راننده
                </AppText>
                {/* تگ وضعیت ساعت تقریبی رسیدن */}
                <View
                  style={[
                    styles.etaBadge,
                    {
                      backgroundColor: "rgba(217, 119, 6, 0.1)",
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <Ionicons
                    name="time"
                    size={14}
                    color={colors.secondary}
                    style={{ marginLeft: 6 }}
                  />
                  <AppText
                    variant="labelSm"
                    style={{
                      color: colors.secondary,
                      fontFamily: "IRANYekanXFaNum-Bold",
                    }}
                  >
                    زمان تقریبی تحویل: ۳۵ دقیقه دیگر
                  </AppText>
                </View>
              </View>
            </View>

            {/* گره چهارم: تحویل نهایی (در انتظار) */}
            <View style={[styles.timelineItem, { paddingBottom: 0 }]}>
              <View
                style={[
                  styles.node,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              />
              <View style={styles.timelineContent}>
                <AppText variant="button" color="muted">
                  تحویل مرسوله به مشتری
                </AppText>
                <AppText variant="body" color="muted" style={styles.timeText}>
                  در انتظار ورود به مقصد
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* ۳. کارت اطلاعات راننده باربری اعزام‌شده */}
        <View
          style={[
            styles.driverCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.callBtn,
              {
                backgroundColor: colors.surfaceDim,
                borderRadius: borderRadius.full,
              },
            ]}
          >
            <Ionicons name="call" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.driverInfo}>
            <AppText variant="button" style={{ color: colors.textPrimary }}>
              جناب رضا علوی
            </AppText>
            <AppText variant="body" color="muted" style={styles.driverCode}>
              کد راننده باربری: TRK-۹۹۸۲
            </AppText>
          </View>

          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAF9wUJs0l6eS30ZaEztFF2uAi8KR9bm6LOnyW5e4UoSTUCaeLbidKTf77TbTqRbA_mpUGhOvR9igtZiNzd2jAflxy2eXy7Rx-RfvdqIVMBS6nv3RQ2TdTHfihqZxW-tUcvbehuYafntlPneJF0gRFKdILlA7XSLBjYdlE6GJcIRbyTRhsbPffM4Rr0InJPoL8UEAWkqxGKft-eJLE1hs3EXApYDy8AlCQE9tUOfUNOaWiTeA-2e-HhA",
            }}
            style={styles.driverAvatar}
          />
        </View>
      </ScrollView>

      {/* ۴. نوار چسبناک پایینی جهت دانلود فاکتور رسمی PDF */}
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
            دانلود فاکتور خرید فیزیکی (PDF)
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default TrackOrderScreen;

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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaColLeft: {
    alignItems: "flex-start",
  },
  metaColRight: {
    alignItems: "flex-end",
  },
  totalPrice: {
    fontFamily: "IRANYekanXFaNum-Bold",
    marginTop: 4,
  },
  orderNumber: {
    fontFamily: "IRANYekanXFaNum-Bold",
    marginTop: 4,
  },
  cardDivider: {
    height: 1,
    width: "100%",
    marginVertical: 12,
  },
  metaFooter: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shippingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trackerSection: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 20,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  timelineContainer: {
    width: "100%",
    paddingRight: 12, // ایجاد فاصله تا گره‌ها در طراحی راست‌چین
  },
  timelineItem: {
    flexDirection: "row-reverse", // تراز راست‌به‌چپ: گره راست، متن چپ
    alignItems: "flex-start",
    paddingBottom: 24,
    position: "relative",
    width: "100%",
  },
  timelineLine: {
    position: "absolute",
    right: 11, // موقعیت تراز خط عمودی دقیقاً در مرکز گره‌های سمت راست
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
  nodeWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
  },
  nodePulse: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  timelineContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
  },
  timeText: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  etaBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  driverCard: {
    borderWidth: 1,
    padding: 12,
    flexDirection: "row", // قرارگیری آواتار در راست، دکمه تماس در چپ
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  callBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  driverInfo: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
  },
  driverCode: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Regular",
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
