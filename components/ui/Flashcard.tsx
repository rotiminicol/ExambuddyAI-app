import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { colors, radii } from '@/lib/theme';

const { width } = Dimensions.get('window');

interface FlashcardProps {
  front: string;
  back: string;
  onFlip?: () => void;
}

export function Flashcard({ front, back, onFlip }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipRotation = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180]);
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360]);
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
      ],
    };
  });

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 180;
    flipRotation.value = withTiming(toValue, { duration: 300 }, () => {
      runOnJS(setIsFlipped)(!isFlipped);
      if (onFlip) runOnJS(onFlip)();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFlip} activeOpacity={1}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
            <Text style={styles.cardText}>{front}</Text>
            <Text style={styles.hint}>Tap to flip</Text>
          </Animated.View>
          <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
            <Text style={styles.cardText}>{back}</Text>
            <Text style={styles.hint}>Tap to flip back</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cardContainer: {
    width: width - 48,
    height: 300,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backfaceVisibility: 'hidden',
  },
  frontCard: {
    backgroundColor: colors.surface,
  },
  backCard: {
    backgroundColor: colors.border,
  },
  cardText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 26,
  },
  hint: {
    position: 'absolute',
    bottom: 16,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
});
