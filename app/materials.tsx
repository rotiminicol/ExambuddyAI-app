import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Upload, FileText, Plus, Camera, Link } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function MaterialsScreen() {
  const [uploadMethod, setUploadMethod] = useState<'paste' | 'upload' | 'camera' | 'link'>('paste');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Materials</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Add study materials to generate questions and flashcards</Text>

        {/* Upload Methods */}
        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Choose Upload Method</Text>
          <View style={styles.methodsGrid}>
            <TouchableOpacity 
              style={[styles.methodCard, uploadMethod === 'paste' && styles.methodCardActive]}
              onPress={() => setUploadMethod('paste')}
            >
              <FileText size={24} color={uploadMethod === 'paste' ? colors.surface : colors.text} />
              <Text style={[styles.methodTitle, uploadMethod === 'paste' && styles.methodTitleActive]}>
                Paste Text
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.methodCard, uploadMethod === 'upload' && styles.methodCardActive]}
              onPress={() => setUploadMethod('upload')}
            >
              <Upload size={24} color={uploadMethod === 'upload' ? colors.surface : colors.text} />
              <Text style={[styles.methodTitle, uploadMethod === 'upload' && styles.methodTitleActive]}>
                Upload File
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.methodCard, uploadMethod === 'camera' && styles.methodCardActive]}
              onPress={() => setUploadMethod('camera')}
            >
              <Camera size={24} color={uploadMethod === 'camera' ? colors.surface : colors.text} />
              <Text style={[styles.methodTitle, uploadMethod === 'camera' && styles.methodTitleActive]}>
                Take Photo
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.methodCard, uploadMethod === 'link' && styles.methodCardActive]}
              onPress={() => setUploadMethod('link')}
            >
              <Link size={24} color={uploadMethod === 'link' ? colors.surface : colors.text} />
              <Text style={[styles.methodTitle, uploadMethod === 'link' && styles.methodTitleActive]}>
                Add Link
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Area */}
        <Card style={styles.contentCard}>
          {uploadMethod === 'paste' && (
            <View style={styles.pasteSection}>
              <Text style={styles.contentTitle}>Paste Your Study Material</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Paste your notes, textbook content, or any study material here..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>
          )}

          {uploadMethod === 'upload' && (
            <View style={styles.uploadSection}>
              <Text style={styles.contentTitle}>Upload File</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Upload size={32} color={colors.textMuted} />
                <Text style={styles.uploadText}>Tap to select file</Text>
                <Text style={styles.uploadSubtext}>PDF, DOC, TXT up to 10MB</Text>
              </TouchableOpacity>
            </View>
          )}

          {uploadMethod === 'camera' && (
            <View style={styles.cameraSection}>
              <Text style={styles.contentTitle}>Take Photo</Text>
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={32} color={colors.textMuted} />
                <Text style={styles.cameraText}>Tap to open camera</Text>
              </TouchableOpacity>
            </View>
          )}

          {uploadMethod === 'link' && (
            <View style={styles.linkSection}>
              <Text style={styles.contentTitle}>Add Link</Text>
              <TextInput
                style={styles.linkInput}
                placeholder="https://example.com/study-material"
                placeholderTextColor={colors.textMuted}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
          )}
        </Card>

        {/* Subject Selection */}
        <View style={styles.subjectSection}>
          <Text style={styles.sectionTitle}>Select Subject</Text>
          <View style={styles.subjectGrid}>
            {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Literature'].map((subject) => (
              <TouchableOpacity key={subject} style={styles.subjectCard}>
                <Text style={styles.subjectText}>{subject}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Button title="Generate Questions" style={styles.primaryButton} />
          <Button title="Create Flashcards" variant="outline" style={styles.secondaryButton} />
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
    marginBottom: 32,
  },
  methodsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  methodCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  methodCardActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  methodTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  methodTitleActive: {
    color: colors.surface,
  },
  contentCard: {
    marginBottom: 32,
  },
  contentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    minHeight: 120,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  uploadSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  cameraButton: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  cameraText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  linkInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  subjectSection: {
    marginBottom: 32,
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subjectText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  actionsSection: {
    gap: 12,
  },
  primaryButton: {
    marginBottom: 8,
  },
  secondaryButton: {
    marginBottom: 24,
  },
});

