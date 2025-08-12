import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Filter, Search } from 'lucide-react-native';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function QuestionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Practice Questions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Generate and practice with custom questions</Text>

        <Card style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Search questions or topics...</Text>
          </View>
        </Card>

        <Card style={styles.generateCard}>
          <Text style={styles.generateTitle}>Generate New Questions</Text>
          <Text style={styles.generateSubtitle}>Create practice questions from your study materials</Text>
          <Button title="Generate Questions" style={{ marginTop: 16 }} />
        </Card>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Question Categories</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Mathematics</Text>
              <Text style={styles.categoryCount}>24 questions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Physics</Text>
              <Text style={styles.categoryCount}>18 questions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Chemistry</Text>
              <Text style={styles.categoryCount}>15 questions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Biology</Text>
              <Text style={styles.categoryCount}>22 questions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 24,
  },
  searchCard: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  generateCard: {
    marginBottom: 24,
  },
  generateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  generateSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
});


