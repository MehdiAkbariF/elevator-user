// src/features/catalog/screens/FavoritesScreen.tsx

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
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const FavoritesScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const [activeTab, setActiveTab] = useState<"parts" | "articles">("parts");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/product",
      params: { id: productId },
    });
  };

  // محاسبه ریاضی عرض کارت‌های کاتالوگ قطعات جهت دو ستونه شدن کامل در انواع موبایل‌ها
  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  // قطعات نشان‌شده نمونه
  const favoriteProducts = [
    {
      id: "1",
      brand: "KONE",
      name: "برد کنترلر درب آسانسور VVVF کونه",
      price: "۴,۵۰۰,۰۰۰ تومان",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAOnEH7SVVv6sWv049BmBy2RYL4dDV4l8bpVG3Z6xuC47DKiEWIUgu11ebj0Oou3RyaozCMRkbhJf1wvVOMKwh9lQUBY3pqF4iPZmkXrUBtflplgeKB1MEPvyyzRc9d5Hf47epaR157z0u9ECrEXcV-a3jXQ3zSVkLyhgdHDq3AtYT8f2QUPT6UkcIKntKqSYfscContYy7f0u-ab7SU4w1xDCh_Ll84yCXdr1eRv3bACtNhiSJqArHrQ",
    },
    {
      id: "2",
      brand: "OTIS",
      name: "میکروسوئیچ حد آسانسور اوتیس X-10",
      price: "۱,۲۵۰,۰۰۰ تومان",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDp9SmUglDyWR3I3GMqXF_7SJxySqSpN-g6SN6eX5zG7VugSaiBKJTminzz7sWInHOza2DpPuSahMVfLH3bFvggQO6wEMS_OJZLxmWmgyuQPvJyqgqAjUUShJQ4HatzKEi4uDqclxUj7FidtztiX2qOWMDBo8bnIQtHLm0hF02ZQ9YhzI3g-tzTMMouQq8qb9bUzmoIlJMU1D7QSvrJ4d14bAuwG2j25mZlGwD2h3iNSuhgi5bKPt_-FQ",
    },
    {
      id: "3",
      brand: "SCHINDLER",
      name: "رولر کفشک ریل آسانسور شیندلر اصلی",
      price: "۳,۵۰۰,۰۰۰ تومان",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9wH6p-pYDpdYpnImaVSvQj3obkGDEN2Y-XLHiD8-Mt1Bkv4K2OnUOg8uBnpJyqqfGs6gz9lDxfoKiEBff-C0KzueSqT9FcxK43bGJUaNNjiUO9IGyiMQU0gxf2xxfRPYV1nBT3u9Z71XwhfhWU9ZWiRlynujM6DB8moEskpD4YsAOFeEANQGNhZhuE9nOiZ3tjKbrVVzSgpH97j_rmq8APm5jg7ybtNnxcp9Itm0RC4lZZhfJRKJWQ",
    },
    {
      id: "4",
      brand: "UNIVERSAL",
      name: "شستی توقف اضطراری قارچی آسانسور",
      price: "۷۵۰,۰۰۰ تومان",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDQ20No7Oszc48b6XJyKcywJNsc4Dhg2ebZNe_8iOBWTufLeyFA-MrEJUuQ7y5vCTNzOh01hqsNMCcu1jSJYucOHl80TAzzuHmR-D0433B9ZE-eqU_ZSz8Az53vTTdnBoGUR5QYxiVbBYeDqPXcynRIpzcImwOYHqAtawNYyIKyZYZHtUEZPDNVIROlc_hdoVq953WJPtNKLW6uu3Mx8z9aVutqDyfGcjtuj40LjNq3t4COfwYuX4j2w",
    },
  ];

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
            علاقه‌مندی‌های من
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
            paddingBottom: 100 + insets.bottom,
          },
        ]}
      >
        {/* ۱. سوئیچر سگمنتد کنترل تفکیک قطعات و مقالات آموزشی نشان‌شده */}
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
            onPress={() => setActiveTab("articles")}
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              activeTab === "articles" && {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color:
                  activeTab === "articles"
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              مقالات و راهنماها
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("parts")}
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              activeTab === "parts" && {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <AppText
              variant="button"
              style={{
                color:
                  activeTab === "parts"
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              قطعات ذخیره‌شده
            </AppText>
          </TouchableOpacity>
        </View>

        {/* نمایش پویای اقلام بر اساس زبانه فعال */}
        {activeTab === "parts" ? (
          /* گرید ۲ ستونه قطعات نشان‌شده */
          <View style={styles.productGrid}>
            {favoriteProducts.map((product) => {
              return (
                <View
                  key={product.id}
                  style={[
                    styles.productCard,
                    {
                      width: cardWidth,
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      borderRadius: borderRadius.lg,
                    },
                  ]}
                >
                  {/* بخش تصویر با نسبت مربع */}
                  <View
                    style={[
                      styles.imageWrapper,
                      { backgroundColor: colors.surfaceDim },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => handleProductPress(product.id)}
                      style={styles.imageTouch}
                    >
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                    </TouchableOpacity>

                    {/* دکمه حذف علاقه‌مندی قرمز رنگ در بالا سمت چپ کادر */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.favoriteButton}
                    >
                      <Ionicons name="heart" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  {/* اطلاعات کالا */}
                  <View style={styles.productInfo}>
                    <AppText
                      variant="labelSm"
                      color="muted"
                      style={styles.productBrand}
                    >
                      {product.brand}
                    </AppText>

                    <AppText
                      variant="body"
                      numberOfLines={2}
                      style={[
                        styles.productName,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {product.name}
                    </AppText>

                    {/* قیمت و دکمه خرید */}
                    <View style={styles.cardFooter}>
                      <AppText
                        variant="button"
                        style={{
                          color: colors.textPrimary,
                          fontFamily: "IRANYekanXFaNum-Bold",
                        }}
                      >
                        {product.price}
                      </AppText>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.addToCartBtn,
                          {
                            borderColor: colors.border,
                            borderRadius: borderRadius.sm,
                          },
                        ]}
                      >
                        <Ionicons
                          name="add"
                          size={18}
                          color={colors.textPrimary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          /* شبیه‌سازی خالی بودن لیست مقالات نشان‌شده */
          <View
            style={[
              styles.emptyContainer,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Ionicons
              name="book-outline"
              size={48}
              color={colors.textSecondary}
              style={{ marginBottom: 12 }}
            />
            <AppText variant="body" color="muted">
              هنوز هیچ مقاله یا راهنمایی را ذخیره نکرده‌اید.
            </AppText>
          </View>
        )}
      </ScrollView>

      {/* ناوبری پایینی سراسری با تب فعال پروفایل */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی پروژه
export default FavoritesScreen;

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
  productGrid: {
    flexDirection: "row-reverse", // رندر قطعات از راست به چپ در فارسی
    flexWrap: "wrap",
    gap: 12,
    width: "100%",
  },
  productCard: {
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrapper: {
    aspectRatio: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 8,
  },
  imageTouch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8, // موقعیت آیکون قلب در بالا سمت چپ تصویر قطعه
    padding: 4,
  },
  productInfo: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  productBrand: {
    textAlign: "right",
    fontSize: 10,
    marginBottom: 4,
  },
  productName: {
    textAlign: "right",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    height: 36,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addToCartBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    borderWidth: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
