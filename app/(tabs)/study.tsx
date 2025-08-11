import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, BookOpen, Brain, FileText, Video } from 'lucide-react-native';
import { SubjectCard } from '@/components/SubjectCard';
import { SearchBar } from '@/components/SearchBar';
import { StudyModeCard } from '@/components/StudyModeCard';

export default function StudyScreen() {
  const subjects = [
    { id: 1, name: 'Mathematics', chapters: 24, progress: 75, color: '#8B5CF6', icon: '📐' },
    { id: 2, name: 'Physics', chapters: 18, progress: 60, color: '#06B6D4', icon: '⚡' },
    { id: 3, name: 'Chemistry', chapters: 20, progress: 45, color: '#F59E0B', icon: '🧪' },
    { id: 4, name: 'Biology', chapters: 22, progress: 80, color: '#10B981', icon: '🧬' },
    { id: 5, name: 'English', chapters: 16, progress: 90, color: '#EF4444', icon: '📚' },
    { id: 6, name: 'History', chapters: 14, progress: 35, color: '#F97316', icon: '🏛️' },
  ];

  const studyModes = [
    { id: 1, title: 'AI Tutor', subtitle: 'Get instant help', icon: Brain, color: '#8B5CF6' },
    { id: 2, title: 'Flashcards', subtitle: 'Quick revision', icon: FileText, color: '#06B6D4' },
    { id: 3, title: 'Video Lessons', subtitle: 'Visual learning', icon: Video, color: '#F59E0B' },
    { id: 4, title: 'Reading Notes', subtitle: 'Detailed study', icon: BookOpen, color: '#10B981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Center</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#8B5CF6" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar placeholder="Search subjects or topics..." />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
  studyModesContainer: {
    marginBottom: 8,
  },
  subjectsGrid: {
    gap: 16,
  },
});