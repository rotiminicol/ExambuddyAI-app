import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface SubjectCardProps {
  name: string;
  chapters: number;
  progress: number;
  color: string;
  icon: string;
}

export function SubjectCard({ name, chapters, progress, color, icon }: SubjectCardProps) {
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
              <Text style={styles.icon}>{icon}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.chapters}>{chapters} chapters</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={[styles.progressText, { color }]}>{progress}%</Text>
              <ChevronRight size={20} color="#D1D5DB" />
            </View>
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
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
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
  chapters: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
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