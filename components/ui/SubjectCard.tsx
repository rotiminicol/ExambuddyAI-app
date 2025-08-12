import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors, radii } from '@/lib/theme';

interface SubjectCardProps {
  name: string;
  chapters: number;
  progress: number;
  icon: string;
  onPress?: () => void;
}

export function SubjectCard({ name, chapters, progress, icon, onPress }: SubjectCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
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
        onPress={onPress}
        activeOpacity={1}>
        <View style={styles.header}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.progress}>{progress}%</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.chapters}>{chapters} chapters</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  progress: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  chapters: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.text,
    borderRadius: 2,
  },
});
