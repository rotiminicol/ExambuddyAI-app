import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BookOpen, Target, Clock, TrendingUp, Plus, Brain, FileText, Upload, ChartBar as BarChart3, Calendar, Zap, Award, ChevronRight, Bell, Settings, User } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { PerformanceChart } from '@/components/PerformanceChart';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { dbHelpers } from '@/lib/supabase';

interface DashboardData {
  examPreparation: {
    subject: string;
    daysLeft: number;
    progress: number;
  };
  studyProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
  todayGoal: {
    target: number;
    completed: number;
    unit: string;
  };
  weeklyStats: {
    daysCompleted: number;
    totalDays: number;
  };
  weeklyActivity: {
    questions: number;
    flashcards: number;
    minutes: number;
  };
  recentSessions: Array<{
    id: string;
    subject: string;
    duration: number;
    date: string;
    type: string;
  }>;
}

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 20,
      backgroundColor: colors.background,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    headerLeft: {
      flex: 1,
    },
    greeting: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
    userName: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginTop: 2,
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
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 120, // Space for bottom navigation
    },
    mainCard: {
      marginTop: 24,
      padding: 20,
    },
    mainCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    mainCardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    mainCardTitleText: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    progressBadge: {
      backgroundColor: colors.text,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    progressBadgeText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: colors.surface,
    },
    mainCardSubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
      marginBottom: 16,
    },
    mainCardStats: {
      flexDirection: 'row',
      gap: 24,
      marginBottom: 20,
    },
    mainStat: {
      alignItems: 'center',
    },
    mainStatValue: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    mainStatLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
      marginTop: 2,
    },
    mainCardButton: {
      marginTop: 0,
    },
    statsSection: {
      marginTop: 24,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statCard: {
      width: '48%',
      padding: 16,
      gap: 8,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statTitle: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
    statValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
    actionsSection: {
      marginTop: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 16,
    },
    actionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    actionCard: {
      width: '48%',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 8,
    },
    actionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionTitle: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    actionSubtitle: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
      lineHeight: 16,
    },
    chartSection: {
      marginTop: 32,
    },
    chartCard: {
      padding: 20,
    },
    chartHeader: {
      marginBottom: 16,
    },
    chartTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    chartStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    chartStat: {
      alignItems: 'center',
    },
    chartStatValue: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    chartStatLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
      marginTop: 2,
    },
    activitySection: {
      marginTop: 32,
      marginBottom: 24,
    },
    activityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    viewAllText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
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
    emptyState: {
      alignItems: 'center',
      padding: 32,
    },
    emptyTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    emptySubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const data = await dbHelpers.getDashboardData(user.id);
      
      setDashboardData({
        examPreparation: {
          subject: data.examPreparation?.subject || 'Mathematics Final Exam',
          daysLeft: data.examPreparation?.days_left || 12,
          progress: data.examPreparation?.progress || 65,
        },
        studyProgress: {
          completed: data.studyProgress?.completed_days || 15,
          total: data.studyProgress?.total_days || 27,
          percentage: data.studyProgress?.percentage || 55,
        },
        todayGoal: {
          target: 60,
          completed: data.studyProgress?.study_minutes || 45,
          unit: 'minutes',
        },
        weeklyStats: {
          daysCompleted: 5,
          totalDays: 7,
        },
        weeklyActivity: {
          questions: data.weeklyActivity?.questions || 24,
          flashcards: data.weeklyActivity?.flashcards || 18,
          minutes: data.weeklyActivity?.study_minutes || 320,
        },
        recentSessions: data.recentSessions.map(session => ({
          id: session.id,
          subject: session.subject || 'Study Session',
          duration: session.duration || 30,
          date: session.created_at,
          type: session.session_type || 'practice',
        })),
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const quickActions = [
    {
      id: '1',
      title: 'Start Study Session',
      subtitle: 'Jump into your study session',
      icon: BookOpen,
      route: '/study',
      color: '#8B5CF6',
    },
    {
      id: '2',
      title: 'Generate Questions',
      subtitle: 'Create practice tests from your study materials',
      icon: FileText,
      route: '/questions',
      color: '#06B6D4',
    },
    {
      id: '3',
      title: 'Voice Assistant',
      subtitle: 'Talk to get flashcards and explanations',
      icon: Brain,
      route: '/voice',
      color: '#10B981',
    },
    {
      id: '4',
      title: 'Add Materials',
      subtitle: 'Upload or paste your study content',
      icon: Upload,
      route: '/materials',
      color: '#F59E0B',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.userName}>Welcome back!</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarContainer}>
                <User size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <LoadingSkeleton height={120} borderRadius={20} style={styles.mainCard} />
          <View style={styles.statsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} height={100} borderRadius={16} style={styles.statCard} />
            ))}
          </View>
          <LoadingSkeleton height={200} borderRadius={20} style={styles.chartCard} />
          <View style={styles.actionsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} height={120} borderRadius={16} style={styles.actionCard} />
            ))}
          </View>
        </ScrollView>
        
        <NotificationDropdown 
          isVisible={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader 
        title="Dashboard" 
        showNotification 
        showAvatar 
        userProfile={userProfile}
        onNotification={() => setShowNotifications(!showNotifications)}
        onAvatar={() => router.push('/profile')}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Progress Card */}
        {dashboardData && (
          <Card style={styles.mainCard}>
            <View style={styles.mainCardHeader}>
              <View style={styles.mainCardTitle}>
                <BookOpen size={24} color={colors.text} />
                <Text style={styles.mainCardTitleText}>{dashboardData.examPreparation.subject}</Text>
              </View>
              <View style={styles.progressBadge}>
                <Text style={styles.progressBadgeText}>{dashboardData.examPreparation.progress}%</Text>
              </View>
            </View>
            <Text style={styles.mainCardSubtitle}>Your personalized study plan • fast pace</Text>
            <View style={styles.mainCardStats}>
              <View style={styles.mainStat}>
                <Text style={styles.mainStatValue}>{dashboardData.examPreparation.daysLeft}</Text>
                <Text style={styles.mainStatLabel}>days left</Text>
              </View>
              <View style={styles.mainStat}>
                <Text style={styles.mainStatValue}>{dashboardData.studyProgress.completed}/{dashboardData.studyProgress.total}</Text>
                <Text style={styles.mainStatLabel}>days completed</Text>
              </View>
            </View>
            <Button title="View Study Plan" style={styles.mainCardButton} onPress={() => router.push('/study-plan')} />
          </Card>
        )}

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <View style={styles.statHeader}>
                <Clock size={20} color={colors.text} />
                <Text style={styles.statTitle}>Today's Goal</Text>
              </View>
              <Text style={styles.statValue}>{dashboardData?.todayGoal.completed || 0}/{dashboardData?.todayGoal.target || 60}m</Text>
              <Text style={styles.statLabel}>Study time</Text>
            </Card>
            <Card style={styles.statCard}>
              <View style={styles.statHeader}>
                <Calendar size={20} color={colors.text} />
                <Text style={styles.statTitle}>This Week</Text>
              </View>
              <Text style={styles.statValue}>{dashboardData?.weeklyStats.daysCompleted || 0}/{dashboardData?.weeklyStats.totalDays || 7}</Text>
              <Text style={styles.statLabel}>Days completed</Text>
            </Card>
            <Card style={styles.statCard}>
              <View style={styles.statHeader}>
                <Target size={20} color={colors.text} />
                <Text style={styles.statTitle}>Study Progress</Text>
              </View>
              <Text style={styles.statValue}>{dashboardData?.studyProgress.completed || 0}/{dashboardData?.studyProgress.total || 27}</Text>
              <Text style={styles.statLabel}>Days completed</Text>
            </Card>
            <Card style={styles.statCard}>
              <View style={styles.statHeader}>
                <Zap size={20} color={colors.text} />
                <Text style={styles.statTitle}>Streak</Text>
              </View>
              <Text style={styles.statValue}>{userProfile?.stats?.streak || 0}</Text>
              <Text style={styles.statLabel}>Days</Text>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <Card style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Your study activity over the past week</Text>
              <View style={styles.chartStats}>
                <View style={styles.chartStat}>
                  <Text style={styles.chartStatValue}>{dashboardData?.weeklyActivity.questions || 0}</Text>
                  <Text style={styles.chartStatLabel}>Questions</Text>
                </View>
                <View style={styles.chartStat}>
                  <Text style={styles.chartStatValue}>{dashboardData?.weeklyActivity.flashcards || 0}</Text>
                  <Text style={styles.chartStatLabel}>Flashcards</Text>
                </View>
                <View style={styles.chartStat}>
                  <Text style={styles.chartStatValue}>{dashboardData?.weeklyActivity.minutes || 0}</Text>
                  <Text style={styles.chartStatLabel}>Minutes</Text>
                </View>
              </View>
            </View>
            <PerformanceChart />
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.activityCard}>
            {dashboardData?.recentSessions.length ? (
              dashboardData.recentSessions.map((session, index) => (
                <View key={session.id} style={[styles.activityItem, index < dashboardData.recentSessions.length - 1 && styles.activityItemBorder]}>
                  <View style={styles.activityIcon}>
                    <BookOpen size={16} color={colors.text} />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{session.subject}</Text>
                    <Text style={styles.activityTime}>{new Date(session.date).toLocaleDateString()}</Text>
                  </View>
                  <Text style={styles.activityDuration}>{session.duration}m</Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No recent activity</Text>
                <Text style={styles.emptySubtitle}>Start studying to see your activity here</Text>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
      
      <NotificationDropdown 
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaView>
  );
}