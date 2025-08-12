import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/lib/theme';

export function SectionHeader({ title, subtitle, right, style }: { title: string; subtitle?: string; right?: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.row, style]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontFamily: 'Inter-Bold', color: colors.text },
  sub: { fontSize: 12, fontFamily: 'Inter-Medium', color: colors.textMuted, marginTop: 4 },
});


