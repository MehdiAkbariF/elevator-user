// src/features/catalog/screens/TicketConversationScreen.tsx

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
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 350;

export const TicketConversationScreen = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // دریافت فاصله دکمه‌های پایینی موبایل

  const [replyText, setReplyText] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/support");
    }
  };

  const handleResolveTicket = () => {
    router.replace("/support");
  };

  return (
    <ScreenWrapper>
      {/* هدر چسبنده بالایی */}
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
            تیکت #TK-۸۰۲۴
          </AppText>
          <View style={styles.statusRow}>
            <AppText
              variant="labelSm"
              style={{ color: "#22C55E", fontSize: 10 }}
            >
              پاسخ داده شده
            </AppText>
            <View style={[styles.statusDot, { backgroundColor: "#22C55E" }]} />
          </View>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
        </View>
      </View>

      {/* پیاده‌سازی گرید سراسری کیبورد با فرمول طلایی و بدون تداخل برای اندروید */}
      <KeyboardAvoidingView
        // تصحیح شد: غیرفعال کردن بیهیویر برای اندروید جهت حل دائمی مشکل معلق ماندن کادر چت در هوا
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // آفست فقط برای iOS نیاز است
      >
        {/* بخش اسکرول پیام‌ها */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingHorizontal: spacing.lg,
              paddingBottom: 24,
            },
          ]}
        >
          {/* پیام ۱: کاربر (سمت راست صفحه - رنگ تیره برند) */}
          <View style={styles.userMessageBlock}>
            <View
              style={[
                styles.userBubble,
                {
                  backgroundColor: colors.primary,
                  borderBottomLeftRadius: borderRadius.xl,
                  borderTopLeftRadius: borderRadius.xl,
                  borderTopRightRadius: borderRadius.xl,
                },
              ]}
            >
              <AppText variant="body" style={{ color: colors.onPrimary }}>
                سلام، من متوجه شدم فاکتور دوشنبه هفته گذشته دو عدد میکروسوئیچ حد
                را ثبت کرده، در حالی که تکنسین فقط یک عدد را تعویض کرد. لطفاً
                این مغایرت فاکتور را بررسی بفرمایید.
              </AppText>
            </View>
            <AppText
              variant="labelSm"
              color="muted"
              style={[
                styles.timestampText,
                { fontFamily: "IRANYekanXFaNum-Regular" },
              ]}
            >
              ۲۲ مهر، ساعت ۱۰:۳۰ صبح
            </AppText>
          </View>

          {/* پیام ۲: پشتیبان رسمی (سمت چپ صفحه - رنگ خاکستری ملایم) */}
          <View style={styles.agentMessageBlock}>
            {/* هدر نام و آواتار پشتیبان مریم علوی در ساختار چپ‌چین */}
            <View style={styles.agentHeader}>
              <View
                style={[
                  styles.agentAvatarWrapper,
                  { borderColor: colors.border },
                ]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLXu7NajB9ttA_qBS7Jv9r1u6gQS9xHbr9AeW-Q9MDomH7fCC3i26Ixv8RUSxeONHma8uv5_BP7DdjTOQ2djfmEZw4AtAGUJCHz-lTgBcSOzmXKSI-ME6QGkCBcgrKsXfDHCtDRvk-gOlKGRBXXCjoRBNLEp7MV4Hqr6pb4jt4WWv_K4ALrwLi3agJjGbkhXFW69ibWRKGGSs5jyrxMPNQg8Nkj8ludNwOHnMXajwRkMnVHBnI73wr-g",
                  }}
                  style={styles.agentAvatar}
                />
              </View>
              <AppText variant="labelSm" color="muted">
                پشتیبان رسمی: سرکار خانم علوی
              </AppText>
            </View>

            {/* حباب چت پشتیبان */}
            <View
              style={[
                styles.agentBubble,
                {
                  backgroundColor: colors.surfaceDim,
                  borderBottomRightRadius: borderRadius.xl,
                  borderTopLeftRadius: borderRadius.xl,
                  borderTopRightRadius: borderRadius.xl,
                  borderColor: colors.border,
                },
              ]}
            >
              <AppText variant="body" style={{ color: colors.textPrimary }}>
                سلام علی عزیز، ممنون از اینکه اطلاع دادید. ما با تکنسین اعزامی
                مأموریت (جناب مهدی احمدی) صحبت کردیم و بله، یک خطای اداری ثبت
                فاکتور رخ داده بود. من فاکتور اصلاح‌شده را مجدداً برای شما صادر
                کردم و مابه‌التفاوت هزینه به صورت اعتبار به کیف پول شما برگشت
                داده شد.
              </AppText>
            </View>

            <AppText
              variant="labelSm"
              color="muted"
              style={[
                styles.timestampTextAgent,
                { fontFamily: "IRANYekanXFaNum-Regular" },
              ]}
            >
              امروز، ساعت ۰۹:۱۵ صبح
            </AppText>

            {/* سند ضمیمه‌شده پی دی اف اصلاحی فاکتور */}
            <View
              style={[
                styles.documentCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <TouchableOpacity activeOpacity={0.7} style={styles.downloadBtn}>
                <Ionicons
                  name="download-outline"
                  size={20}
                  color={colors.textPrimary}
                />
              </TouchableOpacity>

              <View style={styles.documentInfo}>
                <AppText
                  variant="labelSm"
                  style={{ color: colors.textPrimary }}
                >
                  Revised_Invoice_WO80.pdf
                </AppText>
                <AppText
                  variant="labelSm"
                  color="muted"
                  style={{
                    fontSize: 10,
                    marginTop: 2,
                    fontFamily: "IRANYekanXFaNum-Regular",
                  }}
                >
                  حجم فایل: ۱.۲ مگابایت
                </AppText>
              </View>

              <View
                style={[styles.pdfIconBox, { backgroundColor: colors.error }]}
              >
                <Ionicons name="document-text" size={20} color={colors.error} />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* کادر ورودی پیام چت */}
        <View
          style={[
            styles.bottomInputBar,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              paddingBottom: insets.bottom + 8,
            },
          ]}
        >
          <View style={styles.inputContainer}>
            {/* دکمه ارسال پیام */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
            >
              <Ionicons
                name="send"
                size={18}
                color={colors.onPrimary}
                style={styles.sendIcon}
              />
            </TouchableOpacity>

            {/* فیلد ورودی متن پیام */}
            <TextInput
              value={replyText}
              onChangeText={setReplyText}
              placeholder="پاسخ خود را در اینجا بنویسید..."
              placeholderTextColor={colors.outline}
              style={[
                styles.chatInput,
                {
                  color: colors.textPrimary,
                  fontFamily: "IRANYekanXFaNum-Regular",
                },
              ]}
            />

            {/* دکمه الصاق پیوست */}
            <TouchableOpacity activeOpacity={0.7} style={styles.attachButton}>
              <Ionicons name="attach" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

// صادرکننده پیش‌فرض بومی
export default TicketConversationScreen;

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    zIndex: 100,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  brandContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 6,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 16,
  },
  userMessageBlock: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  userBubble: {
    maxWidth: "85%",
    padding: 12,
  },
  timestampText: {
    fontSize: 10,
    marginTop: 6,
    marginRight: 4,
  },
  agentMessageBlock: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  agentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  agentAvatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 8,
  },
  agentAvatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  agentBubble: {
    maxWidth: "85%",
    padding: 12,
    borderWidth: 1,
    marginLeft: 40,
  },
  timestampTextAgent: {
    fontSize: 10,
    marginTop: 6,
    marginLeft: 44,
  },
  documentCard: {
    width: "80%",
    marginLeft: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pdfIconBox: {
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  documentInfo: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 12,
  },
  downloadBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomInputBar: {
    width: "100%",
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    transform: [{ rotate: "180deg" }],
  },
  chatInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    textAlign: "right",
    fontSize: 14,
  },
  attachButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
