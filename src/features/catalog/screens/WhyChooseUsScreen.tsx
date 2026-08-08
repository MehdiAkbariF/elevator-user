// src/features/catalog/screens/WhyChooseUsScreen.tsx

import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
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

// داده‌های نظرات مشتریان
const TESTIMONIALS = [
  {
    id: '1',
    name: 'علی قاسمی',
    role: 'مدیر مجتمع، مجتمع البرز',
    text: 'از وقتی به ایکس‌الوتور مهاجرت کردیم، نرخ خرابی‌های ما به صفر رسیده است. تکنسین‌های آنها دقیقاً سر وقت حاضر می‌شوند و گزارش‌دهی شفاف آنها از طریق اپلیکیشن، اعتماد کامل هیئت مدیره ما را جلب کرده است.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn1XO8OxfDSF0xHceYU0zA9zvAW8v0ysJS68eC35p3s84_HjDPjYGQvVJp0_r3HNW8Jm5Liyy6xPM28z66z9Y02PPLrz2N78B4t5INJ5ob8TlLL75MoIg4V_6h1EWTJgrPIFK-c3RMhT-L37lbg4PGh67KeSUWoIHj1c5DmxDAfXJFFCT_9PvXBx7ohY1B1MTtAJUXU8xxKL28nwF1SpjCOfcJpekT9JvimeHmaNVOLJvf8dFKBpwMqw',
    rating: 5,
  },
  {
    id: '2',
    name: 'مهدی کریمی',
    role: 'مدیر فنی، ساختمان سپهر',
    text: 'پاسخگویی ۲۴ ساعته و قطعات اورجینال ایکس‌الوتور باعث شده تا خیالمان از بابت آسانسورهای ساختمان راحت باشد. تیم حرفه‌ای و متعهد.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDkX6hQ8VfV94GzBzC5NRfHd9rY7K5jLm9cW5b9sH6gZ8kLmNpQrS7tU6vW5xY4zZ3aA2bB1cC2dD3eE4fF5gG6hH7iI8jJ9kK0lL1mM2nN3oO4pP5qQ6rR7sS8tT9uU',
    rating: 5,
  },
  {
    id: '3',
    name: 'سارا محمدی',
    role: 'مدیر ساختمان، برج میلاد',
    text: 'بیش از ۳ سال است که با ایکس‌الوتور همکاری می‌کنیم. کیفیت خدمات و تعهد آنها به ایمنی، بی‌نظیر است. قطعاً به دیگران نیز توصیه می‌کنم.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4vAK9ArcMrUX6fKRpFrkv_tC1y6EPlXazYt1NWyFo-PS1fULY2qhD_4i4aSz26jcfp_Ft9Tr035oOhvySU6EpQvv7ksjz6Gf4cHdDsAtXlrB4V0qCOHh6vMLxvDbzL5JAVNSg1HkBtwbpZkVXNEveZnoCWwYybB5kdPR3zTKEgd6IU1FzDxxda5JFHvNccIdGZvX5r4bt1u9QlsKpSPMv45YXqZNoyjYMccqHskJ7d2_-NL7TGUOelw',
    rating: 5,
  },
];

export const WhyChooseUsScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const handleContactPress = () => {
    router.push('/contact-us');
  };

  // رنگ‌های پویا برای کارت بیمه بر اساس تم
  const insuranceColors = {
    background: isDark ? '#1A2A1A' : '#ECFDF5',
    border: isDark ? '#2D4A2D' : '#A7F3D0',
    icon: isDark ? '#4ADE80' : '#10B981',
    text: isDark ? '#D1FAE5' : colors.textPrimary,
    description: isDark ? '#94A3B8' : colors.textSecondary,
  };

  // رنگ‌های پویا برای کارت آمار
  const statsColors = {
    background: isDark ? '#1E293B' : '#F8FAFC',
    border: isDark ? '#334155' : '#E2E8F0',
    text: colors.textPrimary,
    subtext: colors.textSecondary,
  };

  const renderTestimonial = ({ item }: { item: typeof TESTIMONIALS[0] }) => (
    <View
      style={[
        styles.testimonialSlide,
        {
          width: width - spacing.lg * 2 - spacing.md,
          borderColor: colors.border,
          borderRadius: borderRadius.lg,
          backgroundColor: colors.surface,
          borderWidth: 1,
          padding: spacing.lg,
          marginHorizontal: spacing.sm,
        },
      ]}
    >
      {/* ستاره‌ها */}
      <View
        style={[
          styles.starsContainer,
          {
            flexDirection: 'row-reverse',
            marginBottom: spacing.md,
          },
        ]}
      >
        {[...Array(item.rating)].map((_, i) => (
          <Ionicons key={i} name="star" size={18} color="#fe932c" />
        ))}
      </View>

      <AppText
        variant="body"
        style={[
          styles.testimonialText,
          {
            color: colors.textPrimary,
            textAlign: 'right',
            lineHeight: 24,
            fontStyle: 'italic',
            marginBottom: spacing.lg,
          },
        ]}
      >
        "{item.text}"
      </AppText>

      <View
        style={[
          styles.testimonialFooter,
          {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            paddingTop: spacing.lg,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
        ]}
      >
        <View
          style={[
            styles.avatarContainer,
            {
              width: 44,
              height: 44,
              borderRadius: borderRadius.full,
              overflow: 'hidden',
              backgroundColor: colors.surfaceDim,
              marginLeft: spacing.md,
            },
          ]}
        >
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        </View>
        <View style={[styles.testimonialAuthor, { alignItems: 'flex-end' }]}>
          <AppText
            variant="button"
            style={[
              styles.authorName,
              {
                color: colors.textPrimary,
                fontWeight: '600',
              },
            ]}
          >
            {item.name}
          </AppText>
          <AppText
            variant="body"
            style={[
              styles.authorRole,
              {
                color: colors.textSecondary,
                fontSize: 12,
              },
            ]}
          >
            {item.role}
          </AppText>
        </View>
      </View>
    </View>
  );

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - spacing.lg * 2 - spacing.md + spacing.sm * 2));
    setCurrentIndex(index);
  };

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
            name="elevator"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: spacing.sm }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            چرا ایکس‌الوتور
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
            paddingBottom: 140 + (64 + insets.bottom),
          },
        ]}
      >
        {/* بخش Hero با تصویر */}
        <View style={[styles.heroSection, { marginBottom: spacing.xl }]}>
          <View
            style={[
              styles.heroImageContainer,
              {
                borderRadius: borderRadius.lg,
                backgroundColor: colors.surfaceDim,
                marginBottom: spacing.md,
              },
            ]}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA01jbhqvzPY1u-PmtmUr8VcH8iHrAYt3_1sgveHGLcciVH1KXqcOwRDEr4pn5fYak8IWOuoN2EO90KbgdNmetGJM1S0rYAmu1u9FbaAmo6Kx2vLyTXzkLxMD6FREn4D8veit5j-I1AmwHiniFqBUxC98pJ4lhP6-2_nRdj2_cbfmb0rQnSO6w2tpDNHvWbN9c3mtvVsTYBk6Ub_OrdXhg0zhtdwqdrdtEZeI-MPqFxpdU5mL9vymd4Kw',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
          </View>

          <AppText
            variant="h1"
            style={[
              styles.heroTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.sm,
              },
            ]}
          >
            تعهد بی‌چون و چرای ما به ایمنی شما
          </AppText>

          <AppText
            variant="body"
            style={[
              styles.heroDescription,
              {
                color: colors.textSecondary,
                lineHeight: 22,
              },
            ]}
          >
            در ایکس‌الوتور، ما می‌دانیم که نگهداری آسانسور فقط یک سرویس نیست—بلکه یک
            الزام حیاتی برای ایمنی است. ما تحت مجوزهای رسمی دولتی فعالیت می‌کنیم و
            بیمه مسئولیت جامع را برای محافظت از هر مسافر حفظ می‌کنیم.
          </AppText>
        </View>

        {/* بخش آمار و ارقام */}
        <View style={[styles.section, { marginBottom: spacing.xl }]}>
          <AppText
            variant="h2"
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.md,
                textAlign: 'center',
              },
            ]}
          >
            ایکس‌الوتور به اعداد
          </AppText>

          <View style={styles.statsGrid}>
            {[
              { value: '۱۵+', label: 'سال تجربه', icon: 'time-outline' },
              { value: '۱۲۰۰+', label: 'مشتری راضی', icon: 'people-outline' },
              { value: '۵۰+', label: 'تکنسین مجرب', icon: 'construct-outline' },
              { value: '۱۰۰%', label: 'تضمین اصالت', icon: 'shield-checkmark-outline' },
            ].map((stat, index) => (
              <View
                key={index}
                style={[
                  styles.statCard,
                  {
                    backgroundColor: statsColors.background,
                    borderColor: statsColors.border,
                    borderRadius: borderRadius.lg,
                    borderWidth: 1,
                    padding: spacing.md,
                    alignItems: 'center',
                    width: (width - spacing.lg * 2 - spacing.md * 2) / 2,
                  },
                ]}
              >
                <View
                  style={[
                    styles.statIconContainer,
                    {
                      backgroundColor: isDark ? '#334155' : '#E2E8F0',
                      borderRadius: borderRadius.full,
                      padding: spacing.sm,
                      marginBottom: spacing.xs,
                    },
                  ]}
                >
                  <Ionicons
                    name={stat.icon as any}
                    size={24}
                    color={colors.secondary}
                  />
                </View>
                <AppText
                  variant="h1"
                  style={[
                    styles.statValue,
                    {
                      color: colors.textPrimary,
                      fontSize: 24,
                      fontWeight: '700',
                    },
                  ]}
                >
                  {stat.value}
                </AppText>
                <AppText
                  variant="body"
                  style={[
                    styles.statLabel,
                    {
                      color: colors.textSecondary,
                      fontSize: 12,
                    },
                  ]}
                >
                  {stat.label}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* بخش مدارک و مجوزها */}
        <View style={[styles.section, { marginBottom: spacing.xl }]}>
          <AppText
            variant="h2"
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                marginBottom: spacing.md,
              },
            ]}
          >
            مدارک رسمی و گواهینامه‌ها
          </AppText>

          <View
            style={[
              styles.credentialsContainer,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                backgroundColor: colors.surface,
                borderWidth: 1,
                overflow: 'hidden',
              },
            ]}
          >
            {[
              { icon: 'document-text-outline', text: 'مجوز طراحی و مونتاژ' },
              { icon: 'ribbon-outline', text: 'گواهی عضویت در سندیکا' },
              { icon: 'checkmark-circle-outline', text: 'مطابقت با استاندارد ملی' },
            ].map((item, index, arr) => {
              const isLast = index === arr.length - 1;
              return (
                <View
                  key={index}
                  style={[
                    styles.credentialItem,
                    {
                      paddingVertical: spacing.md,
                      paddingHorizontal: spacing.lg,
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                    },
                    !isLast && {
                      borderBottomColor: colors.border,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color="#10B981"
                    style={{ marginLeft: spacing.md }}
                  />
                  <AppText
                    variant="body"
                    style={[
                      styles.credentialText,
                      {
                        color: colors.textPrimary,
                        flex: 1,
                        textAlign: 'right',
                        fontWeight: '500',
                      },
                    ]}
                  >
                    {item.text}
                  </AppText>
                </View>
              );
            })}
          </View>
        </View>

        {/* کارت بیمه */}
        <View style={[styles.section, { marginBottom: spacing.xl }]}>
          <View
            style={[
              styles.insuranceCard,
              {
                backgroundColor: insuranceColors.background,
                borderColor: insuranceColors.border,
                borderRadius: borderRadius.lg,
                borderWidth: 1,
                padding: spacing.lg,
              },
            ]}
          >
            <View
              style={[
                styles.insuranceHeader,
                {
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  marginBottom: spacing.sm,
                },
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color={insuranceColors.icon}
                style={{ marginLeft: spacing.md }}
              />
              <AppText
                variant="h2"
                style={[
                  styles.insuranceTitle,
                  {
                    color: insuranceColors.text,
                    fontSize: 18,
                    fontWeight: '600',
                  },
                ]}
              >
                پوشش کامل بیمه مسئولیت
              </AppText>
            </View>
            <AppText
              variant="body"
              style={[
                styles.insuranceDescription,
                {
                  color: insuranceColors.description,
                  textAlign: 'right',
                  lineHeight: 22,
                },
              ]}
            >
              هر آسانسور تحت سرویس ایکس‌الوتور توسط بیمه جامع حوادث مسافران پشتیبانی
              می‌شود. ما پوشش کامل مسئولیت داریم و آرامش خاطر کامل را برای مالکان و
              مدیران ساختمان فراهم می‌کنیم.
            </AppText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.ctaButton,
                {
                  backgroundColor: colors.secondary,
                  borderRadius: borderRadius.md,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.lg,
                  alignSelf: 'flex-start',
                  marginTop: spacing.md,
                },
              ]}
            >
              <AppText variant="button" style={{ color: '#FFFFFF' }}>
                اطلاعات بیشتر
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* کارت گارانتی */}
        <View style={[styles.section, { marginBottom: spacing.xl }]}>
          <View
            style={[
              styles.warrantyCard,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                backgroundColor: colors.surface,
                borderWidth: 1,
                padding: spacing.lg,
              },
            ]}
          >
            <View
              style={[
                styles.warrantyHeader,
                {
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  marginBottom: spacing.sm,
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={colors.textPrimary}
                style={{ marginLeft: spacing.md }}
              />
              <AppText
                variant="h2"
                style={[
                  styles.warrantyTitle,
                  {
                    color: colors.textPrimary,
                    fontSize: 18,
                    fontWeight: '600',
                  },
                ]}
              >
                تضمین اصالت قطعات
              </AppText>
            </View>

            <AppText
              variant="body"
              style={[
                styles.warrantyDescription,
                {
                  color: colors.textSecondary,
                  textAlign: 'right',
                  lineHeight: 22,
                  marginBottom: spacing.md,
                },
              ]}
            >
              ما فقط قطعات اصلی و اورجینال (OEM) را تأمین و نصب می‌کنیم. هر قطعه
              دارای شماره سریال قابل پیگیری است.
            </AppText>

            <View
              style={[
                styles.warrantyBadge,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.full,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.xs,
                  alignSelf: 'flex-start',
                  marginBottom: spacing.md,
                },
              ]}
            >
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.textPrimary}
              />
              <AppText
                variant="labelSm"
                style={[
                  styles.warrantyBadgeText,
                  {
                    color: colors.textPrimary,
                    fontSize: 10,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    marginRight: spacing.xs,
                  },
                ]}
              >
                تا ۵ سال گارانتی
              </AppText>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.ctaButton,
                {
                  backgroundColor: colors.surfaceDim,
                  borderRadius: borderRadius.md,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.lg,
                  alignSelf: 'flex-start',
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
            >
              <AppText variant="button" style={{ color: colors.textPrimary }}>
                مشاهده قطعات
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* بخش نظرات مشتریان - اسلایدر */}
        <View style={[styles.section, { marginBottom: spacing.xl }]}>
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.md,
            }}
          >
            <AppText
              variant="h2"
              style={[
                styles.sectionTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              نظرات مدیران ساختمان
            </AppText>
            <TouchableOpacity>
              <AppText
                variant="labelSm"
                style={{ color: colors.secondary }}
              >
                همه نظرات
              </AppText>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={TESTIMONIALS}
            renderItem={renderTestimonial}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - spacing.lg * 2 - spacing.md + spacing.sm * 2}
            decelerationRate="fast"
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingHorizontal: spacing.sm,
              gap: spacing.sm,
            }}
          />

          {/* دات‌های ناوبری */}
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              marginTop: spacing.md,
              gap: spacing.xs,
            }}
          >
            {TESTIMONIALS.map((_, index) => (
              <View
                key={index}
                style={{
                  width: currentIndex === index ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    currentIndex === index
                      ? colors.secondary
                      : colors.border,
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ✅ دکمه تماس با ما - چسبیده به انتهای صفحه و بالای باتم ناو */}
      <View
        style={[
          styles.contactFixedContainer,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            paddingBottom: 64 + insets.bottom,
            paddingTop: spacing.md,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.contactButton,
            {
              backgroundColor: colors.secondary,
              borderRadius: borderRadius.lg,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row-reverse',
              gap: spacing.sm,
            },
          ]}
          onPress={handleContactPress}
        >
          <Ionicons
            name="call-outline"
            size={22}
            color={colors.onPrimary}
          />
          <AppText
            variant="button"
            style={{
              color: colors.onPrimary,
              fontWeight: 'bold',
            }}
          >
            تماس با ما
          </AppText>
        </TouchableOpacity>
      </View>

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
  heroSection: {},
  heroImageContainer: {
    width: '100%',
    height: 192,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  heroTitle: {
    textAlign: 'right',
  },
  heroDescription: {
    textAlign: 'right',
  },
  section: {},
  sectionTitle: {
    textAlign: 'right',
  },
  credentialsContainer: {},
  credentialItem: {},
  credentialText: {},
  insuranceCard: {},
  insuranceHeader: {},
  insuranceTitle: {},
  insuranceDescription: {},
  warrantyCard: {},
  warrantyHeader: {},
  warrantyTitle: {},
  warrantyDescription: {},
  warrantyBadge: {},
  warrantyBadgeText: {},
  testimonialSlide: {},
  starsContainer: {},
  testimonialText: {},
  testimonialFooter: {},
  avatarContainer: {},
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  testimonialAuthor: {},
  authorName: {},
  authorRole: {},
  statsGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {},
  statIconContainer: {},
  statValue: {},
  statLabel: {},
  ctaButton: {},
  contactFixedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    zIndex: 10,
  },
  contactButton: {
    width: '100%',
  },
});