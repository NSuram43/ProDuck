import type { Habit, ScoringRuleSpec } from '../data/habits'

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

function fromSpec(rule: ScoringRuleSpec): { pointsPer: number; unit: 'hour' | 'unit' | 'check' } {
  switch (rule.type) {
    case 'flat':
      return { pointsPer: rule.points, unit: 'check' }
    case 'per_hour':
      return { pointsPer: rule.pointsPerHour, unit: 'hour' }
    case 'per_unit':
      return { pointsPer: rule.pointsPerUnit, unit: 'unit' }
    default:
      return { pointsPer: 0, unit: 'check' }
  }
}

export function calculateHabitScore(habit: Habit, value: number | boolean): number {
  const { pointsPer } = typeof habit.scoringRule === 'string' ? parsePointsPer(habit.scoringRule) : fromSpec(habit.scoringRule)

  let score = 0
  if (habit.inputType === 'checkbox') {
    const isChecked = Boolean(value)
    if (isChecked) {
      const flat = typeof habit.completedValue === 'number' ? habit.completedValue : pointsPer
      score = flat
    }
  } else {
    const numericValue = typeof value === 'number' ? value : 0
    const factor = pointsPer
    score = factor * numericValue
  }

  if (typeof habit.dailyPointsCap === 'number') {
    score = Math.min(score, habit.dailyPointsCap)
  }

  if (typeof habit.dailyMax === 'number' && typeof value === 'number') {
    // If dailyMax is provided for numeric inputs, cap the input first
    const cappedInput = Math.min(value, habit.dailyMax)
    const factor = pointsPer
    const recalculated = habit.inputType === 'checkbox' ? score : factor * cappedInput
    score = typeof habit.dailyPointsCap === 'number' ? Math.min(recalculated, habit.dailyPointsCap) : recalculated
  }

  return Math.max(0, Math.round(score * 100) / 100)
}