import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Target, 
  Clock, 
  TrendingUp,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Edit,
  Crown,
  Star,
  Zap,
  ChevronRight
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    loadUserProfile();
    loadUserStats();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || 'User',
          avatar: user.user_metadata?.avatar_url || null,
          joinedDate: user.created_at,
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadUserStats = async () => {
    try {
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
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/splash');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Profile</Text>
            <Text style={styles.userName}>Your account & settings</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {userProfile?.avatar ? (
                <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarText}>
                  {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 
                   userProfile?.email ? userProfile.email.charAt(0).toUpperCase() : 'U'}
                </Text>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userProfile?.name || 'User'}</Text>
              <Text style={styles.profileEmail}>{userProfile?.email || 'user@example.com'}</Text>
              <View style={styles.memberSince}>
                <Calendar size={14} color={colors.textMuted} />
                <Text style={styles.memberSinceText}>
                  Member since {userProfile?.joinedDate ? formatDate(userProfile.joinedDate) : 'Unknown'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Stats Grid */}
        {userStats && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Clock size={20} color={colors.text} />
                <Text style={styles.statValue}>{formatStudyTime(userStats.totalStudyTime)}</Text>
                <Text style={styles.statLabel}>Total Study Time</Text>
              </Card>
              <Card style={styles.statCard}>
                <Target size={20} color={colors.text} />
                <Text style={styles.statValue}>{userStats.questionsAnswered}</Text>
                <Text style={styles.statLabel}>Questions Answered</Text>
              </Card>
              <Card style={styles.statCard}>
                <TrendingUp size={20} color={colors.text} />
                <Text style={styles.statValue}>{userStats.accuracy}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </Card>
              <Card style={styles.statCard}>
                <Zap size={20} color={colors.text} />
                <Text style={styles.statValue}>{userStats.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </Card>
            </View>
          </View>
        )}

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Card style={styles.achievementsCard}>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Award size={20} color={colors.text} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>First Study Session</Text>
                <Text style={styles.achievementDescription}>Complete your first study session</Text>
              </View>
              <Star size={16} color={colors.text} />
            </View>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Target size={20} color={colors.text} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Goal Setter</Text>
                <Text style={styles.achievementDescription}>Set your first study goal</Text>
              </View>
              <Star size={16} color={colors.text} />
            </View>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Crown size={20} color={colors.text} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Premium Member</Text>
                <Text style={styles.achievementDescription}>Upgrade to premium</Text>
              </View>
              <View style={styles.lockedIcon}>
                <Text style={styles.lockedText}>🔒</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsList}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Settings size={20} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>App Settings</Text>
              <ChevronRight size={20} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Bell size={20} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>Notifications</Text>
              <ChevronRight size={20} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <HelpCircle size={20} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>Help & Support</Text>
              <ChevronRight size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutSection}>
          <Button 
            title="Sign Out" 
            variant="outline" 
            onPress={handleSignOut}
            style={styles.signOutButton}
          />
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for bottom navigation
  },
  profileCard: {
    marginTop: 24,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 8,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberSinceText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
  },
  achievementsSection: {
    marginTop: 32,
  },
  achievementsCard: {
    padding: 0,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 2,
  },
  lockedIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedText: {
    fontSize: 12,
  },
  actionsSection: {
    marginTop: 32,
  },
  actionsList: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  signOutSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  signOutButton: {
    borderColor: colors.text,
  },
});