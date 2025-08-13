import { useMemo, useState } from 'react'
import { Habit } from '../types/habits'
import { categories, exampleHabits } from '../data/habits'
import { HabitItem } from '../components/HabitItem'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { calculateHabitScore } from '../utils/scoring'
import { AnimateCheck } from '../components/AnimateCheck'

function todayKey() {
	const d = new Date()
	const yyyy = d.getFullYear()
	const mm = String(d.getMonth() + 1).padStart(2, '0')
	const dd = String(d.getDate()).padStart(2, '0')
	return `${yyyy}-${mm}-${dd}`
}

type HabitValues = Record<string, number | boolean>

type DailyScores = Record<string, number>

const messages = {
	low: [
		"Every step counts. Tomorrow is another chance.",
		"Small progress is still progress.",
	],
	medium: [
		"Nice work! Keep the momentum going.",
		"You're building strong habits.",
	],
	high: [
		"Fantastic day! You're on fire.",
		"Outstanding focus today!",
	],
}

function pickMessage(score: number) {
	const tier = score >= 50 ? 'high' : score >= 20 ? 'medium' : 'low'
	const list = messages[tier]
	return list[Math.floor(Math.random() * list.length)]
}

export function Habits() {
	const [values, setValues] = useLocalStorage<HabitValues>(`habit-values:${todayKey()}`, {})
	const [dailyScores, setDailyScores] = useLocalStorage<DailyScores>('daily-scores', {})
	const [lastSubmitMsg, setLastSubmitMsg] = useState<string | null>(null)
	const [animate, setAnimate] = useState(false)

	const grouped = useMemo(() => {
		const byCat: Record<string, Habit[]> = {}
		for (const cat of categories) byCat[cat.id] = []
		for (const h of exampleHabits) {
			if (!byCat[h.category]) byCat[h.category] = []
			byCat[h.category].push(h)
		}
		return byCat
	}, [])

	const scores = useMemo(() => {
		const map: Record<string, number> = {}
		for (const h of exampleHabits) {
			map[h.id] = calculateHabitScore(h, values[h.id] ?? (h.inputType === 'checkbox' ? false : 0))
		}
		return map
	}, [values])

	const totalScore = useMemo(() => Object.values(scores).reduce((a, b) => a + b, 0), [scores])

	function updateHabitValue(id: string, v: number | boolean) {
		const next = { ...values, [id]: v }
		setValues(next)
		const nextTotal = exampleHabits.reduce((sum, h) => {
			const val = id === h.id ? v : next[h.id] ?? (h.inputType === 'checkbox' ? false : 0)
			return sum + calculateHabitScore(h, val)
		}, 0)
		setDailyScores({ ...dailyScores, [todayKey()]: nextTotal })
		const isCheckbox = exampleHabits.find((h) => h.id === id)?.inputType === 'checkbox'
		if (isCheckbox && v === true) setAnimate(true)
	}

	function submitDay() {
		setDailyScores({ ...dailyScores, [todayKey()]: totalScore })
		setLastSubmitMsg(pickMessage(totalScore))
	}

	return (
		<div className="space-y-6">
			<AnimateCheck trigger={animate} />
			<div className="flex items-end justify-between">
				<h1 className="text-2xl font-semibold">Habits</h1>
				<div className="text-sm text-gray-600">Today’s score: <span className="font-medium text-gray-900">{totalScore}</span></div>
			</div>
			{categories.map((cat) => (
				<section key={cat.id} className="space-y-3">
					<h2 className="text-lg font-medium">{cat.name}</h2>
					<div className="space-y-3">
						{grouped[cat.id]?.length ? (
							grouped[cat.id].map((h) => (
								<HabitItem
									key={h.id}
									habit={h}
									value={values[h.id] ?? (h.inputType === 'checkbox' ? false : 0)}
									score={scores[h.id] ?? 0}
									onChange={(v) => updateHabitValue(h.id, v)}
								/>
							))
						) : (
							<p className="text-sm text-gray-500">No habits in this category.</p>
						)}
					</div>
				</section>
			))}
			<div className="flex items-center justify-between">
				<button onClick={submitDay} className="rounded bg-gray-900 text-white px-4 py-2">Submit Daily Log</button>
				{lastSubmitMsg ? (
					<div className="text-sm text-gray-700">{lastSubmitMsg}</div>
				) : null}
			</div>
		</div>
	)
} 