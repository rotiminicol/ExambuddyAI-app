import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, Moon, Download, CircleHelp as HelpCircle, LogOut, ChevronRight, Award, Clock, Target } from 'lucide-react-native';
import { ProfileStatsCard } from '@/components/ProfileStatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const profileStats = [
    { icon: Award, label: 'Tests Completed', value: '47', color: '#10B981' },
    { icon: Clock, label: 'Study Hours', value: '156', color: '#8B5CF6' },
    { icon: Target, label: 'Accuracy', value: '87%', color: '#06B6D4' },
  ];

  const menuItems = [
    { icon: Bell, label: 'Notifications', hasSwitch: true, value: true },
    { icon: Moon, label: 'Dark Mode', hasSwitch: true, value: false },
    { icon: Download, label: 'Offline Content', hasSwitch: false },
    { icon: HelpCircle, label: 'Help & Support', hasSwitch: false },
    { icon: Settings, label: 'Settings', hasSwitch: false },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#8B5CF6', '#06B6D4']}
          style={styles.profileHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>
            {user?.user_metadata?.full_name || 'User'}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Statistics</Text>
            <View style={styles.statsContainer}>
              {profileStats.map((stat, index) => (
                <ProfileStatsCard key={index} {...stat} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Study Streak</Text>
            <View style={styles.streakCard}>
              <View style={styles.streakHeader}>
                <View style={styles.streakIconContainer}>
                  <Text style={styles.streakIcon}>🔥</Text>
                </View>
                <View style={styles.streakInfo}>
                  <Text style={styles.streakDays}>12 Days</Text>
                  <Text style={styles.streakLabel}>Current Streak</Text>
                </View>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakBadgeText}>Hot!</Text>
                </View>
              </View>
              <Text style={styles.streakMotivation}>
                Keep it up! You're building great study habits.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <item.icon size={24} color="#6B7280" />
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={() => {}}
                      trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <ChevronRight size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#8B5CF6',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E0E7FF',
    marginTop: 4,
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  editProfileText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#FEF3C7',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  streakIcon: {
    fontSize: 24,
  },
  streakInfo: {
    flex: 1,
  },
  streakDays: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
  },
  streakMotivation: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
});