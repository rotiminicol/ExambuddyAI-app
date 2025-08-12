import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Calendar, Target, Clock } from 'lucide-react-native';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function StudyPlanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Study Plan</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Your personalized learning roadmap</Text>

        <Card style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <Calendar size={20} color={colors.text} />
            <Text style={styles.todayTitle}>Today's Tasks</Text>
          </View>
          <View style={styles.taskList}>
            <View style={styles.taskItem}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Complete Math Chapter 5</Text>
                <Text style={styles.taskTime}>30 minutes</Text>
              </View>
              <View style={styles.taskStatus} />
            </View>
            <View style={styles.taskItem}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Review Physics Formulas</Text>
                <Text style={styles.taskTime}>20 minutes</Text>
              </View>
              <View style={[styles.taskStatus, styles.taskCompleted]} />
            </View>
          </View>
        </Card>

        <Card style={styles.weeklyCard}>
          <View style={styles.weeklyHeader}>
            <Target size={20} color={colors.text} />
            <Text style={styles.weeklyTitle}>This Week's Goals</Text>
          </View>
          <View style={styles.goalsList}>
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>Complete 5 practice tests</Text>
              <Text style={styles.goalProgress}>3/5 completed</Text>
            </View>
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>Study for 2 hours daily</Text>
              <Text style={styles.goalProgress}>5/7 days completed</Text>
            </View>
          </View>
        </Card>

        <Button title="Create New Plan" style={{ marginTop: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 24,
  },
  todayCard: {
    marginBottom: 24,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  todayTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  taskList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  taskTime: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 2,
  },
  taskStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  taskCompleted: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  weeklyCard: {
    marginBottom: 24,
  },
  weeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  weeklyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  goalsList: {
    gap: 12,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  goalText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  goalProgress: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
});


