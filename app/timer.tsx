import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Clock, Target, Coffee } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function TimerScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'custom'>('pomodoro');
  const [sessionCount, setSessionCount] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timerPresets = [
    { label: 'Pomodoro', minutes: 25, icon: Target },
    { label: 'Short Break', minutes: 5, icon: Coffee },
    { label: 'Long Break', minutes: 15, icon: Coffee },
    { label: 'Custom', minutes: customMinutes, icon: Clock }
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer finished
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleTimerComplete = () => {
    Alert.alert(
      'Timer Complete!',
      isBreak ? 'Break time is over. Ready to study?' : 'Great work! Time for a break.',
      [
        {
          text: 'Continue',
          onPress: () => {
            if (!isBreak) {
              setSessionCount(prev => prev + 1);
              setIsBreak(true);
              setTimeLeft(5 * 60); // 5 minute break
            } else {
              setIsBreak(false);
              setTimeLeft(25 * 60); // Back to 25 minutes
            }
          }
        },
        {
          text: 'Reset',
          onPress: resetTimer,
          style: 'cancel'
        }
      ]
    );
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setSessionCount(0);
  };

  const setTimer = (minutes: number) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
    setCustomMinutes(minutes);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalTime = timerMode === 'pomodoro' ? 25 * 60 : customMinutes * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Study Timer</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Timer Display */}
        <Card style={styles.timerCard}>
          <View style={styles.timerHeader}>
            <Text style={styles.timerMode}>
              {isBreak ? 'Break Time' : 'Study Session'}
            </Text>
            <Text style={styles.sessionCount}>
              Session {sessionCount + 1}
            </Text>
          </View>
          
          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${getProgressPercentage()}%` }
                ]} 
              />
            </View>
          </View>

          {/* Timer Controls */}
          <View style={styles.timerControls}>
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={resetTimer}
            >
              <RotateCcw size={24} color={colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.playButton, isRunning && styles.pauseButton]} 
              onPress={isRunning ? pauseTimer : startTimer}
            >
              {isRunning ? (
                <Pause size={32} color={colors.surface} />
              ) : (
                <Play size={32} color={colors.surface} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => setTimerMode(timerMode === 'pomodoro' ? 'custom' : 'pomodoro')}
            >
              <Settings size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Timer Presets */}
        <View style={styles.presetsSection}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.presetsGrid}>
            {timerPresets.map((preset, index) => (
              <TouchableOpacity
                key={index}
                style={styles.presetCard}
                onPress={() => setTimer(preset.minutes)}
              >
                <View style={styles.presetIcon}>
                  <preset.icon size={24} color={colors.text} />
                </View>
                <Text style={styles.presetLabel}>{preset.label}</Text>
                <Text style={styles.presetTime}>{preset.minutes}m</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Session Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Today's Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{sessionCount}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.floor((sessionCount * 25) / 60)}h {(sessionCount * 25) % 60}m
              </Text>
              <Text style={styles.statLabel}>Study Time</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.floor((sessionCount * 5) / 60)}h {(sessionCount * 5) % 60}m
              </Text>
              <Text style={styles.statLabel}>Break Time</Text>
            </View>
          </View>
        </Card>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Study Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Take regular breaks to maintain focus</Text>
            <Text style={styles.tipItem}>• Use the Pomodoro technique: 25min work, 5min break</Text>
            <Text style={styles.tipItem}>• After 4 sessions, take a longer 15-minute break</Text>
            <Text style={styles.tipItem}>• Stay hydrated and maintain good posture</Text>
          </View>
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
  timerCard: {
    alignItems: 'center',
    padding: 32,
    marginTop: 24,
    marginBottom: 32,
  },
  timerHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerMode: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  sessionCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 64,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  progressBar: {
    width: 200,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: 4,
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    backgroundColor: colors.text,
  },
  presetsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  presetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  presetTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },
  statsCard: {
    padding: 20,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    textAlign: 'center',
  },
  tipsCard: {
    padding: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
    lineHeight: 20,
  },
});
