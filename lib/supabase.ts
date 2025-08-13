import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database helper functions
export const dbHelpers = {
  // Get or create user profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // Profile doesn't exist, create it
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            full_name: user.user.user_metadata?.full_name || 'User',
          })
          .select()
          .single();
        
        return { data: newProfile, error: createError };
      }
    }
    
    return { data, error };
  },

  // Get or create user stats
  async getUserStats(userId: string) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // Stats don't exist, create them
      const { data: newStats, error: createError } = await supabase
        .from('user_stats')
        .insert({ user_id: userId })
        .select()
        .single();
      
      return { data: newStats, error: createError };
    }
    
    return { data, error };
  },

  // Record study session
  async recordStudySession(userId: string, sessionData: {
    subject: string;
    duration: number;
    questions_answered?: number;
    correct_answers?: number;
    session_type?: string;
    notes?: string;
  }) {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: userId,
        ...sessionData,
      })
      .select()
      .single();
    
    return { data, error };
  },

  // Update daily progress
  async updateDailyProgress(userId: string, studyMinutes: number) {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('study_progress')
      .upsert({
        user_id: userId,
        date: today,
        study_minutes: studyMinutes,
        daily_goal_met: studyMinutes >= 60, // 60 minutes daily goal
      })
      .select()
      .single();
    
    return { data, error };
  },

  // Get dashboard data
  async getDashboardData(userId: string) {
    const [
      { data: examData },
      { data: progressData },
      { data: weeklyData },
      { data: sessionsData },
      { data: statsData }
    ] = await Promise.all([
      supabase.from('exam_preparations').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).single(),
      supabase.from('study_progress').select('*').eq('user_id', userId).order('date', { ascending: false }).limit(1).single(),
      supabase.from('weekly_activity').select('*').eq('user_id', userId).order('week_start', { ascending: false }).limit(1).single(),
      supabase.from('study_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
      supabase.from('user_stats').select('*').eq('user_id', userId).single()
    ]);

    return {
      examPreparation: examData,
      studyProgress: progressData,
      weeklyActivity: weeklyData,
      recentSessions: sessionsData || [],
      userStats: statsData
    };
  }
};