import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Languages, Volume2, VolumeX, Smartphone, Check, Globe, Bell, Zap, Settings } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪'
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹'
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹'
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳'
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵'
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷'
    }
  ];

  const soundSettings = [
    {
      id: 'notifications',
      title: 'Notification Sounds',
      description: 'Play sounds for notifications and alerts',
      icon: Bell
    },
    {
      id: 'timer',
      title: 'Timer Sounds',
      description: 'Audio cues for study timer completion',
      icon: Smartphone
    },
    {
      id: 'interactions',
      title: 'Interaction Sounds',
      description: 'Feedback sounds for button taps and actions',
      icon: Zap
    }
  ];

  const hapticSettings = [
    {
      id: 'buttons',
      title: 'Button Feedback',
      description: 'Haptic feedback when tapping buttons',
      icon: Smartphone
    },
    {
      id: 'switches',
      title: 'Switch Feedback',
      description: 'Haptic feedback when toggling switches',
      icon: Settings
    },
    {
      id: 'gestures',
      title: 'Gesture Feedback',
      description: 'Haptic feedback for swipe gestures',
      icon: Zap
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Language & Sound</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Customize your app language and audio preferences</Text>

        {/* Language Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <Card style={styles.languageCard}>
            <View style={styles.languageHeader}>
              <Globe size={20} color={colors.text} />
              <Text style={styles.languageHeaderText}>Select your preferred language</Text>
            </View>
            <View style={styles.languagesList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    selectedLanguage === language.code && styles.languageItemActive
                  ]}
                  onPress={() => setSelectedLanguage(language.code)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageFlag}>{language.flag}</Text>
                    <View style={styles.languageDetails}>
                      <Text style={styles.languageName}>{language.name}</Text>
                      <Text style={styles.languageNative}>{language.nativeName}</Text>
                    </View>
                  </View>
                  {selectedLanguage === language.code && (
                    <Check size={20} color={colors.text} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>

        {/* Sound Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound Settings</Text>
          <Card style={styles.soundCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Enable Sounds</Text>
                <Text style={styles.settingSubtitle}>Turn on all app sounds and audio feedback</Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={soundEnabled ? colors.surface : colors.textMuted}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto-play Audio</Text>
                <Text style={styles.settingSubtitle}>Automatically play audio in study materials</Text>
              </View>
              <Switch
                value={autoPlayAudio}
                onValueChange={setAutoPlayAudio}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={autoPlayAudio ? colors.surface : colors.textMuted}
              />
            </View>
          </Card>

          {/* Sound Categories */}
          <View style={styles.soundCategories}>
            {soundSettings.map((setting) => (
              <Card key={setting.id} style={styles.soundCategoryCard}>
                <View style={styles.soundCategoryHeader}>
                  <View style={styles.soundCategoryIcon}>
                    <setting.icon size={20} color={colors.text} />
                  </View>
                  <View style={styles.soundCategoryInfo}>
                    <Text style={styles.soundCategoryTitle}>{setting.title}</Text>
                    <Text style={styles.soundCategoryDescription}>{setting.description}</Text>
                  </View>
                  <Switch
                    value={soundEnabled}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border, true: colors.text }}
                    thumbColor={soundEnabled ? colors.surface : colors.textMuted}
                  />
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Haptic Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haptic Feedback</Text>
          <Card style={styles.hapticCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Enable Haptics</Text>
                <Text style={styles.settingSubtitle}>Vibrate device for tactile feedback</Text>
              </View>
              <Switch
                value={hapticEnabled}
                onValueChange={setHapticEnabled}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={hapticEnabled ? colors.surface : colors.textMuted}
              />
            </View>
          </Card>

          {/* Haptic Categories */}
          <View style={styles.hapticCategories}>
            {hapticSettings.map((setting) => (
              <Card key={setting.id} style={styles.hapticCategoryCard}>
                <View style={styles.hapticCategoryHeader}>
                  <View style={styles.hapticCategoryIcon}>
                    <setting.icon size={20} color={colors.text} />
                  </View>
                  <View style={styles.hapticCategoryInfo}>
                    <Text style={styles.hapticCategoryTitle}>{setting.title}</Text>
                    <Text style={styles.hapticCategoryDescription}>{setting.description}</Text>
                  </View>
                  <Switch
                    value={hapticEnabled}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border, true: colors.text }}
                    thumbColor={hapticEnabled ? colors.surface : colors.textMuted}
                  />
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Card style={styles.notificationsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive study reminders and updates</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={notificationsEnabled ? colors.surface : colors.textMuted}
              />
            </View>
          </Card>
        </View>

        {/* Test Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Your Settings</Text>
          <Card style={styles.testCard}>
            <Text style={styles.testTitle}>Try out your settings</Text>
            <View style={styles.testButtons}>
              <TouchableOpacity style={styles.testButton}>
                <Volume2 size={20} color={colors.text} />
                <Text style={styles.testButtonText}>Test Sound</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.testButton}>
                <Smartphone size={20} color={colors.text} />
                <Text style={styles.testButtonText}>Test Haptic</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Apply Button */}
        <View style={styles.applySection}>
          <Button 
            title="Save Changes" 
            style={styles.applyButton}
            onPress={() => {
              // Save language and sound settings
              console.log('Settings saved:', {
                language: selectedLanguage,
                soundEnabled,
                hapticEnabled,
                notificationsEnabled,
                autoPlayAudio
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  languageCard: {
    padding: 0,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageHeaderText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  languagesList: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageItemActive: {
    backgroundColor: colors.text + '05',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageDetails: {
    gap: 2,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  languageNative: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  soundCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  soundCategories: {
    gap: 12,
    marginTop: 16,
  },
  soundCategoryCard: {
    padding: 16,
  },
  soundCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  soundCategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundCategoryInfo: {
    flex: 1,
  },
  soundCategoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  soundCategoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  hapticCard: {
    padding: 0,
  },
  hapticCategories: {
    gap: 12,
    marginTop: 16,
  },
  hapticCategoryCard: {
    padding: 16,
  },
  hapticCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  hapticCategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hapticCategoryInfo: {
    flex: 1,
  },
  hapticCategoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  hapticCategoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  notificationsCard: {
    padding: 0,
  },
  testCard: {
    padding: 20,
  },
  testTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 16,
  },
  testButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  testButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  testButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  applySection: {
    marginBottom: 32,
  },
  applyButton: {
    width: '100%',
  },
});
