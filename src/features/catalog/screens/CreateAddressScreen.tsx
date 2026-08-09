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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview"; // ایمپورت وب‌ویو استاندارد اکسپو

const { width } = Dimensions.get("window");

// کدهای بومی HTML/CSS/JS برای لود بدون فیلتر نقشه تعاملی Leaflet با تم لایت CartoDB
const LEAFLET_MAP_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
  <style>
    body { margin: 0; padding: 0; }
    #map { height: 100vh; width: 100vw; }
    .leaflet-control-attribution { display: none !important; }
    .leaflet-bar { border: none !important; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08) !important; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
  <script>
    // راه‌اندازی بومی نقشه روی مختصات تهران
    var map = L.map('map', {
      zoomControl: false
    }).setView([35.6892, 51.3890], 15);

    // لود کاشی‌های لایت، ملایم و فوق‌العاده سریع بدون تحریم CartoDB
    L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    // ارسال لایو طول و عرض جغرافیایی به ری‌اکت نیتیو پس از پایان جابجایی نقشه
    map.on('moveend', function() {
      var center = map.getCenter();
      var message = {
        latitude: center.lat,
        longitude: center.lng
      };
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
    });

    // لود اولیه مختصات
    setTimeout(function() {
      var center = map.getCenter();
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          latitude: center.lat,
          longitude: center.lng
        }));
      }
    }, 400);
  </script>
</body>
</html>
`;

export const CreateAddressScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("در حال دریافت موقعیت...");

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
    router.replace("/create-address-detail");
  };

  // دریافت اطلاعات لایو نقشه از وب‌ویو و استعلام آدرس فارسی
  const handleMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const { latitude, longitude } = data;

      // استعلام مستقیم آدرس از وب‌سرویس بدون تحریم
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=fa`,
        {
          headers: {
            "User-Agent": "X-Elevator-App",
          },
        },
      );
      const resData = await response.json();

      if (resData && resData.address) {
        const neighborhood =
          resData.address.neighborhood ||
          resData.address.suburb ||
          resData.address.quarter ||
          resData.address.road ||
          "محدوده نامشخص";
        const city = resData.address.city || resData.address.town || "تهران";
        setSelectedZone(`محدوده: ${neighborhood}، ${city}`);
      }
    } catch (error) {
      console.warn("خطا در دریافت آدرس از نقشه:", error);
      setSelectedZone("خطا در اتصال به سرور نقشه");
    }
  };

  return (
    <ScreenWrapper style={styles.wrapperOverride}>
      {/* ۱. نقشه بومی وب‌ویو با متد ایمن و بدون کروشه و بدون نیاز به کلید گوگل‌مپ */}
      <View style={styles.mapContainer}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: LEAFLET_MAP_HTML }}
          onMessage={handleMessage} // گوش دادن به تغییرات لوکیشن نقشه بومی
          style={StyleSheet.absoluteFillObject}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
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
        {/* حباب راهنما */}
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

        {/* پین متحرک بومی */}
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
          onPress={handleConfirmLocation}
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
    pointerEvents: "none", // برای اینکه کلیک‌های روی پین مزاحم تعامل کاربر با نقشه زیرین نشود
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
