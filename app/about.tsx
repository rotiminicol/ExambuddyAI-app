import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, ExternalLink, Heart, Users, Award, Shield, FileText, Mail, Globe, Star } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function AboutScreen() {
  const appInfo = {
    name: 'ExamBuddy AI',
    version: '1.0.0',
    description: 'Your intelligent study companion powered by AI to help you excel in your academic journey.',
    tagline: 'Study Smarter, Not Harder'
  };

  const features = [
    {
      icon: Heart,
      title: 'AI-Powered Learning',
      description: 'Personalized study plans and intelligent question generation'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of students improving together'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Students see 40% improvement in exam scores'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is secure and never shared'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead AI Researcher',
      bio: 'PhD in Computer Science with 10+ years in educational technology'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Designer',
      bio: 'Former teacher turned UX designer, passionate about learning'
    },
    {
      name: 'Alex Thompson',
      role: 'Engineering Lead',
      bio: 'Full-stack developer with expertise in mobile and AI systems'
    }
  ];

  const legalLinks = [
    { title: 'Privacy Policy', url: 'https://exambuddyai.vercel.app/privacy' },
    { title: 'Terms of Service', url: 'https://exambuddyai.vercel.app/terms' },
    { title: 'Cookie Policy', url: 'https://exambuddyai.vercel.app/cookies' },
    { title: 'Data Protection', url: 'https://exambuddyai.vercel.app/data-protection' }
  ];

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* App Info */}
        <Card style={styles.appInfoCard}>
          <View style={styles.appInfoHeader}>
            <View style={styles.appIcon}>
              <Heart size={32} color={colors.text} />
            </View>
            <Text style={styles.appName}>{appInfo.name}</Text>
            <Text style={styles.appVersion}>Version {appInfo.version}</Text>
            <Text style={styles.appTagline}>{appInfo.tagline}</Text>
          </View>
          <Text style={styles.appDescription}>{appInfo.description}</Text>
        </Card>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose ExamBuddy AI?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <feature.icon size={24} color={colors.text} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Our Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>50K+</Text>
              <Text style={styles.statLabel}>Active Students</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1M+</Text>
              <Text style={styles.statLabel}>Questions Answered</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>App Rating</Text>
            </View>
          </View>
        </Card>

        {/* Team */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Meet Our Team</Text>
          <Text style={styles.teamSubtitle}>The passionate minds behind ExamBuddy AI</Text>
          <View style={styles.teamList}>
            {teamMembers.map((member, index) => (
              <Card key={index} style={styles.teamCard}>
                <View style={styles.teamMemberInfo}>
                  <Text style={styles.teamMemberName}>{member.name}</Text>
                  <Text style={styles.teamMemberRole}>{member.role}</Text>
                  <Text style={styles.teamMemberBio}>{member.bio}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Contact */}
        <Card style={styles.contactCard}>
          <Text style={styles.contactTitle}>Get in Touch</Text>
          <Text style={styles.contactSubtitle}>We'd love to hear from you</Text>
          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactOption}>
              <Mail size={20} color={colors.text} />
              <Text style={styles.contactOptionText}>hello@exambuddyai.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactOption}>
              <Globe size={20} color={colors.text} />
              <Text style={styles.contactOptionText}>exambuddyai.vercel.app</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Legal Links */}
        <View style={styles.legalSection}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.legalList}>
            {legalLinks.map((link, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.legalItem}
                onPress={() => openLink(link.url)}
              >
                <FileText size={16} color={colors.textMuted} />
                <Text style={styles.legalItemText}>{link.title}</Text>
                <ExternalLink size={16} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with <Heart size={12} color={colors.text} /> for students worldwide
          </Text>
          <Text style={styles.copyrightText}>
            © 2024 ExamBuddy AI. All rights reserved.
          </Text>
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
  appInfoCard: {
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  appInfoHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 16,
  },
  appDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    padding: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
  statsCard: {
    padding: 20,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
  },
  teamSection: {
    marginBottom: 32,
  },
  teamSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 16,
  },
  teamList: {
    gap: 12,
  },
  teamCard: {
    padding: 16,
  },
  teamMemberInfo: {
    gap: 4,
  },
  teamMemberName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  teamMemberRole: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  teamMemberBio: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 8,
  },
  contactCard: {
    padding: 20,
    marginBottom: 32,
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
    marginBottom: 16,
  },
  contactOptions: {
    gap: 12,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  contactOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  legalSection: {
    marginBottom: 32,
  },
  legalList: {
    gap: 8,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legalItemText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
});
