import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function GoalsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Goals" subtitle="Set your weekly targets" />
      <Card style={styles.card}>
        <View style={styles.row}><Text style={styles.label}>Daily study time</Text><Text style={styles.value}>60m</Text></View>
        <View style={styles.row}><Text style={styles.label}>Days per week</Text><Text style={styles.value}>4</Text></View>
        <Button title="Update Goals" />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24 },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', color: '#111111' },
  sub: { marginTop: 6, color: '#6B7280', fontFamily: 'Inter-Medium' },
  card: { marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  label: { color: '#111111', fontFamily: 'Inter-Medium' },
  value: { color: '#6B7280', fontFamily: 'Inter-SemiBold' },
  primaryBtn: { marginTop: 12, backgroundColor: '#000', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontFamily: 'Inter-SemiBold' },
});


