import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Calendar, Trophy, Target } from 'lucide-react-native';
import { PracticeTestCard } from '@/components/PracticeTestCard';
import { PerformanceChart } from '@/components/PerformanceChart';

export default function PracticeScreen() {
  const practiceTests = [
    { 
      id: 1, 
      title: 'Mathematics Mock Test 1', 
      questions: 50, 
      duration: 120, 
      difficulty: 'Medium',
      subject: 'Mathematics',
      completed: false,
      score: null,
      color: '#8B5CF6'
    },
    { 
      id: 2, 
      title: 'Physics Chapter 5 Quiz', 
      questions: 25, 
      duration: 45, 
      difficulty: 'Easy',
      subject: 'Physics',
      completed: true,
      score: 85,
      color: '#06B6D4'
    },
    { 
      id: 3, 
      title: 'Chemistry Organic Compounds', 
      questions: 30, 
      duration: 60, 
      difficulty: 'Hard',
      subject: 'Chemistry',
      completed: false,
      score: null,
      color: '#F59E0B'
    },
    { 
      id: 4, 
      title: 'Biology Cell Structure', 
      questions: 20, 
      duration: 30, 
      difficulty: 'Medium',
      subject: 'Biology',
      completed: true,
      score: 92,
      color: '#10B981'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Tests</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <PerformanceChart />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Tests</Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <Calendar size={20} color="#8B5CF6" />
              <Text style={styles.scheduleText}>Schedule</Text>
            </TouchableOpacity>
          </View>
          
          {practiceTests.map((test) => (
            <PracticeTestCard key={test.id} {...test} />
          ))}
        </View>

        <View style={styles.achievementsSection}>
          <View style={styles.achievementHeader}>
            <Trophy size={24} color="#F59E0B" />
            <Text style={styles.achievementTitle}>Recent Achievements</Text>
          </View>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <Target size={20} color="#10B981" />
              <Text style={styles.achievementText}>Completed 5 tests in a row!</Text>
            </View>
            <View style={styles.achievementItem}>
              <Trophy size={20} color="#F59E0B" />
              <Text style={styles.achievementText}>Scored 90+ on Biology test</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scheduleText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
  },
  achievementsSection: {
    marginTop: 32,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  achievementTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  achievementText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
    flex: 1,
  },
});