export type HabitInputType = 'checkbox' | 'time_hours' | 'unit_count'

export interface Habit {
  id: string
  title: string
  category: string
  description?: string
  inputType: HabitInputType
  dailyMax?: number
  scoringRule: string
  completedValue?: number
  date: string
}

export const categories = [
  { id: 'health', name: 'Health' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'learning', name: 'Learning' },
  { id: 'wellness', name: 'Wellness' },
]

export type HabitTemplate = Omit<Habit, 'date'>

export const exampleHabits: HabitTemplate[] = [
  {
    id: 'drink-water',
    title: 'Drink Water',
    category: 'Health',
    description: 'Stay hydrated throughout the day.',
    inputType: 'unit_count',
    dailyMax: 8,
    scoringRule: '5 points/unit',
    completedValue: 0,
  },
  {
    id: 'workout',
    title: 'Workout',
    category: 'Health',
    description: 'Exercise to increase energy and strength.',
    inputType: 'time_hours',
    dailyMax: 2,
    scoringRule: '10 points/hour',
    completedValue: 0,
  },
  {
    id: 'read-book',
    title: 'Read Book',
    category: 'Learning',
    description: 'Make steady progress on reading.',
    inputType: 'unit_count',
    dailyMax: 50,
    scoringRule: '0.5 points/unit',
    completedValue: 0,
  },
  {
    id: 'meditate',
    title: 'Meditate',
    category: 'Wellness',
    description: 'Practice mindfulness.',
    inputType: 'checkbox',
    scoringRule: '20 points',
    completedValue: 20,
  },
]