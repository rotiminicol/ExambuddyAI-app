import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, FileText, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpScreen() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create a study plan?',
      answer: 'Go to Study Plan in the menu, tap the + button, and follow the setup wizard. You can choose your subjects, set goals, and customize your schedule.',
      category: 'Getting Started'
    },
    {
      id: '2',
      question: 'Can I use the app offline?',
      answer: 'Yes! Download content in the Offline section to access your study materials without an internet connection.',
      category: 'Features'
    },
    {
      id: '3',
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked. View detailed analytics in the Progress section, including study time, accuracy, and completion rates.',
      category: 'Features'
    },
    {
      id: '4',
      question: 'What\'s included in Premium?',
      answer: 'Premium includes unlimited practice questions, advanced analytics, priority support, custom study plans, and exclusive content.',
      category: 'Premium'
    },
    {
      id: '5',
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Account > Change Password, or use the "Forgot Password" option on the sign-in screen.',
      category: 'Account'
    },
    {
      id: '6',
      question: 'Can I share my progress with others?',
      answer: 'Yes! Use the Share Progress feature to create achievement cards and share your study milestones on social media.',
      category: 'Features'
    }
  ];

  const contactOptions = [
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'Get detailed help via email',
      icon: Mail,
      action: () => {/* Open email client */}
    },
    {
      id: 'chat',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: MessageCircle,
      action: () => {/* Open chat */}
    },
    {
      id: 'phone',
      title: 'Phone Support',
      subtitle: 'Call us for immediate help',
      icon: Phone,
      action: () => {/* Open phone */}
    }
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Find answers to common questions and get the help you need</Text>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {contactOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.quickActionCard} onPress={option.action}>
                <View style={styles.quickActionIcon}>
                  <option.icon size={24} color={colors.text} />
                </View>
                <Text style={styles.quickActionTitle}>{option.title}</Text>
                <Text style={styles.quickActionSubtitle}>{option.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqData.map((faq) => (
              <Card key={faq.id} style={styles.faqCard}>
                <TouchableOpacity 
                  style={styles.faqHeader} 
                  onPress={() => toggleFAQ(faq.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.faqQuestionContainer}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqCategory}>{faq.category}</Text>
                  </View>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown size={20} color={colors.textMuted} />
                  ) : (
                    <ChevronRight size={20} color={colors.textMuted} />
                  )}
                </TouchableOpacity>
                {expandedFAQ === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </Card>
            ))}
          </View>
        </View>

        {/* Troubleshooting */}
        <View style={styles.troubleshootingSection}>
          <Text style={styles.sectionTitle}>Troubleshooting</Text>
          <Card style={styles.troubleshootingCard}>
            <View style={styles.troubleshootingHeader}>
              <HelpCircle size={24} color={colors.text} />
              <Text style={styles.troubleshootingTitle}>Common Issues</Text>
            </View>
            <View style={styles.troubleshootingList}>
              <TouchableOpacity style={styles.troubleshootingItem}>
                <Text style={styles.troubleshootingItemTitle}>App not loading</Text>
                <Text style={styles.troubleshootingItemSubtitle}>Check your internet connection</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.troubleshootingItem}>
                <Text style={styles.troubleshootingItemTitle}>Can't sign in</Text>
                <Text style={styles.troubleshootingItemSubtitle}>Reset your password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.troubleshootingItem}>
                <Text style={styles.troubleshootingItemTitle}>Audio not working</Text>
                <Text style={styles.troubleshootingItemSubtitle}>Check device volume and permissions</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <View style={styles.resourcesList}>
            <TouchableOpacity style={styles.resourceCard}>
              <View style={styles.resourceIcon}>
                <FileText size={24} color={colors.text} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>User Guide</Text>
                <Text style={styles.resourceSubtitle}>Complete app documentation</Text>
              </View>
              <ExternalLink size={20} color={colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceCard}>
              <View style={styles.resourceIcon}>
                <HelpCircle size={24} color={colors.text} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>Video Tutorials</Text>
                <Text style={styles.resourceSubtitle}>Learn with step-by-step videos</Text>
              </View>
              <ExternalLink size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Support */}
        <Card style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Text style={styles.contactTitle}>Still Need Help?</Text>
            <Text style={styles.contactSubtitle}>Our support team is here to help you succeed</Text>
          </View>
          <Button title="Contact Support" style={{ marginTop: 16 }} />
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
  quickActionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  faqSection: {
    marginBottom: 32,
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    padding: 0,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestionContainer: {
    flex: 1,
    marginRight: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  faqCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  faqAnswerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
  troubleshootingSection: {
    marginBottom: 32,
  },
  troubleshootingCard: {
    padding: 16,
  },
  troubleshootingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  troubleshootingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  troubleshootingList: {
    gap: 12,
  },
  troubleshootingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  troubleshootingItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  troubleshootingItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  resourcesSection: {
    marginBottom: 32,
  },
  resourcesList: {
    gap: 12,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  contactCard: {
    alignItems: 'center',
    padding: 24,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 8,
  },
  contactSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
