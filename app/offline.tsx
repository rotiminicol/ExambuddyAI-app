import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Download, Wifi, WifiOff, HardDrive, Settings } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function OfflineScreen() {
  const [autoDownload, setAutoDownload] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(true);

  const offlineContent = [
    {
      id: '1',
      title: 'Mathematics Formulas',
      size: '2.4 MB',
      status: 'downloaded',
      subject: 'Mathematics'
    },
    {
      id: '2',
      title: 'Physics Study Guide',
      size: '1.8 MB',
      status: 'downloading',
      subject: 'Physics',
      progress: 65
    },
    {
      id: '3',
      title: 'Chemistry Reactions',
      size: '3.1 MB',
      status: 'available',
      subject: 'Chemistry'
    },
    {
      id: '4',
      title: 'Biology Notes',
      size: '4.2 MB',
      status: 'available',
      subject: 'Biology'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloaded':
        return <HardDrive size={20} color={colors.text} />;
      case 'downloading':
        return <Download size={20} color={colors.text} />;
      default:
        return <Download size={20} color={colors.textMuted} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'downloaded':
        return 'Downloaded';
      case 'downloading':
        return 'Downloading...';
      default:
        return 'Download';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloaded':
        return colors.text;
      case 'downloading':
        return colors.text;
      default:
        return colors.textMuted;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Offline Content</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Download study materials for offline access</Text>

        {/* Storage Info */}
        <Card style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <HardDrive size={24} color={colors.text} />
            <Text style={styles.storageTitle}>Storage Usage</Text>
          </View>
          <View style={styles.storageInfo}>
            <View style={styles.storageBar}>
              <View style={[styles.storageFill, { width: '35%' }]} />
            </View>
            <Text style={styles.storageText}>3.2 GB used of 10 GB available</Text>
          </View>
        </Card>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Download Settings</Text>
          <Card style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto-download new content</Text>
                <Text style={styles.settingSubtitle}>Automatically download new study materials</Text>
              </View>
              <Switch
                value={autoDownload}
                onValueChange={setAutoDownload}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={autoDownload ? colors.surface : colors.textMuted}
              />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Wi-Fi only</Text>
                <Text style={styles.settingSubtitle}>Download only when connected to Wi-Fi</Text>
              </View>
              <Switch
                value={wifiOnly}
                onValueChange={setWifiOnly}
                trackColor={{ false: colors.border, true: colors.text }}
                thumbColor={wifiOnly ? colors.surface : colors.textMuted}
              />
            </View>
          </Card>
        </View>

        {/* Content List */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Content</Text>
            <TouchableOpacity style={styles.downloadAllButton}>
              <Download size={16} color={colors.text} />
              <Text style={styles.downloadAllText}>Download All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentList}>
            {offlineContent.map((item) => (
              <Card key={item.id} style={styles.contentCard}>
                <View style={styles.contentHeader}>
                  <View style={styles.contentIcon}>
                    {getStatusIcon(item.status)}
                  </View>
                  <View style={styles.contentInfo}>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                    <Text style={styles.contentSubject}>{item.subject}</Text>
                  </View>
                  <View style={styles.contentMeta}>
                    <Text style={styles.contentSize}>{item.size}</Text>
                    {item.status === 'downloading' && (
                      <Text style={styles.downloadProgress}>{item.progress}%</Text>
                    )}
                  </View>
                </View>
                {item.status === 'downloading' && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                  </View>
                )}
                <TouchableOpacity 
                  style={[
                    styles.downloadButton,
                    item.status === 'downloaded' && styles.downloadedButton
                  ]}
                >
                  <Text style={[
                    styles.downloadButtonText,
                    { color: getStatusColor(item.status) }
                  ]}>
                    {getStatusText(item.status)}
                  </Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>

        {/* Offline Status */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <WifiOff size={20} color={colors.text} />
            <Text style={styles.statusTitle}>Offline Mode</Text>
          </View>
          <Text style={styles.statusText}>
            You can access downloaded content even without an internet connection
          </Text>
        </Card>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginTop: 24,
    marginBottom: 24,
  },
  storageCard: {
    marginBottom: 24,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  storageTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  storageInfo: {
    gap: 8,
  },
  storageBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  storageFill: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: 4,
  },
  storageText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  settingsCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  downloadAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  downloadAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  contentList: {
    gap: 12,
  },
  contentCard: {
    padding: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  contentSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  contentMeta: {
    alignItems: 'flex-end',
  },
  contentSize: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  downloadProgress: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: 2,
  },
  downloadButton: {
    backgroundColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  downloadedButton: {
    backgroundColor: colors.surface,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statusCard: {
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
});

