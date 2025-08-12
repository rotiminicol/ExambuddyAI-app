import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, BarChart3, TrendingUp, Target, Clock, Calendar, Award } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';
import { supabase } from '@/lib/supabase';

export default function ProgressScreen() {
  const [progressData, setProgressData] = useState<any>(null);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .single();

      if (!statsError && statsData) {
        setProgressData({
          totalStudyTime: statsData.total_study_time || 0,
          questionsAnswered: statsData.questions_answered || 0,
          accuracy: statsData.accuracy || 0,
          streak: statsData.streak || 0,
          achievements: statsData.achievements || 0,
        });
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text style={styles.title}>Progress Analytics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Track your learning journey and performance</Text>

        {/* Overview Stats */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Clock size={24} color={colors.text} />
              <Text style={styles.statValue}>{formatStudyTime(progressData?.totalStudyTime || 0)}</Text>
              <Text style={styles.statLabel}>Total Study Time</Text>
            </Card>
            <Card style={styles.statCard}>
              <Target size={24} color={colors.text} />
              <Text style={styles.statValue}>{progressData?.questionsAnswered || 0}</Text>
              <Text style={styles.statLabel}>Questions Answered</Text>
            </Card>
            <Card style={styles.statCard}>
              <TrendingUp size={24} color={colors.text} />
              <Text style={styles.statValue}>{progressData?.accuracy || 0}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </Card>
            <Card style={styles.statCard}>
              <Award size={24} color={colors.text} />
              <Text style={styles.statValue}>{progressData?.streak || 0}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </Card>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.weeklySection}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <Card style={styles.weeklyCard}>
            <View style={styles.weeklyHeader}>
              <Text style={styles.weeklyTitle}>This Week's Activity</Text>
              <Text style={styles.weeklySubtitle}>Your study activity over the past 7 days</Text>
            </View>
            <View style={styles.weeklyStats}>
              <View style={styles.weeklyStat}>
                <Text style={styles.weeklyStatValue}>5</Text>
                <Text style={styles.weeklyStatLabel}>Study Days</Text>
              </View>
              <View style={styles.weeklyStat}>
                <Text style={styles.weeklyStatValue}>24</Text>
                <Text style={styles.weeklyStatLabel}>Questions</Text>
              </View>
              <View style={styles.weeklyStat}>
                <Text style={styles.weeklyStatValue}>320m</Text>
                <Text style={styles.weeklyStatLabel}>Study Time</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Performance Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          <Card style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Accuracy Over Time</Text>
              <Text style={styles.chartSubtitle}>Your performance in the last 30 days</Text>
            </View>
            <View style={styles.chartPlaceholder}>
              <BarChart3 size={48} color={colors.textMuted} />
              <Text style={styles.chartPlaceholderText}>Chart visualization coming soon</Text>
            </View>
          </Card>
        </View>

        {/* Goals Progress */}
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Goals Progress</Text>
          <Card style={styles.goalsCard}>
            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Daily Study Goal</Text>
                <Text style={styles.goalDescription}>Study for 60 minutes daily</Text>
              </View>
              <View style={styles.goalProgress}>
                <Text style={styles.goalProgressText}>5/7 days</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '71%' }]} />
                </View>
              </View>
            </View>
            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Weekly Questions</Text>
                <Text style={styles.goalDescription}>Answer 50 questions this week</Text>
              </View>
              <View style={styles.goalProgress}>
                <Text style={styles.goalProgressText}>24/50</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '48%' }]} />
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Export Data */}
        <View style={styles.exportSection}>
          <Button title="Export Progress Report" variant="outline" />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.surface,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for bottom navigation
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 24,
    marginBottom: 24,
  },
  overviewSection: {
    marginBottom: 32,
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
    padding: 20,
    gap: 8,
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
    textAlign: 'center',
  },
  weeklySection: {
    marginBottom: 32,
  },
  weeklyCard: {
    padding: 20,
  },
  weeklyHeader: {
    marginBottom: 16,
  },
  weeklyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  weeklySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weeklyStat: {
    alignItems: 'center',
  },
  weeklyStatValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  weeklyStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 4,
  },
  chartSection: {
    marginBottom: 32,
  },
  chartCard: {
    padding: 20,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  chartPlaceholder: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.border,
    borderRadius: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 12,
  },
  goalsSection: {
    marginBottom: 32,
  },
  goalsCard: {
    padding: 0,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  goalProgress: {
    alignItems: 'flex-end',
    gap: 8,
  },
  goalProgressText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  progressBar: {
    width: 80,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: 3,
  },
  exportSection: {
    marginBottom: 24,
  },
});


