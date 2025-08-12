import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, BookOpen } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Flashcard } from '@/components/ui/Flashcard';
import { useTheme } from '@/contexts/ThemeContext';

export default function FlashcardsScreen() {
  const { colors } = useTheme();
  const [showFlashcard, setShowFlashcard] = useState(false);

  const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 120,
    },
    flashcardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
      marginBottom: 24,
    },
    emptyBox: { 
      marginTop: 24, 
      alignItems: 'center',
      padding: 32,
    },
    emptyTitle: { 
      fontSize: 18, 
      fontFamily: 'Inter-SemiBold', 
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySub: { 
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 32,
    },
    buttonContainer: {
      width: '100%',
      gap: 12,
    },
    fullWidthButton: {
      width: '100%',
    },
  });

  const sampleCards = [
    { front: 'What is the capital of France?', back: 'Paris' },
    { front: 'What is 2 + 2?', back: '4' },
    { front: 'What is the largest planet?', back: 'Jupiter' },
  ];

  if (showFlashcard) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Sample Deck" showBack onBack={() => setShowFlashcard(false)} />
        <View style={styles.flashcardContainer}>
          <Flashcard front={sampleCards[0].front} back={sampleCards[0].back} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Flashcards" showBack onBack={() => router.back()} />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Build decks, flip cards, and track retention
        </Text>
        
        <Card style={styles.emptyBox}>
          <BookOpen size={48} color={colors.textMuted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No decks yet</Text>
          <Text style={[styles.emptySub, { color: colors.textMuted }]}>
            Create your first deck to get started
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Create New Deck" 
              style={styles.fullWidthButton}
              onPress={() => {/* TODO: Implement create deck */}}
            />
            <Button 
              title="Try Sample Deck" 
              variant="outline" 
              style={styles.fullWidthButton}
              onPress={() => setShowFlashcard(true)}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}


