import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export function PerformanceChart() {
  const data = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 68 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 91 },
    { day: 'Sat', score: 88 },
    { day: 'Sun', score: 94 },
  ];

  const maxScore = Math.max(...data.map(d => d.score));
  const chartWidth = width - 80;
  const barWidth = (chartWidth - 48) / data.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>This Week</Text>
          <View style={styles.scoreContainer}>
            <TrendingUp size={16} color="#10B981" />
            <Text style={styles.avgScore}>Avg: 80.4%</Text>
          </View>
        </View>
        <View style={styles.improvement}>
          <Text style={styles.improvementValue}>+12%</Text>
          <Text style={styles.improvementLabel}>vs last week</Text>
        </View>
      </View>
      
      <View style={styles.chart}>
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar,
                    { 
                      height: (item.score / maxScore) * 80,
                      backgroundColor: item.score >= 80 ? '#10B981' : item.score >= 60 ? '#F59E0B' : '#EF4444'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
              <Text style={styles.scoreLabel}>{item.score}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avgScore: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  improvement: {
    alignItems: 'flex-end',
  },
  improvementValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  improvementLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  chart: {
    height: 120,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    minHeight: 8,
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
});