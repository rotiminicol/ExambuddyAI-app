import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Palette, Moon, Sun, Smartphone, Monitor, Check, Eye, EyeOff, Layout, Type } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function ThemeScreen() {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [compactMode, setCompactMode] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light',
      description: 'Clean and bright interface',
      icon: Sun,
      color: '#F59E0B'
    },
    {
      id: 'dark',
      name: 'Dark',
      description: 'Easy on the eyes',
      icon: Moon,
      color: '#8B5CF6'
    },
    {
      id: 'auto',
      name: 'Auto',
      description: 'Follows system settings',
      icon: Smartphone,
      color: '#10B981'
    }
  ];

  const colorSchemes = [
    {
      id: 'default',
      name: 'Default',
      description: 'Classic black and white',
      primary: '#000000',
      secondary: '#FFFFFF'
    },
    {
      id: 'blue',
      name: 'Ocean Blue',
      description: 'Calming blue tones',
      primary: '#3B82F6',
      secondary: '#EFF6FF'
    },
    {
      id: 'green',
      name: 'Forest Green',
      description: 'Natural green theme',
      primary: '#10B981',
      secondary: '#ECFDF5'
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      description: 'Elegant purple theme',
      primary: '#8B5CF6',
      secondary: '#F5F3FF'
    }
  ];

  const layoutOptions = [
    {
      id: 'comfortable',
      name: 'Comfortable',
      description: 'More spacing between elements',
      icon: Layout
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Tighter spacing for more content',
      icon: Layout
    }
  ];

  const previewContent = [
    { title: 'Sample Card', subtitle: 'This is how cards will look' },
    { title: 'Another Element', subtitle: 'Preview of the selected theme' },
    { title: 'Interactive Item', subtitle: 'Tap to see the theme in action' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Theme & Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Customize the look and feel of your study experience</Text>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.themesGrid}>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeCard,
                  selectedTheme === theme.id && styles.themeCardActive
                ]}
                onPress={() => setSelectedTheme(theme.id as any)}
              >
                <View style={[styles.themeIcon, { backgroundColor: theme.color + '15' }]}>
                  <theme.icon size={24} color={theme.color} />
                </View>
                <Text style={styles.themeName}>{theme.name}</Text>
                <Text style={styles.themeDescription}>{theme.description}</Text>
                {selectedTheme === theme.id && (
                  <View style={styles.checkmark}>
                    <Check size={16} color={colors.surface} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Scheme */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Scheme</Text>
          <View style={styles.colorSchemesGrid}>
            {colorSchemes.map((scheme) => (
              <TouchableOpacity key={scheme.id} style={styles.colorSchemeCard}>
                <View style={styles.colorPreview}>
                  <View style={[styles.colorPrimary, { backgroundColor: scheme.primary }]} />
                  <View style={[styles.colorSecondary, { backgroundColor: scheme.secondary }]} />
                </View>
                <Text style={styles.colorSchemeName}>{scheme.name}</Text>
                <Text style={styles.colorSchemeDescription}>{scheme.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Layout Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Layout</Text>
          <View style={styles.layoutOptions}>
            {layoutOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.layoutCard,
                  compactMode === (option.id === 'compact') && styles.layoutCardActive
                ]}
              >
                <View style={styles.layoutIcon}>
                  <option.icon size={24} color={colors.text} />
                </View>
                <View style={styles.layoutInfo}>
                  <Text style={styles.layoutName}>{option.name}</Text>
                  <Text style={styles.layoutDescription}>{option.description}</Text>
                </View>
                <Switch
                  value={compactMode === (option.id === 'compact')}
                  onValueChange={(value) => setCompactMode(value && option.id === 'compact')}
                  trackColor={{ false: colors.border, true: colors.text }}
                  thumbColor={compactMode === (option.id === 'compact') ? colors.surface : colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accessibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          <Card style={styles.accessibilityCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Large Text</Text>
                <Text style={styles.settingSubtitle}>Increase text size for better readability</Text>
              </View>
              <Switch
                value={largeText}
                onValueChange={setLargeText}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={largeText ? colors.surface : colors.textMuted}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>High Contrast</Text>
                <Text style={styles.settingSubtitle}>Enhanced contrast for better visibility</Text>
              </View>
              <Switch
                value={highContrast}
                onValueChange={setHighContrast}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={highContrast ? colors.surface : colors.textMuted}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Show Animations</Text>
                <Text style={styles.settingSubtitle}>Enable smooth transitions and effects</Text>
              </View>
              <Switch
                value={showAnimations}
                onValueChange={setShowAnimations}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={showAnimations ? colors.surface : colors.textMuted}
              />
            </View>
          </Card>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <Card style={styles.previewCard}>
            <Text style={styles.previewTitle}>How it will look</Text>
            <View style={styles.previewContent}>
              {previewContent.map((item, index) => (
                <View key={index} style={styles.previewItem}>
                  <Text style={styles.previewItemTitle}>{item.title}</Text>
                  <Text style={styles.previewItemSubtitle}>{item.subtitle}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Apply Button */}
        <View style={styles.applySection}>
          <Button 
            title="Apply Changes" 
            style={styles.applyButton}
            onPress={() => {
              // Apply theme changes
              console.log('Theme settings applied:', {
                theme: selectedTheme,
                compactMode,
                showAnimations,
                largeText,
                highContrast
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
  themesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  themeCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  themeCardActive: {
    borderColor: colors.text,
    backgroundColor: colors.text + '05',
  },
  themeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  themeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSchemesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorSchemeCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  colorPreview: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  colorPrimary: {
    flex: 1,
  },
  colorSecondary: {
    flex: 1,
  },
  colorSchemeName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  colorSchemeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  layoutOptions: {
    gap: 12,
  },
  layoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  layoutCardActive: {
    borderColor: colors.text,
    backgroundColor: colors.text + '05',
  },
  layoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  layoutInfo: {
    flex: 1,
  },
  layoutName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  layoutDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  accessibilityCard: {
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
  previewCard: {
    padding: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 16,
  },
  previewContent: {
    gap: 12,
  },
  previewItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  previewItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  applySection: {
    marginBottom: 32,
  },
  applyButton: {
    width: '100%',
  },
});
