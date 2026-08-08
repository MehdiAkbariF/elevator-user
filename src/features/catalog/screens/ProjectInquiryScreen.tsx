// src/features/catalog/screens/ProjectInquiryScreen.tsx

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';

import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';
import { AppBottomNav } from '@/src/components/layout/AppBottomNav';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

// داده‌های تاریخ‌ها
const generateDates = () => {
  const dates = [];
  const today = new Date();
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // حذف جمعه و شنبه
    if (d.getDay() === 5 || d.getDay() === 6) continue;

    dates.push({
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
      fullDate: d.toISOString().split('T')[0],
    });
  }
  return dates;
};

export const ProjectInquiryScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [serviceType, setServiceType] = useState('installation');
  const [buildingType, setBuildingType] = useState('commercial');
  const [floors, setFloors] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon'>('morning');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const availableDates = generateDates();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        setFileName(result.assets[0].name);
      }
    } catch (error) {
      console.error('File pick error:', error);
    }
  };

  const handleSubmit = () => {
    if (!location.trim()) {
      Alert.alert('خطا', 'لطفاً آدرس پروژه را وارد کنید.');
      return;
    }
    if (!selectedDate) {
      Alert.alert('خطا', 'لطفاً تاریخ بازدید را انتخاب کنید.');
      return;
    }
    Alert.alert(
      'موفق',
      'درخواست شما با موفقیت ثبت شد. تیم ما به زودی با شما تماس خواهد گرفت.',
      [{ text: 'باشه', onPress: () => router.replace('/dashboard') }]
    );
  };

  const getServiceLabel = (value: string) => {
    const map: Record<string, string> = {
      installation: 'نصب و راه‌اندازی',
      maintenance: 'نگهداری دوره‌ای',
      repair: 'تعمیر اضطراری',
      modernization: 'نوسازی سیستم',
    };
    return map[value] || value;
  };

  const getBuildingLabel = (value: string) => {
    const map: Record<string, string> = {
      commercial: 'تجاری',
      residential: 'مسکونی',
      industrial: 'صنعتی',
      mixed: 'کاربری مختلط',
    };
    return map[value] || value;
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
            name="document-text-outline"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: spacing.sm }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            فرم درخواست پروژه
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
            paddingBottom: 120 + insets.bottom,
          },
        ]}
      >
        {/* انتخاب نوع سرویس */}
        <View style={styles.section}>
          <AppText
            variant="labelSm"
            style={[
              styles.label,
              {
                color: colors.textSecondary,
                marginBottom: spacing.sm,
                textTransform: 'uppercase',
              },
            ]}
          >
            نوع سرویس درخواستی
          </AppText>
          <View
            style={[
              styles.pickerWrapper,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.md,
                backgroundColor: colors.surface,
                borderWidth: 1,
                flexDirection: 'row-reverse',
                alignItems: 'center',
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.textSecondary}
            />
            <TextInput
              value={getServiceLabel(serviceType)}
              editable={false}
              style={[
                styles.pickerInput,
                {
                  color: colors.textPrimary,
                  flex: 1,
                  paddingVertical: spacing.md,
                  textAlign: 'right',
                },
              ]}
            />
            <TouchableOpacity
              style={styles.pickerOverlay}
              onPress={() => {
                Alert.alert(
                  'نوع سرویس',
                  'لطفاً نوع سرویس مورد نظر را انتخاب کنید:',
                  [
                    { text: 'نصب و راه‌اندازی', onPress: () => setServiceType('installation') },
                    { text: 'نگهداری دوره‌ای', onPress: () => setServiceType('maintenance') },
                    { text: 'تعمیر اضطراری', onPress: () => setServiceType('repair') },
                    { text: 'نوسازی سیستم', onPress: () => setServiceType('modernization') },
                    { text: 'انصراف', style: 'cancel' },
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* جزئیات ساختمان */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <AppText
                variant="labelSm"
                style={[
                  styles.label,
                  {
                    color: colors.textSecondary,
                    marginBottom: spacing.sm,
                    textTransform: 'uppercase',
                  },
                ]}
              >
                نوع ساختمان
              </AppText>
              <View
                style={[
                  styles.pickerWrapper,
                  {
                    borderColor: colors.border,
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    paddingHorizontal: spacing.md,
                  },
                ]}
              >
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.textSecondary}
                />
                <TextInput
                  value={getBuildingLabel(buildingType)}
                  editable={false}
                  style={[
                    styles.pickerInput,
                    {
                      color: colors.textPrimary,
                      flex: 1,
                      paddingVertical: spacing.md,
                      textAlign: 'right',
                    },
                  ]}
                />
                <TouchableOpacity
                  style={styles.pickerOverlay}
                  onPress={() => {
                    Alert.alert(
                      'نوع ساختمان',
                      'لطفاً نوع ساختمان را انتخاب کنید:',
                      [
                        { text: 'تجاری', onPress: () => setBuildingType('commercial') },
                        { text: 'مسکونی', onPress: () => setBuildingType('residential') },
                        { text: 'صنعتی', onPress: () => setBuildingType('industrial') },
                        { text: 'کاربری مختلط', onPress: () => setBuildingType('mixed') },
                        { text: 'انصراف', style: 'cancel' },
                      ]
                    );
                  }}
                />
              </View>
            </View>

            <View style={styles.halfWidth}>
              <AppText
                variant="labelSm"
                style={[
                  styles.label,
                  {
                    color: colors.textSecondary,
                    marginBottom: spacing.sm,
                    textTransform: 'uppercase',
                  },
                ]}
              >
                تعداد طبقات
              </AppText>
              <TextInput
                value={floors}
                onChangeText={setFloors}
                placeholder="مثلاً ۱۲"
                placeholderTextColor={colors.outline}
                keyboardType="number-pad"
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    color: colors.textPrimary,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.md,
                    textAlign: 'right',
                  },
                ]}
              />
            </View>
          </View>

          {/* آدرس */}
          <View style={{ marginTop: spacing.md }}>
            <AppText
              variant="labelSm"
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                  marginBottom: spacing.sm,
                  textTransform: 'uppercase',
                },
              ]}
            >
              آدرس پروژه
            </AppText>
            <View
              style={[
                styles.locationWrapper,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  paddingHorizontal: spacing.md,
                },
              ]}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.textSecondary}
                style={{ marginLeft: spacing.sm }}
              />
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="آدرس کامل ساختمان را وارد کنید"
                placeholderTextColor={colors.outline}
                style={[
                  styles.input,
                  {
                    color: colors.textPrimary,
                    flex: 1,
                    paddingVertical: spacing.md,
                    textAlign: 'right',
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* آپلود فایل */}
        <View style={styles.section}>
          <AppText
            variant="labelSm"
            style={[
              styles.label,
              {
                color: colors.textSecondary,
                marginBottom: spacing.sm,
                textTransform: 'uppercase',
              },
            ]}
          >
            آپلود نقشه یا تصاویر
          </AppText>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.uploadArea,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                backgroundColor: colors.surfaceDim,
                borderWidth: 2,
                borderStyle: 'dashed',
                padding: spacing.xl,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={handleFileUpload}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={40}
              color={colors.secondary}
              style={{ marginBottom: spacing.sm }}
            />
            <AppText
              variant="body"
              style={[
                styles.uploadText,
                {
                  color: colors.textPrimary,
                  textAlign: 'center',
                  marginBottom: spacing.sm,
                },
              ]}
            >
              {fileName ? fileName : 'فایل‌های PDF یا تصاویر را اینجا بکشید و رها کنید'}
            </AppText>
            <View
              style={[
                styles.browseButton,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.surface,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.sm,
                  borderWidth: 1,
                },
              ]}
            >
              <AppText
                variant="button"
                style={{ color: colors.textPrimary }}
              >
                انتخاب فایل
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* انتخاب تاریخ */}
        <View style={styles.section}>
          <View style={styles.dateHeader}>
            <AppText
              variant="labelSm"
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                  textTransform: 'uppercase',
                },
              ]}
            >
              تاریخ بازدید ترجیحی
            </AppText>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {availableDates.map((item, index) => {
              const isSelected = selectedDate === item.fullDate;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={[
                    styles.dateCard,
                    {
                      width: 72,
                      borderColor: isSelected ? colors.secondary : colors.border,
                      borderRadius: borderRadius.md,
                      backgroundColor: isSelected ? colors.surfaceDim : colors.surface,
                      borderWidth: isSelected ? 2 : 1,
                      paddingVertical: spacing.md,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: spacing.sm,
                    },
                  ]}
                  onPress={() => setSelectedDate(item.fullDate)}
                >
                  <AppText
                    variant="labelSm"
                    style={[
                      styles.dateDay,
                      {
                        color: colors.textSecondary,
                        fontSize: 10,
                        textTransform: 'uppercase',
                        marginBottom: spacing.xxs,
                      },
                    ]}
                  >
                    {item.day}
                  </AppText>
                  <AppText
                    variant="h1"
                    style={[
                      styles.dateNumber,
                      {
                        color: colors.textPrimary,
                        fontSize: 20,
                        fontWeight: 'bold',
                        lineHeight: 24,
                      },
                    ]}
                  >
                    {item.date}
                  </AppText>
                  <AppText
                    variant="labelSm"
                    style={[
                      styles.dateMonth,
                      {
                        color: colors.textSecondary,
                        fontSize: 10,
                        marginTop: spacing.xxs,
                      },
                    ]}
                  >
                    {item.month}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* انتخاب ساعت */}
          <View style={styles.timeRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.timeSlot,
                {
                  flex: 1,
                  borderColor: timeSlot === 'morning' ? colors.secondary : colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: timeSlot === 'morning' ? colors.surfaceDim : colors.surface,
                  borderWidth: timeSlot === 'morning' ? 2 : 1,
                  padding: spacing.md,
                  alignItems: 'center',
                  marginLeft: spacing.sm,
                },
              ]}
              onPress={() => setTimeSlot('morning')}
            >
              <AppText
                variant="button"
                style={[
                  styles.timeTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                  },
                ]}
              >
                صبح
              </AppText>
              <AppText
                variant="labelSm"
                style={[
                  styles.timeSub,
                  {
                    color: colors.textSecondary,
                    fontSize: 11,
                  },
                ]}
              >
                ۸:۰۰ - ۱۲:۰۰
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.timeSlot,
                {
                  flex: 1,
                  borderColor: timeSlot === 'afternoon' ? colors.secondary : colors.border,
                  borderRadius: borderRadius.md,
                  backgroundColor: timeSlot === 'afternoon' ? colors.surfaceDim : colors.surface,
                  borderWidth: timeSlot === 'afternoon' ? 2 : 1,
                  padding: spacing.md,
                  alignItems: 'center',
                },
              ]}
              onPress={() => setTimeSlot('afternoon')}
            >
              <AppText
                variant="button"
                style={[
                  styles.timeTitle,
                  {
                    color: colors.textPrimary,
                    fontWeight: '600',
                  },
                ]}
              >
                عصر
              </AppText>
              <AppText
                variant="labelSm"
                style={[
                  styles.timeSub,
                  {
                    color: colors.textSecondary,
                    fontSize: 11,
                  },
                ]}
              >
                ۱۳:۰۰ - ۱۷:۰۰
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* یادداشت‌ها */}
        <View style={styles.section}>
          <AppText
            variant="labelSm"
            style={[
              styles.label,
              {
                color: colors.textSecondary,
                marginBottom: spacing.sm,
                textTransform: 'uppercase',
              },
            ]}
          >
            یادداشت‌های ویژه پروژه
          </AppText>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="نیازمندی‌های دسترسی، نگرانی‌های سازه‌ای، محدودیت‌های زمانی..."
            placeholderTextColor={colors.outline}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[
              styles.textArea,
              {
                borderColor: colors.border,
                borderRadius: borderRadius.md,
                backgroundColor: colors.surface,
                borderWidth: 1,
                color: colors.textPrimary,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                textAlign: 'right',
                height: 120,
              },
            ]}
          />
        </View>
      </ScrollView>

      {/* دکمه ثابت پایین */}
      <View
        style={[
          styles.fixedBottom,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            paddingBottom: 64 + insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.submitButton,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.md,
              paddingVertical: spacing.md,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
            },
          ]}
          onPress={handleSubmit}
        >
          <AppText
            variant="button"
            style={{
              color: colors.onPrimary,
              fontWeight: 'bold',
            }}
          >
            ثبت و درخواست بازدید
          </AppText>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={colors.onPrimary}
          />
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
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  pickerWrapper: {
    position: 'relative',
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pickerInput: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    fontSize: 14,
  },
  locationWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  uploadArea: {
    minHeight: 150,
  },
  uploadText: {
    fontSize: 14,
  },
  browseButton: {},
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  datesScroll: {
    flexDirection: 'row-reverse',
    paddingVertical: 4,
    marginBottom: 12,
  },
  dateCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  dateMonth: {
    fontSize: 10,
  },
  timeRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  timeSlot: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  timeTitle: {
    fontWeight: '600',
  },
  timeSub: {
    fontSize: 11,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  submitButton: {
    width: '100%',
  },
});