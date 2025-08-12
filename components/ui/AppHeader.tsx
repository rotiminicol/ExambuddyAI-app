import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Bell, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  showAvatar?: boolean;
  onBack?: () => void;
  onNotification?: () => void;
  onAvatar?: () => void;
  userProfile?: any;
}

export function AppHeader({ 
  title, 
  showBack = false, 
  showNotification = false, 
  showAvatar = false,
  onBack,
  onNotification,
  onAvatar,
  userProfile
}: AppHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.text }]}>
      {/* Stars Background */}
      <View style={styles.starsContainer}>
        {[...Array(20)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }
            ]}
          />
        ))}
      </View>

      {/* Moon */}
      <View style={styles.moon} />

      {/* Header Content */}
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          {showBack && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onBack}
            >
              <ArrowLeft size={24} color={colors.surface} />
            </TouchableOpacity>
          )}
          <Text style={[styles.headerTitle, { color: colors.surface }]}>{title}</Text>
        </View>

        <View style={styles.headerRight}>
          {showNotification && (
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={onNotification}
            >
              <Bell size={20} color={colors.surface} />
            </TouchableOpacity>
          )}
          {showAvatar && (
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={onAvatar}
            >
              {userProfile?.avatar ? (
                <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
                  <Text style={[styles.avatarText, { color: colors.text }]}>
                    {userProfile.name?.charAt(0) || 'U'}
                  </Text>
                </View>
              ) : (
                <User size={20} color={colors.surface} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    paddingHorizontal: 24,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  moon: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});
