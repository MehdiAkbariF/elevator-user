// src/features/catalog/screens/PrivacyScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PrivacyScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const [activeSegment, setActiveSegment] = useState<"terms" | "privacy">(
    "terms",
  );
  const [searchQuery, setSearchQuery] = useState("");

  // استیت مدیریت آکاردئون فعال (بخش دوم به صورت پیش‌فرض باز است)
  const [openSection, setOpenSection] = useState<number | null>(2);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const toggleSection = (sectionIndex: number) => {
    setOpenSection((prev) => (prev === sectionIndex ? null : sectionIndex));
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی با ناوبری و دکمه تغییر تم */}
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
            قوانین و حریم خصوصی
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
            paddingBottom: 90 + insets.bottom, // ممانعت از تداخل اسکرول با فوتر چسبناک
          },
        ]}
      >
        {/* تایتل و توضیحات بالای کانتنت */}
        <View style={styles.introContainer}>
          <AppText
            variant="h1"
            style={[styles.mainTitle, { color: colors.textPrimary }]}
          >
            اسناد حقوقی ایکس الوتور
          </AppText>
          <AppText variant="body" color="muted" style={styles.mainSubtitle}>
            شرایط استفاده از خدمات فنی و منشور حریم خصوصی کاربران.
          </AppText>
        </View>

        {/* ۱. سوئیچر سگمنتد کنترل تفکیک شرایط خدمات و حریم خصوصی */}
        <View
          style={[
            styles.segmentContainer,
            {
              backgroundColor: colors.surfaceDim,
              borderColor: colors.border,
              borderRadius: borderRadius.md,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setActiveSegment("privacy")}
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              activeSegment === "privacy" && {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color:
                  activeSegment === "privacy"
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              حریم خصوصی
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveSegment("terms")}
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              activeSegment === "terms" && {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color:
                  activeSegment === "terms"
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              شرایط و ضوابط خدمات
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ۲. باکس سرچ کلیدواژه‌ها */}
        <View style={styles.searchSection}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.outline}
              style={{ marginLeft: 12 }}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="جستجو در کلیدواژه‌ها (مثلاً گارانتی، استرداد)..."
              placeholderTextColor={colors.outline}
              style={[
                styles.searchInput,
                {
                  color: colors.textPrimary,
                  fontFamily: "IRANYekanXFaNum-Regular",
                },
              ]}
            />
          </View>
        </View>

        {/* ۳. بخش آکاردئون‌های تعاملی و کشویی به صورت ۱۰۰٪ RTL */}
        <View style={[styles.accordionContainer, { gap: spacing.md }]}>
          {/* بخش اول: قوانین عمومی */}
          <View
            style={[
              styles.accordionCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleSection(1)}
              activeOpacity={0.8}
              style={styles.accordionHeader}
            >
              <Ionicons
                name={openSection === 1 ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.textPrimary}
              />
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                ۱. شرایط و ضوابط عمومی ایکس الوتور
              </AppText>
            </TouchableOpacity>
            {openSection === 1 && (
              <View
                style={[
                  styles.accordionBody,
                  { borderTopColor: colors.border },
                ]}
              >
                <AppText variant="body" color="muted" style={styles.bodyText}>
                  ثبت نام و ایجاد حساب کاربری در پلتفرم ایکس الوتور به منزله
                  پذیرش کامل قوانین و استانداردهای خدمات فنی مندرج در منشور شرکت
                  از سوی کارفرما تلقی می‌گردد.
                </AppText>
              </View>
            )}
          </View>

          {/* بخش دوم: ضوابط رزرواسیون و کنسلی (پیش‌فرض باز است) */}
          <View
            style={[
              styles.accordionCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleSection(2)}
              activeOpacity={0.8}
              style={styles.accordionHeader}
            >
              <Ionicons
                name={openSection === 2 ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.textPrimary}
              />
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                ۲. ضوابط رزرواسیون و لغو مأموریت‌های سرویس
              </AppText>
            </TouchableOpacity>
            {openSection === 2 && (
              <View
                style={[
                  styles.accordionBody,
                  { borderTopColor: colors.border },
                ]}
              >
                <AppText variant="body" color="muted" style={styles.bodyText}>
                  کاربران عزیز می‌توانند درخواست سرویس دوره‌ای خود را تا ۲۴ ساعت
                  قبل از موعد مقرر بدون جریمه لغو نمایند. لغو در بازه کمتر از ۲۴
                  ساعت مشمول هزینه ایاب‌وذهاب تکنسین خواهد شد. در مأموریت‌های
                  اضطراری، لغو پس از حرکت تکنسین، شامل هزینه پایه اعزام می‌گردد.
                </AppText>
              </View>
            )}
          </View>

          {/* بخش سوم: گارانتی قطعات */}
          <View
            style={[
              styles.accordionCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleSection(3)}
              activeOpacity={0.8}
              style={styles.accordionHeader}
            >
              <Ionicons
                name={openSection === 3 ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.textPrimary}
              />
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                ۳. قوانین گارانتی و ضمانت اصالت قطعات یدکی
              </AppText>
            </TouchableOpacity>
            {openSection === 3 && (
              <View
                style={[
                  styles.accordionBody,
                  { borderTopColor: colors.border },
                ]}
              >
                <AppText variant="body" color="muted" style={styles.bodyText}>
                  تمامی قطعات تأمین شده از فروشگاه ایکس الوتور به صورت مستقیم
                  دارای ضمانت‌نامه اصالت برند و بیمه‌نامه کیفیت قطعه بر اساس
                  مدت‌زمان مندرج در فاکتور رسمی فروش می‌باشند.
                </AppText>
              </View>
            )}
          </View>

          {/* بخش چهارم: تعهدات ایمنی */}
          <View
            style={[
              styles.accordionCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleSection(4)}
              activeOpacity={0.8}
              style={styles.accordionHeader}
            >
              <Ionicons
                name={openSection === 4 ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.textPrimary}
              />
              <AppText
                variant="button"
                style={{
                  color: colors.textPrimary,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                ۴. تعهدات ایمنی کارفرما در محل چاه آسانسور
              </AppText>
            </TouchableOpacity>
            {openSection === 4 && (
              <View
                style={[
                  styles.accordionBody,
                  { borderTopColor: colors.border },
                ]}
              >
                <AppText variant="body" color="muted" style={styles.bodyText}>
                  جهت حفظ امنیت تکنسین‌ها، کارفرما متعهد می‌گردد در زمان حضور
                  کارشناس فنی، دسترسی به چاه آسانسور و موتورخانه را تسهیل کرده و
                  مانع ورود افراد غیرمتخصص به حریم کارگاه شود.
                </AppText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* ۴. فوتر رسمی و چسبناک ویندوز با پدینگ امن پویا */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 80 + insets.bottom,
            paddingBottom: insets.bottom + 12,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <AppText variant="labelSm" color="muted" style={styles.footerText}>
          آیا سوالی در مورد قوانین حقوقی و ضوابط دارید؟
        </AppText>
        <TouchableOpacity activeOpacity={0.7}>
          <AppText variant="button" color="secondary" style={styles.footerLink}>
            تماس با دپارتمان حقوقی شرکت
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی پروژه
export default PrivacyScreen;

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
  segmentContainer: {
    flexDirection: "row",
    padding: 4,
    width: "100%",
    borderWidth: 1,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  searchSection: {
    width: "100%",
    marginBottom: 20,
  },
  searchBar: {
    height: 44,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    textAlign: "right",
    fontSize: 14,
  },
  accordionContainer: {
    width: "100%",
  },
  accordionCard: {
    borderWidth: 1,
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row", // قرارگیری آیکون فلش در چپ و تایتل در راست به صورت RTL فارسی
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
  },
  accordionBody: {
    borderTopWidth: 1,
    padding: 16,
  },
  bodyText: {
    textAlign: "right",
    lineHeight: 22,
    fontSize: 13,
  },
  bottomActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    marginBottom: 4,
  },
  footerLink: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
