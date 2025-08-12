import { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Brain } from 'lucide-react-native';

export default function SplashScreen() {
  const { width } = useWindowDimensions();

  // Curtain opening progress: 0 -> closed, 1 -> open
  const curtainProgress = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9);

  useEffect(() => {
    curtainProgress.value = withTiming(1, { duration: 900 });
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 450 }));
    logoScale.value = withDelay(
      300,
      withSequence(withTiming(1.05, { duration: 350 }), withSpring(1, { damping: 12 }))
    );
  }, []);

  const leftCurtainStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -((width / 2) * curtainProgress.value) }],
  }));

  const rightCurtainStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (width / 2) * curtainProgress.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const handleGetStarted = () => {
    router.replace('/welcome');
  };

  return (
    <View style={styles.container}>
      {/* Content layer */}
      <Animated.View style={[styles.contentContainer, contentStyle]}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <View style={styles.iconContainer}>
            <Brain size={64} color="#000000" strokeWidth={2} />
          </View>
          <Text style={styles.title}>ExamBuddy AI</Text>
          <Text style={styles.subtitle}>Your Smart Study Companion</Text>
        </Animated.View>

        <TouchableOpacity onPress={handleGetStarted} activeOpacity={0.9} style={styles.ctaButton}>
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Curtain overlays */}
      <Animated.View style={[styles.curtain, styles.leftCurtain, leftCurtainStyle]} />
      <Animated.View style={[styles.curtain, styles.rightCurtain, rightCurtainStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    textAlign: 'center',
  },
  ctaButton: {
    marginTop: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  curtain: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#000000',
  },
  leftCurtain: {
    left: 0,
  },
  rightCurtain: {
    right: 0,
  },
});