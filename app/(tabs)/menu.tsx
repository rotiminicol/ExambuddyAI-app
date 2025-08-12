import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  MessageSquare, 
  BarChart3, 
  Target, 
  Bell, 
  Settings, 
  HelpCircle, 
  Download, 
  Share2,
  Crown,
  Zap,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  Star,
  Sparkles,
  User,
  FileText,
  Brain,
  Upload,
  Calendar,
  Bookmark,
  Star as StarIcon,
  Gift,
  Shield,
  Globe,
  Smartphone,
  Headphones,
  Palette,
  Moon,
  Sun,
  Languages,
  Volume2,
  Wifi,
  WifiOff
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withDelay,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { colors } from '@/lib/theme';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  route: string;
  badge?: string;
  premium?: boolean;
  color?: string;
  category: 'study' | 'tools' | 'preferences' | 'support' | 'premium';
}

interface UserStats {
  totalStudyTime: number;
  questionsAnswered: number;
  accuracy: number;
  streak: number;
  achievements: number;
}

interface AnimatedMenuItemProps {
  item: MenuItem;
  index: number;
  onPress: (route: string) => void;
}

function AnimatedMenuItem({ item, index, onPress }: AnimatedMenuItemProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    scale.value = withDelay(
      index * 60,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    opacity.value = withDelay(
      index * 60,
      withTiming(1, { duration: 400 })
    );
    translateY.value = withDelay(
      index * 60,
      withSpring(0, { damping: 12, stiffness: 100 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => onPress(item.route)}
        activeOpacity={0.8}
      >
        <View style={styles.menuItemContent}>
          <View style={[styles.iconContainer, item.color && { backgroundColor: item.color + '15' }]}>
            <item.icon size={24} color={item.color || colors.text} strokeWidth={2} />
          </View>
          <View style={styles.menuItemText}>
            <View style={styles.menuItemHeader}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              {item.premium && (
                <Crown size={14} color={colors.text} style={styles.premiumIcon} />
              )}
            </View>
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          </View>
          <ChevronRight size={20} color={colors.textMuted} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function MenuScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const menuItems: MenuItem[] = [
    // Study Tools
    { 
      id: '1', 
      title: 'Voice Chat', 
      subtitle: 'AI-powered study assistant', 
      icon: MessageSquare, 
      route: '/voice', 
      badge: 'New',
      color: '#8B5CF6',
      category: 'study'
    },
    { 
      id: '2', 
      title: 'Progress Analytics', 
      subtitle: 'Detailed performance insights', 
      icon: BarChart3, 
      route: '/progress', 
      premium: true,
      color: '#06B6D4',
      category: 'study'
    },
    { 
      id: '3', 
      title: 'Study Goals', 
      subtitle: 'Set and track your targets', 
      icon: Target, 
      route: '/goals',
      color: '#10B981',
      category: 'study'
    },
    { 
      id: '4', 
      title: 'Study Plan', 
      subtitle: 'Personalized learning roadmap', 
      icon: Calendar, 
      route: '/study-plan',
      color: '#F59E0B',
      category: 'study'
    },
    { 
      id: '5', 
      title: 'Practice Questions', 
      subtitle: 'Generate and practice with questions', 
      icon: FileText, 
      route: '/questions',
      color: '#EF4444',
      category: 'study'
    },
    { 
      id: '6', 
      title: 'Flashcards', 
      subtitle: 'Build and review flashcard decks', 
      icon: BookOpen, 
      route: '/flashcards',
      color: '#8B5CF6',
      category: 'study'
    },
    { 
      id: '7', 
      title: 'Add Materials', 
      subtitle: 'Upload or paste study content', 
      icon: Upload, 
      route: '/materials',
      color: '#10B981',
      category: 'study'
    },
    { 
      id: '8', 
      title: 'Bookmarks', 
      subtitle: 'Save important study materials', 
      icon: Bookmark, 
      route: '/bookmarks',
      color: '#F59E0B',
      category: 'study'
    },
    
    // Tools & Features
    { 
      id: '9', 
      title: 'Offline Content', 
      subtitle: 'Download for offline study', 
      icon: Download, 
      route: '/offline',
      color: '#6B7280',
      category: 'tools'
    },
    { 
      id: '10', 
      title: 'Share Progress', 
      subtitle: 'Share achievements with friends', 
      icon: Share2, 
      route: '/share',
      color: '#10B981',
      category: 'tools'
    },
    { 
      id: '11', 
      title: 'Study Timer', 
      subtitle: 'Pomodoro and focus timer', 
      icon: Clock, 
      route: '/timer',
      color: '#8B5CF6',
      category: 'tools'
    },
    { 
      id: '12', 
      title: 'Study Music', 
      subtitle: 'Background music for focus', 
      icon: Headphones, 
      route: '/music',
      color: '#EF4444',
      category: 'tools'
    },
    
    // Preferences
    { 
      id: '13', 
      title: 'Profile Settings', 
      subtitle: 'Manage your account', 
      icon: User, 
      route: '/profile',
      color: '#6B7280',
      category: 'preferences'
    },
    { 
      id: '14', 
      title: 'App Settings', 
      subtitle: 'Customize app preferences', 
      icon: Settings, 
      route: '/settings',
      color: '#6B7280',
      category: 'preferences'
    },
    { 
      id: '15', 
      title: 'Theme & Appearance', 
      subtitle: 'Customize app appearance', 
      icon: Palette, 
      route: '/theme',
      color: '#8B5CF6',
      category: 'preferences'
    },
    { 
      id: '16', 
      title: 'Language & Sound', 
      subtitle: 'App language and audio preferences', 
      icon: Languages, 
      route: '/language',
      color: '#06B6D4',
      category: 'preferences'
    },
    { 
      id: '17', 
      title: 'Notifications', 
      subtitle: 'Manage alert preferences', 
      icon: Bell, 
      route: '/notifications',
      color: '#F59E0B',
      category: 'preferences'
    },
    
    // Support & Info
    { 
      id: '18', 
      title: 'Help & Support', 
      subtitle: 'Get assistance when needed', 
      icon: HelpCircle, 
      route: '/help',
      color: '#EF4444',
      category: 'support'
    },
    { 
      id: '19', 
      title: 'About', 
      subtitle: 'Learn more about ExamBuddy AI', 
      icon: StarIcon, 
      route: '/about',
      color: '#F59E0B',
      category: 'support'
    },
    { 
      id: '20', 
      title: 'Feedback', 
      subtitle: 'Share your thoughts with us', 
      icon: MessageSquare, 
      route: '/feedback',
      color: '#10B981',
      category: 'support'
    },
    { 
      id: '21', 
      title: 'Upgrade to Premium', 
      subtitle: 'Unlock unlimited features and content', 
      icon: Crown, 
      route: '/premium',
      color: '#000000',
      category: 'support',
      premium: true
    },
  ];

  useEffect(() => {
    loadUserData();
    loadUserProfile();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user stats from Supabase
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .single();

      if (!statsError && statsData) {
        setUserStats({
          totalStudyTime: statsData.total_study_time || 0,
          questionsAnswered: statsData.questions_answered || 0,
          accuracy: statsData.accuracy || 0,
          streak: statsData.streak || 0,
          achievements: statsData.achievements || 0,
        });
      }

      // Fetch recent activity
      const { data: activityData, error: activityError } = await supabase
        .from('study_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!activityError && activityData) {
        setRecentActivity(activityData);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || 'User',
          avatar: user.user_metadata?.avatar_url || null,
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    await loadUserProfile();
    setRefreshing(false);
  };

  const handleMenuItemPress = (route: string) => {
    router.push(route as any);
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getCategoryItems = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>More</Text>
              <Text style={styles.userName}>Explore additional features</Text>
            </View>
            <TouchableOpacity style={styles.avatarContainer}>
              <User size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <LoadingSkeleton height={120} borderRadius={20} style={styles.statsCard} />
          <View style={styles.menuList}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <LoadingSkeleton key={i} height={80} borderRadius={16} style={styles.menuItemSkeleton} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>More</Text>
            <Text style={styles.userName}>Explore additional features</Text>
          </View>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => router.push('/profile')}
          >
            {userProfile?.avatar ? (
              <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarText}>
                {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 
                 userProfile?.email ? userProfile.email.charAt(0).toUpperCase() : 'U'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Stats Card */}
        {userStats && (
          <Card style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <View style={styles.statsTitle}>
                <Sparkles size={20} color={colors.text} />
                <Text style={styles.statsTitleText}>Your Progress</Text>
              </View>
              <View style={styles.statsBadge}>
                <Star size={12} color={colors.text} />
                <Text style={styles.statsBadgeText}>Premium</Text>
              </View>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Clock size={16} color={colors.textMuted} />
                <Text style={styles.statValue}>{formatStudyTime(userStats.totalStudyTime)}</Text>
                <Text style={styles.statLabel}>Study Time</Text>
              </View>
              <View style={styles.statItem}>
                <Target size={16} color={colors.textMuted} />
                <Text style={styles.statValue}>{userStats.questionsAnswered}</Text>
                <Text style={styles.statLabel}>Questions</Text>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={16} color={colors.textMuted} />
                <Text style={styles.statValue}>{userStats.accuracy}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
              <View style={styles.statItem}>
                <Zap size={16} color={colors.textMuted} />
                <Text style={styles.statValue}>{userStats.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Study Tools */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Study Tools</Text>
          <View style={styles.menuList}>
            {getCategoryItems('study').map((item, index) => (
              <AnimatedMenuItem
                key={item.id}
                item={item}
                index={index}
                onPress={handleMenuItemPress}
              />
            ))}
          </View>
        </View>

        {/* Tools & Features */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Tools & Features</Text>
          <View style={styles.menuList}>
            {getCategoryItems('tools').map((item, index) => (
              <AnimatedMenuItem
                key={item.id}
                item={item}
                index={index + getCategoryItems('study').length}
                onPress={handleMenuItemPress}
              />
            ))}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuList}>
            {getCategoryItems('preferences').map((item, index) => (
              <AnimatedMenuItem
                key={item.id}
                item={item}
                index={index + getCategoryItems('study').length + getCategoryItems('tools').length}
                onPress={handleMenuItemPress}
              />
            ))}
          </View>
        </View>

        {/* Support & Info */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support & Info</Text>
          <View style={styles.menuList}>
            {getCategoryItems('support').map((item, index) => (
              <AnimatedMenuItem
                key={item.id}
                item={item}
                index={index + getCategoryItems('study').length + getCategoryItems('tools').length + getCategoryItems('preferences').length}
                onPress={handleMenuItemPress}
              />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Card style={styles.activityCard}>
              {recentActivity.map((activity, index) => (
                <View key={index} style={[styles.activityItem, index < recentActivity.length - 1 && styles.activityItemBorder]}>
                  <View style={styles.activityIcon}>
                    <BookOpen size={16} color={colors.text} />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.subject || 'Study Session'}</Text>
                    <Text style={styles.activityTime}>
                      {new Date(activity.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.activityDuration}>
                    {activity.duration || 0}m
                  </Text>
                </View>
              ))}
            </Card>
          </View>
        )}

        {/* Premium CTA */}
        <View style={styles.premiumSection}>
          <Card style={styles.premiumCard}>
            <View style={styles.premiumBackground}>
              <View style={styles.premiumHeader}>
                <View style={styles.premiumIconContainer}>
                  <Crown size={32} color={colors.text} />
                </View>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>PRO</Text>
                </View>
              </View>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumSubtitle}>
                Unlock advanced analytics, unlimited practice tests, and priority support
              </Text>
              <View style={styles.premiumFeatures}>
                <View style={styles.premiumFeature}>
                  <View style={styles.featureIcon}>
                    <BarChart3 size={16} color={colors.text} />
                  </View>
                  <Text style={styles.featureText}>Advanced Analytics</Text>
                </View>
                <View style={styles.premiumFeature}>
                  <View style={styles.featureIcon}>
                    <Target size={16} color={colors.text} />
                  </View>
                  <Text style={styles.featureText}>Unlimited Practice Tests</Text>
                </View>
                <View style={styles.premiumFeature}>
                  <View style={styles.featureIcon}>
                    <Star size={16} color={colors.text} />
                  </View>
                  <Text style={styles.featureText}>Priority Support</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.premiumButton} 
                activeOpacity={0.8}
                onPress={() => router.push('/premium')}
              >
                <Text style={styles.premiumButtonText}>Get Premium</Text>
                <View style={styles.premiumButtonIcon}>
                  <Crown size={16} color={colors.surface} />
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: colors.text,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.surface,
    opacity: 0.8,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.surface,
    marginTop: 2,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for bottom navigation
  },
  statsCard: {
    marginTop: 24,
    padding: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsTitleText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
  },
  menuSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  menuList: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.text,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: colors.surface,
  },
  premiumIcon: {
    marginLeft: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  menuItemSkeleton: {
    marginBottom: 12,
  },
  activitySection: {
    marginTop: 32,
  },
  activityCard: {
    padding: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  activityDuration: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  premiumSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  premiumCard: {
    overflow: 'hidden',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  premiumBackground: {
    backgroundColor: colors.text,
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
    gap: 16,
    position: 'relative',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  premiumIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  premiumBadgeText: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    letterSpacing: 0.5,
  },
  premiumTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: colors.surface,
    marginBottom: 6,
    textAlign: 'center',
  },
  premiumSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.surface,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    opacity: 0.9,
  },
  premiumFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
    width: '100%',
    paddingHorizontal: 8,
  },
  premiumFeature: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: colors.surface,
    textAlign: 'center',
    lineHeight: 16,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 200,
  },
  premiumButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    letterSpacing: 0.5,
  },
  premiumButtonIcon: {
    transform: [{ rotate: '180deg' }],
  },
});



