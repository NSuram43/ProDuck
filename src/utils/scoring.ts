import { Habit } from '../types/habits'

function parsePointsPerUnit(rule: string): { pointsPerUnit: number; unit: 'hour' | 'unit' | 'check' } {
	const perHour = /([0-9]+(?:\.[0-9]+)?)\s*points?\s*\/\s*hour/i
	const perUnit = /([0-9]+(?:\.[0-9]+)?)\s*points?\s*\/\s*(?:unit|count|page|rep|km|mi)/i
	const check = /([0-9]+(?:\.[0-9]+)?)\s*points?/i

	const mHour = rule.match(perHour)
	if (mHour) return { pointsPerUnit: Number(mHour[1]), unit: 'hour' }
	const mUnit = rule.match(perUnit)
	if (mUnit) return { pointsPerUnit: Number(mUnit[1]), unit: 'unit' }
	const mCheck = rule.match(check)
	if (mCheck) return { pointsPerUnit: Number(mCheck[1]), unit: 'check' }
	return { pointsPerUnit: 0, unit: 'unit' }
}

export function calculateHabitScore(habit: Habit, value: number | boolean): number {
	const { pointsPerUnit, unit } = parsePointsPerUnit(habit.scoringRule)

	if (habit.inputType === 'checkbox') {
		const done = Boolean(value)
		return done ? (habit.completedValue ?? (pointsPerUnit || 1)) : 0
	}

	const numeric = typeof value === 'number' ? value : 0
	const capped = typeof habit.dailyMax === 'number' ? Math.min(numeric, habit.dailyMax) : numeric

	switch (habit.inputType) {
		case 'time_hours':
			return capped * (unit === 'hour' ? pointsPerUnit : pointsPerUnit)
		case 'unit_count':
			return capped * (unit === 'unit' ? pointsPerUnit : pointsPerUnit)
		default:
			return 0
	}
} 