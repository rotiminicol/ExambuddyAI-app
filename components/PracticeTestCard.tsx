import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, CircleHelp as HelpCircle, CircleCheck as CheckCircle2, Play } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface PracticeTestCardProps {
  title: string;
  questions: number;
  duration: number;
  difficulty: string;
  subject: string;
  completed: boolean;
  score: number | null;
  color: string;
}

export function PracticeTestCard({ 
  title, 
  questions, 
  duration, 
  difficulty, 
  subject, 
  completed, 
  score, 
  color 
}: PracticeTestCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}>
        <View style={styles.header}>
          <View style={[styles.subjectBadge, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.subjectText, { color }]}>{subject}</Text>
          </View>
          {completed ? (
            <CheckCircle2 size={20} color="#10B981" />
          ) : (
            <Play size={20} color={color} />
          )}
        </View>
        
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <HelpCircle size={16} color="#6B7280" />
            <Text style={styles.detailText}>{questions} questions</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.detailText}>{duration} min</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(difficulty) }]} />
            <Text style={styles.detailText}>{difficulty}</Text>
          </View>
        </View>

        {completed && score !== null && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Your Score:</Text>
            <Text style={[styles.score, { color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }]}>
              {score}%
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subjectText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  scoreLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  score: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});