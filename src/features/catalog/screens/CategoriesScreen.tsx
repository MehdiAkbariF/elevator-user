// src/features/catalog/screens/CategoriesScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { AppBottomNav } from "@/src/components/layout/AppBottomNav";
import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ایمپورت محاسبات حاشیه امن برای حاشیه اسکرول

const { width } = Dimensions.get("window");

export const CategoriesScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // رصد پویای ارتفاع حاشیه امن پایینی گوشی
  const [searchQuery, setSearchQuery] = useState("");

  // محاسبه ریاضی عرض کارت‌های دسته‌بندی
  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: "/catalog",
      params: { categoryId: categoryId },
    });
  };

  const categoriesData = [
    {
      id: "motors",
      title: "موتورهای کششی",
      count: "۱۸ کالا",
      icon: "settings-outline",
    },
    {
      id: "cabin",
      title: "کابین و تجهیزات داخلی",
      count: "۱۲ کالا",
      icon: "business-outline",
    },
    {
      id: "panels",
      title: "تابلو فرمان و پنل‌ها",
      count: "۳۵ کالا",
      icon: "hardware-chip-outline",
    },
    {
      id: "cables",
      title: "سیم بکسل و کابل‌ها",
      count: "۹ کالا",
      icon: "git-commit-outline",
    },
    {
      id: "safety",
      title: "پاراشوت و ترمز ایمنی",
      count: "۱۵ کالا",
      icon: "shield-checkmark-outline",
    },
    {
      id: "doors",
      title: "درب بازکن و طبقات",
      count: "۲۲ کالا",
      icon: "open-outline",
    },
  ];

  return (
    <ScreenWrapper>
      {/* هدر بالایی کاتالوگ */}
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
            دسته‌بندی قطعات
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.headerButton, { marginLeft: spacing.xs }]}
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color={colors.textPrimary}
            />
            <View
              style={[
                styles.cartBadge,
                { backgroundColor: colors.error, borderColor: colors.surface },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // محاسبه ریاضی حاشیه امن انتهایی: ارتفاع منو + ۸۰ پیکسل حاشیه سفید خالی
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 80 + (64 + insets.bottom),
          },
        ]}
      >
        {/* باکس سرچ */}
        <View style={[styles.searchSection, { paddingVertical: spacing.md }]}>
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
              placeholder="جستجو در دسته‌بندی‌های ایکس الوتور..."
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

        {/* بنر ترویجی */}
        <View
          style={[
            styles.promoBanner,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
            },
          ]}
        >
          <View style={styles.bannerTextContent}>
            <AppText
              variant="h2"
              style={{ color: colors.onPrimary, marginBottom: 4 }}
            >
              روغن و قطعات مصرفی آسانسور
            </AppText>
            <AppText
              variant="body"
              style={{ color: colors.onPrimary, opacity: 0.8, fontSize: 13 }}
            >
              تأمین روغن‌های سیم بکسل و روان‌کننده‌های استاندارد برای سرویس‌های
              دوره‌ای منظم.
            </AppText>
          </View>
          <View style={styles.bannerIconContainer}>
            <Ionicons
              name="color-fill-outline"
              size={44}
              color={colors.onPrimary}
              style={{ opacity: 0.8 }}
            />
          </View>
        </View>

        {/* گرید دسته‌بندی‌ها */}
        <View style={styles.categoriesSection}>
          <AppText variant="body" color="primary" style={styles.sectionHeading}>
            همه دسته‌بندی‌ها
          </AppText>

          <View style={styles.categoriesGrid}>
            {categoriesData.map((cat) => {
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                  activeOpacity={0.9}
                  style={[
                    styles.categoryCard,
                    {
                      width: cardWidth,
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      borderRadius: borderRadius.lg,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: colors.surfaceDim },
                    ]}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={22}
                      color={colors.textPrimary}
                    />
                  </View>

                  <View style={styles.cardInfo}>
                    <AppText
                      variant="h2"
                      style={[
                        styles.categoryTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {cat.title}
                    </AppText>
                    <AppText
                      variant="body"
                      color="muted"
                      style={styles.categoryCount}
                    >
                      {cat.count}
                    </AppText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* ناوبری پایینی سراسری */}
      <AppBottomNav activeTab="categories" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 8,
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
    position: "relative",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchSection: {
    width: "100%",
  },
  searchBar: {
    height: 44,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    textAlign: "right",
    fontSize: 14,
  },
  promoBanner: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 110,
    overflow: "hidden",
    marginBottom: 24,
  },
  bannerTextContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingLeft: 16,
  },
  bannerIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesSection: {
    width: "100%",
  },
  sectionHeading: {
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  categoriesGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 12,
    width: "100%",
  },
  categoryCard: {
    padding: 16,
    borderWidth: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardInfo: {
    width: "100%",
    alignItems: "flex-end",
  },
  categoryTitle: {
    textAlign: "right",
    fontSize: 14,
    lineHeight: 18,
    height: 36,
  },
  categoryCount: {
    textAlign: "right",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
});
