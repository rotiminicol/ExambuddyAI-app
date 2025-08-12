import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Share2, BarChart3, Target, Award, Users, Settings } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function ShareScreen() {
  const [autoShare, setAutoShare] = useState(false);
  const [shareAchievements, setShareAchievements] = useState(true);

  const achievements = [
    {
      id: '1',
      title: 'Study Streak',
      description: '7 days in a row',
      icon: '🔥',
      date: '2 hours ago'
    },
    {
      id: '2',
      title: 'Perfect Score',
      description: '100% on Math Quiz',
      icon: '🎯',
      date: '1 day ago'
    },
    {
      id: '3',
      title: 'Study Goal Reached',
      description: 'Completed 5 hours this week',
      icon: '⭐',
      date: '3 days ago'
    },
  ];

  const stats = {
    totalStudyTime: '24h 30m',
    questionsAnswered: 156,
    accuracy: 87,
    streak: 7,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Share Progress</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Share your learning achievements with friends and family</Text>

        {/* Quick Share Stats */}
        <Card style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <BarChart3 size={24} color={colors.text} />
            <Text style={styles.statsTitle}>This Week's Progress</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalStudyTime}</Text>
              <Text style={styles.statLabel}>Study Time</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.questionsAnswered}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.accuracy}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
          <Button title="Share Progress" style={{ marginTop: 16 }} />
        </Card>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Share Settings</Text>
          <Card style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto-share achievements</Text>
                <Text style={styles.settingSubtitle}>Automatically share when you reach milestones</Text>
              </View>
              <Switch
                value={autoShare}
                onValueChange={setAutoShare}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={autoShare ? colors.surface : colors.textMuted}
              />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Share achievements</Text>
                <Text style={styles.settingSubtitle}>Include achievement badges in shares</Text>
              </View>
              <Switch
                value={shareAchievements}
                onValueChange={setShareAchievements}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={shareAchievements ? colors.surface : colors.textMuted}
              />
            </View>
          </Card>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <Card key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementHeader}>
                  <View style={styles.achievementIcon}>
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                  <TouchableOpacity style={styles.shareButton}>
                    <Share2 size={16} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Share Options */}
        <View style={styles.shareOptionsSection}>
          <Text style={styles.sectionTitle}>Share Options</Text>
          <View style={styles.shareOptionsGrid}>
            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareOptionIcon}>
                <Users size={24} color={colors.text} />
              </View>
              <Text style={styles.shareOptionTitle}>Social Media</Text>
              <Text style={styles.shareOptionSubtitle}>Share to Instagram, Twitter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareOptionIcon}>
                <Award size={24} color={colors.text} />
              </View>
              <Text style={styles.shareOptionTitle}>Achievement Card</Text>
              <Text style={styles.shareOptionSubtitle}>Create custom achievement cards</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareOptionIcon}>
                <Target size={24} color={colors.text} />
              </View>
              <Text style={styles.shareOptionTitle}>Progress Report</Text>
              <Text style={styles.shareOptionSubtitle}>Detailed weekly/monthly report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareOptionIcon}>
                <BarChart3 size={24} color={colors.text} />
              </View>
              <Text style={styles.shareOptionTitle}>Study Stats</Text>
              <Text style={styles.shareOptionSubtitle}>Share your study statistics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Notice */}
        <Card style={styles.privacyCard}>
          <View style={styles.privacyHeader}>
            <Text style={styles.privacyTitle}>Privacy & Control</Text>
          </View>
          <Text style={styles.privacyText}>
            You have full control over what you share. Only share what you're comfortable with, and you can always change your settings later.
          </Text>
        </Card>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 24,
    marginBottom: 24,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
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
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  settingsCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  achievementsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    padding: 16,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  shareOptionsSection: {
    marginBottom: 24,
  },
  shareOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shareOption: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  shareOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareOptionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  shareOptionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  privacyCard: {
    marginBottom: 24,
  },
  privacyHeader: {
    marginBottom: 8,
  },
  privacyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  privacyText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
});

