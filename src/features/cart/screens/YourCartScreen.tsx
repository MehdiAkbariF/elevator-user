// src/features/cart/screens/YourCartScreen.tsx

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
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const YourCartScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت پویای فاصله دکمه‌های پایینی موبایل

  const [promoCode, setPromoCode] = useState("");
  const [quantities, setQuantities] = useState({ item1: 1, item2: 1 });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  };

  const updateQuantity = (item: "item1" | "item2", type: "inc" | "dec") => {
    setQuantities((prev) => {
      const current = prev[item];
      if (type === "dec" && current > 1) {
        return { ...prev, [item]: current - 1 };
      }
      if (type === "inc") {
        return { ...prev, [item]: current + 1 };
      }
      return prev;
    });
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی با چیدمان استاندارد و چپ‌چین شده دکمه بازگشت */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        {/* دکمه بازگشت به چپ استاندارد */}
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            سبد خرید شما
          </AppText>
        </View>

        {/* دکمه پاک کردن کل سبد در سمت راست */}
        <TouchableOpacity activeOpacity={0.7} style={styles.headerButton}>
          <AppText variant="button" color="secondary">
            حذف همه
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // پدینگ پایینی بزرگ‌تر برای عدم تداخل با دکمه پرداخت چسبنده و نوار پایینی
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: 120 + (64 + insets.bottom),
          },
        ]}
      >
        {/* بخش اول: لیست اقلام سبد خرید */}
        <View style={[styles.itemsSection, { gap: spacing.md }]}>
          {/* کالا ۱: سیم بکسل */}
          <View
            style={[
              styles.cartCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            {/* تصویر کالا در سمت راست */}
            <View
              style={[
                styles.imageWrapper,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                },
              ]}
            >
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr7C15R2E8JR08mci0TD25O81IKoXz9XGx4-m7aBm9zoFwxNhoCeh44av3POCFVF_McNXl0BaBskqznrmIougYmkTYFOeucZ3LeXK8JJF6-57JWdBsVnQu0FDmEBOZbH6W9g_WFwNNdXYjvfBXWIarN3Jnf8WQhxLsytYmLD2XFhF4BEjPDbmJhy41Gp49Qn7MfkNmzWcwvta0_QgBO5_bC3tsD37VJqqrfJ3U4QIrl9hK7Kc6EONQTw",
                }}
                style={styles.productImage}
              />
            </View>

            {/* مشخصات کالا در سمت چپ */}
            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.productMeta}>
                  <AppText
                    variant="labelSm"
                    color="secondary"
                    style={styles.brandTag}
                  >
                    KONE
                  </AppText>
                  <AppText
                    variant="body"
                    numberOfLines={2}
                    style={[styles.productName, { color: colors.textPrimary }]}
                  >
                    سیم بکسل کششی فولادی ۸ میلی‌متری
                  </AppText>
                </View>
                {/* دکمه حذف آیتم در بالا سمت چپ کارت */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.deleteButton}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.outline}
                  />
                </TouchableOpacity>
              </View>

              {/* قیمت و کنترلر تعداد */}
              <View style={styles.cardFooterRow}>
                <AppText
                  variant="h2"
                  style={[styles.priceText, { color: colors.textPrimary }]}
                >
                  ۲,۴۵۰,۰۰۰ تومان
                </AppText>

                {/* کنترل‌کننده بومی تعداد */}
                <View
                  style={[
                    styles.quantitySelector,
                    {
                      borderColor: colors.border,
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => updateQuantity("item1", "inc")}
                    activeOpacity={0.7}
                    style={[
                      styles.quantityBtn,
                      { backgroundColor: colors.surfaceDim },
                    ]}
                  >
                    <Ionicons name="add" size={16} color={colors.textPrimary} />
                  </TouchableOpacity>

                  <AppText
                    variant="button"
                    style={[
                      styles.quantityValue,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {quantities.item1}
                  </AppText>

                  <TouchableOpacity
                    onPress={() => updateQuantity("item1", "dec")}
                    activeOpacity={0.7}
                    style={[
                      styles.quantityBtn,
                      { backgroundColor: colors.surfaceDim },
                    ]}
                  >
                    <Ionicons
                      name="remove"
                      size={16}
                      color={colors.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* کالا ۲: موتور گیرلس */}
          <View
            style={[
              styles.cartCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <View
              style={[
                styles.imageWrapper,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                },
              ]}
            >
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBciiNHmbwI70GkRaFNTcLQdydKCwSoF4BQSpZURFP8ZQdZgT_icxvtICmLexDU2pTxGM4ss2QOm57ujT2TTNyAF3p_ugXUD5rEzViJliYztHtxcsbFPkQUd-wtBWAFjAczI1vR2dOrbJoWCwXke5Ia-HOdkpHAXI6g3n-6MDr0oeYPb01zbhy-CKIyZX7wR4adbvBPjrlXilzKgHano84DlHD6xDk7gwcEKjaJpwOopQH-jCiFihzODA",
                }}
                style={styles.productImage}
              />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.productMeta}>
                  <AppText
                    variant="labelSm"
                    color="secondary"
                    style={styles.brandTag}
                  >
                    SICOR
                  </AppText>
                  <AppText
                    variant="body"
                    numberOfLines={2}
                    style={[styles.productName, { color: colors.textPrimary }]}
                  >
                    موتور گیرلس آسانسور مدل SG10 شفت چدنی
                  </AppText>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.deleteButton}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.outline}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardFooterRow}>
                <AppText
                  variant="h2"
                  style={[styles.priceText, { color: colors.textPrimary }]}
                >
                  ۱۲۰,۰۰۰,۰۰۰ تومان
                </AppText>

                <View
                  style={[
                    styles.quantitySelector,
                    {
                      borderColor: colors.border,
                      borderRadius: borderRadius.sm,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => updateQuantity("item2", "inc")}
                    activeOpacity={0.7}
                    style={[
                      styles.quantityBtn,
                      { backgroundColor: colors.surfaceDim },
                    ]}
                  >
                    <Ionicons name="add" size={16} color={colors.textPrimary} />
                  </TouchableOpacity>

                  <AppText
                    variant="button"
                    style={[
                      styles.quantityValue,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {quantities.item2}
                  </AppText>

                  <TouchableOpacity
                    onPress={() => updateQuantity("item2", "dec")}
                    activeOpacity={0.7}
                    style={[
                      styles.quantityBtn,
                      { backgroundColor: colors.surfaceDim },
                    ]}
                  >
                    <Ionicons
                      name="remove"
                      size={16}
                      color={colors.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* بخش دوم: کادر ورود کد تخفیف */}
        <View style={[styles.promoSection, { marginTop: spacing.lg }]}>
          <View style={styles.promoRow}>
            <TextInput
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="کد تخفیف"
              placeholderTextColor={colors.outline}
              style={[
                styles.promoInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                },
              ]}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.promoBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                اعمال کد
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* بخش سوم: کارت شیوه ارسال به صورت باربری یا پیک */}
        <View
          style={[
            styles.deliveryCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              marginTop: spacing.lg,
            },
          ]}
        >
          <View
            style={[
              styles.deliveryHeader,
              { borderBottomColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.deliveryIconCircle,
                { backgroundColor: colors.surfaceDim },
              ]}
            >
              <Ionicons
                name="bus-outline"
                size={20}
                color={colors.textPrimary}
              />
            </View>
            <View style={styles.deliveryTextInfo}>
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                ارسال استاندارد (باربری کشوری)
              </AppText>
              <AppText
                variant="body"
                color="muted"
                style={{ fontSize: 12, marginTop: 2 }}
              >
                تحویل در ۱ الی ۲ روز کاری
              </AppText>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons
                name="create-outline"
                size={18}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* فیلد اجباری آدرس */}
          <TouchableOpacity activeOpacity={0.8} style={styles.addressButton}>
            <Ionicons
              name="chevron-back-outline"
              size={20}
              color={colors.textSecondary}
            />
            <AppText variant="body" color="muted" style={styles.addressText}>
              لطفاً برای ثبت آدرس تحویل، وارد حساب کاربری خود شوید.
            </AppText>
            <Ionicons
              name="location-outline"
              size={20}
              color={colors.textSecondary}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        {/* بخش چهارم: فاکتور محاسباتی مبالغ (Order Summary) */}
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              marginTop: spacing.lg,
            },
          ]}
        >
          <View style={styles.summaryRow}>
            <AppText
              variant="button"
              style={{
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Bold",
              }}
            >
              ۱۲۲,۴۵۰,۰۰۰ تومان
            </AppText>
            <AppText variant="body" color="muted">
              مبلغ کل کالاها
            </AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText
              variant="button"
              style={{ color: "#15803D", fontFamily: "IRANYekanXFaNum-Bold" }}
            >
              رایگان
            </AppText>
            <AppText variant="body" color="muted">
              هزینه ارسال باربری
            </AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText
              variant="button"
              style={{
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Bold",
              }}
            >
              ۴۵,۰۰۰ تومان
            </AppText>
            <AppText variant="body" color="muted">
              مالیات و عوارض ارزش افزوده
            </AppText>
          </View>
          <View
            style={[styles.cardDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.totalRow}>
            <AppText
              variant="h1"
              style={{
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Bold",
              }}
            >
              ۱۲۲,۴۹۵,۰۰۰ تومان
            </AppText>
            <AppText variant="h2" style={{ color: colors.textPrimary }}>
              مبلغ قابل پرداخت
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* ۵. نوار چسبناک پایینی جهت هدایت به درگاه پرداخت */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 80 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.checkoutBtn,
            { backgroundColor: colors.primary, borderRadius: borderRadius.md },
          ]}
        >
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={colors.onPrimary}
            style={{ marginRight: 8 }}
          />
          <AppText variant="button" style={{ color: colors.onPrimary }}>
            ادامه و ثبت سفارش
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی سراسری با زبانه فعال سبد خرید */}
      <AppBottomNav activeTab="cart" />
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemsSection: {
    width: "100%",
  },
  cartCard: {
    borderWidth: 1,
    padding: 16,
    flexDirection: "row-reverse", // چینش عکس راست، متن چپ برای RTL فارسی
    alignItems: "flex-start", // تصحیح شد: تغییر مقدار غیرمجاز 'start' به 'flex-start' برای جلوگیری از کرش در اندروید
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    paddingRight: 16,
  },
  cardHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  productMeta: {
    alignItems: "flex-end",
    flex: 1,
  },
  brandTag: {
    fontSize: 10,
    marginBottom: 2,
    // تصحیح شد: حذف کامپوننت تداخل‌برانگیز fontWeight
  },
  productName: {
    textAlign: "right",
    fontSize: 13,
    lineHeight: 18,
  },
  deleteButton: {
    padding: 4,
  },
  cardFooterRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  priceText: {
    fontSize: 15,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    borderWidth: 1,
    overflow: "hidden",
  },
  quantityBtn: {
    width: 32,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    width: 32,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  promoSection: {
    width: "100%",
  },
  promoRow: {
    flexDirection: "row-reverse",
    gap: 8,
    width: "100%",
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: "right",
  },
  promoBtn: {
    height: 48,
    paddingHorizontal: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryCard: {
    borderWidth: 1,
    overflow: "hidden",
  },
  deliveryHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  deliveryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  deliveryTextInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  addressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
    width: "100%",
  },
  addressText: {
    flex: 1,
    textAlign: "right",
    fontSize: 13,
  },
  summaryCard: {
    borderWidth: 1,
    padding: 20,
  },
  summaryRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardDivider: {
    height: 1,
    width: "100%",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    elevation: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    zIndex: 110,
  },
  checkoutBtn: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        maxWidth: 440,
      },
    }),
  },
});
