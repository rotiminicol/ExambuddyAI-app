import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { Brain, BookOpen, Target, TrendingUp } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Get personalized study plans and instant help',
    color: '#8B5CF6',
  },
  {
    icon: BookOpen,
    title: 'Smart Study Materials',
    description: 'Organize and review your content efficiently',
    color: '#06B6D4',
  },
  {
    icon: Target,
    title: 'Practice Tests',
    description: 'Test your knowledge with adaptive quizzes',
    color: '#F59E0B',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time',
    color: '#10B981',
  },
];

export default function WelcomeScreen() {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const featuresOpacity = useSharedValue(0);
  const featuresTranslateY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [{ translateY: featuresTranslateY.value }],
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  React.useEffect(() => {
    titleOpacity.value = withSpring(1, { duration: 800 });
    titleTranslateY.value = withSpring(0, { duration: 800 });
    
    featuresOpacity.value = withDelay(300, withSpring(1, { duration: 800 }));
    featuresTranslateY.value = withDelay(300, withSpring(0, { duration: 800 }));
    
    buttonsOpacity.value = withDelay(600, withSpring(1, { duration: 800 }));
    buttonsTranslateY.value = withDelay(600, withSpring(0, { duration: 800 }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#06B6D4']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Animated.View style={[styles.headerContent, titleAnimatedStyle]}>
          <View style={styles.logoContainer}>
            <Brain size={48} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text style={styles.title}>Welcome to{'\n'}ExamBuddy AI</Text>
          <Text style={styles.subtitle}>
            Your intelligent study companion that adapts to your learning style
          </Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View style={[styles.featuresContainer, featuresAnimatedStyle]}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <feature.icon size={24} color={feature.color} strokeWidth={2.5} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.buttonsContainer, buttonsAnimatedStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/auth/signup')}>
            <LinearGradient
              colors={['#8B5CF6', '#06B6D4']}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/signin')}>
            <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    paddingVertical: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    minHeight: height * 0.4,
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  featuresContainer: {
    paddingTop: 40,
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    lineHeight: 20,
  },
  buttonsContainer: {
    paddingBottom: 32,
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
  },
});