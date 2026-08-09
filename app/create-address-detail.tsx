// src/features/catalog/screens/CreateAddressDetailScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
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
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const CreateAddressDetailScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // استیت‌های تعاملی فرم ثبت جزئیات آدرس
  const [plaque, setPlaque] = useState("");
  const [unit, setUnit] = useState("");
  const [floor, setFloor] = useState("");
  const [isRecipient, setIsRecipient] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<
    "home" | "work" | "custom"
  >("home");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/create-address"); // بازگشت ایمن به نقشه زنده
    }
  };

  const handleSaveAndFinish = () => {
    // ذخیره نهایی آدرس و بازگشت به لیست آدرس‌های من
    router.replace("/addresses");
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
            جزئیات نشانی
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
        {/* ۱. کادر پیش‌نمایش آدرس تقریبی تخمین‌زده شده بر اساس نقشه */}
        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: colors.surfaceDim,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <Ionicons
            name="location-outline"
            size={16}
            color={colors.textSecondary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="body" color="muted" style={styles.previewText}>
            محدوده تقریبی: تهران، محله جردن، خیابان آرش غربی
          </AppText>
        </View>

        {/* ۲. گرید متقرن ۳ ستونه مشخصات واحد مسکونی به صورت کاملاً RTL */}
        <View style={styles.specificsGrid}>
          {/* ستون طبقه */}
          <View style={styles.gridCol}>
            <AppText
              variant="labelSm"
              color="primary"
              style={styles.inputLabel}
            >
              طبقه
            </AppText>
            <TextInput
              value={floor}
              onChangeText={setFloor}
              keyboardType="number-pad"
              placeholder="مثلا: ۲"
              placeholderTextColor={colors.outline}
              style={[
                styles.gridInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* ستون واحد */}
          <View style={styles.gridCol}>
            <AppText
              variant="labelSm"
              color="primary"
              style={styles.inputLabel}
            >
              واحد
            </AppText>
            <TextInput
              value={unit}
              onChangeText={setUnit}
              placeholder="مثلا: ۴"
              placeholderTextColor={colors.outline}
              style={[
                styles.gridInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* ستون پلاک */}
          <View style={styles.gridCol}>
            <AppText
              variant="labelSm"
              color="primary"
              style={styles.inputLabel}
            >
              پلاک *
            </AppText>
            <TextInput
              value={plaque}
              onChangeText={setPlaque}
              keyboardType="number-pad"
              placeholder="مثلا: ۱۲"
              placeholderTextColor={colors.outline}
              style={[
                styles.gridInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>
        </View>

        {/* ۳. بخش اطلاعات تماس گیرنده مأموریت در محل */}
        <View style={styles.section}>
          <AppText variant="body" color="primary" style={styles.sectionHeading}>
            گیرنده مأموریت در محل ساختمان
          </AppText>

          {/* چک‌باکس تعاملی من خودم گیرنده هستم */}
          <TouchableOpacity
            onPress={() => setIsRecipient(!isRecipient)}
            activeOpacity={0.8}
            style={styles.checkboxRow}
          >
            <AppText variant="body" style={{ color: colors.textPrimary }}>
              خودم تحویل‌گیرنده هستم
            </AppText>
            <Ionicons
              name={isRecipient ? "checkbox" : "square-outline"}
              size={20}
              color={isRecipient ? colors.primary : colors.outline}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>

          <View style={[styles.formStack, { gap: spacing.lg }]}>
            {/* فیلد نام گیرنده */}
            <View style={styles.formGroup}>
              <AppText
                variant="labelSm"
                color="primary"
                style={styles.inputLabel}
              >
                نام و نام خانوادگی گیرنده *
              </AppText>
              <TextInput
                value={recipientName}
                onChangeText={setRecipientName}
                placeholder="مانند: علی رضایی"
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

            {/* فیلد شماره تماس گیرنده */}
            <View style={styles.formGroup}>
              <AppText
                variant="labelSm"
                color="primary"
                style={styles.inputLabel}
              >
                شماره موبایل گیرنده *
              </AppText>
              <TextInput
                value={recipientPhone}
                onChangeText={setRecipientPhone}
                keyboardType="phone-pad"
                placeholder="۰۹۱۲XXXXXXX"
                placeholderTextColor={colors.outline}
                maxLength={11}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: colors.surfaceDim,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                    color: colors.textPrimary,
                    fontFamily: "IRANYekanXFaNum-Regular",
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* ۴. انتخاب برچسب آدرس (ذخیره این نشانی به عنوان...) */}
        <View style={[styles.section, { marginTop: spacing.xl }]}>
          <AppText variant="body" color="primary" style={styles.sectionHeading}>
            ذخیره این نشانی به عنوان:
          </AppText>

          <View style={styles.pillsContainer}>
            {/* برچسب خانه */}
            <TouchableOpacity
              onPress={() => setSelectedLabel("home")}
              activeOpacity={0.8}
              style={[
                styles.pill,
                {
                  backgroundColor:
                    selectedLabel === "home" ? colors.primary : colors.surface,
                  borderColor:
                    selectedLabel === "home" ? colors.primary : colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{
                  color:
                    selectedLabel === "home"
                      ? colors.onPrimary
                      : colors.textSecondary,
                }}
              >
                خانه
              </AppText>
            </TouchableOpacity>

            {/* برچسب محل کار */}
            <TouchableOpacity
              onPress={() => setSelectedLabel("work")}
              activeOpacity={0.8}
              style={[
                styles.pill,
                {
                  backgroundColor:
                    selectedLabel === "work" ? colors.primary : colors.surface,
                  borderColor:
                    selectedLabel === "work" ? colors.primary : colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{
                  color:
                    selectedLabel === "work"
                      ? colors.onPrimary
                      : colors.textSecondary,
                }}
              >
                محل کار
              </AppText>
            </TouchableOpacity>

            {/* برچسب دلخواه */}
            <TouchableOpacity
              onPress={() => setSelectedLabel("custom")}
              activeOpacity={0.8}
              style={[
                styles.pill,
                {
                  backgroundColor:
                    selectedLabel === "custom"
                      ? colors.primary
                      : colors.surface,
                  borderColor:
                    selectedLabel === "custom" ? colors.primary : colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <AppText
                variant="body"
                style={{
                  color:
                    selectedLabel === "custom"
                      ? colors.onPrimary
                      : colors.textSecondary,
                }}
              >
                برچسب دلخواه
              </AppText>
              <Ionicons
                name="add"
                size={16}
                color={
                  selectedLabel === "custom"
                    ? colors.onPrimary
                    : colors.textSecondary
                }
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ۵. دکمه چسبنده و شناور پایینی ذخیره نهایی */}
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
          onPress={handleSaveAndFinish} // تایید نهایی و بازگشت به آدرس‌ها
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
            ذخیره نهایی و اتمام
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default CreateAddressDetailScreen;

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
  previewCard: {
    borderWidth: 1,
    padding: 12,
    flexDirection: "row-reverse", // راست‌به‌چپ کردن پیش‌نمایش آدرس
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 24,
  },
  previewText: {
    textAlign: "right",
  },
  specificsGrid: {
    flexDirection: "row-reverse", // راست‌به‌چپ کردن ۳ فیلد متقارن
    gap: 12,
    width: "100%",
    marginBottom: 24,
  },
  gridCol: {
    flex: 1,
    alignItems: "flex-end",
  },
  inputLabel: {
    marginBottom: 8,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  gridInput: {
    width: "100%",
    height: 44,
    borderWidth: 1,
    paddingHorizontal: 12,
    textAlign: "right",
    fontSize: 14,
  },
  section: {
    width: "100%",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  checkboxRow: {
    flexDirection: "row-reverse", // تراز راست‌به‌چپ چک‌باکس
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    width: "100%",
  },
  formStack: {
    width: "100%",
  },
  formGroup: {
    width: "100%",
    alignItems: "flex-end",
  },
  textInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: "right",
    fontSize: 14,
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
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
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
