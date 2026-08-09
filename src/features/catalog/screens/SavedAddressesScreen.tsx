// src/features/catalog/screens/SavedAddressesScreen.tsx

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

export const SavedAddressesScreen = () => {
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

  const handleCreateAddress = () => {
    // ناوبری هوشمند به صفحه جدید ثبت آدرس جدید ساختمان
    router.push("/create-address");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی با ناوبری دقیق چپ به راست */}
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
            آدرس‌های من
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // پدینگ پایینی بزرگ‌تر جهت عدم تداخل با دکمه چسبنده ثبت آدرس و نوار پایینی
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 150 + (64 + insets.bottom),
          },
        ]}
      >
        {/* تایتل و توضیحات بالای صفحه با تراز راست‌چین تمیز */}
        <View style={styles.introContainer}>
          <AppText
            variant="h1"
            style={[styles.mainTitle, { color: colors.textPrimary }]}
          >
            نشانی‌های ذخیره‌شده
          </AppText>
          <AppText variant="body" color="muted" style={styles.mainSubtitle}>
            محل‌های اعزام تکنسین برای آسانسورهای خود را مدیریت کنید.
          </AppText>
        </View>

        <View style={[styles.listContainer, { gap: spacing.md }]}>
          {/* آدرس ۱: منزل شخصی (دارای بردر راست تیره پیش‌فرض) */}
          <View
            style={[
              styles.addressCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View
              style={[styles.accentBorder, { backgroundColor: colors.primary }]}
            />

            <View style={styles.cardPadding}>
              {/* هدر کارت به صورت کاملاً RTL: تایتل و آیکون در راست، تگ پیش‌فرض در چپ */}
              <View style={styles.cardHeaderRow}>
                {/* تگ پیش‌فرض در چپ کارت */}
                <View
                  style={[
                    styles.defaultBadge,
                    {
                      backgroundColor: colors.surfaceDim,
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.textPrimary }}
                  >
                    پیش‌فرض
                  </AppText>
                </View>

                {/* تایتل و آیکون خانه در راست کارت با رعایت فاصله متقارن */}
                <View style={styles.cardTitleContainer}>
                  <AppText
                    variant="h2"
                    style={[styles.titleText, { color: colors.textPrimary }]}
                  >
                    منزل شخصی (آپارتمان)
                  </AppText>
                  <Ionicons
                    name="home"
                    size={18}
                    color={colors.secondary}
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </View>

              {/* جزئیات آدرس با تراز راست‌چین تمیز */}
              <View style={styles.addressDetails}>
                <AppText
                  variant="body"
                  color="muted"
                  style={styles.addressText}
                >
                  تهران، میدان ونک، کوچه هجدهم، پلاک ۱۲، زنگ ۴{"\n"}
                  طبقه ۴، واحد ۴B، دسترسی به چاه آسانسور شماره ۷
                </AppText>

                <View
                  style={[
                    styles.cardDivider,
                    { backgroundColor: colors.border },
                  ]}
                />

                {/* ردیف تحویل‌گیرنده */}
                <View style={styles.recipientRow}>
                  <AppText variant="body" style={{ color: colors.textPrimary }}>
                    تحویل‌گیرنده: علی رضایی
                  </AppText>
                  <Ionicons
                    name="person-outline"
                    size={14}
                    color={colors.textSecondary}
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </View>

              {/* خط مرزی پایینی برای کلیدهای اقدام */}
              <View
                style={[
                  styles.cardDivider,
                  { backgroundColor: colors.border, marginBottom: 12 },
                ]}
              />

              {/* کلیدهای تعاملی به صورت متون مینیمال لوکس (راست ویرایش، چپ حذف) */}
              <View style={styles.actionRow}>
                {/* ویرایش در راست */}
                <TouchableOpacity activeOpacity={0.7} style={styles.actionLink}>
                  <AppText variant="button" color="secondary">
                    ویرایش نشانی
                  </AppText>
                  <Ionicons
                    name="create-outline"
                    size={16}
                    color={colors.secondary}
                    style={{ marginRight: 6 }}
                  />
                </TouchableOpacity>

                {/* حذف در چپ */}
                <TouchableOpacity activeOpacity={0.7} style={styles.actionLink}>
                  <AppText variant="button" color="error">
                    حذف آدرس
                  </AppText>
                  <Ionicons
                    name="trash-outline"
                    size={16}
                    color={colors.error}
                    style={{ marginRight: 6 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* آدرس ۲: دفتر مرکزی */}
          <View
            style={[
              styles.addressCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View style={styles.cardPadding}>
              <View style={styles.cardHeaderRow}>
                {/* در این کارت تگ پیش‌فرض نداریم، بنابراین چپ خالی می‌ماند */}
                <View style={{ width: 10 }} />

                <View style={styles.cardTitleContainer}>
                  <AppText
                    variant="h2"
                    style={[styles.titleText, { color: colors.textPrimary }]}
                  >
                    دفتر مرکزی شرکت
                  </AppText>
                  <Ionicons
                    name="business"
                    size={18}
                    color={colors.textSecondary}
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </View>

              <View style={styles.addressDetails}>
                <AppText
                  variant="body"
                  color="muted"
                  style={styles.addressText}
                >
                  تهران، بزرگراه ستاری، بلوار فردوس، پلاک ۸۰۰{"\n"}
                  طبقه منفی ۲، هاب تعمیرات مرکزی ورودی کالا
                </AppText>

                <View
                  style={[
                    styles.cardDivider,
                    { backgroundColor: colors.border },
                  ]}
                />

                <View style={styles.recipientRow}>
                  <AppText variant="body" style={{ color: colors.textPrimary }}>
                    تحویل‌گیرنده: مهندس سهرابی
                  </AppText>
                  <Ionicons
                    name="person-outline"
                    size={14}
                    color={colors.textSecondary}
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.cardDivider,
                  { backgroundColor: colors.border, marginBottom: 12 },
                ]}
              />

              <View style={styles.actionRow}>
                {/* دکمه ویرایش و حذف در راست */}
                <View style={styles.actionRowRight}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.actionLink}
                  >
                    <AppText variant="button" color="secondary">
                      ویرایش
                    </AppText>
                    <Ionicons
                      name="create-outline"
                      size={16}
                      color={colors.secondary}
                      style={{ marginRight: 6 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.actionLink, { marginRight: 16 }]}
                  >
                    <AppText variant="button" color="error">
                      حذف
                    </AppText>
                    <Ionicons
                      name="trash-outline"
                      size={16}
                      color={colors.error}
                      style={{ marginRight: 6 }}
                    />
                  </TouchableOpacity>
                </View>

                {/* انتخاب به عنوان پیش‌فرض در چپ */}
                <TouchableOpacity activeOpacity={0.7}>
                  <AppText variant="button" color="muted">
                    انتخاب به عنوان پیش‌فرض
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* دکمه ثابت و چسبناک ثبت آدرس جدید (بالای نوار ناوبری پایینی) با اتصال به روت جدید */}
      <View
        style={[
          styles.floatingButtonContainer,
          { bottom: 64 + insets.bottom + 16, paddingHorizontal: spacing.lg },
        ]}
      >
        <TouchableOpacity
          onPress={handleCreateAddress}
          activeOpacity={0.9}
          style={[
            styles.floatingSubmitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
          ]}
        >
          <Ionicons
            name="pin"
            size={20}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            ثبت آدرس ساختمان جدید
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی سراسری با تب فعال پروفایل */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی پروژه
export default SavedAddressesScreen;

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
  introContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  mainTitle: {
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 6,
  },
  mainSubtitle: {
    fontSize: 13,
  },
  listContainer: {
    width: "100%",
  },
  addressCard: {
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  accentBorder: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardPadding: {
    padding: 20, // افزایش پدینگ داخلی برای ایجاد فضای تنفس عالی در لایوت
  },
  cardHeaderRow: {
    flexDirection: "row-reverse", // تراز راست‌به‌چپ سراسری هدر کارت
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  cardTitleContainer: {
    flexDirection: "row-reverse", // آیکون در سمت راست متن
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
  },
  defaultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addressDetails: {
    width: "100%",
    paddingRight: 26, // تراز عمودی دقیق پاراگراف آدرس با ایکون هدر بالایی در ساختار RTL
  },
  addressText: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 20,
  },
  cardDivider: {
    height: 1,
    width: "100%",
    marginVertical: 12,
  },
  recipientRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionRow: {
    flexDirection: "row-reverse", // چینش دکمه‌های اقدام از راست به چپ
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  actionRowRight: {
    flexDirection: "row-reverse",
  },
  actionLink: {
    flexDirection: "row-reverse",
    alignItems: "center",
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
