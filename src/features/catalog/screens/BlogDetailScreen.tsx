// src/features/catalog/screens/BlogDetailScreen.tsx

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
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 200;

export const BlogDetailScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/learning-hub");
    }
  };

  const handleBookmark = () => {
    // ذخیره مقاله در فازهای بعدی متصل می‌شود
  };

  const handleShare = () => {
    // اشتراک‌گذاری در فازهای بعدی متصل می‌شود
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی با ناوبری بومی */}
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

        <View style={styles.headerSpacer} />

        <View style={styles.rightActions}>
          <ThemeToggleButton />

          <TouchableOpacity
            onPress={handleBookmark}
            activeOpacity={0.7}
            style={[styles.headerButton, { marginLeft: spacing.xs }]}
          >
            <Ionicons
              name="bookmark-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            activeOpacity={0.7}
            style={[styles.headerButton, { marginLeft: spacing.xs }]}
          >
            <Ionicons
              name="share-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingBottom: 80 + insets.bottom,
          },
        ]}
      >
        {/* تصویر هیرو بالای مقاله */}
        <View
          style={[
            styles.heroImageContainer,
            {
              backgroundColor: colors.surfaceDim,
              borderBottomLeftRadius: borderRadius.xl,
              borderBottomRightRadius: borderRadius.xl,
            },
          ]}
        >
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida/AP1WRLu7zhiO4xlzk4axIJC8yYq3ZElNYuJzCsVuNrJCcHPsfmAGYVaIZtQdCSZpV0_NjdY5TmkrP7rJboOQo4B11NOM3-5hSEglXvMaA-Gk5ik9FH1rsC9wMXSTVYyQHLh-BBSinETlOB_VcA_l3gZH5ifBPwgw15QNtjczZVIJTg4iI09zTxnaLu5By0DxEkJVWeypZfAjK71pkSTVjeCz4otvV91M4r8K0cEggQYdFEqXvcicHDkB0IXRWEPK",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* محتوای متنی مقاله */}
        <View
          style={[
            styles.articleContainer,
            { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
          ]}
        >
          {/* دسته‌بندی */}
          <AppText
            variant="labelSm"
            style={[
              styles.categoryLabel,
              { color: colors.secondary, marginBottom: spacing.sm },
            ]}
          >
            استاندارد ایمنی
          </AppText>

          {/* عنوان اصلی مقاله - تصحیح شد: اضافه شدن هم ترازی راست‌چین بومی فارسی */}
          <AppText
            variant="h1"
            style={[
              styles.articleTitle,
              {
                color: colors.textPrimary,
                fontSize: 22,
                lineHeight: 28,
                marginBottom: spacing.md,
              },
            ]}
          >
            ۵ نشانه هشداردهنده که آسانسور شما نیاز به سرویس فوری دارد
          </AppText>

          {/* متادیتا و مشخصات نویسنده */}
          <View style={styles.metadataContainer}>
            <View style={styles.authorContainer}>
              <View
                style={[
                  styles.avatarContainer,
                  {
                    backgroundColor: colors.surfaceDim,
                    borderRadius: borderRadius.full,
                    width: 32,
                    height: 32,
                    marginLeft: spacing.sm,
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO9iWIRSDiXLJ_CeTXPXA8CucfUUtu508Y_dkAb6MglUeosRSK5ChvCiB9Lbv-05WdJRd7akVDK2dmFvxGTsD_Si-uVKFPC2iOKn5JA91sTLMAlpLWaHwjTjs6S_tGAGuUvnGrXXEPZcCMTKwPL5GXnOxZGjwyneSISzGolFNXMk6d2E7cB6GDY3dzgrGQjicb6mOazu4Uqm0HbAdzMkCEEUdGU2VEX-ZNWt3tCk6GTFr27rkzQRItzQ",
                  }}
                  style={styles.avatarImage}
                />
              </View>
              <AppText
                variant="body"
                style={[styles.authorName, { color: colors.textPrimary }]}
              >
                مهندس عاشری
              </AppText>
            </View>

            <View style={styles.metaDivider}>
              <AppText variant="body" style={{ color: colors.textSecondary }}>
                •
              </AppText>
            </View>

            <AppText
              variant="body"
              style={[styles.metaText, { color: colors.textSecondary }]}
            >
              ۱۵ مهر ۱۴۰۳
            </AppText>

            <View style={styles.metaDivider}>
              <AppText variant="body" style={{ color: colors.textSecondary }}>
                •
              </AppText>
            </View>

            <AppText
              variant="body"
              style={[styles.metaText, { color: colors.textSecondary }]}
            >
              ۵ دقیقه مطالعه
            </AppText>
          </View>

          {/* متن اصلی مقاله با فاصله و ارتفاع خطوط بسیار خوانا */}
          <View style={styles.bodyContainer}>
            <AppText
              variant="body"
              style={[
                styles.paragraph,
                {
                  color: colors.textPrimary,
                  lineHeight: 26,
                  marginBottom: spacing.lg,
                },
              ]}
            >
              سیستم‌های آسانسور شگفتی‌های مهندسی مدرن هستند که برای دهه‌ها خدمات
              قابل اعتماد طراحی شده‌اند. با این حال، مانند هر سیستم مکانیکی و
              الکتریکی پیچیده، آنها نیاز به نگهداری دقیق و مشاهده‌ی هوشیارانه
              برای اطمینان از عملکرد ایمن و بهینه دارند. نادیده گرفتن علائم
              هشداردهنده می‌تواند منجر به تعمیرات پرهزینه، خرابی طولانی مدت یا
              حتی خطرات ایمنی شود.
            </AppText>

            <AppText
              variant="body"
              style={[
                styles.paragraph,
                {
                  color: colors.textPrimary,
                  lineHeight: 26,
                  marginBottom: spacing.lg,
                },
              ]}
            >
              مدیران ساختمان و اپراتورهای تأسیسات باید هوشیار باشند. در اینجا
              پنج نشانه‌ی حیاتی وجود دارد که نشان می‌دهد سیستم حمل و نقل عمودی
              شما نیاز به توجه فوری از تکنسین‌های مجرب دارد.
            </AppText>

            {/* زیرعنوان ۱ */}
            <AppText
              variant="h2"
              style={[
                styles.subHeading,
                {
                  color: colors.textPrimary,
                  marginTop: spacing.lg,
                  marginBottom: spacing.md,
                },
              ]}
            >
              ۱. صداهای غیرعادی در حین کارکرد
            </AppText>

            <AppText
              variant="body"
              style={[
                styles.paragraph,
                {
                  color: colors.textPrimary,
                  lineHeight: 26,
                  marginBottom: spacing.lg,
                },
              ]}
            >
              یک آسانسور با نگهداری مناسب باید با صدای هوم آرام و به سختی قابل
              توجه کار کند. اگر شروع به شنیدن صداهای ساییدگی، جیغ یا تق‌تق
              کردید، این نشانه‌ی واضحی است که قطعات مکانیکی با اصطکاک یا سایش
              بیش از حد مواجه هستند. این صداها اغلب از شِیو، کابل‌ها یا ریل‌های
              راهنما منشأ می‌گیرند و نیاز به بررسی فوری دارند.
            </AppText>

            {/* کادر ایمنی هشدار (Safety Callout) به صورت کاملاً RTL */}
            <View
              style={[
                styles.safetyCallout,
                {
                  backgroundColor: isDark ? "#3D2A00" : "#FFFBEB",
                  borderLeftColor: colors.secondary,
                  borderRadius: borderRadius.md,
                  padding: spacing.lg,
                  marginVertical: spacing.lg,
                },
              ]}
            >
              <Ionicons
                name="warning-outline"
                size={24}
                color={colors.secondary}
                style={{ marginTop: 2 }}
              />
              <View style={styles.calloutTextContainer}>
                <AppText
                  variant="button"
                  style={[
                    styles.calloutTitle,
                    {
                      color: isDark ? "#FFDCC3" : "#92400E",
                      marginBottom: spacing.xxs,
                    },
                  ]}
                >
                  هشدار ایمنی مهم
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.calloutText,
                    {
                      color: isDark ? "#FFDCC3" : "#B45309",
                      fontSize: 13,
                      lineHeight: 20,
                    },
                  ]}
                >
                  اگر صداهای غیرعادی با لرزش قابل توجه در حین حرکت همراه باشد،
                  فوراً کابین را از سرویس خارج کرده و تست بار اضطراری را
                  برنامه‌ریزی کنید. این می‌تواند نشان‌دهنده خستگی قریب‌الوقوع
                  کابل یا خرابی گاورنر باشد.
                </AppText>
              </View>
            </View>

            {/* زیرعنوان ۲ */}
            <AppText
              variant="h2"
              style={[
                styles.subHeading,
                {
                  color: colors.textPrimary,
                  marginTop: spacing.lg,
                  marginBottom: spacing.md,
                },
              ]}
            >
              ۲. تراز ناهموار طبقات
            </AppText>

            <AppText
              variant="body"
              style={[
                styles.paragraph,
                {
                  color: colors.textPrimary,
                  lineHeight: 26,
                  marginBottom: spacing.lg,
                },
              ]}
            >
              وقتی کابین آسانسور متوقف می‌شود، باید کاملاً هم‌سطح با طبقه تطابق
              داشته باشد. اختلاف حتی کسری از اینچ یک خطر زمین‌خوردن قابل توجه
              برای مسافران ایجاد می‌کند. تراز نامناسب اغلب ناشی از سنسورهای تراز
              قدیمی، کفشک‌های ترمز فرسوده یا نوسانات ولتاژ در سیستم کنترل است.
            </AppText>

            <AppText
              variant="body"
              style={[
                styles.paragraph,
                {
                  color: colors.textPrimary,
                  lineHeight: 26,
                  marginBottom: spacing.lg,
                },
              ]}
            >
              بررسی‌های منظم از دقت تراز آسانسور، یک جزء اساسی از برنامه‌های
              نگهداری پیشگیرانه است.
            </AppText>
          </View>
        </View>

        {/* مقالات مرتبط انتهایی */}
        <View
          style={[
            styles.relatedSection,
            {
              backgroundColor: colors.surfaceDim,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.xl,
              marginTop: spacing.xl,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
            },
          ]}
        >
          <AppText
            variant="h2"
            style={[
              styles.relatedTitle,
              { color: colors.textPrimary, marginBottom: spacing.md },
            ]}
          >
            راهنماهای مرتبط
          </AppText>

          <View style={styles.relatedGrid}>
            {/* کارت مرتبط اول */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.relatedCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  width: (width - spacing.lg * 2 - spacing.md) / 2,
                },
              ]}
              onPress={() => router.push("/blog-detail")}
            >
              <View
                style={[
                  styles.relatedImageContainer,
                  {
                    backgroundColor: colors.surfaceDim,
                    borderRadius: borderRadius.md,
                    height: 100,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIhN5VlKfXsro-rZ6Z8BkfvOszUdXNucGoGSk0AxZrMQjMpL20RYIherZ8wF4oNOfKPR8aeFKVJ-UXpM32EEwhdyJPqgSWMU0HHYon5FZxv0l6WTwWIFuMaig77bEHaJrJz6IGf3uPfbdE1nN8zlMNc6i8fjOBZ4I0H-1NDiBJEOLTD4iHJwxThm1AWXXlVXZXMYfGUiTsRoQF0G4Dsn2bz-z5lggkzx3lTHV2geKJyJOyNZIS9f8GFg",
                  }}
                  style={styles.relatedImage}
                />
              </View>
              <AppText
                variant="labelSm"
                style={[
                  styles.relatedCardTitle,
                  { color: colors.textPrimary, marginBottom: spacing.xxs },
                ]}
                numberOfLines={2}
              >
                نکات نگهداری دوره‌ای برای سیستم‌های قدیمی
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.relatedCardDesc,
                  { color: colors.textSecondary, fontSize: 11 },
                ]}
              >
                استراتژی‌های مراقبت پیشگیرانه
              </AppText>
            </TouchableOpacity>

            {/* کارت مرتبط دوم */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.relatedCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  width: (width - spacing.lg * 2 - spacing.md) / 2,
                },
              ]}
              onPress={() => router.push("/blog-detail")}
            >
              <View
                style={[
                  styles.relatedImageContainer,
                  {
                    backgroundColor: colors.surfaceDim,
                    borderRadius: borderRadius.md,
                    height: 100,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-bOj2VR8a-TLbqQjPtQgUWTBDQ5tmcW1yWkzxcZMMJo0KBHKSjvTVwDcrcgt5kEn9Xkw3QEZGdJkzIhLGMTGrULeTlsoC3QPfHQLB3v8l9CRx3RLHah3E-pNMHeS5h8AeV_b0sSHlG7Dv8jxm0MxWzFlte5Gaqi5jJs2oygPu2HUofrQd8PD0kV_CC_o8CJR0GsgtA4oNKbIJRct-7JCADwGWc-_RmfvxiecXb6BS-19WkThU7vf3Vw",
                  }}
                  style={styles.relatedImage}
                />
              </View>
              <AppText
                variant="labelSm"
                style={[
                  styles.relatedCardTitle,
                  { color: colors.textPrimary, marginBottom: spacing.xxs },
                ]}
                numberOfLines={2}
              >
                آشنایی با نوسازی مدرن آسانسور
              </AppText>
              <AppText
                variant="body"
                style={[
                  styles.relatedCardDesc,
                  { color: colors.textSecondary, fontSize: 11 },
                ]}
              >
                چه زمانی سخت‌افزار خود را ارتقا دهید
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="blog" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
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
  headerSpacer: {
    flex: 1,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    paddingTop: 0,
  },
  heroImageContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  articleContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  categoryLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textAlign: "right", // تصحیح شد: اضافه شدن تراز راست‌چین به برچسب دسته‌بندی
  },
  articleTitle: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: "right", // تصحیح شد: اضافه شدن تراز راست‌چین به تایتل اصلی مقاله
  },
  metadataContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  avatarContainer: {
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  authorName: {
    // بومی‌سازی شده فاقد تداخل وزنی
  },
  metaDivider: {},
  metaText: {},
  bodyContainer: {
    marginTop: 8,
  },
  paragraph: {
    lineHeight: 26,
    textAlign: "right",
  },
  subHeading: {
    fontSize: 18,
    textAlign: "right",
  },
  safetyCallout: {
    padding: 16,
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 12,
    borderLeftWidth: 4,
  },
  calloutTextContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  calloutTitle: {
    textAlign: "right",
  },
  calloutText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "right",
  },
  relatedSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  relatedTitle: {
    textAlign: "right",
    marginBottom: 12,
  },
  relatedGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  relatedCard: {
    padding: 12,
    overflow: "hidden",
  },
  relatedImageContainer: {
    height: 100,
    overflow: "hidden",
    marginBottom: 8,
  },
  relatedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  relatedCardTitle: {
    textAlign: "right",
  },
  relatedCardDesc: {
    textAlign: "right",
    fontSize: 11,
  },
});
