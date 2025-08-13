/*
  # Initial Database Schema for ExamBuddy AI

  1. New Tables
    - `user_profiles` - Extended user profile information
    - `user_stats` - User study statistics and progress
    - `study_sessions` - Individual study session records
    - `exam_preparations` - Exam preparation tracking
    - `study_progress` - Daily study progress tracking
    - `weekly_activity` - Weekly activity summaries
    - `study_materials` - User uploaded study materials
    - `practice_questions` - Generated practice questions
    - `flashcard_decks` - Flashcard deck management
    - `flashcards` - Individual flashcards
    - `study_goals` - User study goals and targets
    - `achievements` - User achievements and badges

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Secure data access based on user authentication

  3. Features
    - Complete user profile management
    - Study session tracking
    - Progress analytics
    - Goal setting and tracking
    - Achievement system
    - Study materials management
*/

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  study_level text DEFAULT 'beginner',
  preferred_subjects text[] DEFAULT '{}',
  timezone text DEFAULT 'UTC',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User Stats
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_study_time integer DEFAULT 0,
  questions_answered integer DEFAULT 0,
  accuracy numeric(5,2) DEFAULT 0.00,
  streak integer DEFAULT 0,
  achievements integer DEFAULT 0,
  last_study_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON user_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Study Sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  duration integer NOT NULL DEFAULT 0,
  questions_answered integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  session_type text DEFAULT 'practice',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sessions"
  ON study_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Exam Preparations
CREATE TABLE IF NOT EXISTS exam_preparations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  exam_date date,
  days_left integer,
  progress numeric(5,2) DEFAULT 0.00,
  target_score integer,
  study_plan jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE exam_preparations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own exam preparations"
  ON exam_preparations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Study Progress
CREATE TABLE IF NOT EXISTS study_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  completed_days integer DEFAULT 0,
  total_days integer DEFAULT 0,
  percentage numeric(5,2) DEFAULT 0.00,
  daily_goal_met boolean DEFAULT false,
  study_minutes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON study_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Weekly Activity
CREATE TABLE IF NOT EXISTS weekly_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start date NOT NULL,
  questions integer DEFAULT 0,
  flashcards integer DEFAULT 0,
  study_minutes integer DEFAULT 0,
  sessions_completed integer DEFAULT 0,
  goals_met integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_start)
);

ALTER TABLE weekly_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own weekly activity"
  ON weekly_activity
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Study Materials
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  subject text,
  material_type text DEFAULT 'text',
  file_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own materials"
  ON study_materials
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Practice Questions
CREATE TABLE IF NOT EXISTS practice_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  material_id uuid REFERENCES study_materials(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb DEFAULT '[]',
  correct_answer text NOT NULL,
  explanation text,
  difficulty text DEFAULT 'medium',
  subject text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE practice_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own questions"
  ON practice_questions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Flashcard Decks
CREATE TABLE IF NOT EXISTS flashcard_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  subject text,
  card_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own decks"
  ON flashcard_decks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid REFERENCES flashcard_decks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  front text NOT NULL,
  back text NOT NULL,
  difficulty text DEFAULT 'medium',
  last_reviewed timestamptz,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own flashcards"
  ON flashcards
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Study Goals
CREATE TABLE IF NOT EXISTS study_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_value integer NOT NULL,
  current_value integer DEFAULT 0,
  goal_type text NOT NULL,
  deadline date,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE study_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own goals"
  ON study_goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  badge_icon text,
  earned_at timestamptz DEFAULT now(),
  achievement_type text DEFAULT 'milestone'
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Functions to automatically create user profile and stats
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_stats (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile and stats on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update user stats
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS trigger AS $$
BEGIN
  -- Update total study time and questions answered
  UPDATE user_stats 
  SET 
    total_study_time = total_study_time + COALESCE(NEW.duration, 0),
    questions_answered = questions_answered + COALESCE(NEW.questions_answered, 0),
    last_study_date = CURRENT_DATE,
    updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Update accuracy if we have correct answers data
  IF NEW.questions_answered > 0 AND NEW.correct_answers IS NOT NULL THEN
    UPDATE user_stats 
    SET accuracy = (
      SELECT ROUND(
        (SUM(correct_answers)::numeric / NULLIF(SUM(questions_answered), 0)) * 100, 2
      )
      FROM study_sessions 
      WHERE user_id = NEW.user_id 
      AND questions_answered > 0
    )
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update stats when study session is created
DROP TRIGGER IF EXISTS on_study_session_created ON study_sessions;
CREATE TRIGGER on_study_session_created
  AFTER INSERT ON study_sessions
  FOR EACH ROW EXECUTE PROCEDURE public.update_user_stats();

-- Insert sample data for demo purposes
DO $$
DECLARE
  sample_user_id uuid;
BEGIN
  -- Check if we have any users, if not create sample data
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  IF sample_user_id IS NOT NULL THEN
    -- Insert sample exam preparation
    INSERT INTO exam_preparations (user_id, subject, exam_date, days_left, progress, target_score)
    VALUES (sample_user_id, 'Mathematics Final Exam', CURRENT_DATE + INTERVAL '12 days', 12, 65.5, 85)
    ON CONFLICT DO NOTHING;
    
    -- Insert sample study progress
    INSERT INTO study_progress (user_id, date, completed_days, total_days, percentage, daily_goal_met, study_minutes)
    VALUES (sample_user_id, CURRENT_DATE, 15, 27, 55.6, true, 75)
    ON CONFLICT (user_id, date) DO UPDATE SET
      completed_days = EXCLUDED.completed_days,
      total_days = EXCLUDED.total_days,
      percentage = EXCLUDED.percentage,
      daily_goal_met = EXCLUDED.daily_goal_met,
      study_minutes = EXCLUDED.study_minutes;
    
    -- Insert sample weekly activity
    INSERT INTO weekly_activity (user_id, week_start, questions, flashcards, study_minutes, sessions_completed, goals_met)
    VALUES (sample_user_id, DATE_TRUNC('week', CURRENT_DATE), 24, 18, 320, 5, 4)
    ON CONFLICT (user_id, week_start) DO UPDATE SET
      questions = EXCLUDED.questions,
      flashcards = EXCLUDED.flashcards,
      study_minutes = EXCLUDED.study_minutes,
      sessions_completed = EXCLUDED.sessions_completed,
      goals_met = EXCLUDED.goals_met;
    
    -- Insert sample study sessions
    INSERT INTO study_sessions (user_id, subject, duration, questions_answered, correct_answers, session_type)
    VALUES 
      (sample_user_id, 'Mathematics', 45, 10, 8, 'practice'),
      (sample_user_id, 'Physics', 30, 8, 6, 'review'),
      (sample_user_id, 'Chemistry', 60, 15, 12, 'practice'),
      (sample_user_id, 'Biology', 35, 12, 10, 'quiz'),
      (sample_user_id, 'Mathematics', 50, 20, 16, 'test')
    ON CONFLICT DO NOTHING;
    
    -- Update user stats to reflect the sample data
    UPDATE user_stats 
    SET 
      total_study_time = 220,
      questions_answered = 65,
      accuracy = 80.0,
      streak = 5,
      achievements = 3,
      last_study_date = CURRENT_DATE
    WHERE user_id = sample_user_id;
  END IF;
END $$;