import { Tabs } from 'expo-router';
import { Chrome as Home, BookOpen, Target, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

interface TabIconProps {
  Icon: any;
  color: string;
  focused: boolean;
  title: string;
}

function TabIcon({ Icon, color, focused, title }: TabIconProps) {
  return (
    <View style={styles.tabIconContainer}>
      <Icon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
      <Text style={[styles.tabLabel, { color, fontWeight: focused ? '600' : '400' }]}>
        {title}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Home} color={color} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          title: 'Study',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={BookOpen} color={color} focused={focused} title="Study" />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Target} color={color} focused={focused} title="Practice" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={User} color={color} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 88,
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});