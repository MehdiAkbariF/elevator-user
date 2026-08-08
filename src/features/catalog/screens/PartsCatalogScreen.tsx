// src/features/catalog/screens/PartsCatalogScreen.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/theme/ThemeContext';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText'; // استفاده از آدرس مستقیم مورد نظر شما

const { width } = Dimensions.get('window');

// داده‌های نمونه قطعات یدکی با ترجمه دقیق و تخصصی
const INITIAL_PRODUCTS = [
  {
    id: '1',
    brand: 'KONE',
    name: 'سیم بکسل کششی فولادی ۸ میلی‌متری',
    price: '۲,۴۵۰,۰۰۰ تومان',
    isAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr7C15R2E8JR08mci0TD25O81IKoXz9XGx4-m7aBm9zoFwxNhoCeh44av3POCFVF_McNXl0BaBskqznrmIougYmkTYFOeucZ3LeXK8JJF6-57JWdBsVnQu0FDmEBOZbH6W9g_WFwNNdXYjvfBXWIarN3Jnf8WQhxLsytYmLD2XFhF4BEjPDbmJhy41Gp49Qn7MfkNmzWcwvta0_QgBO5_bC3tsD37VJqqrfJ3U4QIrl9hK7Kc6EONQTw',
  },
  {
    id: '2',
    brand: 'SCHINDLER',
    name: 'قفل کامل درب طبقات آسانسور شیندلر',
    price: '۸,۹۰۰,۰۰۰ تومان',
    isAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk8F71OyFkQkMPoDoWFb7vPC287xKMPf8tdpgK0MOixbw7V5q4uHHUraiS2FN22zLEnEvlMAG0ZtdHRAS5fuVMTwlKDECcZF02yQ4XlqWL9KhK9vJv1TDnRwRnfvLqFC_AdKU_x5MtxSvBCCSen7o4y78WtSgR8xyWwKm_aZV2e64uyqC5Wn8xasu6N4knHIZNeiN8aQnpbnZqRcvMmSuZkG5xrWqJm0K5iN_MYF79yOvy2w1O6Izn4w',
  },
  {
    id: '3',
    brand: 'ORONA',
    name: 'میکروسوئیچ حد صنعتی (شالتر آسانسور)',
    price: '۱,۲۵۰,۰۰۰ تومان',
    isAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJOuId653dDeMv-3lWDnrlAJakMDkyo9OCfUW7b1GCngnjNX7AK5r0F8wL5w8X6Q-c0dkAOO2E5YIB7y_VOOXp39lM3csFJDPQ_HbWGXCgRaKekcyABv3vJW-pSxeN-D5PJNp7cg_ft24kMwUsLAdRz_OzAl3gO2RTsLmFKHdkAJyz8JuQRcoj2-PkcAfdu_w467DOorzW5hyu6E4BbGRo2IFgb6HBZseGsejS_o74imNc_aQIzcSFRA',
  },
  {
    id: '4',
    brand: 'GENERIC',
    name: 'لنت کفشک ریل آسانسور ۱۶ میلی‌متری',
    price: 'استعلام قیمت',
    isAvailable: false, // بدون قیمت مستقیم (نیاز به تماس)
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4vAK9ArcMrUX6fKRpFrkv_tC1y6EPlXazYt1NWyFo-PS1fULY2qhD_4i4aSz26jcfp_Ft9Tr035oOhvySU6EpQvv7ksjz6Gf4cHdDsAtXlrB4V0qCOHh6vMLxvDbzL5JAVNSg1HkBtwbpZkVXNEveZnoCWwYybB5kdPR3zTKEgd6IU1FzDxxda5JFHvNccIdGZvX5r4bt1u9QlsKpSPMv45YXqZNoyjYMccqHskJ7d2_-NL7TGUOelw',
  },
  {
    id: '5',
    brand: 'KONE',
    name: 'پنل شستی احضار داخل کابین استیل',
    price: '۴,۵۰۰,۰۰۰ تومان',
    isAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtNoaGxkNdnEySJvgvaM8kRD0FxMc8Jhx_StikfxY8WCh_Wol2gXb9E9ksIsijUW1nTfn-FdKBVZ86b9a2YVsenM0CpAVFQfXg05j32eWUMh1ohyPDgKSN_QZtwGBmsjtNApYgnX6LV-xWLE0abcLcA18jW1UTbr1Say2Cx_UvWkp2EsLFLz0IO86n3sW5d3Vl7D-uAoFa6Wy_62g5VwnAA-GeMQvDccSpfnZ2M9PE3uTs_DvVkamIw',
  },
  {
    id: '6',
    brand: 'SCHINDLER',
    name: 'فلکه هرزگرد چدنی اصلی ۶۲۰ میلی‌متری',
    price: 'استعلام قیمت',
    isAvailable: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSoQy7h1rkiF0bvL4yVTLavNcAirvglxPSsCDgFexuLPTOfFGuGZtWefVXQyCe08jm6Vzl_r7wWrMltUW3TiPNO45KaxUrX7fzjXixW8NZgNKbadpOIGsTM3tNJ35PLbsSg8cK-YEMPD-grNp7P3JluiBXtohcpKuhaycg4SpWqhDH7qiZ_ba_jceLHwBYBgDZIp10MRBrTgmGwLTq3vZxDXmSCQfRvJuVynEAjF4TSIeh4PRUPObQLg',
  },
];

export const PartsCatalogScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // دسته‌بندی‌های کاتالوگ قطعات
  const categories = [
    { id: 'all', title: 'همه قطعات' },
    { id: 'motors', title: 'موتورهای کششی' },
    { id: 'doors', title: 'مکانیزم درب‌ها' },
    { id: 'safety', title: 'پاراشوت و ترمز ایمنی' },
    { id: 'cables', title: 'سیم بکسل و کابل' },
  ];

  // محاسبه ریاضی و دقیق عرض کارت‌ها برای ۲ ستونه شدن در تمام پلتفرم‌ها
  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  return (
    <ScreenWrapper>
      {/* هدر بالایی با دکمه سبد خرید فعال و ناوبری بومی */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        {/* سبد خرید در چپ */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="cart-outline" size={24} color={colors.textPrimary} />
          <View style={[styles.cartBadge, { backgroundColor: colors.error, borderColor: colors.surface }]} />
        </TouchableOpacity>

        {/* عنوان کاتالوگ با برند ایکس الواتور */}
        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ fontWeight: '700', color: colors.textPrimary }}>
            قطعات و تجهیزات ایکس الواتور
          </AppText>
        </View>

        {/* دکمه برگشت بومی در راست */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-forward" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* بخش کادر جستجوی یکپارچه و زیبا */}
      <View style={[styles.searchSection, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.md }]}>
          <Ionicons name="search-outline" size={20} color={colors.outline} style={{ marginLeft: 12 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="جستجوی موتور، درب، کابل، لنت ریل..."
            placeholderTextColor={colors.outline}
            style={[styles.searchInput, { color: colors.textPrimary, fontFamily: 'IRANYekanXFaNum-Regular' }]}
          />
        </View>
      </View>

      {/* فیلترهای چرخشی افقی (Pills) به صورت کاملاً RTL */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.categoryScroll, { paddingHorizontal: spacing.lg }]}
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
                  style={{ color: isActive ? colors.onPrimary : colors.textSecondary }}
                >
                  {cat.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* گرید ۲ ستونه قطعات با پایداری کامل در اسکرول */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.gridContainer, { paddingHorizontal: spacing.lg, paddingBottom: 100 }]}
      >
        <View style={styles.productGrid}>
          {INITIAL_PRODUCTS.map((product) => {
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
                {/* بخش تصویر محصول با نسبت مربع */}
                <View style={[styles.imageWrapper, { backgroundColor: colors.surfaceDim }]}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  
                  {/* دکمه افزودن به علاقه‌مندی‌ها */}
                  <TouchableOpacity activeOpacity={0.7} style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={20} color={colors.outline} />
                  </TouchableOpacity>
                </View>

                {/* اطلاعات محصول */}
                <View style={styles.productInfo}>
                  <AppText variant="labelSm" color="muted" style={styles.productBrand}>
                    {product.brand}
                  </AppText>
                  
                  <AppText
                    variant="body"
                    numberOfLines={2}
                    style={[styles.productName, { color: colors.textPrimary }]}
                  >
                    {product.name}
                  </AppText>

                  {/* قیمت و دکمه خرید در انتهای کارت */}
                  <View style={styles.cardFooter}>
                    <AppText
                      variant="button"
                      style={{
                        color: product.isAvailable ? colors.textPrimary : colors.secondary,
                        fontFamily: 'IRANYekanXFaNum-Bold',
                      }}
                    >
                      {product.price}
                    </AppText>

                    {product.isAvailable ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.addToCartBtn, { borderColor: colors.border, borderRadius: borderRadius.sm }]}
                      >
                        <Ionicons name="add" size={18} color={colors.textPrimary} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.callBtn, { borderColor: colors.secondary, borderRadius: borderRadius.sm }]}
                      >
                        <Ionicons name="call-outline" size={14} color={colors.secondary} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* دکمه شناور فیلتر و مرتب‌سازی در مرکز پایین صفحه */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
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
          <AppText variant="button" style={{ color: colors.onPrimary, fontWeight: '700' }}>
            فیلتر و مرتب‌سازی
          </AppText>
          <Ionicons name="tune-outline" size={18} color={colors.onPrimary} style={{ marginRight: 8 }} />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchSection: {
    width: '100%',
  },
  searchBar: {
    height: 44,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    textAlign: 'right', // راست‌چین کردن باکس سرچ فارسی
    fontSize: 14,
  },
  categoryContainer: {
    width: '100%',
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row-reverse', // شروع چرخونک دسته‌بندی از راست به چپ
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
    flexDirection: 'row-reverse', // رندر قطعات از راست به چپ
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
  },
  productCard: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageWrapper: {
    aspectRatio: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 8,
  },
  productImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8, // موقعیت علاقه‌مندی در بالا سمت چپ کارت قطعه
    padding: 4,
  },
  productInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  productBrand: {
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 10,
    marginBottom: 4,
  },
  productName: {
    textAlign: 'right',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    height: 36, // ارتفاع دو خط ثابت متون نام برای یکپارچگی ابعاد کارت‌ها
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCartBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  floatingFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});