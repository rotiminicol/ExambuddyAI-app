import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat, Music, Headphones, Coffee, Moon, Sun } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function MusicScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const playlists = [
    {
      id: '1',
      title: 'Focus Flow',
      description: 'Deep concentration music',
      icon: Headphones,
      tracks: 12,
      duration: '45 min',
      color: '#3B82F6'
    },
    {
      id: '2',
      title: 'Study Ambience',
      description: 'Background sounds for studying',
      icon: Coffee,
      tracks: 8,
      duration: '60 min',
      color: '#10B981'
    },
    {
      id: '3',
      title: 'Night Study',
      description: 'Calm music for late-night sessions',
      icon: Moon,
      tracks: 15,
      duration: '90 min',
      color: '#8B5CF6'
    },
    {
      id: '4',
      title: 'Morning Motivation',
      description: 'Energetic tunes to start your day',
      icon: Sun,
      tracks: 10,
      duration: '50 min',
      color: '#F59E0B'
    }
  ];

  const currentPlaylist = playlists[0];
  const tracks = [
    { id: '1', title: 'Deep Focus', artist: 'Study Beats', duration: '3:45' },
    { id: '2', title: 'Concentration Flow', artist: 'Mind Music', duration: '4:12' },
    { id: '3', title: 'Productive Vibes', artist: 'Work Sounds', duration: '3:28' },
    { id: '4', title: 'Study Session', artist: 'Focus Tunes', duration: '5:01' },
    { id: '5', title: 'Brain Boost', artist: 'Study Beats', duration: '4:33' }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Study Music</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Volume2 size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Now Playing */}
        <Card style={styles.nowPlayingCard}>
          <View style={styles.nowPlayingHeader}>
            <View style={[styles.playlistIcon, { backgroundColor: currentPlaylist.color + '15' }]}>
              <currentPlaylist.icon size={24} color={currentPlaylist.color} />
            </View>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle}>{currentPlaylist.title}</Text>
              <Text style={styles.playlistDescription}>{currentPlaylist.description}</Text>
            </View>
          </View>
          
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{tracks[currentTrack].title}</Text>
            <Text style={styles.trackArtist}>{tracks[currentTrack].artist}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '35%' }]} />
            </View>
            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>1:23</Text>
              <Text style={styles.timeText}>{tracks[currentTrack].duration}</Text>
            </View>
          </View>

          {/* Player Controls */}
          <View style={styles.playerControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleShuffle}>
              <Shuffle size={20} color={shuffle ? colors.text : colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={prevTrack}>
              <SkipBack size={24} color={colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
              {isPlaying ? (
                <Pause size={32} color={colors.surface} />
              ) : (
                <Play size={32} color={colors.surface} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={nextTrack}>
              <SkipForward size={24} color={colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={toggleRepeat}>
              <Repeat size={20} color={repeat ? colors.text : colors.textMuted} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
            <Heart 
              size={20} 
              color={isLiked ? '#EF4444' : colors.textMuted}
              fill={isLiked ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
        </Card>

        {/* Playlists */}
        <View style={styles.playlistsSection}>
          <Text style={styles.sectionTitle}>Study Playlists</Text>
          <View style={styles.playlistsGrid}>
            {playlists.map((playlist) => (
              <TouchableOpacity key={playlist.id} style={styles.playlistCard}>
                <View style={[styles.playlistCardIcon, { backgroundColor: playlist.color + '15' }]}>
                  <playlist.icon size={24} color={playlist.color} />
                </View>
                <View style={styles.playlistCardInfo}>
                  <Text style={styles.playlistCardTitle}>{playlist.title}</Text>
                  <Text style={styles.playlistCardDescription}>{playlist.description}</Text>
                  <Text style={styles.playlistCardMeta}>
                    {playlist.tracks} tracks • {playlist.duration}
                  </Text>
                </View>
                <TouchableOpacity style={styles.playlistPlayButton}>
                  <Play size={16} color={colors.text} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Track List */}
        <View style={styles.tracksSection}>
          <Text style={styles.sectionTitle}>Current Playlist</Text>
          <View style={styles.tracksList}>
            {tracks.map((track, index) => (
              <TouchableOpacity 
                key={track.id} 
                style={[
                  styles.trackItem,
                  currentTrack === index && styles.trackItemActive
                ]}
              >
                <View style={styles.trackItemInfo}>
                  <Text style={[
                    styles.trackItemTitle,
                    currentTrack === index && styles.trackItemTitleActive
                  ]}>
                    {track.title}
                  </Text>
                  <Text style={styles.trackItemArtist}>{track.artist}</Text>
                </View>
                <Text style={styles.trackItemDuration}>{track.duration}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Shuffle size={24} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>Shuffle All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Heart size={24} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>Liked Songs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Music size={24} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>Recently Played</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Headphones size={24} color={colors.text} />
              </View>
              <Text style={styles.actionTitle}>Discover</Text>
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
  nowPlayingCard: {
    padding: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  nowPlayingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playlistIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trackTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  playlistsGrid: {
    gap: 12,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playlistCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  playlistCardInfo: {
    flex: 1,
  },
  playlistCardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  playlistCardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    marginBottom: 4,
  },
  playlistCardMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  playlistPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tracksSection: {
    marginBottom: 32,
  },
  tracksList: {
    gap: 8,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trackItemActive: {
    borderColor: colors.text,
    backgroundColor: colors.text + '05',
  },
  trackItemInfo: {
    flex: 1,
  },
  trackItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  trackItemTitleActive: {
    color: colors.text,
  },
  trackItemArtist: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  trackItemDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
});
