import type { Habit } from '../data/habits'

function parsePointsPer(rule: string): { pointsPer: number; unit: 'hour' | 'unit' | 'check' } {
  const normalized = rule.trim().toLowerCase()
  const perMatch = normalized.match(/([\d.]+)\s*points?\s*(?:\/|per)\s*(hour|unit)/i)
  if (perMatch) {
    return { pointsPer: Number(perMatch[1]), unit: perMatch[2] as 'hour' | 'unit' }
  }
  const flatMatch = normalized.match(/([\d.]+)\s*points?/)
  if (flatMatch) {
    return { pointsPer: Number(flatMatch[1]), unit: 'check' }
  }
  return { pointsPer: 0, unit: 'check' }
}

export function calculateHabitScore(habit: Habit, value: number | boolean): number {
  const { pointsPer, unit } = parsePointsPer(habit.scoringRule)

  if (habit.inputType === 'checkbox') {
    const isChecked = Boolean(value)
    if (!isChecked) return 0
    const flat = typeof habit.completedValue === 'number' ? habit.completedValue : pointsPer
    return Math.max(0, Math.round(flat * 100) / 100)
  }

  const numericValue = typeof value === 'number' ? value : 0
  const cappedValue = typeof habit.dailyMax === 'number' ? Math.min(numericValue, habit.dailyMax) : numericValue

  if (habit.inputType === 'time_hours') {
    const factor = unit === 'hour' ? pointsPer : pointsPer
    const score = factor * cappedValue
    return Math.max(0, Math.round(score * 100) / 100)
  }

  if (habit.inputType === 'unit_count') {
    const factor = unit === 'unit' ? pointsPer : pointsPer
    const score = factor * cappedValue
    return Math.max(0, Math.round(score * 100) / 100)
  }

  return 0
}