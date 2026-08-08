// src/features/dashboard/screens/DashboardScreen.tsx

import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { AppHeader } from "@/src/components/layout/AppHeader";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export const DashboardScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const handleEmergencyPress = () => {
    router.push("/request-service");
  };
  const handleCatalogPress = () => {
    router.push("/catalog");
  };
  const handleLearningPress = () => {
    router.push("/learning-hub");
  };
  const handleMaintenancePress = () => {
    router.push("/maintenance");
  };
  const handleModernizationPress = () => {
    router.push("/modernization");
  };
  const handleInstallationPress = () => {
    router.push("/installation");
  };
  const handleRepairPress = () => {
    router.push("/request-service");
  };

  // محاسبه عرض کارت‌های خدمات (۲ ستون)
  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  return (
    <ScreenWrapper>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ۱. بخش هیرو (Hero Section) */}
        <View
          style={[
            styles.heroSection,
            { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
          ]}
        >
          <AppText variant="h1" style={styles.heroTitle}>
            مراقبت هوشمند از آسانسور و قطعات یدکی استاندارد
          </AppText>
          <AppText variant="body" color="muted" style={styles.heroSubtitle}>
            اعزام فوق‌سریع کارشناس فنی ۲۴ ساعته و تأمین بدون واسطه قطعات اصلی
            گواهی‌شده.
          </AppText>

          <View style={styles.heroActionContainer}>
            <TouchableOpacity
              onPress={handleEmergencyPress}
              activeOpacity={0.8}
              style={[
                styles.emergencyButton,
                {
                  backgroundColor: colors.secondary,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <Ionicons
                name="alert-circle"
                size={20}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
              <AppText variant="button" style={{ color: "#FFFFFF" }}>
                درخواست اعزام فوری تکنسین
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCatalogPress}
              activeOpacity={0.8}
              style={[
                styles.catalogButton,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={colors.textPrimary}
                style={{ marginLeft: 8 }}
              />
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                جستجوی قطعات یدکی
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۲. بخش خدمات - ۲ ستونه */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.surfaceDim,
              paddingVertical: spacing.xl,
              paddingHorizontal: spacing.lg,
              borderColor: colors.border,
            },
          ]}
        >
          <AppText variant="h2" style={styles.sectionTitle}>
            خدمات نگهداری و اورهال ایکس الوتور
          </AppText>

          <View style={styles.servicesGrid}>
            {/* سرویس و نگهداری سالانه */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.serviceCard,
                {
                  width: cardWidth,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  alignItems: "flex-end",
                },
              ]}
              onPress={handleMaintenancePress}
            >
              <View
                style={[
                  styles.iconContainerSmall,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: borderRadius.full,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
              <AppText
                variant="button"
                style={[
                  styles.serviceTitleSmall,
                  {
                    color: colors.textPrimary,
                    textAlign: "right",
                    fontWeight: "600",
                  },
                ]}
              >
                نگهداری سالانه
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={[
                  styles.serviceDescSmall,
                  {
                    textAlign: "right",
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                بازدید دوره‌ای منظم
              </AppText>
            </TouchableOpacity>

            {/* تعمیرات فوق‌سریع */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.serviceCard,
                {
                  width: cardWidth,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  alignItems: "flex-end",
                },
              ]}
              onPress={handleEmergencyPress}
            >
              <View
                style={[
                  styles.iconContainerSmall,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: borderRadius.full,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Ionicons
                  name="construct-outline"
                  size={20}
                  color={colors.secondary}
                />
              </View>
              <AppText
                variant="button"
                style={[
                  styles.serviceTitleSmall,
                  {
                    color: colors.textPrimary,
                    textAlign: "right",
                    fontWeight: "600",
                  },
                ]}
              >
                تعمیرات شبانه‌روزی
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={[
                  styles.serviceDescSmall,
                  {
                    textAlign: "right",
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                اعزام فوری تکنسین
              </AppText>
            </TouchableOpacity>

            {/* نوسازی و مدرن‌سازی */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.serviceCard,
                {
                  width: cardWidth,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  alignItems: "flex-end",
                },
              ]}
              onPress={handleModernizationPress}
            >
              <View
                style={[
                  styles.iconContainerSmall,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: borderRadius.full,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Ionicons
                  name="trending-up-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
              <AppText
                variant="button"
                style={[
                  styles.serviceTitleSmall,
                  {
                    color: colors.textPrimary,
                    textAlign: "right",
                    fontWeight: "600",
                  },
                ]}
              >
                نوسازی و مدرن‌سازی
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={[
                  styles.serviceDescSmall,
                  {
                    textAlign: "right",
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                ارتقای سیستم‌های قدیمی
              </AppText>
            </TouchableOpacity>

            {/* قطعات اورجینال */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.serviceCard,
                {
                  width: cardWidth,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  alignItems: "flex-end",
                },
              ]}
              onPress={handleCatalogPress}
            >
              <View
                style={[
                  styles.iconContainerSmall,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: borderRadius.full,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Ionicons
                  name="cube-outline"
                  size={20}
                  color={colors.secondary}
                />
              </View>
              <AppText
                variant="button"
                style={[
                  styles.serviceTitleSmall,
                  {
                    color: colors.textPrimary,
                    textAlign: "right",
                    fontWeight: "600",
                  },
                ]}
              >
                قطعات اورجینال
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={[
                  styles.serviceDescSmall,
                  {
                    textAlign: "right",
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                تأمین مستقیم از تولیدکننده
              </AppText>
            </TouchableOpacity>

            {/* نصب و راه‌اندازی - کارت جدید */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.serviceCard,
                {
                  width: cardWidth,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  alignItems: "flex-end",
                },
              ]}
              onPress={handleInstallationPress}
            >
              <View
                style={[
                  styles.iconContainerSmall,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: borderRadius.full,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Ionicons
                  name="build-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
              <AppText
                variant="button"
                style={[
                  styles.serviceTitleSmall,
                  {
                    color: colors.textPrimary,
                    textAlign: "right",
                    fontWeight: "600",
                  },
                ]}
              >
                نصب و راه‌اندازی
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={[
                  styles.serviceDescSmall,
                  {
                    textAlign: "right",
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                نصب تاییدشده مهندسی
              </AppText>
            </TouchableOpacity>

            {/* تعمیر و عیب‌یابی - کارت جدید */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.serviceCard,
                {
                  width: cardWidth,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  alignItems: "flex-end",
                },
              ]}
              onPress={handleRepairPress}
            >
              <View
                style={[
                  styles.iconContainerSmall,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: borderRadius.full,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                <Ionicons
                  name="hammer-outline"
                  size={20}
                  color={colors.secondary}
                />
              </View>
              <AppText
                variant="button"
                style={[
                  styles.serviceTitleSmall,
                  {
                    color: colors.textPrimary,
                    textAlign: "right",
                    fontWeight: "600",
                  },
                ]}
              >
                تعمیر و عیب‌یابی
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={[
                  styles.serviceDescSmall,
                  {
                    textAlign: "right",
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                تشخیص سریع و تعمیر دائمی
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ۳. بخش قطعات ویژه */}
        <View style={{ paddingVertical: spacing.xl }}>
          <View
            style={[styles.carouselHeader, { paddingHorizontal: spacing.lg }]}
          >
            <AppText variant="h2" style={styles.carouselTitle}>
              قطعات ویژه و پیشنهادی
            </AppText>
            <TouchableOpacity onPress={handleCatalogPress}>
              <AppText variant="labelSm" color="secondary">
                مشاهده همه
              </AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.carouselScroll,
              { paddingHorizontal: spacing.lg },
            ]}
          >
            {/* قطعه ۱ */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.partCardNew,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  width: 200,
                  overflow: "hidden",
                },
              ]}
              onPress={handleCatalogPress}
            >
              <View
                style={[
                  styles.partImageContainerNew,
                  {
                    height: 140,
                    backgroundColor: colors.surfaceDim,
                    position: "relative",
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLyPwVcCRRkqBx1sKo_5rvZKEbjyHucB_jlw-WtkCdhV_33MHNtukk0E7dtc8x-PDaVp4CGM93D1D0edg5mBcRAG3dosAn6K1vd2QpBgmmJzjwkierlt1XkpYxfMLzXh440p8lVdW29msBW4A7YdbktyuDlIBq2lfIFA1eiO2FQB0VZFKHGnEeRx_vtzd8ZSHvBKB9EHRm_Zb2D20rYUu_CqNnBB_iNqSDHpwutOjemExBBZn501kLNQ",
                  }}
                  style={styles.partImageNew}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.tagContainerNew,
                    {
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.onPrimary, fontSize: 8 }}
                  >
                    OEM
                  </AppText>
                </View>
              </View>
              <View style={{ padding: spacing.md }}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary, fontSize: 10 }}
                >
                  قفل درب
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.partNameNew,
                    {
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 2,
                      marginBottom: 4,
                    },
                  ]}
                  numberOfLines={1}
                >
                  مکانیزم قفل ایمنی
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={{ fontSize: 11 }}
                >
                  استعلام قیمت
                </AppText>
              </View>
            </TouchableOpacity>

            {/* قطعه ۲ */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.partCardNew,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  width: 200,
                  overflow: "hidden",
                },
              ]}
              onPress={handleCatalogPress}
            >
              <View
                style={[
                  styles.partImageContainerNew,
                  {
                    height: 140,
                    backgroundColor: colors.surfaceDim,
                    position: "relative",
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPqlTIVIYkBFuSel_rgxQ41WAUlTSkTyxA6joneyzT89nf0J6vcoIdNHRwfFAUYP8go1zP8TVEH2BTYEU-Ttt5zVECDDaXsn4degBLelXw8ZoIQHV-8YrD-r-tkKDHmUgBZVnXzwHieHAIlm4kMsqDEoPPFj23Cs2kjhtzJPK51kDjwz69e2pCFIj9G-wlxjLmeMXEfvsGW37maAxbNa1xq2Z3Di0gUU0h08_WG7ftOhwwnToAUynVTQ",
                  }}
                  style={styles.partImageNew}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.tagContainerNew,
                    {
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.onPrimary, fontSize: 8 }}
                  >
                    Universal
                  </AppText>
                </View>
              </View>
              <View style={{ padding: spacing.md }}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary, fontSize: 10 }}
                >
                  سیم بکسل
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.partNameNew,
                    {
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 2,
                      marginBottom: 4,
                    },
                  ]}
                  numberOfLines={1}
                >
                  کابل کششی فولادی
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={{ fontSize: 11 }}
                >
                  استعلام قیمت
                </AppText>
              </View>
            </TouchableOpacity>

            {/* قطعه ۳ */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.partCardNew,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  width: 200,
                  overflow: "hidden",
                },
              ]}
              onPress={handleCatalogPress}
            >
              <View
                style={[
                  styles.partImageContainerNew,
                  {
                    height: 140,
                    backgroundColor: colors.surfaceDim,
                    position: "relative",
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJOuId653dDeMv-3lWDnrlAJakMDkyo9OCfUW7b1GCngnjNX7AK5r0F8wL5w8X6Q-c0dkAOO2E5YIB7y_VOOXp39lM3csFJDPQ_HbWGXCgRaKekcyABv3vJW-pSxeN-D5PJNp7cg_ft24kMwUsLAdRz_OzAl3gO2RTsLmFKHdkAJyz8JuQRcoj2-PkcAfdu_w467DOorzW5hyu6E4BbGRo2IFgb6HBZseGsejS_o74imNc_aQIzcSFRA",
                  }}
                  style={styles.partImageNew}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.tagContainerNew,
                    {
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.onPrimary, fontSize: 8 }}
                  >
                    Orona
                  </AppText>
                </View>
              </View>
              <View style={{ padding: spacing.md }}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary, fontSize: 10 }}
                >
                  میکروسوئیچ
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.partNameNew,
                    {
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 2,
                      marginBottom: 4,
                    },
                  ]}
                  numberOfLines={1}
                >
                  شالتر صنعتی
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={{ fontSize: 11 }}
                >
                  استعلام قیمت
                </AppText>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ۴. بنر تخمین هوشمند هزینه بازسازی آسانسور */}
        <View
          style={[
            styles.modernizationBanner,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.lg,
              marginHorizontal: spacing.lg,
              padding: spacing.lg,
            },
          ]}
        >
          <View style={styles.bannerTextContent}>
            <AppText
              variant="h2"
              style={{
                color: colors.onPrimary,
                textAlign: "right",
                marginBottom: 6,
              }}
            >
              آیا آسانسور شما قدیمی شده است؟
            </AppText>
            <AppText
              variant="body"
              style={{
                color: colors.onPrimary,
                opacity: 0.8,
                textAlign: "right",
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              با سیستم تخمین آنلاین ایکس الوتور، هزینه بازسازی، تزئینات
              دکوراسیون و ارتقای ایمنی آسانسور خود را در کمتر از ۲ دقیقه برآورد
              کنید.
            </AppText>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.bannerButton,
              {
                backgroundColor: colors.secondary,
                borderRadius: borderRadius.md,
                marginTop: spacing.md,
              },
            ]}
          >
            <AppText variant="button" style={{ color: "#FFFFFF" }}>
              محاسبه آنلاین هزینه بازسازی
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ۵. بخش آموزش و نکات ایمنی */}
        <View style={{ paddingVertical: spacing.xl }}>
          <View
            style={[styles.carouselHeader, { paddingHorizontal: spacing.lg }]}
          >
            <AppText variant="h2" style={styles.carouselTitle}>
              آموزش و نکات ایمنی آسانسور
            </AppText>
            <TouchableOpacity onPress={handleLearningPress}>
              <AppText variant="labelSm" color="secondary">
                مشاهده همه
              </AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.carouselScroll,
              { paddingHorizontal: spacing.lg },
            ]}
          >
            {/* مقاله ۱ */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.articleCardNew,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  width: 200,
                  overflow: "hidden",
                },
              ]}
              onPress={handleLearningPress}
            >
              <View
                style={[
                  styles.articleImageContainerNew,
                  {
                    height: 120,
                    backgroundColor: colors.surfaceDim,
                    position: "relative",
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtPT0b4h_7FXwXJryZNimbx6gRFH0YkBSDmXtvhz-ANqoGRxRXsdFHdrhmt8O4xtFo_ny8AzN-Xswj6NgvwPzX0dX1Wry56khPBY-IKP5L_7WmPVvVFb4HJ3GhDXbTbRXvKTEQM8kZ-B7Zf9Ok66B1Wcjf_QA_zxBPIvNbpiQu7kU9xCqh19g4QJRZhTCNTKUG60b66BI6aqx1sZ7XYdr2cKldbuY2P0UN8YoMo-UNMcVl6xNisO2K1g",
                  }}
                  style={styles.articleImageNew}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.articleTagNew,
                    {
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colors.secondary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.onPrimary, fontSize: 8 }}
                  >
                    ایمنی
                  </AppText>
                </View>
              </View>
              <View style={{ padding: spacing.md }}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary, fontSize: 10 }}
                >
                  ۵ دقیقه مطالعه
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.articleTitleNew,
                    {
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 2,
                      marginBottom: 4,
                      lineHeight: 18,
                    },
                  ]}
                  numberOfLines={2}
                >
                  ۵ نشانه برای تعویض سیم‌بکسل
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={{ fontSize: 11 }}
                >
                  ۱۵ مهر ۱۴۰۳
                </AppText>
              </View>
            </TouchableOpacity>

            {/* مقاله ۲ */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.articleCardNew,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  width: 200,
                  overflow: "hidden",
                },
              ]}
              onPress={handleLearningPress}
            >
              <View
                style={[
                  styles.articleImageContainerNew,
                  {
                    height: 120,
                    backgroundColor: colors.surfaceDim,
                    position: "relative",
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe9te2QrxafYck5nANLQZu74vkb4x6t-0iBBbo7nUZuYgTBDSjVm_fyA-SNa_5JT6_yl1eJOsvFXSNom1Vt0Jhde7kYYvvcCKmRzlzasD2xi6UavBvxKDBVWZs1fo9bn9mQKlMsX-nafRcFj15k8bbJpL5QcFDDL6sUC3gu5gqe6YdyfkHL7fve-mjaAE0GWzGnwnvqlH6IkyFVd9uaqEbm_ovvZgcjdkDOlsjqKaQVYg-w76Nn_UcRQ",
                  }}
                  style={styles.articleImageNew}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.articleTagNew,
                    {
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colors.secondary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.onPrimary, fontSize: 8 }}
                  >
                    استاندارد
                  </AppText>
                </View>
              </View>
              <View style={{ padding: spacing.md }}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary, fontSize: 10 }}
                >
                  ۴ دقیقه مطالعه
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.articleTitleNew,
                    {
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 2,
                      marginBottom: 4,
                      lineHeight: 18,
                    },
                  ]}
                  numberOfLines={2}
                >
                  گواهینامه‌های استاندارد ۱۴۰۳
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={{ fontSize: 11 }}
                >
                  ۱۰ مهر ۱۴۰۳
                </AppText>
              </View>
            </TouchableOpacity>

            {/* مقاله ۳ */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.articleCardNew,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  width: 200,
                  overflow: "hidden",
                },
              ]}
              onPress={handleLearningPress}
            >
              <View
                style={[
                  styles.articleImageContainerNew,
                  {
                    height: 120,
                    backgroundColor: colors.surfaceDim,
                    position: "relative",
                  },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQJfvOIMiKOxUFGA8yhZM6QxNh1c0RZal85RmghBF9wreN317v89ln2L9O0uZfvIqZYexV0elFdrk-KB5BWWoG8DiPipF89JJGKbICI2HeC_wgwN_voueC6Ji3BkPMdxy5jcnpbHPDbTLNqmmbUx7uqfOaQ6EY22OQwbV7GL0Azg1ai9HEeZrVpRH0ZEFhUTKI2RKhEMrmg4uy_270tkWy51USQr2Nwa0WLxdWoF_1LGoh6x0fyVzbA",
                  }}
                  style={styles.articleImageNew}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.articleTagNew,
                    {
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colors.secondary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <AppText
                    variant="labelSm"
                    style={{ color: colors.onPrimary, fontSize: 8 }}
                  >
                    قطعات
                  </AppText>
                </View>
              </View>
              <View style={{ padding: spacing.md }}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary, fontSize: 10 }}
                >
                  ۶ دقیقه مطالعه
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.articleTitleNew,
                    {
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 2,
                      marginBottom: 4,
                      lineHeight: 18,
                    },
                  ]}
                  numberOfLines={2}
                >
                  عمر مفید کابل‌های کششی
                </AppText>
                <AppText
                  variant="body"
                  color="muted"
                  style={{ fontSize: 11 }}
                >
                  ۸ مهر ۱۴۰۳
                </AppText>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
  },
  heroTitle: {
    textAlign: "right",
    fontSize: 26,
    lineHeight: 36,
    marginBottom: 12,
  },
  heroSubtitle: {
    textAlign: "right",
    lineHeight: 24,
    marginBottom: 24,
  },
  heroActionContainer: {
    width: "100%",
    gap: 12,
  },
  emergencyButton: {
    height: 48,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  catalogButton: {
    height: 48,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  section: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    textAlign: "right",
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  serviceCard: {
    borderWidth: 1,
    alignItems: "flex-end",
  },
  iconContainerSmall: {},
  serviceTitleSmall: {},
  serviceDescSmall: {},
  carouselHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  carouselTitle: {},
  carouselScroll: {
    flexDirection: "row-reverse",
    gap: 12,
  },
  partCardNew: {},
  partImageContainerNew: {},
  partImageNew: {
    width: "100%",
    height: "100%",
  },
  tagContainerNew: {},
  partNameNew: {},
  articleCardNew: {},
  articleImageContainerNew: {},
  articleImageNew: {
    width: "100%",
    height: "100%",
  },
  articleTagNew: {},
  articleTitleNew: {},
  modernizationBanner: {
    paddingVertical: 24,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bannerTextContent: {
    width: "100%",
  },
  bannerButton: {
    height: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});