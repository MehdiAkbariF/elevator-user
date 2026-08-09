// src/features/catalog/screens/MaintenancePlansScreen.tsx

import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 350;

const MaintenancePlansScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // محاسبه پویای حاشیه پایین گوشی

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
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
            پلان‌های نگهداری آسانسور
          </AppText>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 140 + (64 + insets.bottom),
          },
        ]}
      >
        {/* ۱. بخش تصویر هیرو */}
        <View style={[styles.heroContainer, { borderRadius: borderRadius.lg }]}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwHVRuCiZtyVh_qv_UmJ0W4jM1JFdCigyGh-DMuVDhPwzcqAwpNyeipsy4k5-yHgSIZBWqQuao7-p-oYI0Qvbwds46bBWECLkzwSTY-CwgsYl9czQ43v-EunFug_ODUAHzBwUtBn8LB-ma8g84ATClWUmKfli4U0zKcmR7wVwLK4ikAYX4H12JPFMHlhtjPPRbsHK1TvlYWUTk-VAkNmW32m3TRv-4krzgTN7IdpfEAnEpviW00OYOSw",
            }}
            style={styles.heroImage}
          />
          <View style={styles.overlay} />

          <View style={styles.heroContent}>
            <AppText variant="h1" style={styles.heroTitle}>
              سرویس‌های پیشگیرانه؛ خداحافظی با خرابی‌های ناگهانی آسانسور
            </AppText>

            <View style={styles.badgeContainer}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <AppText variant="labelSm" style={{ color: "#FFFFFF" }}>
                  ۷۰٪ خرابی کمتر آسانسور
                </AppText>
              </View>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <AppText variant="labelSm" style={{ color: "#FFFFFF" }}>
                  افزایش طول عمر موتور گیرلس
                </AppText>
              </View>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <AppText variant="labelSm" style={{ color: "#FFFFFF" }}>
                  تاییدیه رسمی استاندارد و بیمه
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* ۲. بخش چک‌لیست عمومی */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText
            variant="h2"
            style={[styles.sectionHeading, { color: colors.textPrimary }]}
          >
            در هر بازدید فنی چه مواردی بررسی می‌شود؟
          </AppText>

          <View
            style={[
              styles.checklistCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            {[
              "تست و کالیبراسیون ترمزهای ایمنی (پاراشوت)",
              "روغن‌کاری و آچارکشی ریل‌های راهنمای کابین",
              "سنجش سایش و زاویه شیار سیم بکسل‌های فولادی",
              "بررسی کارکرد فتوسل و سنسورهای ایمنی درب طبقات",
              "تست باتری پشتیبان و آژیر نجات اضطراری کابین",
            ].map((item, index, arr) => {
              const isLast = index === arr.length - 1;
              return (
                <View
                  key={index}
                  style={[
                    styles.checkRow,
                    !isLast && {
                      borderBottomColor: colors.border,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <AppText
                    variant="body"
                    color="muted"
                    style={styles.checkText}
                  >
                    {item}
                  </AppText>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={colors.secondary}
                    style={{ marginLeft: 12 }}
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* ۳. بخش پلان‌های نگهداری */}
        <View style={{ marginTop: spacing.xl }}>
          <AppText
            variant="h2"
            style={[styles.sectionHeading, { color: colors.textPrimary }]}
          >
            پلان‌های سرویس و نگهداری دوره‌ای
          </AppText>

          <View style={[styles.plansContainer, { gap: spacing.md }]}>
            {/* پلان برنزی */}
            <View
              style={[
                styles.planCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <AppText
                variant="h2"
                style={[styles.planTitle, { color: colors.textPrimary }]}
              >
                پلان برنزی (پایه)
              </AppText>
              <AppText variant="body" color="muted" style={styles.planDesc}>
                بازدید و سرویس منظم ماهیانه + ارائه فاکتور سلامت و گزارش فنی
                آسانسور روی پنل کاربری اپلیکیشن.
              </AppText>
            </View>

            {/* پلان نقره‌ای (ویژه و برجسته) */}
            <View
              style={[
                styles.planCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.secondary,
                  borderWidth: 2,
                  borderRadius: borderRadius.lg,
                  position: "relative",
                },
              ]}
            >
              <View
                style={[
                  styles.bestValueTag,
                  {
                    backgroundColor: colors.secondary,
                    borderRadius: borderRadius.sm,
                  },
                ]}
              >
                <AppText variant="labelSm" style={{ color: "#FFFFFF" }}>
                  محبوب‌ترین پلان
                </AppText>
              </View>

              <AppText
                variant="h2"
                style={[
                  styles.planTitle,
                  { color: colors.textPrimary, marginTop: 8 },
                ]}
              >
                پلان نقره‌ای (استاندارد)
              </AppText>
              <AppText variant="body" color="muted" style={styles.planDesc}>
                تمام خدمات پلان برنزی + اعزام کاملاً رایگان تکنسین در زمان وقوع
                خرابی‌های اضطراری آسانسور ساختمان شما.
              </AppText>
            </View>

            {/* پلان طلایی */}
            <View
              style={[
                styles.planCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <AppText
                variant="h2"
                style={[styles.planTitle, { color: colors.textPrimary }]}
              >
                پلان طلایی (پیشرفته)
              </AppText>
              <AppText variant="body" color="muted" style={styles.planDesc}>
                تمام خدمات پلان نقره‌ای + تأمین قطعات مصرفی کوچک به صورت رایگان
                + اعزام تکنسین با اولویت اول (زیر ۳۰ دقیقه).
              </AppText>
            </View>
          </View>
        </View>

        {/* ۴. بنر تعهد */}
        <View
          style={[
            styles.trustBanner,
            {
              backgroundColor: "rgba(217, 119, 6, 0.1)",
              borderColor: "rgba(217, 119, 6, 0.3)",
              borderRadius: borderRadius.lg,
              marginTop: spacing.xl,
            },
          ]}
        >
          <AppText variant="body" color="muted" style={styles.trustText}>
            تمامی مشترکین پلان‌های طلایی و نقره‌ای ایکس الوتور در زمان بروز
            هرگونه شرایط اضطراری در آسانسور، در اولویت اول صف اعزام تکنیسین‌های
            فنی قرار می‌گیرند.
          </AppText>
          <Ionicons
            name="shield-checkmark"
            size={24}
            color="#D97706"
            style={{ marginLeft: 12, marginTop: 2 }}
          />
        </View>
      </ScrollView>

      {/* ۵. دکمه چسبنده پایینی درخواست مشاوره */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            bottom: 64 + insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/project-inquiry")}
          style={[
            styles.submitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.md },
          ]}
        >
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            درخواست مشاوره رایگان و استعلام قیمت قرارداد
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی سراسری */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

// تبدیل به صادرکننده پیش‌فرض جهت حل قطعی مشکل تایپ‌اسکریپت
export default MaintenancePlansScreen;

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
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroContainer: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 28,
    textAlign: "right",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 6,
    width: "100%",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  checklistCard: {
    borderWidth: 1,
    padding: 16,
  },
  checkRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
  },
  checkText: {
    textAlign: "right",
    flex: 1,
  },
  plansContainer: {
    width: "100%",
  },
  planCard: {
    borderWidth: 1,
    padding: 16,
  },
  bestValueTag: {
    position: "absolute",
    top: -12,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  planTitle: {
    textAlign: "right",
    marginBottom: 6,
  },
  planDesc: {
    textAlign: "right",
    lineHeight: 20,
    fontSize: 13,
  },
  trustBanner: {
    borderWidth: 1,
    padding: 16,
    flexDirection: "row-reverse",
    alignItems: "flex-start",
  },
  trustText: {
    textAlign: "right",
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#D97706",
  },
  bottomActionBar: {
    position: "absolute",
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
    alignItems: "center",
    justifyContent: "center",
  },
});
