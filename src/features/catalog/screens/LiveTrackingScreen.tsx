// src/features/catalog/screens/LiveTrackingScreen.tsx

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
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export const LiveTrackingScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // سیستم انیمیشن بومی ری‌اکت نیتیو برای ایجاد افکت ضربان رادار
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // حلقه تکرارشونده و نرم ضربان رادار
    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 2.2,
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
    <ScreenWrapper style={styles.wrapperOverride}>
      {/* ۱. نقشه فیکس شده پس‌زمینه (تمام صفحه) */}
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuChIfwbXtM8GD4WRILFmXGIpSQ1qV_sarO1p36EfUXD1cvNvLbQOX5NHpLGb6i0mbbqq84LKOI3cL2q_HfqSK4mdKbOuhlW2NoplrLRFxX9bzevnH4o-76rgyy8mvArISN2l2IxxZbHCKc1pJh1OQ9rWxSjq_x_UrcUOa2lxgrjmW2UwlDwt4sBOAtA3WDZRJC08sqEoKRE5e0JbxCBYP0LUERqXEzydWfAiENFMTfEdTA_BBn4YzlR4g",
          }}
          style={styles.mapImage}
        />

        {/* مارکر فیزیکی تکنسین روی نقشه (بالا سمت چپ) */}
        <View style={[styles.markerContainer, { top: "28%", left: "20%" }]}>
          {/* دایره متحرک ضربان پشت مارکر */}
          <Animated.View
            style={[
              styles.pulseCircle,
              {
                backgroundColor: colors.secondary,
                transform: [{ scale: pulseAnim }],
                opacity: opacityAnim,
              },
            ]}
          />
          <View
            style={[styles.techMarker, { backgroundColor: colors.primary }]}
          >
            <Ionicons name="construct" size={16} color={colors.onPrimary} />
          </View>
        </View>

        {/* مارکر فیزیکی مقصد ساختمان کاربر (وسط سمت راست) */}
        <View style={[styles.markerContainer, { top: "42%", left: "60%" }]}>
          <View
            style={[
              styles.userMarker,
              { backgroundColor: colors.surface, borderColor: colors.primary },
            ]}
          >
            <Ionicons name="home" size={14} color={colors.textPrimary} />
          </View>
        </View>
      </View>

      {/* ۲. هدر شناور و شیشه‌ای روی نقشه با پدینگ امن بالای صفحه */}
      <View
        style={[
          styles.floatingHeader,
          { top: insets.top + 8, paddingHorizontal: spacing.lg },
        ]}
      >
        {/* کلید برگشت به چپ */}
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.8}
          style={[
            styles.backButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* تگ اعزام اضطراری به رنگ کهربایی با ضربان رادار */}
        <View
          style={[
            styles.dispatchTag,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <AppText variant="labelSm" style={{ color: colors.secondary }}>
            اعزام اضطراری
          </AppText>
          <View
            style={[styles.statusDot, { backgroundColor: colors.secondary }]}
          />
        </View>
      </View>

      {/* ۳. پنل کشویی پایینی مشخصات و استپر (BottomSheet Panel) */}
      <View
        style={[
          styles.bottomSheet,
          {
            backgroundColor: colors.surface,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: insets.bottom + 12,
          },
        ]}
      >
        {/* دستگیره کوچک تزیینی کشو در بالا وسط */}
        <View style={styles.dragHandleContainer}>
          <View
            style={[styles.dragHandle, { backgroundColor: colors.border }]}
          />
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          {/* بخش زمان تقریبی رسیدن */}
          <View style={styles.etaContainer}>
            <AppText
              variant="h1"
              style={[styles.etaText, { color: colors.textPrimary }]}
            >
              رسیدن تا ۸ دقیقه دیگر
            </AppText>
            <View style={styles.etaSubRow}>
              <AppText variant="body" color="muted">
                تکنسین در مسیر ساختمان شما
              </AppText>
              <Ionicons
                name="car"
                size={16}
                color={colors.secondary}
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>

          {/* استپر پیشرفت افقی مراحل اعزام تکنسین (مراحل ۳ گانه RTL) */}
          <View style={styles.stepperSection}>
            {/* خط کشیده شده در پس‌زمینه استپر */}
            <View
              style={[styles.stepperLine, { backgroundColor: colors.border }]}
            />
            <View
              style={[
                styles.stepperLineActive,
                { backgroundColor: colors.primary },
              ]}
            />

            {/* مرحله اول: تایید کار (کامل شده) */}
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircleActive,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons name="checkmark" size={12} color={colors.onPrimary} />
              </View>
              <AppText variant="labelSm" color="muted" style={styles.stepLabel}>
                تایید درخواست
              </AppText>
            </View>

            {/* مرحله دوم: در مسیر (فعال و در حال انجام) */}
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircleCurrent,
                  {
                    borderColor: colors.primary,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                <View
                  style={[
                    styles.currentDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              </View>
              <AppText
                variant="labelSm"
                style={[styles.stepLabel, { color: colors.textPrimary }]}
              >
                در مسیر
              </AppText>
            </View>

            {/* مرحله سوم: رسیدن به مقصد (در انتظار) */}
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCirclePending,
                  {
                    backgroundColor: colors.surfaceDim,
                    borderColor: colors.border,
                  },
                ]}
              />
              <AppText variant="labelSm" color="muted" style={styles.stepLabel}>
                رسیدن به محل
              </AppText>
            </View>
          </View>

          {/* کارت مشخصات تکنسین ارشد اعزام‌شده و دکمه‌های چت/تماس */}
          <View
            style={[
              styles.techProfileCard,
              { borderColor: colors.border, borderRadius: borderRadius.lg },
            ]}
          >
            {/* دکمه‌های تماس بومی در سمت چپ کارت */}
            <View style={styles.commButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.commBtn, { backgroundColor: colors.primary }]}
              >
                <Ionicons
                  name="chatbubble-ellipses"
                  size={18}
                  color={colors.onPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.commBtn,
                  {
                    borderColor: colors.border,
                    borderWidth: 1,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                <Ionicons name="call" size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* اطلاعات تکنسین در سمت راست کارت */}
            <View style={styles.techDetails}>
              <AppText variant="h2" style={{ color: colors.textPrimary }}>
                مهندس مهدی احمدی
              </AppText>
              <View style={styles.ratingRow}>
                <AppText variant="labelSm" color="muted">
                  ۴.۹ (۱۲۰+ ماموریت موفق)
                </AppText>
                <Ionicons
                  name="star"
                  size={12}
                  color={colors.secondary}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>

            {/* تصویر تکنسین */}
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKTMW7IqffbGh8RKIwherTaF7qvsCMY_agSOlMuxNsm4bBkSVJQ2hpafsIaNe_4LrWVwag9525My17NXU3REYjnvpwZkLhDzof5OmNCkOqTGUfN-N5yTsbLWP-s4vqmz-CVWbTtxa5XgxJ2SsK2JW1xFy9Hz-mulp7gFMe7SQJ7K7pb2s5qVzPVvXmn0CdqbzV6zNIFtMRXCMKEMuX8WZjH_fgGMXfblqjbQm80PSNPJ7x2cKcO0BFYA",
              }}
              style={styles.techAvatar}
            />
          </View>

          {/* دکمه لغو درخواست در کف کشو */}
          <TouchableOpacity activeOpacity={0.7} style={styles.cancelButton}>
            <AppText variant="button" style={{ color: colors.error }}>
              لغو درخواست امداد
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default LiveTrackingScreen;

const styles = StyleSheet.create({
  wrapperOverride: {
    paddingTop: 0, // هدر شناور است و نیاز به پدینگ روت ندارد
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  markerContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  pulseCircle: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  techMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  floatingHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dispatchTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 8,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 110,
    elevation: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  dragHandleContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  etaContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  etaText: {
    fontSize: 22,
    fontWeight: "700",
  },
  etaSubRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  stepperSection: {
    width: "100%",
    flexDirection: "row-reverse", // چیدمان استپر راست‌به‌چپ در فارسی
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
    height: 60,
    marginBottom: 24,
  },
  stepperLine: {
    position: "absolute",
    top: 15,
    left: 48,
    right: 48,
    height: 2,
    zIndex: 1,
  },
  stepperLineActive: {
    position: "absolute",
    top: 15,
    right: 48,
    width: "45%", // پر شدن نصف خط استپر برای نشان دادن مرحله در مسیر
    height: 2,
    zIndex: 2,
  },
  stepItem: {
    alignItems: "center",
    zIndex: 10,
  },
  stepCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleCurrent: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  currentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepCirclePending: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  stepLabel: {
    fontSize: 10,
    marginTop: 6,
  },
  techProfileCard: {
    flexDirection: "row", // قرارگیری آواتار در راست و دکمه‌ها در چپ
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  commButtons: {
    flexDirection: "row",
    gap: 8,
  },
  commBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  techDetails: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  techAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  cancelButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
});
