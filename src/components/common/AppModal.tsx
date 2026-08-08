// src/components/common/AppModal.tsx

import { AppText } from "@/src/theme/AppText";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const { colors, borderRadius, spacing } = useTheme();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* بک‌دراپ نیمه‌شفاف برای بستن مودال در صورت کلیک روی فضای خالی */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.backdrop,
            { backgroundColor: "rgba(15, 23, 42, 0.4)" },
          ]}
        >
          {/* بدنه اصلی مودال کشویی */}
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: colors.surface,
                  borderTopLeftRadius: borderRadius.xl,
                  borderTopRightRadius: borderRadius.xl,
                  padding: spacing.lg,
                },
              ]}
            >
              {/* هدر مودال به صورت RTL */}
              <View
                style={[styles.header, { borderBottomColor: colors.border }]}
              >
                {/* دکمه بستن در چپ */}
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.closeBtn}
                >
                  <Ionicons name="close" size={24} color={colors.textPrimary} />
                </TouchableOpacity>

                {/* عنوان وسط */}
                <AppText variant="h2" style={{ color: colors.textPrimary }}>
                  {title}
                </AppText>

                {/* یک اسپیسر برای متقارن ماندن عنوان در وسط */}
                <View style={{ width: 40 }} />
              </View>

              {/* کانتنت داینامیک داخلی مودال */}
              <View style={styles.content}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end", // تبدیل به حالت کشویی پایین صفحه (BottomSheet)
  },
  modalContainer: {
    width: "100%",
    alignSelf: "center",
    maxHeight: "85%",
    ...Platform.select({
      web: {
        maxWidth: 440, // رعایت مکس‌وید روی مرورگر وب
      },
    }),
    elevation: 10,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingTop: 16,
  },
});
