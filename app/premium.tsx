import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Crown, Check, Star, Zap, Infinity, Shield, Users, Award, Sparkles, ArrowRight } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const features = [
    {
      icon: Infinity,
      title: 'Unlimited Practice Questions',
      description: 'Access to our entire question bank with AI-generated content'
    },
    {
      icon: Zap,
      title: 'Advanced Analytics',
      description: 'Detailed insights into your learning progress and performance'
    },
    {
      icon: Crown,
      title: 'Priority Support',
      description: 'Get help faster with dedicated customer support'
    },
    {
      icon: Shield,
      title: 'Ad-Free Experience',
      description: 'Enjoy a clean, distraction-free study environment'
    },
    {
      icon: Users,
      title: 'Study Groups',
      description: 'Create and join study groups with other students'
    },
    {
      icon: Award,
      title: 'Exclusive Content',
      description: 'Access premium study materials and expert-curated content'
    }
  ];

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      period: 'per month',
      popular: false,
      savings: null
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$59.99',
      period: 'per year',
      popular: true,
      savings: 'Save 50%'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Medical Student',
      text: 'Premium features helped me improve my exam scores by 40%!',
      rating: 5
    },
    {
      name: 'Alex K.',
      role: 'Engineering Student',
      text: 'The unlimited questions and analytics are game-changers.',
      rating: 5
    },
    {
      name: 'Maria L.',
      role: 'Law Student',
      text: 'Best investment for my studies. Highly recommend!',
      rating: 5
    }
  ];

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade to Premium',
      'You\'re about to upgrade to ExamBuddy AI Premium. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Upgrade',
          onPress: () => {
            // Handle premium upgrade
            console.log('Upgrading to premium:', selectedPlan);
            Alert.alert('Success!', 'Welcome to ExamBuddy AI Premium!');
          }
        }
      ]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        color={i < rating ? '#F59E0B' : colors.textMuted}
        fill={i < rating ? '#F59E0B' : 'transparent'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Upgrade to Premium</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <Card style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.crownContainer}>
              <Crown size={32} color={colors.text} />
              <Sparkles size={16} color={colors.text} style={styles.sparkle1} />
              <Sparkles size={12} color={colors.text} style={styles.sparkle2} />
            </View>
            <Text style={styles.heroTitle}>Unlock Your Full Potential</Text>
            <Text style={styles.heroSubtitle}>
              Get unlimited access to all features and accelerate your learning journey
            </Text>
          </View>
        </Card>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
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

        {/* Pricing Plans */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardActive
                ]}
                onPress={() => setSelectedPlan(plan.id as any)}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.planPrice}>
                    <Text style={styles.planPriceText}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>{plan.period}</Text>
                  </View>
                  {plan.savings && (
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                {selectedPlan === plan.id && (
                  <View style={styles.selectedIndicator}>
                    <Check size={20} color={colors.surface} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>What Students Say</Text>
          <View style={styles.testimonialsList}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <View style={styles.testimonialStars}>
                    {renderStars(testimonial.rating)}
                  </View>
                </View>
                <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
                <View style={styles.testimonialAuthor}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Guarantee */}
        <Card style={styles.guaranteeCard}>
          <View style={styles.guaranteeHeader}>
            <Shield size={24} color={colors.text} />
            <Text style={styles.guaranteeTitle}>30-Day Money-Back Guarantee</Text>
          </View>
          <Text style={styles.guaranteeText}>
            Not satisfied? Get a full refund within 30 days. No questions asked.
          </Text>
        </Card>

        {/* Upgrade Button */}
        <View style={styles.upgradeSection}>
          <Button 
            title="Upgrade to Premium" 
            onPress={handleUpgrade}
            icon={Crown}
            style={styles.upgradeButton}
          />
          <Text style={styles.upgradeNote}>
            Cancel anytime. No commitment required.
          </Text>
        </View>

        {/* FAQ Preview */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Can I cancel my subscription?</Text>
              <ArrowRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
              <ArrowRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Is my data secure?</Text>
              <ArrowRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
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
  heroCard: {
    alignItems: 'center',
    padding: 32,
    marginTop: 24,
    marginBottom: 32,
    position: 'relative',
  },
  heroHeader: {
    alignItems: 'center',
  },
  crownContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  sparkle1: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -4,
    left: -4,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  pricingSection: {
    marginBottom: 32,
  },
  plansContainer: {
    gap: 12,
  },
  planCard: {
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    position: 'relative',
  },
  planCardActive: {
    borderColor: colors.text,
    backgroundColor: colors.text + '05',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: colors.surface,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  planPrice: {
    alignItems: 'flex-end',
  },
  planPriceText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  planPeriod: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  savingsBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: colors.surface,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialsSection: {
    marginBottom: 32,
  },
  testimonialsList: {
    gap: 12,
  },
  testimonialCard: {
    padding: 16,
  },
  testimonialHeader: {
    marginBottom: 12,
  },
  testimonialStars: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  testimonialAuthor: {
    gap: 2,
  },
  testimonialName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  testimonialRole: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  guaranteeCard: {
    padding: 20,
    marginBottom: 32,
  },
  guaranteeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  guaranteeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  guaranteeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
  upgradeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  upgradeButton: {
    width: '100%',
    marginBottom: 12,
  },
  upgradeNote: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqList: {
    gap: 8,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqQuestion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
});
