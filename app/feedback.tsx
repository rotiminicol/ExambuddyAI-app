import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MessageSquare, Star, Bug, Heart, Send, CheckCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function FeedbackScreen() {
  const [feedbackType, setFeedbackType] = useState<'general' | 'bug' | 'feature' | 'rating'>('general');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'general',
      title: 'General Feedback',
      subtitle: 'Share your thoughts and suggestions',
      icon: MessageSquare,
      color: '#3B82F6'
    },
    {
      id: 'bug',
      title: 'Report Bug',
      subtitle: 'Help us fix issues you encounter',
      icon: Bug,
      color: '#EF4444'
    },
    {
      id: 'feature',
      title: 'Feature Request',
      subtitle: 'Suggest new features you\'d like',
      icon: Heart,
      color: '#10B981'
    },
    {
      id: 'rating',
      title: 'Rate App',
      subtitle: 'Share your experience with us',
      icon: Star,
      color: '#F59E0B'
    }
  ];

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your feedback message');
      return;
    }

    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      type: feedbackType,
      rating,
      message: message.trim(),
      email: email.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      router.back();
    }, 2000);
  };

  const renderRatingStars = () => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How would you rate your experience?</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Star
                size={32}
                color={star <= rating ? colors.text : colors.textMuted}
                fill={star <= rating ? colors.text : 'transparent'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingText}>
          {rating === 0 && 'Tap to rate'}
          {rating === 1 && 'Poor'}
          {rating === 2 && 'Fair'}
          {rating === 3 && 'Good'}
          {rating === 4 && 'Very Good'}
          {rating === 5 && 'Excellent'}
        </Text>
      </View>
    );
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <CheckCircle size={64} color={colors.text} />
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successSubtitle}>Your feedback has been submitted successfully.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Feedback</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Help us improve ExamBuddy AI with your valuable feedback</Text>

        {/* Feedback Type Selection */}
        <View style={styles.typeSection}>
          <Text style={styles.sectionTitle}>What type of feedback?</Text>
          <View style={styles.typeGrid}>
            {feedbackTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  feedbackType === type.id && styles.typeCardActive
                ]}
                onPress={() => setFeedbackType(type.id as any)}
              >
                <View style={[styles.typeIcon, { backgroundColor: type.color + '15' }]}>
                  <type.icon size={24} color={type.color} />
                </View>
                <Text style={styles.typeTitle}>{type.title}</Text>
                <Text style={styles.typeSubtitle}>{type.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating Section */}
        {feedbackType === 'rating' && renderRatingStars()}

        {/* Message Input */}
        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>
            {feedbackType === 'rating' ? 'Tell us more (optional)' : 'Your Message'}
          </Text>
          <Card style={styles.messageCard}>
            <TextInput
              style={styles.messageInput}
              placeholder="Share your thoughts, suggestions, or describe any issues you've encountered..."
              placeholderTextColor={colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </Card>
        </View>

        {/* Email Input */}
        <View style={styles.emailSection}>
          <Text style={styles.sectionTitle}>Contact Email (optional)</Text>
          <Text style={styles.emailSubtitle}>
            We'll use this to follow up on your feedback if needed
          </Text>
          <Card style={styles.emailCard}>
            <TextInput
              style={styles.emailInput}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Card>
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <Button 
            title="Submit Feedback" 
            onPress={handleSubmit}
            icon={Send}
            style={styles.submitButton}
          />
        </View>

        {/* Additional Info */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>What happens next?</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• We review all feedback within 24 hours</Text>
            <Text style={styles.infoItem}>• Bug reports are prioritized for fixes</Text>
            <Text style={styles.infoItem}>• Feature requests are considered for future updates</Text>
            <Text style={styles.infoItem}>• We may reach out for more details if needed</Text>
          </View>
        </Card>
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
  typeSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  typeCardActive: {
    borderColor: colors.text,
    backgroundColor: colors.text + '05',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  typeSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  ratingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  messageSection: {
    marginBottom: 24,
  },
  messageCard: {
    padding: 0,
  },
  messageInput: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    minHeight: 120,
  },
  emailSection: {
    marginBottom: 32,
  },
  emailSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 12,
  },
  emailCard: {
    padding: 0,
  },
  emailInput: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  submitSection: {
    marginBottom: 32,
  },
  submitButton: {
    width: '100%',
  },
  infoCard: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
});
