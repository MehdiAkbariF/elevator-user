// src/features/catalog/screens/CreateAddressScreen.tsx

import { ScreenWrapper } from "@/src/components/layout/ScreenWrapper";
import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { UrlTile } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const CreateAddressScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("در حال دریافت موقعیت...");

  // مختصات پیش‌فرض نقشه (تهران)
  const [region, setRegion] = useState({
    latitude: 35.6892,
    longitude: 51.389,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  // انیمیشن بومی جهش پین لوکیشن
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/addresses");
    }
  };

  const handleConfirmLocation = () => {
    // ناوبری هوشمند به صفحه جدید ورود جزئیات تکمیلی آدرس
    router.replace("/create-address-detail");
  };

  // استعلام زنده آدرس متنی فارسی با تکان دادن نقشه
  const handleRegionChangeComplete = async (newRegion: typeof region) => {
    setRegion(newRegion);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newRegion.latitude}&lon=${newRegion.longitude}&accept-language=fa`,
        {
          headers: {
            "User-Agent": "X-Elevator-App",
          },
        },
      );
      const data = await response.json();

      if (data && data.address) {
        const neighborhood =
          data.address.neighborhood ||
          data.address.suburb ||
          data.address.quarter ||
          data.address.road ||
          "محدوده نامشخص";
        const city = data.address.city || data.address.town || "تهران";
        setSelectedZone(`محدوده: ${neighborhood}، ${city}`);
      }
    } catch (error) {
      console.warn("خطا در دریافت آدرس:", error);
      setSelectedZone("خطا در اتصال به سرور نقشه");
    }
  };

  return (
    <ScreenWrapper style={styles.wrapperOverride}>
      {/* ۱. نقشه بومی واقعی با سرورهای آزاد CartoDB */}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={region}
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          <UrlTile
            urlTemplate="https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />
        </MapView>
      </View>

      {/* ۲. کادر جستجوی شناور بالایی */}
      <View
        style={[
          styles.floatingSearchContainer,
          { top: insets.top + 8, paddingHorizontal: spacing.lg },
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
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={styles.searchButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="جستجوی محله، خیابان یا ساختمان..."
            placeholderTextColor={colors.outline}
            style={[
              styles.searchInput,
              {
                color: colors.textPrimary,
                fontFamily: "IRANYekanXFaNum-Regular",
              },
            ]}
          />

          <Ionicons
            name="search-outline"
            size={20}
            color={colors.outline}
            style={{ marginRight: 12 }}
          />
        </View>
      </View>

      {/* ۳. پین ثابت مرکزی لوکیشن به همراه حباب راهنما */}
      <View style={styles.centerPinContainer}>
        <View
          style={[
            styles.tooltipBubble,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: borderRadius.sm,
            },
          ]}
        >
          <AppText variant="labelSm" color="primary">
            نقشه را برای تنظیم موقعیت حرکت دهید
          </AppText>
          <View
            style={[styles.tooltipPointer, { borderTopColor: colors.surface }]}
          />
        </View>

        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <Ionicons name="location" size={40} color={colors.primary} />
        </Animated.View>

        <View
          style={[
            styles.pinShadow,
            { backgroundColor: "rgba(15, 23, 42, 0.15)" },
          ]}
        />
      </View>

      {/* ۴. دکمه شناور رادار موقعیت من */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.myLocationFab,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: borderRadius.full,
            bottom: 160 + insets.bottom,
          },
        ]}
      >
        <Ionicons name="locate" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* ۵. کادر چسبناک تایید لوکیشن در کف صفحه */}
      <View
        style={[
          styles.bottomConfirmBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 120 + insets.bottom,
            paddingBottom: insets.bottom + 12,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <View style={styles.selectedZoneRow}>
          <AppText
            variant="body"
            color="muted"
            style={{ marginRight: 6, fontFamily: "IRANYekanXFaNum-Regular" }}
          >
            {selectedZone}
          </AppText>
          <Ionicons name="business" size={16} color={colors.textSecondary} />
        </View>

        <TouchableOpacity
          onPress={handleConfirmLocation} // ناوبری به صفحه فرم ثبت جزئیات
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
            تایید موقعیت و ادامه ثبت آدرس
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default CreateAddressScreen;

const styles = StyleSheet.create({
  wrapperOverride: {
    paddingTop: 0,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  floatingSearchContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
  },
  searchBar: {
    height: 48,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  searchButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    textAlign: "right",
    fontSize: 14,
  },
  centerPinContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -110,
    marginTop: -45,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    width: 220,
  },
  tooltipBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    position: "relative",
    marginBottom: 8,
    elevation: 3,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  tooltipPointer: {
    position: "absolute",
    bottom: -6,
    left: "50%",
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    borderRightWidth: 5,
    borderRightColor: "transparent",
    borderTopWidth: 6,
  },
  pinShadow: {
    width: 14,
    height: 3,
    borderRadius: 7,
    marginTop: 1,
  },
  myLocationFab: {
    position: "absolute",
    right: 16,
    width: 48,
    height: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    elevation: 4,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bottomConfirmBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    zIndex: 110,
    justifyContent: "space-between",
    elevation: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  selectedZoneRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 16,
  },
  submitBtn: {
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        maxWidth: 440,
        alignSelf: "center",
      },
    }),
  },
});
