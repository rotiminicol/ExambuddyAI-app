import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, BookOpen, Target, User, Menu } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate } from 'react-native-reanimated';
import { colors } from '@/lib/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon={BookOpen} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon={Target} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon={User} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon icon={Menu} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function AnimatedTabIcon({ icon: Icon, color, focused }: { icon: any; color: string; focused: boolean }) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.4, { damping: 12, stiffness: 180 });
      translateY.value = withSpring(-10, { damping: 12, stiffness: 180 });
      rotation.value = withSpring(360, { damping: 12, stiffness: 180 });
    } else {
      scale.value = withSpring(1, { damping: 12, stiffness: 180 });
      translateY.value = withSpring(0, { damping: 12, stiffness: 180 });
      rotation.value = withSpring(0, { damping: 12, stiffness: 180 });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focused ? 1 : 0, { duration: 250 }),
    transform: [{ scale: withSpring(focused ? 1 : 0.7, { damping: 12, stiffness: 180 }) }],
  }));

  return (
    <View style={styles.iconContainer}>
      <Animated.View style={[styles.activeBackground, backgroundStyle]} />
      <Animated.View style={[styles.iconWrapper, animatedStyle]}>
        <Icon size={24} color={color} strokeWidth={focused ? 3 : 2} />
      </Animated.View>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
  },
  tabBarLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    marginTop: 10,
  },
  tabBarIcon: {
    marginTop: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 56,
    height: 56,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  activeBackground: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
});