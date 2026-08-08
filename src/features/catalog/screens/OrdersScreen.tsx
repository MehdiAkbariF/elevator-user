// src/features/catalog/screens/OrdersScreen.tsx

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/src/components/common/ThemeToggleButton';
import { AppBottomNav } from '@/src/components/layout/AppBottomNav';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { AppText } from '@/src/theme/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

const { width } = Dimensions.get('window');

// داده‌های نمونه سفارشات
const ORDERS_DATA = [
  {
    id: 'ORD-1001',
    date: '۱۵ مهر ۱۴۰۳',
    status: 'delivered',
    statusLabel: 'تحویل‌شده',
    statusColor: '#22C55E',
    total: '۱۲,۴۵۰,۰۰۰ تومان',
    items: [
      {
        id: '1',
        name: 'سیم بکسل کششی فولادی ۸ میلی‌متری',
        brand: 'KONE',
        quantity: 2,
        price: '۲,۴۵۰,۰۰۰ تومان',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr7C15R2E8JR08mci0TD25O81IKoXz9XGx4-m7aBm9zoFwxNhoCeh44av3POCFVF_McNXl0BaBskqznrmIougYmkTYFOeucZ3LeXK8JJF6-57JWdBsVnQu0FDmEBOZbH6W9g_WFwNNdXYjvfBXWIarN3Jnf8WQhxLsytYmLD2XFhF4BEjPDbmJhy41Gp49Qn7MfkNmzWcwvta0_QgBO5_bC3tsD37VJqqrfJ3U4QIrl9hK7Kc6EONQTw',
      },
      {
        id: '2',
        name: 'قفل کامل درب طبقات آسانسور',
        brand: 'SCHINDLER',
        quantity: 1,
        price: '۸,۹۰۰,۰۰۰ تومان',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk8F71OyFkQkMPoDoWFb7vPC287xKMPf8tdpgK0MOixbw7V5q4uHHUraiS2FN22zLEnEvlMAG0ZtdHRAS5fuVMTwlKDECcZF02yQ4XlqWL9KhK9vJv1TDnRwRnfvLqFC_AdKU_x5MtxSvBCCSen7o4y78WtSgR8xyWwKm_aZV2e64uyqC5Wn8xasu6N4knHIZNeiN8aQnpbnZqRcvMmSuZkG5xrWqJm0K5iN_MYF79yOvy2w1O6Izn4w',
      },
    ],
  },
  {
    id: 'ORD-1002',
    date: '۱۰ مهر ۱۴۰۳',
    status: 'processing',
    statusLabel: 'در حال انجام',
    statusColor: '#F59E0B',
    total: '۴,۲۰۰,۰۰۰ تومان',
    items: [
      {
        id: '3',
        name: 'میکروسوئیچ حد صنعتی (شالتر آسانسور)',
        brand: 'ORONA',
        quantity: 3,
        price: '۱,۲۵۰,۰۰۰ تومان',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJOuId653dDeMv-3lWDnrlAJakMDkyo9OCfUW7b1GCngnjNX7AK5r0F8wL5w8X6Q-c0dkAOO2E5YIB7y_VOOXp39lM3csFJDPQ_HbWGXCgRaKekcyABv3vJW-pSxeN-D5PJNp7cg_ft24kMwUsLAdRz_OzAl3gO2RTsLmFKHdkAJyz8JuQRcoj2-PkcAfdu_w467DOorzW5hyu6E4BbGRo2IFgb6HBZseGsejS_o74imNc_aQIzcSFRA',
      },
    ],
  },
  {
    id: 'ORD-1003',
    date: '۵ مهر ۱۴۰۳',
    status: 'pending',
    statusLabel: 'در انتظار پرداخت',
    statusColor: '#3B82F6',
    total: '۲,۸۰۰,۰۰۰ تومان',
    items: [
      {
        id: '4',
        name: 'لنت کفشک ریل آسانسور ۱۶ میلی‌متری',
        brand: 'GENERIC',
        quantity: 4,
        price: '۷۰۰,۰۰۰ تومان',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4vAK9ArcMrUX6fKRpFrkv_tC1y6EPlXazYt1NWyFo-PS1fULY2qhD_4i4aSz26jcfp_Ft9Tr035oOhvySU6EpQvv7ksjz6Gf4cHdDsAtXlrB4V0qCOHh6vMLxvDbzL5JAVNSg1HkBtwbpZkVXNEveZnoCWwYybB5kdPR3zTKEgd6IU1FzDxxda5JFHvNccIdGZvX5r4bt1u9QlsKpSPMv45YXqZNoyjYMccqHskJ7d2_-NL7TGUOelw',
      },
    ],
  },
  {
    id: 'ORD-1004',
    date: '۲۸ شهریور ۱۴۰۳',
    status: 'cancelled',
    statusLabel: 'لغو شده',
    statusColor: '#EF4444',
    total: '۱,۵۰۰,۰۰۰ تومان',
    items: [
      {
        id: '5',
        name: 'روغن موتور گیرلس ۱۰W-۴۰',
        brand: 'CASTROL',
        quantity: 2,
        price: '۷۵۰,۰۰۰ تومان',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4vAK9ArcMrUX6fKRpFrkv_tC1y6EPlXazYt1NWyFo-PS1fULY2qhD_4i4aSz26jcfp_Ft9Tr035oOhvySU6EpQvv7ksjz6Gf4cHdDsAtXlrB4V0qCOHh6vMLxvDbzL5JAVNSg1HkBtwbpZkVXNEveZnoCWwYybB5kdPR3zTKEgd6IU1FzDxxda5JFHvNccIdGZvX5r4bt1u9QlsKpSPMv45YXqZNoyjYMccqHskJ7d2_-NL7TGUOelw',
      },
    ],
  },
];

const STATUS_TABS = [
  { id: 'all', label: 'همه' },
  { id: 'pending', label: 'در انتظار' },
  { id: 'processing', label: 'در حال انجام' },
  { id: 'delivered', label: 'تحویل‌شده' },
  { id: 'cancelled', label: 'لغو شده' },
];

export const OrdersScreen = () => {
  const { colors, spacing, borderRadius, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeStatus, setActiveStatus] = useState('all');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/profile');
    }
  };

  const handleOrderPress = (orderId: string) => {
    router.push(`/orders/${orderId}` as any);
  };

  const filteredOrders = ORDERS_DATA.filter(
    (order) => activeStatus === 'all' || order.status === activeStatus
  );

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      delivered: 'checkmark-circle',
      processing: 'time-outline',
      pending: 'hourglass-outline',
      cancelled: 'close-circle',
    };
    return icons[status] || 'ellipse-outline';
  };

  return (
    <ScreenWrapper>
      {/* هدر */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
          },
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
          <Ionicons
            name="receipt-outline"
            size={20}
            color={colors.secondary}
            style={{ marginLeft: 8 }}
          />
          <AppText variant="h2" style={{ color: colors.textPrimary }}>
            سفارشات من
          </AppText>
        </View>

        <View style={styles.rightActions}>
          <ThemeToggleButton />
        </View>
      </View>

      <View style={styles.mainContainer}>
        {/* تب‌های وضعیت */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.tabsScroll,
            {
              paddingHorizontal: 16,
              gap: 8,
              paddingVertical: 12,
            },
          ]}
        >
          {STATUS_TABS.map((tab) => {
            const isActive = activeStatus === tab.id;
            const count = ORDERS_DATA.filter(
              (o) => tab.id === 'all' || o.status === tab.id
            ).length;

            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.8}
                style={[
                  styles.tabPill,
                  {
                    backgroundColor: isActive ? colors.primary : colors.surface,
                    borderColor: isActive ? colors.primary : colors.border,
                    borderRadius: 9999,
                    borderWidth: isActive ? 0 : 1,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    gap: 4,
                  },
                ]}
                onPress={() => setActiveStatus(tab.id)}
              >
                <AppText
                  variant="button"
                  style={{
                    color: isActive ? colors.onPrimary : colors.textSecondary,
                  }}
                >
                  {tab.label}
                </AppText>
                {count > 0 && (
                  <View
                    style={[
                      styles.countBadge,
                      {
                        backgroundColor: isActive
                          ? 'rgba(255,255,255,0.2)'
                          : colors.surfaceDim,
                        borderRadius: 9999,
                        paddingHorizontal: 4,
                        paddingVertical: 1,
                      },
                    ]}
                  >
                    <AppText
                      variant="labelSm"
                      style={{
                        color: isActive ? colors.onPrimary : colors.textSecondary,
                        fontSize: 10,
                      }}
                    >
                      {count}
                    </AppText>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* لیست سفارشات */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.ordersScroll,
            {
              paddingHorizontal: 16,
              paddingBottom: 100 + insets.bottom,
            },
          ]}
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isDelivered = order.status === 'delivered';
              const isCancelled = order.status === 'cancelled';

              return (
                <TouchableOpacity
                  key={order.id}
                  activeOpacity={0.8}
                  style={[
                    styles.orderCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      borderRadius: borderRadius.lg,
                      borderWidth: 1,
                      padding: 16,
                      marginBottom: 12,
                    },
                  ]}
                  onPress={() => handleOrderPress(order.id)}
                >
                  {/* هدر کارت */}
                  <View style={styles.orderHeader}>
                    <View style={styles.orderIdContainer}>
                      <AppText
                        variant="labelSm"
                        style={[
                          styles.orderId,
                          {
                            color: colors.textPrimary,
                            fontWeight: '600',
                          },
                        ]}
                      >
                        {order.id}
                      </AppText>
                      <AppText
                        variant="body"
                        style={[
                          styles.orderDate,
                          {
                            color: colors.textSecondary,
                            fontSize: 12,
                          },
                        ]}
                      >
                        {order.date}
                      </AppText>
                    </View>

                    {/* وضعیت */}
                    <View
                      style={{
                        backgroundColor: order.statusColor + '15',
                        borderRadius: 9999,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Ionicons
                        name={getStatusIcon(order.status) as any}
                        size={14}
                        color={order.statusColor}
                      />
                      <AppText
                        variant="labelSm"
                        style={{
                          color: order.statusColor,
                          fontSize: 11,
                        }}
                      >
                        {order.statusLabel}
                      </AppText>
                    </View>
                  </View>

                  {/* لیست محصولات */}
                  <View style={styles.productsContainer}>
                    {order.items.map((item, index) => (
                      <View
                        key={item.id}
                        style={[
                          styles.productRow,
                          index < order.items.length - 1 && {
                            borderBottomColor: colors.border,
                            borderBottomWidth: 1,
                            paddingBottom: 8,
                            marginBottom: 8,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.productImageContainer,
                            {
                              backgroundColor: colors.surfaceDim,
                              borderRadius: 8,
                              overflow: 'hidden',
                              width: 56,
                              height: 56,
                              marginLeft: 12,
                            },
                          ]}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                            resizeMode="cover"
                          />
                        </View>

                        <View style={styles.productInfo}>
                          <AppText
                            variant="body"
                            style={[
                              styles.productName,
                              {
                                color: colors.textPrimary,
                                textAlign: 'right',
                                fontWeight: '500',
                              },
                            ]}
                            numberOfLines={2}
                          >
                            {item.name}
                          </AppText>
                          <View style={styles.productMeta}>
                            <AppText
                              variant="labelSm"
                              style={{
                                color: colors.textSecondary,
                                fontSize: 11,
                              }}
                            >
                              {item.brand}
                            </AppText>
                            <AppText
                              variant="labelSm"
                              style={{
                                color: colors.textSecondary,
                                fontSize: 11,
                              }}
                            >
                              × {item.quantity}
                            </AppText>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* فوتر کارت */}
                  <View style={styles.orderFooter}>
                    <AppText
                      variant="button"
                      style={[
                        styles.totalPrice,
                        {
                          color: colors.textPrimary,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {order.total}
                    </AppText>

                    {(isDelivered || isCancelled) && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                          styles.actionButton,
                          {
                            borderColor: colors.border,
                            borderRadius: 4,
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                          },
                        ]}
                      >
                        <AppText
                          variant="labelSm"
                          style={{
                            color: colors.textSecondary,
                            fontSize: 12,
                          }}
                        >
                          {isDelivered ? 'مشاهده فاکتور' : 'جزئیات'}
                        </AppText>
                      </TouchableOpacity>
                    )}

                    {order.status === 'pending' && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.payButton,
                          {
                            backgroundColor: colors.secondary,
                            borderRadius: 4,
                            paddingHorizontal: 16,
                            paddingVertical: 4,
                          },
                        ]}
                      >
                        <AppText
                          variant="button"
                          style={{
                            color: '#FFFFFF',
                            fontSize: 12,
                          }}
                        >
                          پرداخت
                        </AppText>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View
              style={[
                styles.emptyContainer,
                {
                  borderColor: colors.border,
                  borderRadius: 12,
                  backgroundColor: colors.surface,
                  padding: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 24,
                },
              ]}
            >
              <Ionicons
                name="receipt-outline"
                size={56}
                color={colors.textSecondary}
                style={{ marginBottom: 12 }}
              />
              <AppText
                variant="h2"
                style={{
                  color: colors.textPrimary,
                  textAlign: 'center',
                  marginBottom: 4,
                }}
              >
                هیچ سفارشی یافت نشد
              </AppText>
              <AppText
                variant="body"
                style={{
                  color: colors.textSecondary,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                هنوز هیچ سفارشی ثبت نکرده‌اید.
              </AppText>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.shopBtn,
                  {
                    backgroundColor: colors.secondary,
                    borderRadius: 8,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                  },
                ]}
                onPress={() => router.push('/catalog')}
              >
                <AppText variant="button" style={{ color: '#FFFFFF' }}>
                  شروع خرید
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ناوبری پایینی */}
      <AppBottomNav activeTab="profile" />
    </ScreenWrapper>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  tabsScroll: {
    flexDirection: 'row-reverse',
  },
  tabPill: {
    alignItems: 'center',
  },
  countBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ordersScroll: {
    paddingTop: 4,
  },
  orderCard: {
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdContainer: {
    alignItems: 'flex-end',
  },
  orderId: {
    fontSize: 14,
  },
  orderDate: {
    fontSize: 12,
  },
  productsContainer: {
    marginBottom: 12,
  },
  productRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  productImageContainer: {
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  productName: {
    fontSize: 14,
  },
  productMeta: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 2,
  },
  orderFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,

    paddingTop: 12,
  },
  totalPrice: {
    fontSize: 16,
  },
  actionButton: {
    borderWidth: 1,
  },
  payButton: {},
  emptyContainer: {
    borderWidth: 1,
  },
  shopBtn: {},
});