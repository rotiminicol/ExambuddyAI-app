import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, MessageSquare, Award, Clock, CheckCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';

export default function NotificationsScreen() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 20,
      backgroundColor: colors.text,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      marginLeft: 12,
      color: colors.surface,
    },
    headerSpacer: {
      width: 40,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 120,
    },
    notificationCard: {
      marginBottom: 12,
      padding: 0,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 16,
      position: 'relative',
    },
    notificationIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    notificationContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    notificationTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      flex: 1,
      marginRight: 8,
      color: colors.text,
    },
    notificationTime: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
    notificationMessage: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      lineHeight: 20,
      color: colors.textMuted,
    },
    unreadDot: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
    },
    emptyCard: {
      alignItems: 'center',
      padding: 40,
      marginTop: 40,
    },
    emptyTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      marginTop: 16,
      marginBottom: 4,
      color: colors.text,
    },
    emptyMessage: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
  });

  const notifications = [
    {
      id: '1',
      type: 'achievement',
      title: 'Great Progress!',
      message: 'You completed 5 practice questions in a row',
      time: '2m ago',
      read: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Study Reminder',
      message: 'Time for your daily math practice session',
      time: '15m ago',
      read: false,
    },
    {
      id: '3',
      type: 'message',
      title: 'New Study Material',
      message: 'New practice questions available for Algebra',
      time: '1h ago',
      read: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'App Update',
      message: 'New features available in the latest update',
      time: '2h ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award size={20} color="#F59E0B" />;
      case 'reminder':
        return <Clock size={20} color="#EF4444" />;
      case 'message':
        return <MessageSquare size={20} color="#3B82F6" />;
      case 'system':
        return <CheckCircle size={20} color="#10B981" />;
      default:
        return <Bell size={20} color={colors.textMuted} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.text }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.surface }]}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card key={notification.id} style={styles.notificationCard}>
              <View style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
              </View>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Bell size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyMessage}>
              You're all caught up!
            </Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


