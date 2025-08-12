import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withSequence, withSpring, withRepeat } from 'react-native-reanimated';
import { Brain, ArrowRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const headingOpacity = useSharedValue(0);
  const headingY = useSharedValue(24);
  const heroScale = useSharedValue(0.9);
  const ctaOpacity = useSharedValue(0);
  const ctaY = useSharedValue(24);

  React.useEffect(() => {
    headingOpacity.value = withTiming(1, { duration: 500 });
    headingY.value = withTiming(0, { duration: 500 });
    heroScale.value = withDelay(
      150,
      withSequence(withTiming(1.04, { duration: 300 }), withSpring(1, { damping: 12 }))
    );
    ctaOpacity.value = withDelay(350, withTiming(1, { duration: 450 }));
    ctaY.value = withDelay(350, withTiming(0, { duration: 450 }));
  }, []);

  const headingStyle = useAnimatedStyle(() => ({
    opacity: headingOpacity.value,
    transform: [{ translateY: headingY.value }],
  }));

  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    opacity: ctaOpacity.value,
    transform: [{ translateY: ctaY.value }],
  }));

  const slides = [
    {
      key: 'welcome',
      title: 'Welcome',
      subtitle: "we're glad that you are here",
      cta: "Let’s get started",
    },
    {
      key: 'discover',
      title: 'Discover Your Study Path',
      subtitle: 'Tips and tricks to build strong fundamentals',
      cta: 'Continue',
    },
    {
      key: 'community',
      title: 'Connect With Other Learners',
      subtitle: 'Join a community and learn together',
      cta: 'Create Account',
    },
  ];

  const handlePrimary = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
    } else {
      router.push('/auth/signup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background carousel fills screen */}
      <Animated.View style={[styles.carouselWrap, heroStyle]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            if (newIndex !== index) setIndex(newIndex);
          }}
          scrollEventThrottle={16}
        >
          {slides.map((s, i) => (
            <View key={s.key} style={[styles.slide, { width }]}> 
              <SlideArt index={i} />
          </View>
          ))}
        </ScrollView>
        </Animated.View>

      {/* Header overlay */}
      <Animated.View style={[styles.headerWrap, headingStyle]}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextCol}>
            <Text style={styles.welcome}>{slides[index].title}</Text>
            <Text style={styles.tagline}>{slides[index].subtitle}</Text>
              </View>
          <View style={styles.headerBadge}>
            <Brain size={40} color="#000000" strokeWidth={2} />
              </View>
            </View>
        </Animated.View>

      {/* Bottom action bar */}
      <Animated.View style={[styles.bottomBar, ctaStyle]}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.bottomActions}>
          <TouchableOpacity onPress={() => router.push('/auth/signin')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.getStarted} onPress={handlePrimary}>
            <Text style={styles.getStartedText}>{slides[index].cta}</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        </Animated.View>
    </SafeAreaView>
  );
}

function SlideArt({ index }: { index: number }) {
  // Shared animation for shapes
  const pulse = useSharedValue(0);
  const drift = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 1600 }), -1, true);
    drift.value = withRepeat(withTiming(1, { duration: 2600 }), -1, true);
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 0.95 + pulse.value * 0.05 },
      { translateY: -6 + pulse.value * 12 },
    ],
    opacity: 0.15 + pulse.value * 0.1,
  }));

  const squareStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${-4 + pulse.value * 8}deg` },
      { translateX: -10 + pulse.value * 20 },
    ],
    opacity: 0.1 + pulse.value * 0.15,
  }));

  const stripesStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -20 + drift.value * 40 },
    ],
    opacity: 0.12,
  }));

  return (
    <View style={styles.artContainer}>
      {/* Soft stripes background */}
      <Animated.View style={[styles.stripes, stripesStyle]} />

      {/* Big circle */}
      <Animated.View style={[styles.artCircleLarge, circleStyle]} />
      {/* Small circle */}
      <Animated.View style={[styles.artCircleSmall, circleStyle]} />

      {/* Tilted square/diamond */}
      <Animated.View style={[styles.artSquare, squareStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerWrap: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  welcome: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    color: '#111111',
    letterSpacing: 0.2,
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTextCol: {
    flexShrink: 1,
    paddingRight: 12,
  },
  headerBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  carouselWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  slide: {
    flex: 1,
  },
  hero: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  heroBadge: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  artContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stripes: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  artCircleLarge: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#111111',
    opacity: 0.08,
    right: -30,
    bottom: -20,
  },
  artCircleSmall: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#000000',
    opacity: 0.06,
    right: 40,
    bottom: 70,
  },
  artSquare: {
    position: 'absolute',
    width: 160,
    height: 160,
    backgroundColor: '#111111',
    opacity: 0.06,
    left: -30,
    top: 40,
    transform: [{ rotate: '45deg' }],
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  getStarted: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    minWidth: 170,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  signInText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111111',
    textDecorationLine: 'underline',
  },
  dots: {
    marginBottom: 10,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 18,
    borderRadius: 3,
    backgroundColor: '#111111',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
});