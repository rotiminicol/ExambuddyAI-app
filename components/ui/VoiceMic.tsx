import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Mic, MicOff } from 'lucide-react-native';
import { colors } from '@/lib/theme';

interface VoiceMicProps {
  onPress?: () => void;
  size?: number;
}

export function VoiceMic({ onPress, size = 160 }: VoiceMicProps) {
  const [isRecording, setIsRecording] = useState(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  const handlePress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(0.3, { duration: 300 });
    }
    if (onPress) onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulse, { width: size, height: size }, pulseStyle]} />
      <Animated.View style={[styles.micContainer, { width: size, height: size }, animatedStyle]}>
        <TouchableOpacity
          style={[styles.micButton, { width: size * 0.7, height: size * 0.7 }]}
          onPress={handlePress}
          activeOpacity={0.8}>
          {isRecording ? (
            <MicOff size={size * 0.3} color={colors.text} />
          ) : (
            <Mic size={size * 0.3} color={colors.text} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
});
