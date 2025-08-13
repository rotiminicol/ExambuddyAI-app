import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { colors, radii } from '@/lib/theme';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: any;
}

export function Button({ title, onPress, disabled, variant = 'solid', style, textStyle, icon: Icon }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
      style={[variant === 'solid' ? styles.solid : styles.outline, disabled && styles.disabled, style]}
    >
      <View style={styles.content}>
        <Text style={[variant === 'solid' ? styles.solidText : styles.outlineText, textStyle]}>{title}</Text>
        {Icon && <Icon size={16} color={variant === 'solid' ? '#FFFFFF' : colors.text} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  solid: {
    backgroundColor: colors.black,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  solidText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  outlineText: {
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});