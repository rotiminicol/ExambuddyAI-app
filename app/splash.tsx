import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { Brain } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function SplashScreen() {
  const { user, loading } = useAuth();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const animationComplete = useSharedValue(false);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleNavigationAfterAnimation = () => {
    animationComplete.value = true;
  };

  useEffect(() => {
    // Start animations
    scale.value = withSequence(
      withSpring(1.2, { duration: 800 }),
      withSpring(1, { duration: 400 }, () => {
        runOnJS(handleNavigationAfterAnimation)();
      })
    );
    opacity.value = withSpring(1, { duration: 800 });
  }, []);

  useEffect(() => {
    if (!loading && animationComplete.value) {
      const timer = setTimeout(() => {
        try {
          if (user) {
            router.replace('/(tabs)');
          } else {
            router.replace('/welcome');
          }
        } catch (error) {
          console.log('Navigation error:', error);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [user, loading, animationComplete.value]);

  useEffect(() => {
    return () => {
      // Cleanup function to prevent state updates on unmounted component
      if (animationComplete.value) {
        animationComplete.value = false;
      }
    };
  }, []);

  return (
    <LinearGradient
      colors={['#8B5CF6', '#06B6D4']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.iconContainer}>
          <Brain size={64} color="#FFFFFF" strokeWidth={2} />
        </View>
        <Animated.Text style={styles.title}>ExamBuddy AI</Animated.Text>
        <Animated.Text style={styles.subtitle}>Your Smart Study Companion</Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E0E7FF',
    textAlign: 'center',
  },
});