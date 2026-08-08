// src/theme/typography.ts

import { Platform } from "react-native";

const fontFamilies = {
  bold: Platform.select({
    ios: "IRANYekanXFaNum-Bold",
    android: "IRANYekanXFaNum-Bold",
    default: "IRANYekanXFaNum-Bold",
  }),
  medium: Platform.select({
    ios: "IRANYekanWebFn-Medium",
    android: "IRANYekanWebFn-Medium",
    default: "IRANYekanWebFn-Medium",
  }),
  regular: Platform.select({
    ios: "IRANYekanXFaNum-Regular",
    android: "IRANYekanXFaNum-Regular",
    default: "IRANYekanXFaNum-Regular",
  }),
};

export const typography = {
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    lineHeight: 32,
    // ترفند مهندسی برای اندروید: حذف ضخامت عددی تکراری روی فونتی که خودش ذاتاً Bold است
    ...Platform.select({
      ios: { fontWeight: "700" as const },
      android: { fontWeight: "normal" as const }, // ممانعت از کرش و بازگشت به فونت دیفالت سیستم
      default: { fontWeight: "700" as const },
    }),
  },
  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    lineHeight: 24,
    ...Platform.select({
      ios: { fontWeight: "600" as const },
      android: { fontWeight: "normal" as const },
      default: { fontWeight: "600" as const },
    }),
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    ...Platform.select({
      ios: { fontWeight: "400" as const },
      android: { fontWeight: "normal" as const },
      default: { fontWeight: "400" as const },
    }),
  },
  button: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    lineHeight: 20,
    ...Platform.select({
      ios: { fontWeight: "500" as const },
      android: { fontWeight: "normal" as const },
      default: { fontWeight: "500" as const },
    }),
  },
  labelSm: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: { fontWeight: "600" as const },
      android: { fontWeight: "normal" as const },
      default: { fontWeight: "600" as const },
    }),
  },
};
