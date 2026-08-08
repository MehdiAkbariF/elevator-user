// src/features/catalog/screens/RequestTechnicianScreen.tsx

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
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

export const RequestTechnicianScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [serviceType, setServiceType] = useState<'emergency' | 'scheduled'>('emergency');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const issues = [
    'کابین گیر کرده است',
    'درب‌ها باز نمی‌شوند',
    'صدای غیرعادی موتور',
    'لرزش غیرطبیعی کابین',
    'خطای نمایشگر پنل',
    'سایر موارد',
  ];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const handleSubmit = () => {
    router.replace('/dashboard');
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی با دکمه بازگشت */}
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
            درخواست تکنسین
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
        {/* ۱. کادر انتخاب آسانسور ساختمان */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.elevatorCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
            },
          ]}
        >
          <Ionicons
            name="chevron-down"
            size={20}
            color={colors.textSecondary}
          />

          <View style={styles.elevatorInfo}>
            <AppText
              variant="labelSm"
              color="secondary"
              style={styles.elevatorLabel}
            >
              آسانسور انتخاب‌شده
            </AppText>
            <AppText
              variant="body"
              style={[styles.elevatorAddress, { color: colors.textPrimary }]}
            >
              خیابان نگین، پلاک ۱۲، طبقه ۴، واحد B
            </AppText>
          </View>

          <View
            style={[
              styles.elevatorIconContainer,
              { backgroundColor: colors.surfaceDim },
            ]}
          >
            <Ionicons name="business" size={20} color={colors.textPrimary} />
          </View>
        </TouchableOpacity>

        {/* ۲. سوئیچر ۲ ستونه نوع خدمات */}
        <View style={styles.serviceToggleGrid}>
          <TouchableOpacity
            onPress={() => setServiceType('emergency')}
            activeOpacity={0.9}
            style={[
              styles.toggleCard,
              {
                backgroundColor: colors.surface,
                borderColor: serviceType === 'emergency' ? colors.secondary : colors.border,
                borderWidth: serviceType === 'emergency' ? 2 : 1,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <Ionicons
              name="alert-circle"
              size={28}
              color={serviceType === 'emergency' ? colors.secondary : colors.textSecondary}
              style={styles.toggleCardIcon}
            />
            <AppText variant="h2" style={[styles.toggleTitle, { color: colors.textPrimary }]}>
              تعمیرات اضطراری
            </AppText>
            <AppText variant="labelSm" color="muted" style={styles.toggleSub}>
              اعزام فوق‌سریع تکنسین
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setServiceType('scheduled')}
            activeOpacity={0.9}
            style={[
              styles.toggleCard,
              {
                backgroundColor: colors.surface,
                borderColor: serviceType === 'scheduled' ? colors.secondary : colors.border,
                borderWidth: serviceType === 'scheduled' ? 2 : 1,
                borderRadius: borderRadius.lg,
              },
            ]}
          >
            <Ionicons
              name="calendar"
              size={28}
              color={serviceType === 'scheduled' ? colors.secondary : colors.textSecondary}
              style={styles.toggleCardIcon}
            />
            <AppText variant="h2" style={[styles.toggleTitle, { color: colors.textPrimary }]}>
              سرویس دوره‌ای
            </AppText>
            <AppText variant="labelSm" color="muted" style={styles.toggleSub}>
              انتخاب روز و ساعت بازدید
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ۳. بخش لیست مشکلات */}
        <View style={{ marginTop: spacing.lg }}>
          <AppText variant="h2" style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            مشکل آسانسور چیست؟
          </AppText>

          <View style={styles.pillsContainer}>
            {issues.map((issue) => {
              const isSelected = selectedIssue === issue;
              return (
                <TouchableOpacity
                  key={issue}
                  onPress={() => setSelectedIssue(issue)}
                  activeOpacity={0.8}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isSelected ? colors.primary : colors.surface,
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderRadius: borderRadius.full,
                    },
                  ]}
                >
                  <AppText
                    variant="body"
                    style={{
                      color: isSelected ? colors.onPrimary : colors.textSecondary,
                    }}
                  >
                    {issue}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ۴. توضیحات */}
        <View style={[styles.inputWrapper, { marginTop: spacing.lg }]}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholder="شرح مشکل را به زبان خود بنویسید... (اختیاری)"
            placeholderTextColor={colors.outline}
            style={[
              styles.textArea,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                color: colors.textPrimary,
                fontFamily: 'IRANYekanXFaNum-Regular',
              },
            ]}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.micButton}>
            <Ionicons name="mic-outline" size={20} color={colors.outline} />
          </TouchableOpacity>
        </View>

        {/* ۵. بخش زمان‌بندی پویا */}
        <View
          style={[
            styles.schedulerSection,
            { marginTop: spacing.xl },
            serviceType === 'emergency' && styles.disabledSection,
          ]}
          pointerEvents={serviceType === 'emergency' ? 'none' : 'auto'}
        >
          <AppText variant="h2" style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            انتخاب زمان بازدید
          </AppText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysScroll}
          >
            {[
              { day: 'دوشنبه', date: '۱۲' },
              { day: 'سه‌شنبه', date: '۱۳' },
              { day: 'چهارشنبه', date: '۱۴' },
              { day: 'پنج‌شنبه', date: '۱۵' },
            ].map((item, index) => {
              const isFirst = index === 0;
              return (
                <View
                  key={index}
                  style={[
                    styles.dayCard,
                    {
                      backgroundColor: isFirst ? colors.surfaceDim : colors.surface,
                      borderColor: colors.border,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <AppText variant="labelSm" color="muted">
                    {item.day}
                  </AppText>
                  <AppText
                    variant="h2"
                    style={{
                      color: colors.textPrimary,
                      marginTop: 4,
                      fontFamily: 'IRANYekanXFaNum-Bold',
                    }}
                  >
                    {item.date}
                  </AppText>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.hoursContainer}>
            <View
              style={[
                styles.hourBadge,
                {
                  backgroundColor: colors.surfaceDim,
                  borderColor: colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <AppText variant="labelSm" color="muted">
                ۰۹:۰۰ الی ۱۲:۰۰
              </AppText>
            </View>
            <View
              style={[
                styles.hourBadge,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <AppText variant="labelSm" color="muted">
                ۱۳:۰۰ الی ۱۶:۰۰
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ۶. دکمه چسبناک پایین */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 64 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          style={[
            styles.submitBtn,
            {
              backgroundColor: colors.secondary,
              borderRadius: borderRadius.md,
            },
          ]}
        >
          <Ionicons
            name="flash"
            size={18}
            color="#FFFFFF"
            style={{ marginLeft: 8 }}
          />
          <AppText variant="button" style={{ color: '#FFFFFF' }}>
            جستجوی نزدیک‌ترین تکنسین
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="home" />
    </ScreenWrapper>
  );
};

export default RequestTechnicianScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 16,
  },
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
  elevatorCard: {
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  elevatorInfo: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  elevatorLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  elevatorAddress: {
    textAlign: 'right',
    fontSize: 13,
  },
  elevatorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceToggleGrid: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
    marginBottom: 24,
  },
  toggleCard: {
    flex: 1,
    padding: 16,
    alignItems: 'flex-end',
    borderWidth: 1,
  },
  toggleCardIcon: {
    marginBottom: 8,
  },
  toggleTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  toggleSub: {
    fontSize: 11,
  },
  sectionHeading: {
    textAlign: 'right',
    marginBottom: 16,
    fontFamily: 'IRANYekanXFaNum-Bold',
  },
  pillsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  textArea: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    padding: 12,
    paddingBottom: 40,
    textAlign: 'right',
    fontSize: 14,
  },
  micButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 4,
  },
  schedulerSection: {
    width: '100%',
  },
  disabledSection: {
    opacity: 0.35,
  },
  daysScroll: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginBottom: 16,
  },
  dayCard: {
    width: 76,
    height: 70,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursContainer: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  hourBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderTopWidth: 1,
    zIndex: 100,
  },
  submitBtn: {
    height: 48,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        maxWidth: 440,
      },
    }),
  },
});