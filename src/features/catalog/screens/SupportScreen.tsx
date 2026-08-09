// src/features/catalog/screens/SupportScreen.tsx

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
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const SupportScreen = () => {
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

  const handleCreateTicket = () => {
    // ناوبری هوشمند به صفحه جدید ثبت تیکت پشتیبانی جدید
    router.push("/create-ticket");
  };

  const handleTicketDetailPress = (ticketId: string) => {
    // در فازهای بعدی به صفحه چت تیکت متصل می‌شود
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی با دکمه تغییر تم و بازگشت چپ‌چین شده */}
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
            پشتیبانی و تیکت‌ها
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // پدینگ پایینی بزرگ‌تر جهت عدم تداخل با دکمه چسبنده ثبت تیکت و نوار پایینی
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 150 + (64 + insets.bottom),
          },
        ]}
      >
        {/* تایتل و توضیحات بالای کانتنت */}
        <View style={styles.introContainer}>
          <AppText
            variant="h1"
            style={[styles.mainTitle, { color: colors.textPrimary }]}
          >
            پشتیبانی فنی ایکس الوتور
          </AppText>
          <AppText variant="body" color="muted" style={styles.mainSubtitle}>
            چطور می‌توانیم امروز به شما کمک کنیم؟
          </AppText>
        </View>

        {/* دوقلوهای تماس به صورت ستونی عریض و جادار (Spacious Vertical Rows) - حل کامل مشکل چسبندگی متون */}
        <View style={[styles.shortcutsContainer, { gap: spacing.md }]}>
          {/* چت زنده آنلاین عریض */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.shortcutCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            {/* فلش برگشت در دورترین سمت چپ کادر */}
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />

            {/* آیکون و متن تراز شده در سمت راست کادر */}
            <View style={styles.shortcutRight}>
              <View style={styles.shortcutText}>
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  چت گفتگوی آنلاین و زنده
                </AppText>
                <AppText
                  variant="labelSm"
                  style={{ color: "#10B981", marginTop: 4 }}
                >
                  پاسخگویی سریع زیر ۲ دقیقه
                </AppText>
              </View>
              <View
                style={[styles.iconBox, { backgroundColor: colors.surfaceDim }]}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* پشتیبانی تلفنی عریض */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.shortcutCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.textSecondary}
            />

            <View style={styles.shortcutRight}>
              <View style={styles.shortcutText}>
                <AppText variant="button" style={{ color: colors.textPrimary }}>
                  تماس تلفنی ۲۴ ساعته
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={{ marginTop: 4 }}
                >
                  پشتیبانی خط مستقیم واحد مهندسی
                </AppText>
              </View>
              <View
                style={[styles.iconBox, { backgroundColor: colors.surfaceDim }]}
              >
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* لیست تیکت‌های پشتیبانی کاربر */}
        <View style={styles.ticketsSection}>
          <AppText variant="body" color="primary" style={styles.sectionHeading}>
            تیکت‌های پشتیبانی ثبت‌شده من
          </AppText>

          <View style={[styles.listContainer, { gap: spacing.md }]}>
            {/* تیکت ۱: پاسخ داده شده */}
            <View
              style={[
                styles.ticketCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View style={styles.ticketHeaderRow}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      borderColor: "rgba(34, 197, 94, 0.2)",
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <AppText variant="labelSm" style={{ color: "#22C55E" }}>
                    پاسخ داده شده
                  </AppText>
                </View>

                <View style={styles.ticketTitleContainer}>
                  <AppText
                    variant="h2"
                    style={[styles.ticketTitle, { color: colors.textPrimary }]}
                  >
                    مغایرت فاکتور در مأموریت شماره #۸۰۱
                  </AppText>
                </View>
              </View>

              <AppText
                variant="labelSm"
                color="muted"
                style={styles.ticketMetaText}
              >
                شناسه تیکت: #TK-۸۰۲۴ • دسته: امور مالی | امروز، ساعت ۰۹:۳۰
              </AppText>

              <AppText
                variant="body"
                color="muted"
                numberOfLines={2}
                style={styles.ticketDesc}
              >
                با سلام، درخواست تعدیل هزینه شما بررسی گردید و اصلاحات فاکتور بر
                روی کیف پول شما اعمال شد...
              </AppText>

              <View
                style={[styles.cardDivider, { backgroundColor: colors.border }]}
              />

              <TouchableOpacity
                onPress={() => handleTicketDetailPress("8024")}
                activeOpacity={0.7}
                style={styles.ticketActionLink}
              >
                <AppText variant="button" color="secondary">
                  مشاهده تیکت و ارسال پاسخ
                </AppText>
                <Ionicons
                  name="arrow-back-outline"
                  size={16}
                  color={colors.secondary}
                  style={{ marginRight: 6 }}
                />
              </TouchableOpacity>
            </View>

            {/* تیکت ۲: در حال بررسی */}
            <View
              style={[
                styles.ticketCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View style={styles.ticketHeaderRow}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      borderColor: "rgba(59, 130, 246, 0.2)",
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <AppText variant="labelSm" style={{ color: "#3B82F6" }}>
                    در حال بررسی
                  </AppText>
                </View>

                <View style={styles.ticketTitleContainer}>
                  <AppText
                    variant="h2"
                    style={[styles.ticketTitle, { color: colors.textPrimary }]}
                  >
                    درخواست گارانتی سیم بکسل فرسوده
                  </AppText>
                </View>
              </View>

              <AppText
                variant="labelSm"
                color="muted"
                style={styles.ticketMetaText}
              >
                شناسه تیکت: #TK-۷۹۱۰ • دسته: گارانتی و قطعات | ۲۱ مهر ۱۴۰۳
              </AppText>

              <AppText
                variant="body"
                color="muted"
                numberOfLines={2}
                style={styles.ticketDesc}
              >
                درخواست کارشناسی شما جهت بررسی گارانتی سیم بکسل کابین به واحد
                مهندسی ارجاع شد...
              </AppText>

              <View
                style={[styles.cardDivider, { backgroundColor: colors.border }]}
              />

              <TouchableOpacity
                onPress={() => handleTicketDetailPress("7910")}
                activeOpacity={0.7}
                style={styles.ticketActionLink}
              >
                <AppText variant="button" color="secondary">
                  ادامه گفتگو
                </AppText>
                <Ionicons
                  name="arrow-back-outline"
                  size={16}
                  color={colors.secondary}
                  style={{ marginRight: 6 }}
                />
              </TouchableOpacity>
            </View>

            {/* تیکت ۳: بسته شده */}
            <View
              style={[
                styles.ticketCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  opacity: 0.7,
                },
              ]}
            >
              <View style={styles.ticketHeaderRow}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: colors.surfaceDim,
                      borderColor: colors.border,
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.textSecondary }}
                  >
                    بسته شده
                  </AppText>
                </View>

                <View style={styles.ticketTitleContainer}>
                  <AppText
                    variant="h2"
                    style={[styles.ticketTitle, { color: colors.textPrimary }]}
                  >
                    بروز خطا در ثبت آدرس جدید اپلیکیشن
                  </AppText>
                </View>
              </View>

              <AppText
                variant="labelSm"
                color="muted"
                style={styles.ticketMetaText}
              >
                شناسه تیکت: #TK-۷۱۰۲ • دسته: پشتیبانی فنی اپ | ۳۰ شهریور ۱۴۰۳
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* دکمه ثابت و چسبناک ثبت تیکت پشتیبانی جدید با اتصال به روت جدید */}
      <View
        style={[
          styles.floatingButtonContainer,
          { bottom: 64 + insets.bottom + 16, paddingHorizontal: spacing.lg },
        ]}
      >
        <TouchableOpacity
          onPress={handleCreateTicket}
          activeOpacity={0.9}
          style={[
            styles.floatingSubmitBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
          ]}
        >
          <Ionicons
            name="add"
            size={20}
            color={colors.onPrimary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            ثبت تیکت پشتیبانی جدید
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی سراسری با تب فعال پروفایل */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

export default SupportScreen;

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
  shortcutsContainer: {
    width: "100%",
  },
  shortcutCard: {
    borderWidth: 1,
    padding: 16,
    flexDirection: "row", // تراز آیکون در راست، دکمه چت در چپ به صورت RTL
    justifyContent: "space-between",
    alignItems: "center",
  },
  shortcutRight: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  shortcutText: {
    alignItems: "flex-end",
    marginRight: 16, // ایجاد فاصله تا آیکون باکس در RTL
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketsSection: {
    width: "100%",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  listContainer: {
    width: "100%",
  },
  ticketCard: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  ticketHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  ticketTitleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    flex: 1,
    paddingLeft: 12,
  },
  ticketTitle: {
    fontSize: 14, // بهینه‌سازی سایز برای هماهنگی فونت‌ها
    textAlign: "right",
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  ticketMetaText: {
    fontSize: 11,
    textAlign: "right",
    fontFamily: "IRANYekanXFaNum-Regular",
    marginBottom: 12,
  },
  ticketDesc: {
    textAlign: "right",
    fontSize: 12,
    lineHeight: 18,
  },
  cardDivider: {
    height: 1,
    width: "100%",
    marginVertical: 12,
  },
  ticketActionLink: {
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-start",
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
