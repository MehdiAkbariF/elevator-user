// src/features/catalog/screens/PartsCatalogScreen.tsx

import { AppButton } from "@/src/components/common/AppButton";
import { AppModal } from "@/src/components/common/AppModal";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ایمپورت محاسبات حاشیه امن برای دکمه فیلتر

const { width } = Dimensions.get("window");

const INITIAL_PRODUCTS = [
  {
    id: "1",
    brand: "KONE",
    name: "سیم بکسل کششی فولادی ۸ میلی‌متری",
    price: "۲,۴۵۰,۰۰۰ تومان",
    isAvailable: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr7C15R2E8JR08mci0TD25O81IKoXz9XGx4-m7aBm9zoFwxNhoCeh44av3POCFVF_McNXl0BaBskqznrmIougYmkTYFOeucZ3LeXK8JJF6-57JWdBsVnQu0FDmEBOZbH6W9g_WFwNNdXYjvfBXWIarN3Jnf8WQhxLsytYmLD2XFhF4BEjPDbmJhy41Gp49Qn7MfkNmzWcwvta0_QgBO5_bC3tsD37VJqqrfJ3U4QIrl9hK7Kc6EONQTw",
  },
  {
    id: "2",
    brand: "SCHINDLER",
    name: "قفل کامل درب طبقات آسانسور شیندلر",
    price: "۸,۹۰۰,۰۰۰ تومان",
    isAvailable: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAk8F71OyFkQkMPoDoWFb7vPC287xKMPf8tdpgK0MOixbw7V5q4uHHUraiS2FN22zLEnEvlMAG0ZtdHRAS5fuVMTwlKDECcZF02yQ4XlqWL9KhK9vJv1TDnRwRnfvLqFC_AdKU_x5MtxSvBCCSen7o4y78WtSgR8xyWwKm_aZV2e64uyqC5Wn8xasu6N4knHIZNeiN8aQnpbnZqRcvMmSuZkG5xrWqJm0K5iN_MYF79yOvy2w1O6Izn4w",
  },
  {
    id: "3",
    brand: "ORONA",
    name: "میکروسوئیچ حد صنعتی (شالتر آسانسور)",
    price: "۱,۲۵۰,۰۰۰ تومان",
    isAvailable: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJOuId653dDeMv-3lWDnrlAJakMDkyo9OCfUW7b1GCngnjNX7AK5r0F8wL5w8X6Q-c0dkAOO2E5YIB7y_VOOXp39lM3csFJDPQ_HbWGXCgRaKekcyABv3vJW-pSxeN-D5PJNp7cg_ft24kMwUsLAdRz_OzAl3gO2RTsLmFKHdkAJyz8JuQRcoj2-PkcAfdu_w467DOorzW5hyu6E4BbGRo2IFgb6HBZseGsejS_o74imNc_aQIzcSFRA",
  },
  {
    id: "4",
    brand: "GENERIC",
    name: "لنت کفشک ریل آسانسور ۱۶ میلی‌متری",
    price: "استعلام قیمت",
    isAvailable: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4vAK9ArcMrUX6fKRpFrkv_tC1y6EPlXazYt1NWyFo-PS1fULY2qhD_4i4aSz26jcfp_Ft9Tr035oOhvySU6EpQvv7ksjz6Gf4cHdDsAtXlrB4V0qCOHh6vMLxvDbzL5JAVNSg1HkBtwbpZkVXNEveZnoCWwYybB5kdPR3zTKEgd6IU1FzDxxda5JFHvNccIdGZvX5r4bt1u9QlsKpSPMv45YXqZNoyjYMccqHskJ7d2_-NL7TGUOelw",
  },
];

export const PartsCatalogScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // رصد پویای فاصله دکمه‌های پایینی موبایل
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [filterVisible, setFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const categories = [
    { id: "all", title: "همه قطعات" },
    { id: "doors", title: "مکانیزم درب‌ها" },
    { id: "safety", title: "ترمز ایمنی" },
    { id: "cables", title: "سیم بکسل" },
  ];

  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  };

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/product",
      params: { id: productId },
    });
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی کاتالوگ با بازگشت هوشمند چپ‌چین */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        {/* کلید بک استاندارد به سمت چپ */}
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            قطعات و تجهیزات ایکس الواتور
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

      {/* بخش جستجو */}
      <View
        style={[
          styles.searchSection,
          { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
        ]}
      >
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
            placeholder="جستجوی موتور، درب، کابل، لنت ریل..."
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

      {/* فیلترهای چرخشی افقی */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.categoryScroll,
            { paddingHorizontal: spacing.lg },
          ]}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.8}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isActive ? colors.primary : colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.full,
                  },
                ]}
              >
                <AppText
                  variant="button"
                  style={{
                    color: isActive ? colors.onPrimary : colors.textSecondary,
                  }}
                >
                  {cat.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* گرید ۲ ستونه قطعات */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.gridContainer,
          { paddingHorizontal: spacing.lg, paddingBottom: 160 },
        ]}
      >
        <View style={styles.productGrid}>
          {INITIAL_PRODUCTS.map((product) => {
            return (
              <TouchableOpacity
                key={product.id}
                activeOpacity={0.9}
                onPress={() => handleProductPress(product.id)}
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
                <View
                  style={[
                    styles.imageWrapper,
                    { backgroundColor: colors.surfaceDim },
                  ]}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.favoriteButton}
                  >
                    <Ionicons
                      name="heart-outline"
                      size={20}
                      color={colors.outline}
                    />
                  </TouchableOpacity>
                </View>

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
                    style={[styles.productName, { color: colors.textPrimary }]}
                  >
                    {product.name}
                  </AppText>

                  <View style={styles.cardFooter}>
                    <AppText
                      variant="button"
                      style={{
                        color: product.isAvailable
                          ? colors.textPrimary
                          : colors.secondary,
                        fontFamily: "IRANYekanXFaNum-Bold",
                      }}
                    >
                      {product.price}
                    </AppText>

                    {product.isAvailable ? (
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
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.callBtn,
                          {
                            borderColor: colors.secondary,
                            borderRadius: borderRadius.sm,
                          },
                        ]}
                      >
                        <Ionicons
                          name="call-outline"
                          size={14}
                          color={colors.secondary}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* دکمه شناور فیلتر با اصلاح پویای ارتفاع جهت جلوگیری از تداخل با منوی پایینی */}
      <View
        style={[styles.floatingButtonContainer, { bottom: 80 + insets.bottom }]}
      >
        <TouchableOpacity
          onPress={() => setFilterVisible(true)}
          activeOpacity={0.9}
          style={[
            styles.floatingFilterBtn,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              borderRadius: borderRadius.full,
            },
          ]}
        >
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            فیلتر و مرتب‌سازی
          </AppText>
          <Ionicons
            name="at-outline"
            size={18}
            color={colors.onPrimary}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>

      {/* پاپ آپ مودال کشویی */}
      <AppModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        title="فیلتر و مرتب‌سازی"
      >
        <View style={styles.modalContent}>
          <AppText variant="h2" style={styles.modalSubTitle}>
            مرتب‌سازی بر اساس
          </AppText>
          <View style={styles.filterPillsRow}>
            {[
              { id: "popular", label: "محبوب‌ترین" },
              { id: "cheapest", label: "ارزان‌ترین" },
              { id: "expensive", label: "گران‌ترین" },
              { id: "newest", label: "جدیدترین" },
            ].map((item) => {
              const active = sortBy === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSortBy(item.id)}
                  style={[
                    styles.modalPill,
                    {
                      backgroundColor: active
                        ? colors.secondary
                        : colors.surface,
                      borderColor: active ? colors.secondary : colors.border,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <AppText
                    variant="button"
                    style={{ color: active ? "#FFFFFF" : colors.textSecondary }}
                  >
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          <AppText
            variant="h2"
            style={[styles.modalSubTitle, { marginTop: spacing.lg }]}
          >
            برند سازنده
          </AppText>
          <View style={styles.filterPillsRow}>
            {[
              { id: "all", label: "همه برندها" },
              { id: "kone", label: "KONE" },
              { id: "schindler", label: "Schindler" },
              { id: "orona", label: "Orona" },
            ].map((item) => {
              const active = selectedBrand === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedBrand(item.id)}
                  style={[
                    styles.modalPill,
                    {
                      backgroundColor: active
                        ? colors.secondary
                        : colors.surface,
                      borderColor: active ? colors.secondary : colors.border,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <AppText
                    variant="button"
                    style={{ color: active ? "#FFFFFF" : colors.textSecondary }}
                  >
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={[
              styles.modalFooterActions,
              { marginTop: spacing.xl, gap: spacing.md },
            ]}
          >
            <AppButton
              title="اعمال فیلتر"
              onPress={() => setFilterVisible(false)}
            />
            <TouchableOpacity
              onPress={() => {
                setSortBy("popular");
                setSelectedBrand("all");
              }}
              style={[
                styles.clearBtn,
                { borderColor: colors.border, borderRadius: borderRadius.md },
              ]}
            >
              <AppText variant="button" color="muted">
                پاک کردن همه
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </AppModal>

      <AppBottomNav activeTab="shop" />
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
  categoryContainer: {
    width: "100%",
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: "row-reverse",
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  gridContainer: {
    paddingTop: 8,
  },
  productGrid: {
    flexDirection: "row-reverse",
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
  productImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8,
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
  callBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  floatingFilterBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalContent: {
    width: "100%",
  },
  modalSubTitle: {
    textAlign: "right",

    marginBottom: 12,
  },
  filterPillsRow: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 8,
    width: "100%",
    marginBottom: 8,
  },
  modalPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  modalFooterActions: {
    width: "100%",
  },
  clearBtn: {
    height: 56,
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
