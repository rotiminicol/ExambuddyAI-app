import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Trophy, Clock, TrendingUp, ChevronRight, Target, BookOpen } from 'lucide-react-native';
import { StudyCard } from '@/components/StudyCard';
import { StatsCard } from '@/components/StatsCard';
import { QuickActionCard } from '@/components/QuickActionCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const recentSubjects = [
    { id: 1, name: 'Mathematics', progress: 75, color: '#8B5CF6', lastStudied: '2 hours ago' },
    { id: 2, name: 'Physics', progress: 60, color: '#06B6D4', lastStudied: '1 day ago' },
    { id: 3, name: 'Chemistry', progress: 45, color: '#F59E0B', lastStudied: '3 days ago' },
  ];

  const stats = [
    { icon: Zap, label: 'Study Streak', value: '12 days', color: '#F59E0B' },
    { icon: Trophy, label: 'Total Score', value: '847', color: '#10B981' },
    { icon: Clock, label: 'Time Today', value: '2h 15m', color: '#8B5CF6' },
    { icon: TrendingUp, label: 'Improvement', value: '+15%', color: '#06B6D4' },
  ];

  const quickActions = [
    { id: 1, title: 'AI Study Plan', subtitle: 'Get personalized recommendations', icon: Zap, color: '#8B5CF6' },
    { id: 2, title: 'Quick Practice', subtitle: 'Random questions', icon: Target, color: '#06B6D4' },
    { id: 3, title: 'Flash Cards', subtitle: 'Review key concepts', icon: BookOpen, color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#06B6D4']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>Ready to ace your exams?</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Studying</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          {recentSubjects.map((subject) => (
            <StudyCard key={subject.id} {...subject} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} {...action} />
            ))}
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#E0E7FF',
    fontFamily: 'Inter-Medium',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#8B5CF6',
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
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
  },
  statsContainer: {
    marginTop: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
});