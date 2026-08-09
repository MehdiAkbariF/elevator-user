// src/components/layout/AppBottomNav.tsx

import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ایمپورت دریافت حاشیه‌های امن سیستم‌عامل

interface AppBottomNavProps {
  activeTab:
    | "home"
    | "shop"
    | "cart"
    | "categories"
    | "profile"
    | "elevators"
    | "blog";
}

export const AppBottomNav: React.FC<AppBottomNavProps> = ({ activeTab }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های لمسی کف گوشی از سیستم‌عامل

  // چیدمان متقارن ۷ زبانه از چپ به راست با قرارگیری دکمه "خانه" در مرکز دقیق (ایندکس ۳)
  const tabs = [
    {
      id: "profile",
      title: "پروفایل",
      iconActive: "person",
      iconInactive: "person-outline",
    },
    {
      id: "elevators",
      title: "آسانسور من",
      iconActive: "construct",
      iconInactive: "construct-outline",
    },
    {
      id: "blog",
      title: "بلاگ",
      iconActive: "book",
      iconInactive: "book-outline",
    },
    {
      id: "home",
      title: "خانه",
      iconActive: "home",
      iconInactive: "home-outline",
    }, // مرکز ثقل دقیق ناوبری
    {
      id: "cart",
      title: "سبد خرید",
      iconActive: "cart",
      iconInactive: "cart-outline",
    },
    {
      id: "shop",
      title: "فروشگاه",
      iconActive: "cube",
      iconInactive: "cube-outline",
    },
    {
      id: "categories",
      title: "دسته‌بندی",
      iconActive: "apps",
      iconInactive: "apps-outline",
    },
  ] as const;

  const handleTabPress = (tabId: typeof activeTab) => {
    if (tabId === "home") {
      router.replace("/dashboard");
    } else if (tabId === "shop") {
      router.replace("/catalog");
    } else if (tabId === "cart") {
      router.replace("/cart");
    } else if (tabId === "categories") {
      router.replace("/categories");
    } else if (tabId === "profile") {
      router.replace("/profile");
    } else if (tabId === "elevators") {
      router.replace("/my-elevators"); // هدایت پویا به لیست آسانسورها
    } else if (tabId === "blog") {
      router.replace("/learning-hub"); // هدایت پویا به بلاگ و هاب مقالات آموزشی
    }
  };

  return (
    <View
      style={[
        styles.bottomNav,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          // افزایش پویای ارتفاع دکمه‌های ناوبری جهت جلوگیری از تداخل فیزیکی با دکمه‌های لمسی خانه در موبایل
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const tintColor = isActive ? colors.secondary : colors.textSecondary;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => handleTabPress(tab.id)}
            style={styles.navItem}
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.iconInactive}
              size={22} // کاهش جزیی سایز آیکون‌ها برای جایگیری فوق‌العاده شیک ۷ زبانه در عرض موبایل
              color={tintColor}
            />
            <AppText
              variant="labelSm"
              style={[styles.navText, { color: tintColor }]}
            >
              {tab.title}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    zIndex: 100,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  navText: {
    marginTop: 2,
    fontSize: 9, // بهینه‌سازی ملایم فونت تگ برای جایگیری متقارن ۷ زبانه بدون بیرون‌زدگی متن
    // تصحیح شد: حذف کامل پارامتر تداخل‌برانگیز fontWeight برای حل رندرینگ اندروید
  },
});
