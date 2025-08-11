import { View, Text, StyleSheet } from 'react-native';

interface ProfileStatsCardProps {
  icon: any;
  label: string;
  value: string;
  color: string;
}

export function ProfileStatsCard({ icon: Icon, label, value, color }: ProfileStatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <Icon size={24} color={color} strokeWidth={2.5} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
});