import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Moon, Sun, Smartphone, Volume2, Zap } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { colors, themeMode, setThemeMode, isDark } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Light theme' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme' },
    { id: 'system', label: 'System', icon: Smartphone, description: 'Follow system setting' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.text }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.surface }]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Settings */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Choose your preferred theme
          </Text>
          
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = themeMode === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.themeOption,
                    { 
                      backgroundColor: isSelected ? colors.text : colors.border,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => setThemeMode(option.id as any)}
                >
                  <Icon 
                    size={20} 
                    color={isSelected ? colors.surface : colors.text} 
                  />
                  <View style={styles.themeOptionContent}>
                    <Text style={[
                      styles.themeOptionLabel, 
                      { color: isSelected ? colors.surface : colors.text }
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[
                      styles.themeOptionDescription, 
                      { color: isSelected ? colors.surface : colors.textMuted }
                    ]}>
                      {option.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: colors.surface }]} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Notification Settings */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Manage your notification preferences
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.text} />
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Push Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  Receive study reminders and updates
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.text }}
              thumbColor={notifications ? colors.surface : colors.textMuted}
            />
          </View>
        </Card>

        {/* Sound & Haptics */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Sound & Haptics</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Customize audio and vibration settings
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Volume2 size={20} color={colors.text} />
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Sound Effects
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  Play sounds for interactions
                </Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: colors.border, true: colors.text }}
              thumbColor={soundEnabled ? colors.surface : colors.textMuted}
            />
          </View>

          <View style={[styles.settingRow, styles.settingRowBorder, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Zap size={20} color={colors.text} />
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Haptic Feedback
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  Vibrate on interactions
                </Text>
              </View>
            </View>
            <Switch
              value={hapticEnabled}
              onValueChange={setHapticEnabled}
              trackColor={{ false: colors.border, true: colors.text }}
              thumbColor={hapticEnabled ? colors.surface : colors.textMuted}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 20,
  },
  themeOptions: {
    gap: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    position: 'relative',
  },
  themeOptionContent: {
    flex: 1,
    marginLeft: 12,
  },
  themeOptionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  themeOptionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingContent: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});


