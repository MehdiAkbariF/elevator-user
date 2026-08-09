// src/components/layout/AppHeader.tsx

import { ThemeToggleButton } from "@/src/components/common/ThemeToggleButton";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showThemeToggle?: boolean;
  showWhyUs?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = "ایکس‌الوتور",
  showBackButton = false,
  showThemeToggle = true,
  showWhyUs = true,
}) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handleWhyUsPress = () => {
    router.push("/why-choose-us");
  };

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      {/* سمت چپ: دکمه تغییر تم */}
      <View style={styles.leftContainer}>
        {showThemeToggle && <ThemeToggleButton />}
      </View>

      {/* عنوان وسط */}
      <View style={styles.centerContainer}>
        <AppText variant="h2" style={styles.titleText}>
          {title}
        </AppText>
        {!showBackButton && (
          <Ionicons
            name="construct"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: 6 }}
          />
        )}
      </View>

      {/* سمت راست: دکمه "چرا ما؟" + دکمه بازگشت */}
      <View style={styles.rightContainer}>
        {showWhyUs && (
          <TouchableOpacity
            onPress={handleWhyUsPress}
            activeOpacity={0.7}
            style={styles.whyUsButton}
          >
            <AppText variant="labelSm" style={{ color: colors.secondary }}>
              چرا ما؟
            </AppText>
          </TouchableOpacity>
        )}
        {showBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-forward"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {},
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  whyUsButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
