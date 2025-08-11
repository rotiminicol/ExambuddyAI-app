import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Clock } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface StudyCardProps {
  name: string;
  progress: number;
  color: string;
  lastStudied: string;
}

export function StudyCard({ name, progress, color, lastStudied }: StudyCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
              <View style={[styles.icon, { backgroundColor: color }]} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.lastStudiedContainer}>
                <Clock size={12} color="#9CA3AF" />
                <Text style={styles.lastStudied}>{lastStudied}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#D1D5DB" />
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressPercentage}>{progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%`, backgroundColor: color }
                ]} 
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  lastStudiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lastStudied: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});