export type HabitInputType = 'checkbox' | 'time_hours' | 'unit_count'

export interface Habit {
	id: string
	title: string
	category: string
	description?: string
	inputType: HabitInputType
	dailyMax?: number
	scoringRule: string // e.g., "10 points/hour"
	completedValue?: number
	date: string // YYYY-MM-DD
} 