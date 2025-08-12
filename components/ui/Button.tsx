import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, radii } from '@/lib/theme';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ title, onPress, disabled, variant = 'solid', style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
      style={[variant === 'solid' ? styles.solid : styles.outline, disabled && styles.disabled, style]}
    >
      <Text style={[variant === 'solid' ? styles.solidText : styles.outlineText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  solid: {
    backgroundColor: colors.black,
    borderRadius: radii.lg,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  solidText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  outlineText: {
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  disabled: {
    opacity: 0.6,
  },
});


