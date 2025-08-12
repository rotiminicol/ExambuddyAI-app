// This file is now deprecated. Use the ThemeContext instead.
// Keeping for backward compatibility with existing components

export const colors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111111',
  textMuted: '#6B7280',
  textHint: '#9CA3AF',
  black: '#000000',
  shadow: 'rgba(0,0,0,0.08)',
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const spacing = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
};

export const typography = {
  title: { fontSize: 24, fontFamily: 'Inter-Bold', color: colors.text } as const,
  h2: { fontSize: 18, fontFamily: 'Inter-Bold', color: colors.text } as const,
  body: { fontSize: 14, fontFamily: 'Inter-Medium', color: colors.text } as const,
  muted: { fontSize: 12, fontFamily: 'Inter-Medium', color: colors.textMuted } as const,
};


