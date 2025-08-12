import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Bookmark, Search, Filter, Plus } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function BookmarksScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
  ];

  const bookmarks = [
    {
      id: '1',
      title: 'Calculus Integration Methods',
      subject: 'Mathematics',
      type: 'Notes',
      date: '2 days ago',
      category: 'math'
    },
    {
      id: '2',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      type: 'Formula Sheet',
      date: '1 week ago',
      category: 'physics'
    },
    {
      id: '3',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      type: 'Study Guide',
      date: '3 days ago',
      category: 'chemistry'
    },
  ];

  const filteredBookmarks = selectedCategory === 'all' 
    ? bookmarks 
    : bookmarks.filter(bookmark => bookmark.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Bookmarks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Your saved study materials and important notes</Text>

        {/* Search Bar */}
        <Card style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Search bookmarks...</Text>
          </View>
        </Card>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bookmarks List */}
        <View style={styles.bookmarksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Items</Text>
            <Text style={styles.bookmarkCount}>{filteredBookmarks.length} items</Text>
          </View>

          {filteredBookmarks.length > 0 ? (
            <View style={styles.bookmarksList}>
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} style={styles.bookmarkCard}>
                  <View style={styles.bookmarkHeader}>
                    <View style={styles.bookmarkIcon}>
                      <Bookmark size={20} color={colors.text} />
                    </View>
                    <View style={styles.bookmarkInfo}>
                      <Text style={styles.bookmarkTitle}>{bookmark.title}</Text>
                      <Text style={styles.bookmarkSubject}>{bookmark.subject}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookmarkMenu}>
                      <Text style={styles.bookmarkMenuText}>•••</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bookmarkFooter}>
                    <View style={styles.bookmarkType}>
                      <Text style={styles.bookmarkTypeText}>{bookmark.type}</Text>
                    </View>
                    <Text style={styles.bookmarkDate}>{bookmark.date}</Text>
                  </View>
                </Card>
              ))}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Bookmark size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No bookmarks yet</Text>
              <Text style={styles.emptySubtitle}>
                {selectedCategory === 'all' 
                  ? 'Start saving important study materials to access them later'
                  : `No bookmarks in ${categories.find(c => c.id === selectedCategory)?.name} category`
                }
              </Text>
              <Button title="Add First Bookmark" style={{ marginTop: 16 }} />
            </Card>
          )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
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
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  categoryTextActive: {
    color: colors.surface,
  },
  bookmarksSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  bookmarkCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  bookmarksList: {
    gap: 12,
  },
  bookmarkCard: {
    padding: 16,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkInfo: {
    flex: 1,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  bookmarkSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  bookmarkMenu: {
    padding: 8,
  },
  bookmarkMenuText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.textMuted,
  },
  bookmarkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookmarkType: {
    backgroundColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bookmarkTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  bookmarkDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

