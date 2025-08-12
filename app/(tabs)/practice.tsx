import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Target, Clock, TrendingUp, BookOpen } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';

export default function PracticeScreen() {
  const { colors } = useTheme();
  
  const stats = [
    { icon: Target, label: 'Questions Answered', value: '847', color: colors.text },
    { icon: Clock, label: 'Time Spent', value: '12h 30m', color: colors.text },
    { icon: TrendingUp, label: 'Accuracy', value: '78%', color: colors.text },
    { icon: BookOpen, label: 'Topics Covered', value: '24', color: colors.text },
  ];

  const recentTests = [
    { id: 1, title: 'Algebra Basics', score: 85, questions: 20, time: '15m' },
    { id: 2, title: 'Geometry Quiz', score: 92, questions: 15, time: '12m' },
    { id: 3, title: 'Calculus Review', score: 78, questions: 25, time: '22m' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Practice" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <stat.icon size={24} color={colors.text} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Tests</Text>
          {recentTests.map((test) => (
            <Card key={test.id} style={styles.testCard}>
              <View style={styles.testHeader}>
                <Text style={styles.testTitle}>{test.title}</Text>
                <Text style={styles.testScore}>{test.score}%</Text>
              </View>
              <View style={styles.testDetails}>
                <Text style={styles.testDetail}>{test.questions} questions</Text>
                <Text style={styles.testDetail}>{test.time}</Text>
              </View>
            </Card>
          ))}
        </View>

        <Button title="Start New Practice" style={{ marginTop: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { 
    padding: 24,
    paddingBottom: 140, // Space for bottom navigation
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 12,
  },
  testCard: {
    marginBottom: 12,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  testTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  testScore: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  testDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  testDetail: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
});