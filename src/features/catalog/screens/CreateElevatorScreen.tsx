// src/features/catalog/screens/CreateElevatorScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CreateElevatorScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // استیت‌های تعاملی فرم ثبت آسانسور
  const [nickname, setNickname] = useState("");
  const [stops, setStops] = useState("");
  const [address, setAddress] = useState("");
  const [systemType, setSystemType] = useState<
    "traction" | "hydraulic" | "unknown"
  >("unknown");
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const capacities = [
    "۴ نفره (۳۲۰ کیلوگرم)",
    "۶ نفره (۴۵۰ کیلوگرم)",
    "۸ نفره (۶۳۰ کیلوگرم)",
    "بیشتر",
  ];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/my-elevators");
    }
  };

  const handleSave = () => {
    // بازگشت هوشمند به لیست آسانسورها پس از ذخیره‌سازی موقت در فاز اول
    router.replace("/my-elevators");
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
            ثبت آسانسور جدید
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
            paddingBottom: 100 + insets.bottom, // ممانعت از تداخل با دکمه ثبت چسبناک کف
          },
        ]}
      >
        {/* ۱. کادر راهنمای فلت و بسیار ملایم با تم کهربایی آلارم */}
        <View
          style={[
            styles.guidanceCard,
            {
              backgroundColor: "rgba(217, 119, 6, 0.1)",
              borderColor: "rgba(217, 119, 6, 0.2)",
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <Ionicons
            name="information-circle"
            size={20}
            color="#D97706"
            style={{ marginLeft: 12, marginTop: 2 }}
          />
          <AppText
            variant="body"
            style={[styles.guidanceText, { color: "#92400E" }]}
          >
            پر کردن اطلاعات عمومی کافی است. اگر مشخصات فنی آسانسور را نمی‌دانید،
            فقط از پلاک فلزی مشخصات داخل کابین عکس بگیرید.
          </AppText>
        </View>

        {/* ۲. فیلدهای متنی فرم با تراز راست‌چین فارسی */}
        <View style={[styles.form, { gap: spacing.lg }]}>
          {/* فیلد نام مستعار */}
          <View style={styles.formGroup}>
            <AppText
              variant="labelSm"
              color="primary"
              style={styles.inputLabel}
            >
              نام مستعار ساختمان / آسانسور *
            </AppText>
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="مانند: آپارتمان مسکونی - آسانسور اصلی"
              placeholderTextColor={colors.outline}
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* فیلد تعداد طبقات */}
          <View style={styles.formGroup}>
            <AppText
              variant="labelSm"
              color="primary"
              style={styles.inputLabel}
            >
              تعداد طبقات / توقف‌ها *
            </AppText>
            <TextInput
              value={stops}
              onChangeText={setStops}
              keyboardType="number-pad"
              placeholder="مانند: ۵"
              placeholderTextColor={colors.outline}
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* فیلد نشانی دقیق با دکمه لوکیشن چپ‌چین */}
          <View style={styles.formGroup}>
            <AppText
              variant="labelSm"
              color="primary"
              style={styles.inputLabel}
            >
              نشانی دقیق ساختمان *
            </AppText>
            <View style={styles.textAreaWrapper}>
              <TextInput
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                placeholder="نشانی دقیق ساختمان را وارد کنید..."
                placeholderTextColor={colors.outline}
                style={[
                  styles.textArea,
                  {
                    backgroundColor: colors.surfaceDim,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                    color: colors.textPrimary,
                  },
                ]}
              />
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.locationIcon}
              />
            </View>
          </View>
        </View>

        {/* ۳. بخش انتخاب نوع سیستم محرکه آسانسور */}
        <View style={[styles.section, { marginTop: spacing.xl }]}>
          <AppText variant="body" color="primary" style={styles.sectionHeading}>
            نوع سیستم محرکه آسانسور
          </AppText>

          <View style={styles.systemGrid}>
            {/* گزینه ۱: کششی */}
            <TouchableOpacity
              onPress={() => setSystemType("traction")}
              activeOpacity={0.8}
              style={[
                styles.systemCard,
                {
                  backgroundColor:
                    systemType === "traction" ? colors.primary : colors.surface,
                  borderColor:
                    systemType === "traction" ? colors.primary : colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color={
                  systemType === "traction"
                    ? colors.onPrimary
                    : colors.textPrimary
                }
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.systemCardText,
                  {
                    color:
                      systemType === "traction"
                        ? colors.onPrimary
                        : colors.textPrimary,
                  },
                ]}
              >
                کششی (سیم‌بکسلی)
              </AppText>
            </TouchableOpacity>

            {/* گزینه ۲: هیدرولیک */}
            <TouchableOpacity
              onPress={() => setSystemType("hydraulic")}
              activeOpacity={0.8}
              style={[
                styles.systemCard,
                {
                  backgroundColor:
                    systemType === "hydraulic"
                      ? colors.primary
                      : colors.surface,
                  borderColor:
                    systemType === "hydraulic" ? colors.primary : colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <Ionicons
                name="swap-vertical-outline"
                size={24}
                color={
                  systemType === "hydraulic"
                    ? colors.onPrimary
                    : colors.textPrimary
                }
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.systemCardText,
                  {
                    color:
                      systemType === "hydraulic"
                        ? colors.onPrimary
                        : colors.textPrimary,
                  },
                ]}
              >
                هیدرولیک (جک ملخی)
              </AppText>
            </TouchableOpacity>

            {/* گزینه ۳: نمی‌دانم */}
            <TouchableOpacity
              onPress={() => setSystemType("unknown")}
              activeOpacity={0.8}
              style={[
                styles.systemCard,
                {
                  backgroundColor:
                    systemType === "unknown"
                      ? colors.secondary
                      : colors.surface,
                  borderColor:
                    systemType === "unknown" ? colors.secondary : colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={
                  systemType === "unknown" ? "#FFFFFF" : colors.textPrimary
                }
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.systemCardText,
                  {
                    color:
                      systemType === "unknown" ? "#FFFFFF" : colors.textPrimary,
                  },
                ]}
              >
                نمی‌دانم
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۴. بخش انتخاب ظرفیت کابین */}
        <View style={[styles.section, { marginTop: spacing.xl }]}>
          <AppText variant="body" color="primary" style={styles.sectionHeading}>
            ظرفیت کابین آسانسور
          </AppText>

          <View style={styles.pillsContainer}>
            {capacities.map((cap) => {
              const isSelected = selectedCapacity === cap;
              return (
                <TouchableOpacity
                  key={cap}
                  onPress={() => setSelectedCapacity(cap)}
                  activeOpacity={0.8}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.surface,
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderRadius: borderRadius.full,
                    },
                  ]}
                >
                  <AppText
                    variant="body"
                    style={{
                      color: isSelected
                        ? colors.onPrimary
                        : colors.textSecondary,
                    }}
                  >
                    {cap}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ۵. بخش آپلود تصویر پلاک فلزی داخل کابین */}
        <View style={[styles.section, { marginTop: spacing.xl }]}>
          <View
            style={[
              styles.uploaderBox,
              {
                backgroundColor: colors.surfaceDim,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View
              style={[
                styles.uploaderIconCircle,
                { backgroundColor: colors.surface },
              ]}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={colors.textPrimary}
              />
            </View>
            <AppText variant="body" color="muted" style={styles.uploaderText}>
              عکس‌برداری از پلاک فلزی داخل کابین آسانسور
            </AppText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.cameraBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <Ionicons
                name="camera"
                size={16}
                color={colors.textPrimary}
                style={{ marginLeft: 8 }}
              />
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                باز کردن دوربین
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ۶. دکمه چسبنده و شناور ثبت نهایی در انتهای صفحه */}
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
          onPress={handleSave}
          activeOpacity={0.8}
          style={[
            styles.submitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.md },
          ]}
        >
          <Ionicons
            name="save-outline"
            size={18}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            ذخیره و افزودن به آسانسورهای من
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// خروجی پیش‌فرض بومی
export default CreateElevatorScreen;

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
  guidanceCard: {
    borderWidth: 1,
    padding: 16,
    flexDirection: "row-reverse", // راست‌به‌چپ کردن کادر اطلاعات راهنما
    alignItems: "flex-start",
    marginBottom: 24,
  },
  guidanceText: {
    textAlign: "right",
    flex: 1,
    lineHeight: 20,
    fontSize: 13,
  },
  form: {
    width: "100%",
  },
  formGroup: {
    width: "100%",
    alignItems: "flex-end", // راست‌چین کردن عنوان فیلدها
  },
  inputLabel: {
    marginBottom: 8,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  textInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: "right",
    fontSize: 14,
  },
  textAreaWrapper: {
    width: "100%",
    position: "relative",
  },
  textArea: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    padding: 16,
    paddingLeft: 44, // ایجاد فاصله چپ برای قرارگیری ایکون لوکیشن
    textAlign: "right",
    fontSize: 14,
  },
  locationIcon: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  section: {
    width: "100%",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  systemGrid: {
    flexDirection: "row-reverse", // راست‌به‌چپ کردن گزینه‌های ۳ تایی
    gap: 8,
    width: "100%",
  },
  systemCard: {
    flex: 1,
    height: 90,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  systemCardText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 14,
  },
  pillsContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 8,
    width: "100%",
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  uploaderBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploaderIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploaderText: {
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center",
  },
  cameraBtn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
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
