// src/theme/typography.ts

import { Platform } from 'react-native';

// مدیریت نام فونت بر اساس پلتفرم
const fontFamilies = {
  bold: Platform.select({
    ios: 'IRANYekanXFaNum-Bold',
    android: 'IRANYekanXFaNum-Bold',
    default: 'IRANYekanXFaNum-Bold',
  }),
  medium: Platform.select({
    ios: 'IRANYekanWebFn-Medium',
    android: 'IRANYekanWebFn-Medium',
    default: 'IRANYekanWebFn-Medium',
  }),
  regular: Platform.select({
    ios: 'IRANYekanXFaNum-Regular',
    android: 'IRANYekanXFaNum-Regular',
    default: 'IRANYekanXFaNum-Regular',
  }),
};

export const typography = {
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  labelSm: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};