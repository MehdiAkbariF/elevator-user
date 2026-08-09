// src/features/catalog/screens/FeedbackScreen.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
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

export const FeedbackScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  // استیت‌های امتیازدهی چندگانه برای معیارهای مختلف
  const [ratingTechnical, setRatingTechnical] = useState(4); // معیار ۱: عیب‌یابی فنی
  const [ratingSpeed, setRatingSpeed] = useState(5); // معیار ۲: آن‌تایم بودن و سرعت حضور
  const [ratingBehavior, setRatingBehavior] = useState(3); // معیار ۳: آراستگی و رفتار حرفه‌ای
  const [comment, setComment] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/orders"); // بازگشت ایمن به سوابق سفارشات
    }
  };

  const handleSubmit = () => {
    // در فاز دوم به API متصل می‌شود
    router.replace("/orders");
  };

  // کامپوننت رندرکننده ۵ ستاره تعاملی بر اساس امتیاز جاری
  const renderStars = (
    currentRating: number,
    onRatingChange: (rating: number) => void,
  ) => {
    return (
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isActive = starValue <= currentRating;
          return (
            <TouchableOpacity
              key={starValue}
              onPress={() => onRatingChange(starValue)}
              activeOpacity={0.7}
              style={styles.starTouch}
            >
              <Ionicons
                name={isActive ? "star" : "star-outline"}
                size={32}
                color={isActive ? "#D97706" : colors.outline}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScreenWrapper>
      {/* هدر بالایی با دکمه تغییر تم و بستن ضربدر چپ‌چین */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        {/* دکمه بستن در چپ */}
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            ثبت امتیاز و بازخورد
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
            paddingBottom: 100 + insets.bottom, // ممانعت از تداخل با دکمه فیکس پایینی
          },
        ]}
      >
        {/* ۱. پروفایل تکنسین اعزام‌شده مأموریت */}
        <View style={styles.techProfileSection}>
          <View style={[styles.avatarWrapper, { borderColor: colors.border }]}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF0UKbJ093QtcwyAAlTMrbYpBt07E9d6sKGnQEe0IxmKPBbD2cDGn0s1d1NcNHGQUMtiH4DPpfjhmVHicw-JerJT8Gc5nBo71fKNVwOaV_swOvybIy1d0WwSVdhEyTbhLqvKISSKzkihNdsoYFXqSlmdXmiVfRr5qedGKseBJLlJOnhobyBeOx9Eneggk1FBa1LF-Rj6MEMceOlhSdjSuzLCyfdcyS7ruLAWbqjUYDEAdgGT-r7dNo-Q",
              }}
              style={styles.techAvatar}
            />
          </View>
          <AppText
            variant="h1"
            style={[styles.techName, { color: colors.textPrimary }]}
          >
            مهندس مهدی احمدی
          </AppText>
          <AppText variant="labelSm" color="secondary" style={styles.jobTag}>
            تکنسین ارشد مأموریت #SRV-۹۰۱۲۲
          </AppText>
          <AppText variant="body" color="primary" style={styles.inviteText}>
            به عملکرد مهدی احمدی در مأموریت سرویس امروز چه امتیازی می‌دهید؟
          </AppText>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* ۲. بخش امتیازهای چندگانه به صورت متقارن و RTL */}
        <View style={[styles.ratingsSection, { gap: spacing.lg }]}>
          {/* معیار اول: کیفیت فنی */}
          <View style={styles.criteriaGroup}>
            <AppText
              variant="body"
              style={[styles.criteriaLabel, { color: colors.textPrimary }]}
            >
              کیفیت فنی و عیب‌یابی دقیق آسانسور
            </AppText>
            {renderStars(ratingTechnical, setRatingTechnical)}
          </View>

          {/* معیار دوم: سرعت حضور */}
          <View style={styles.criteriaGroup}>
            <AppText
              variant="body"
              style={[styles.criteriaLabel, { color: colors.textPrimary }]}
            >
              آن‌تایم بودن و سرعت حضور تکنسین در محل
            </AppText>
            {renderStars(ratingSpeed, setRatingSpeed)}
          </View>

          {/* معیار سوم: رفتار حرفه‌ای */}
          <View style={styles.criteriaGroup}>
            <AppText
              variant="body"
              style={[styles.criteriaLabel, { color: colors.textPrimary }]}
            >
              آراستگی، رفتار حرفه‌ای و تمیزی محیط کار
            </AppText>
            {renderStars(ratingBehavior, setRatingBehavior)}
          </View>
        </View>

        {/* ۳. باکس ورود بازخورد متنی */}
        <View style={[styles.feedbackSection, { marginTop: spacing.xl }]}>
          <AppText variant="labelSm" color="muted" style={styles.feedbackLabel}>
            ثبت دیدگاه و بازخورد شما (اختیاری)
          </AppText>
          <TextInput
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            placeholder="به ما بگویید چه مواردی خوب پیش رفت یا کجا نیاز به بهبود دارد..."
            placeholderTextColor={colors.outline}
            style={[
              styles.textArea,
              {
                backgroundColor: colors.surfaceDim,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Regular",
              },
            ]}
          />
        </View>
      </ScrollView>

      {/* ۴. نوار چسبناک پایینی تایید و اتمام با پدینگ امن پویا */}
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
            { backgroundColor: colors.primary, borderRadius: borderRadius.md },
          ]}
        >
          <AppText
            variant="button"
            style={{ color: colors.onPrimary, fontWeight: "700" }}
          >
            ثبت امتیاز و بستن پرونده مأموریت
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default FeedbackScreen;

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
  techProfileSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 12,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  techAvatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  techName: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
  },
  jobTag: {
    fontFamily: "IRANYekanXFaNum-Regular",
    fontSize: 11,
    marginBottom: 16,
  },
  inviteText: {
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 12,
  },
  ratingsSection: {
    width: "100%",
  },
  criteriaGroup: {
    width: "100%",
    alignItems: "flex-end", // راست‌چین کردن تایتل ستاره‌ها
  },
  criteriaLabel: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: "row-reverse", // تراز ستاره‌ها از راست به چپ
    gap: 8,
    width: "100%",
  },
  starTouch: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  feedbackSection: {
    width: "100%",
  },
  feedbackLabel: {
    textAlign: "right",
    marginBottom: 8,
    fontFamily: "IRANYekanXFaNum-Bold",
  },
  textArea: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    padding: 16,
    textAlign: "right",
    fontSize: 14,
    lineHeight: 22,
  },
  bottomActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    zIndex: 100,
  },
  submitBtn: {
    height: 48,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        maxWidth: 440,
      },
    }),
  },
});
