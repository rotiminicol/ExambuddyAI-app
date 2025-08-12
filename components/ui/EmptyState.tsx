import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/lib/theme';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function EmptyState({ title, subtitle, children }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children && <View style={styles.children}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  children: {
    alignItems: 'center',
  },
});
