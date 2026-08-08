// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// اضافه کردن پسوندهای woff و woff2 به لیست دارایی‌های مجاز
config.resolver.assetExts.push('woff2');
config.resolver.assetExts.push('woff');

module.exports = config;