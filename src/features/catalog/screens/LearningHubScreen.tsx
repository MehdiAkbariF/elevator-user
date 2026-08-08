// src/features/catalog/screens/LearningHubScreen.tsx

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';
import { AppBottomNav } from '@/src/components/layout/AppBottomNav';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

const { width } = Dimensions.get('window');

// داده‌های مقالات
const ARTICLES = [
  {
    id: '1',
    title: '۵ نشانه هشداردهنده که آسانسور شما نیاز به سرویس فوری دارد',
    category: 'راهنماهای ایمنی',
    categoryType: 'safety',
    readTime: '۵ دقیقه',
    date: '۱۵ مهر ۱۴۰۳',
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPT0b4h_7FXwXJryZNimbx6gRFH0YkBSDmXtvhz-ANqoGRxRXsdFHdrhmt8O4xtFo_ny8AzN-Xswj6NgvwPzX0dX1Wry56khPBY-IKP5L_7WmPVvVFb4HJ3GhDXbTbRXvKTEQM8kZ-B7Zf9Ok66B1Wcjf_QA_zxBPIvNbpiQu7kU9xCqh19g4QJRZhTCNTKUG60b66BI6aqx1sZ7XYdr2cKldbuY2P0UN8YoMo-UNMcVl6xNisO2K1g',
  },
  {
    id: '2',
    title: 'گواهینامه‌های استاندارد سالانه آسانسور برای سال ۱۴۰۳ توضیح داده شد',
    category: 'مقررات',
    categoryType: 'regulations',
    readTime: '۴ دقیقه',
    date: '۱۰ مهر ۱۴۰۳',
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe9te2QrxafYck5nANLQZu74vkb4x6t-0iBBbo7nUZuYgTBDSjVm_fyA-SNa_5JT6_yl1eJOsvFXSNom1Vt0Jhde7kYYvvcCKmRzlzasD2xi6UavBvxKDBVWZs1fo9bn9mQKlMsX-nafRcFj15k8bbJpL5QcFDDL6sUC3gu5gqe6YdyfkHL7fve-mjaAE0GWzGnwnvqlH6IkyFVd9uaqEbm_ovvZgcjdkDOlsjqKaQVYg-w76Nn_UcRQ',
  },
  {
    id: '3',
    title: 'آشنایی با کابل‌های کششی: طول عمر و نگهداری',
    category: 'راهنماهای قطعات',
    categoryType: 'components',
    readTime: '۶ دقیقه',
    date: '۸ مهر ۱۴۰۳',
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAQJfvOIMiKOxUFGA8yhZM6QxNh1c0RZal85RmghBF9wreN317v89ln2L9O0uZfvIqZYexV0elFdrk-KB5BWWoG8DiPipF89JJGKbICI2HeC_wgwN_voueC6Ji3BkPMdxy5jcnpbHPDbTLNqmmbUx7uqfOaQ6EY22OQwbV7GL0Azg1ai9HEeZrVpRH0ZEFhUTKI2RKhEMrmg4uy_270tkWy51USQr2Nwa0WLxdWoF_1LGoh6x0fyVzbA',
  },
  {
    id: '4',
    title: 'ایکس‌الوتور ناوگان خود را به ۵۰۰+ سایت تجاری جدید گسترش داد',
    category: 'اخبار شرکت',
    categoryType: 'news',
    readTime: '۳ دقیقه',
    date: '۵ مهر ۱۴۰۳',
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-x49IOsZUAW1P6qurUTB5ypGjPNk7E3JI32vDLEzFlCMV3TEkOArhmfOmO75tZ35OJtbve3nQENVxEWOSm4S36FzFPs81whNz76LkcU2sDgmJplYnLLcg3f6BvizWh35TTzdlW-v-C9IlEKqXzJ4tJ-8IGYNMp2iMORsFtY6gni8YcA3EKravAeZ2SHnY5UxykdMPCaBzKYMbD6exAxOCjfnnX_WY_6-hK7axgOa68Sj9FDmrHqrLBg',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'همه مقالات' },
  { id: 'safety', label: 'قوانین ایمنی' },
  { id: 'components', label: 'راهنماهای قطعات' },
  { id: 'regulations', label: 'استانداردها' },
  { id: 'news', label: 'اخبار شرکت' },
];

export const LearningHubScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.categoryType === selectedCategory;
    const matchesSearch = article.title.includes(searchQuery) || article.category.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find((a) => a.isFeatured);
  const regularArticles = filteredArticles.filter((a) => !a.isFeatured);

  return (
    <ScreenWrapper>
      {/* هدر بالایی */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
          },
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
          <Ionicons
            name="school-outline"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: spacing.sm }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            مرکز آموزش
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
            paddingBottom: 80 + (64 + insets.bottom),
          },
        ]}
      >
        {/* نوار جستجو */}
        <View style={[styles.searchSection, { marginBottom: spacing.md }]}>
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
              placeholder="جستجوی مقالات، راهنماها..."
              placeholderTextColor={colors.outline}
              style={[
                styles.searchInput,
                {
                  color: colors.textPrimary,
                  fontFamily: 'IRANYekanXFaNum-Regular',
                },
              ]}
            />
          </View>
        </View>

        {/* دسته‌بندی‌ها */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.8}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isActive ? colors.primary : colors.surface,
                    borderColor: colors.border,
                    borderRadius: borderRadius.full,
                    borderWidth: isActive ? 0 : 1,
                  },
                ]}
              >
                <AppText
                  variant="button"
                  style={{
                    color: isActive ? colors.onPrimary : colors.textSecondary,
                  }}
                >
                  {cat.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* مقاله ویژه */}
        {featuredArticle && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.featuredCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                borderWidth: 1,
                marginBottom: spacing.xl,
                overflow: 'hidden',
              },
            ]}
          >
            <View
              style={[
                styles.featuredImageContainer,
                { backgroundColor: colors.surfaceDim },
              ]}
            >
              <Image
                source={{ uri: featuredArticle.image }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <View
                style={[
                  styles.featuredBadge,
                  {
                    backgroundColor: colors.primary,
                    borderRadius: borderRadius.sm,
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xxs,
                    position: 'absolute',
                    top: spacing.md,
                    right: spacing.md,
                  },
                ]}
              >
                <AppText
                  variant="labelSm"
                  style={{ color: colors.onPrimary, fontSize: 10 }}
                >
                  ویژه
                </AppText>
              </View>
            </View>

            <View style={[styles.featuredContent, { padding: spacing.lg }]}>
              <View style={styles.featuredMeta}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.secondary }}
                >
                  {featuredArticle.category}
                </AppText>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.textSecondary }}
                >
                  •
                </AppText>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.textSecondary }}
                >
                  {featuredArticle.readTime}
                </AppText>
              </View>

              <AppText
                variant="h2"
                style={[
                  styles.featuredTitle,
                  {
                    color: colors.textPrimary,
                    marginTop: spacing.sm,
                    marginBottom: spacing.sm,
                  },
                ]}
                numberOfLines={2}
              >
                {featuredArticle.title}
              </AppText>

              <AppText
                variant="body"
                style={[
                  styles.featuredDate,
                  {
                    color: colors.textSecondary,
                    fontSize: 12,
                  },
                ]}
              >
                {featuredArticle.date}
              </AppText>
            </View>
          </TouchableOpacity>
        )}

        {/* لیست مقالات */}
        <View style={styles.articlesSection}>
          <AppText
            variant="h2"
            style={[
              styles.articlesTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.md,
              },
            ]}
          >
            آخرین مقالات
          </AppText>

          {regularArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              activeOpacity={0.8}
              style={[
                styles.articleItem,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  borderWidth: 1,
                  padding: spacing.md,
                  marginBottom: spacing.md,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                },
              ]}
            >
              <View style={styles.articleContent}>
                <AppText
                  variant="labelSm"
                  style={[
                    styles.articleCategory,
                    {
                      color: colors.secondary,
                      fontSize: 10,
                      textTransform: 'uppercase',
                    },
                  ]}
                >
                  {article.category}
                </AppText>

                <AppText
                  variant="body"
                  style={[
                    styles.articleTitle,
                    {
                      color: colors.textPrimary,
                      fontWeight: '600',
                      marginTop: spacing.xxs,
                      marginBottom: spacing.xxs,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {article.title}
                </AppText>

                <AppText
                  variant="body"
                  style={[
                    styles.articleDescription,
                    {
                      color: colors.textSecondary,
                      fontSize: 12,
                      marginBottom: spacing.xs,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {article.category === 'مقررات' && 'بررسی دقیق الزامات جدید انطباق ایمنی برای ساختمان‌های تجاری مدرن.'}
                  {article.category === 'راهنماهای قطعات' && 'نشانه‌های کلیدی سایش و پارگی کابل‌های فولادی پرتنش در سیستم‌های آسانسور.'}
                  {article.category === 'اخبار شرکت' && 'ما مفتخریم که آخرین توسعه خود را اعلام کنیم، خدمات برتر نگهداری را به ساختمان‌های هوشمند بیشتری ارائه می‌دهیم.'}
                </AppText>

                <AppText
                  variant="body"
                  style={[
                    styles.articleDate,
                    {
                      color: colors.textSecondary,
                      fontSize: 10,
                    },
                  ]}
                >
                  {article.date}
                </AppText>
              </View>

              <View
                style={[
                  styles.articleImageContainer,
                  {
                    width: 80,
                    height: 80,
                    borderRadius: borderRadius.lg,
                    overflow: 'hidden',
                    backgroundColor: colors.surfaceDim,
                    marginLeft: spacing.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: article.image }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="home" />
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
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingTop: 16,
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
    textAlign: 'right',
    fontSize: 14,
  },
  categoriesScroll: {
    flexDirection: 'row-reverse',
    gap: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  featuredCard: {
    overflow: 'hidden',
  },
  featuredImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  featuredContent: {
    padding: 16,
  },
  featuredMeta: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  featuredTitle: {
    textAlign: 'right',
    fontSize: 18,
    lineHeight: 24,
  },
  featuredDate: {
    textAlign: 'right',
  },
  articlesSection: {
    width: '100%',
  },
  articlesTitle: {
    textAlign: 'right',
  },
  articleItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  articleContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  articleCategory: {
    textAlign: 'right',
  },
  articleTitle: {
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 20,
  },
  articleDescription: {
    textAlign: 'right',
    lineHeight: 18,
  },
  articleDate: {
    textAlign: 'right',
  },
  articleImageContainer: {
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: '100%',
  },
});