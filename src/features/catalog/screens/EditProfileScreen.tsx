// src/features/catalog/screens/EditProfileScreen.tsx

import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const EditProfileScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // استیت‌های اطلاعات شخصی کاربر
  const [fullName, setFullName] = useState("علی رضایی");
  const [nationalId, setNationalId] = useState("۰۰۱۲۳۴۵۶۷۸");
  const [email, setEmail] = useState("ali@example.com");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile"); // بازگشت ایمن به حساب کاربری
    }
  };

  const handleSave = () => {
    // بازگشت به صفحه پروفایل پس از شبیه‌سازی ذخیره‌سازی موفق
    router.replace("/profile");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی با ناوبری و دکمه برگشت چپ‌چین شده */}
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
            ویرایش حساب کاربری
          </AppText>
        </View>
        <View style={{ width: 40 }} /> {/* اسپیسر متقارت هدر */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 100 + insets.bottom, // ممانعت از تداخل با دکمه چسبناک پایین صفحه
          },
        ]}
      >
        {/* ۱. بخش تصویر آواتار دایره‌ای با آیکون شناور دوربین عکاسی */}
        <View style={styles.avatarSection}>
          <View
            style={[styles.avatarContainer, { borderColor: colors.border }]}
          >
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4L-NWmhvBF07r4LoZc-6ducktrj-Cf9UGJgq71U-o3TIG0V-dCLi021P70gLnJRbMQDu_h6bDrMmQGFe_Ig822gL5SfGrc3IziMBVlaKI7e1qwDemZVWs0yUw3aPqpQ0IB3gk7tVCRc_N6bB7wJ7wJEwR9lEpz9ekZaEoRadiBGKpnw0KW2dD-q9vmICBEXssgWwU6sMmjjMIIumRCwLaOYEFXltQGiS2H_vxqho6TjNpSUbGMbNOaQ",
              }}
              style={styles.avatarImage}
            />
            {/* دکمه شناور دوربین */}
            <View
              style={[
                styles.cameraBadge,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.surface,
                },
              ]}
            >
              <Ionicons name="camera" size={16} color={colors.onPrimary} />
            </View>
          </View>
        </View>

        {/* ۲. بخش اطلاعات شناسایی و شخصی (Personal Information) */}
        <View style={[styles.formSection, { gap: spacing.lg }]}>
          <AppText
            variant="labelSm"
            color="secondary"
            style={styles.sectionHeading}
          >
            اطلاعات هویتی و پرسنلی
          </AppText>

          {/* فیلد نام و نام خانوادگی */}
          <View style={styles.formGroup}>
            <AppText variant="body" color="primary" style={styles.inputLabel}>
              نام و نام خانوادگی
            </AppText>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="نام کامل خود را وارد کنید"
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

          {/* فیلد کد ملی */}
          <View style={styles.formGroup}>
            <AppText variant="body" color="primary" style={styles.inputLabel}>
              کد ملی ده رقمی
            </AppText>
            <TextInput
              value={nationalId}
              onChangeText={setNationalId}
              keyboardType="number-pad"
              placeholder="۰۰۱۲۳۴۵۶۷۸"
              placeholderTextColor={colors.outline}
              maxLength={10}
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

          {/* فیلد پست الکترونیکی */}
          <View style={styles.formGroup}>
            <AppText variant="body" color="primary" style={styles.inputLabel}>
              نشانی پست الکترونیکی (ایمیل)
            </AppText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="example@mail.com"
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
        </View>

        {/* ۳. بخش اطلاعات تماس کاربر (Contact Details) */}
        <View
          style={[
            styles.formSection,
            { gap: spacing.lg, marginTop: spacing.xl },
          ]}
        >
          <AppText
            variant="labelSm"
            color="secondary"
            style={styles.sectionHeading}
          >
            اطلاعات ارتباطی و تماس
          </AppText>

          {/* شماره همراه اصلی (غیرقابل تغییر از این کادر) */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <TouchableOpacity activeOpacity={0.7}>
                <AppText variant="labelSm" color="secondary">
                  تغییر شماره همراه
                </AppText>
              </TouchableOpacity>
              <AppText variant="body" color="primary" style={styles.inputLabel}>
                شماره تلفن همراه اصلی
              </AppText>
            </View>
            <TextInput
              value="۰۹۱۲۳۴۵۶۷۸۹"
              editable={false}
              style={[
                styles.disabledInput,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  color: colors.textSecondary,
                  fontFamily: "IRANYekanXFaNum-Regular",
                },
              ]}
            />
          </View>

          {/* شماره تماس اضطراری پشتیبان */}
          <View style={styles.formGroup}>
            <AppText variant="body" color="primary" style={styles.inputLabel}>
              شماره تماس اضطراری ساختمان / پشتیبان
            </AppText>
            <TextInput
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
              placeholder="۰۲۱۸۸۸۸XXXX"
              placeholderTextColor={colors.outline}
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
      </ScrollView>

      {/* ۴. نوار چسبناک پایینی جهت ذخیره نهایی تغییرات با حاشیه امن پویا */}
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
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            ذخیره تغییرات حساب کاربری
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی پروژه
export default EditProfileScreen;

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
  avatarSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 16,
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
    resizeMode: "cover",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0, // قرارگیری آیکون دوربین در پوزیشن غربی لبه پایینی آواتار
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  formSection: {
    width: "100%",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 8,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  formGroup: {
    width: "100%",
    alignItems: "flex-end",
  },
  inputLabel: {
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row", // تراز راست‌به‌چپ: عنوان در راست، دکمه تغییر در چپ
    justifyContent: "space-between",
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: "right",
    fontSize: 14,
  },
  disabledInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: "right",
    fontSize: 14,
    opacity: 0.6,
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
