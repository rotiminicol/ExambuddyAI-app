import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Bell, X, MessageSquare, Award, Clock, CheckCircle } from 'lucide-react-native';
import { colors } from '@/lib/theme';

interface Notification {
  id: string;
  type: 'message' | 'achievement' | 'reminder' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationDropdownProps {
  isVisible: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isVisible, onClose }: NotificationDropdownProps) {
  const [notifications] = useState<Notification[]>([
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
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return <Award size={16} color="#F59E0B" />;
      case 'reminder':
        return <Clock size={16} color="#EF4444" />;
      case 'message':
        return <MessageSquare size={16} color="#3B82F6" />;
      case 'system':
        return <CheckCircle size={16} color="#10B981" />;
      default:
        return <Bell size={16} color={colors.textMuted} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.dropdown}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification
                ]}
              >
                <View style={styles.notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Bell size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyMessage}>You're all caught up!</Text>
            </View>
          )}
        </ScrollView>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllRead}>
            <Text style={styles.markAllReadText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    right: 24,
    width: 320,
    maxHeight: 400,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationsList: {
    maxHeight: 300,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: colors.border,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
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
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  notificationMessage: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 18,
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
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginTop: 12,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 4,
  },
  markAllRead: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  markAllReadText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
});
