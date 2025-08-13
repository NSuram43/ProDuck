export type HabitInputType = 'checkbox' | 'time_hours' | 'unit_count'

export type ScoringRuleSpec =
  | { type: 'flat'; points: number }
  | { type: 'per_hour'; pointsPerHour: number }
  | { type: 'per_unit'; pointsPerUnit: number }

export interface Habit {
  id: string
  title: string
  category: string
  description?: string
  inputType: HabitInputType
  dailyMax?: number
  dailyPointsCap?: number
  unitLabel?: string
  scoringRule: string | ScoringRuleSpec
  completedValue?: number
  date: string
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const categories = [
  { id: 'health', name: 'Health' },
  { id: 'mental-health', name: 'Mental Health' },
  { id: 'career-planning', name: 'Career Planning' },
  { id: 'relationships', name: 'Relationships' },
  { id: 'environment', name: 'Environment' },
]

export type HabitTemplate = Omit<Habit, 'date'>

export const habits: HabitTemplate[] = [
  // Health
  {
    id: slugify('Daily Exercise'),
    title: 'Daily Exercise',
    category: 'Health',
    description: 'Engage in physical activity for at least 30 minutes.',
    inputType: 'time_hours',
    dailyPointsCap: 60,
    scoringRule: { type: 'per_hour', pointsPerHour: 15 },
  },
  {
    id: slugify('Hydration Goal'),
    title: 'Hydration Goal',
    category: 'Health',
    description: 'Drink a specified amount of water daily (e.g., 8 glasses).',
    inputType: 'unit_count',
    dailyPointsCap: 5,
    unitLabel: 'glasses',
    scoringRule: { type: 'per_unit', pointsPerUnit: 0.5 },
  },
  {
    id: slugify('Healthy Meal Prep'),
    title: 'Healthy Meal Prep',
    category: 'Health',
    description: 'Prepare healthy meals in advance.',
    inputType: 'checkbox',
    dailyPointsCap: 5,
    scoringRule: { type: 'flat', points: 5 },
    completedValue: 5,
  },
  {
    id: slugify('Quality Sleep'),
    title: 'Quality Sleep',
    category: 'Health',
    description: 'Aim for 7-9 hours of uninterrupted sleep.',
    inputType: 'time_hours',
    dailyPointsCap: 40,
    scoringRule: { type: 'per_hour', pointsPerHour: 5 },
  },
  {
    id: slugify('Limit Screen Time'),
    title: 'Limit Screen Time',
    category: 'Health',
    description: 'Reduce recreational screen time before bed.',
    inputType: 'time_hours',
    dailyPointsCap: 10,
    scoringRule: { type: 'per_hour', pointsPerHour: 2 },
  },
  // Mental Health
  {
    id: slugify('Daily Meditation'),
    title: 'Daily Meditation',
    category: 'Mental Health',
    description: 'Practice mindfulness meditation for a set duration.',
    inputType: 'checkbox',
    dailyPointsCap: 10,
    scoringRule: { type: 'flat', points: 10 },
    completedValue: 10,
  },
  {
    id: slugify('Journaling'),
    title: 'Journaling',
    category: 'Mental Health',
    description: 'Write down thoughts and feelings in a journal.',
    inputType: 'checkbox',
    dailyPointsCap: 5,
    scoringRule: { type: 'flat', points: 5 },
    completedValue: 5,
  },
  {
    id: slugify('Gratitude Practice'),
    title: 'Gratitude Practice',
    category: 'Mental Health',
    description: 'List things you are grateful for each day.',
    inputType: 'unit_count',
    dailyPointsCap: 5,
    unitLabel: 'entries',
    scoringRule: { type: 'per_unit', pointsPerUnit: 1 },
  },
  // Career Planning
  {
    id: slugify('Update Resume'),
    title: 'Update Resume',
    category: 'Career Planning',
    description: 'Regularly update your professional documents.',
    inputType: 'checkbox',
    dailyPointsCap: 15,
    scoringRule: { type: 'flat', points: 15 },
    completedValue: 15,
  },
  {
    id: slugify('Networking Hours'),
    title: 'Networking Hours',
    category: 'Career Planning',
    description: 'Connect with new professionals or maintain existing connections.',
    inputType: 'time_hours',
    dailyPointsCap: 20,
    scoringRule: { type: 'per_hour', pointsPerHour: 10 },
  },
  {
    id: slugify('Learn Skill Hours'),
    title: 'Learn Skill Hours',
    category: 'Career Planning',
    description: 'Dedicate time to learning new skills relevant to your career.',
    inputType: 'time_hours',
    dailyPointsCap: 36,
    scoringRule: { type: 'per_hour', pointsPerHour: 12 },
  },
  // Relationships
  {
    id: slugify('Connect Loved Ones'),
    title: 'Connect Loved Ones',
    category: 'Relationships',
    description: 'Reach out to family or friends (call, text, visit).',
    inputType: 'checkbox',
    dailyPointsCap: 10,
    scoringRule: { type: 'flat', points: 10 },
    completedValue: 10,
  },
  {
    id: slugify('Help Others Hours'),
    title: 'Help Others Hours',
    category: 'Relationships',
    description: 'Offer assistance or support to others.',
    inputType: 'time_hours',
    dailyPointsCap: 16,
    scoringRule: { type: 'per_hour', pointsPerHour: 8 },
  },
  // Environment
  {
    id: slugify('Declutter'),
    title: 'Declutter',
    category: 'Environment',
    description: 'Tidy up or declutter a specific area.',
    inputType: 'checkbox',
    dailyPointsCap: 8,
    scoringRule: { type: 'flat', points: 8 },
    completedValue: 8,
  },
  {
    id: slugify('Organize Files (minutes)'),
    title: 'Organize Files (minutes)',
    category: 'Environment',
    description: 'Organize digital files and folders.',
    inputType: 'unit_count',
    dailyPointsCap: 20,
    unitLabel: 'min',
    scoringRule: { type: 'per_unit', pointsPerUnit: 0.4 },
  },
]