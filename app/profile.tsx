import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Profile" />
      <View style={styles.header}> 
        <View style={styles.avatar}><Text style={styles.initials}>JD</Text></View>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.email}>jane@example.com</Text>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.row}><Text style={styles.label}>Edit Profile</Text></TouchableOpacity>
        <TouchableOpacity style={styles.row}><Text style={styles.label}>Settings</Text></TouchableOpacity>
        <TouchableOpacity style={styles.row}><Text style={styles.label}>Sign Out</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24 },
  header: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  initials: { fontFamily: 'Inter-Bold', color: '#111111', fontSize: 24 },
  name: { fontFamily: 'Inter-Bold', color: '#111111', fontSize: 20 },
  email: { fontFamily: 'Inter-Medium', color: '#6B7280', marginTop: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', marginTop: 8 },
  row: { paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  label: { fontFamily: 'Inter-Medium', color: '#111111' },
});


