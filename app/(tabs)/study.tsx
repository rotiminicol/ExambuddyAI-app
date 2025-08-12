import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, BookOpen, Brain, FileText, Video } from 'lucide-react-native';
import { SubjectCard } from '@/components/ui/SubjectCard';
import { StudyModeCard } from '@/components/ui/StudyModeCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { useTheme } from '@/contexts/ThemeContext';

export default function StudyScreen() {
  const { colors } = useTheme();
  
  const subjects = [
    { id: 1, name: 'Mathematics', chapters: 24, progress: 75, icon: '📐' },
    { id: 2, name: 'Physics', chapters: 18, progress: 60, icon: '⚡' },
    { id: 3, name: 'Chemistry', chapters: 20, progress: 45, icon: '🧪' },
    { id: 4, name: 'Biology', chapters: 22, progress: 80, icon: '🧬' },
    { id: 5, name: 'English', chapters: 16, progress: 90, icon: '📚' },
    { id: 6, name: 'History', chapters: 14, progress: 35, icon: '🏛️' },
  ];

  const studyModes = [
    { id: 1, title: 'AI Tutor', subtitle: 'Get instant help', icon: Brain },
    { id: 2, title: 'Flashcards', subtitle: 'Quick revision', icon: FileText },
    { id: 3, title: 'Video Lessons', subtitle: 'Visual learning', icon: Video },
    { id: 4, title: 'Reading Notes', subtitle: 'Detailed study', icon: BookOpen },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Study Center" />

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Modes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.studyModesContainer}>
            {studyModes.map((mode) => (
              <StudyModeCard key={mode.id} {...mode} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Subjects</Text>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} {...subject} />
            ))}
          </View>
        </View>

        {/* Additional content to ensure scrolling */}
        <View style={styles.bottomSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <BookOpen size={24} color={colors.text} />
              <Text style={styles.quickActionText}>Start Study Session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Brain size={24} color={colors.text} />
              <Text style={styles.quickActionText}>Ask AI Tutor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140, // Extra space for bottom navigation (120px) + additional 20px
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111111',
    marginBottom: 16,
  },
  studyModesContainer: {
    marginBottom: 8,
  },
  subjectsGrid: {
    gap: 16,
  },
  bottomSection: {
    marginTop: 32,
  },
  quickActions: {
    gap: 12,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  quickActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
});