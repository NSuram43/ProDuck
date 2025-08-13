import { useMemo, useState } from 'react'
import { habits as allHabits, type Habit, type HabitInputType } from '../data/habits'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { calculateHabitScore } from '../utils/scoring'
import { getToday } from '../utils/date'
import { pickMotivation } from '../data/messages'
import Toast from '../components/Toast'

type HabitValue = number | boolean

interface HabitInputsByDate {
  [date: string]: {
    [habitId: string]: HabitValue
  }
}

interface DailyScoresMap {
  [date: string]: number
}

export default function Habits() {
  const today = getToday()
  const [inputsByDate, setInputsByDate] = useLocalStorage<HabitInputsByDate>('produck.habitInputs', {})
  const [, setDailyScores] = useLocalStorage<DailyScoresMap>('produck.dailyScores', {})
  const [message, setMessage] = useState<string>('')
  const [showToast, setShowToast] = useState(false)
  const [pulse, setPulse] = useState(false)

  const valuesForToday = inputsByDate[today] ?? {}

  const categories = useMemo(() => {
    const set = new Set(allHabits.map((h) => h.category))
    return Array.from(set)
  }, [])

  const habitsByCategory = useMemo(() => {
    const map: Record<string, Habit[]> = {}
    for (const cat of categories) map[cat] = []
    for (const h of allHabits) {
      if (!map[h.category]) map[h.category] = []
      map[h.category].push(h as Habit)
    }
    return map
  }, [categories])

  function updateValue(habit: Habit, next: HabitValue) {
    setInputsByDate((prev) => ({
      ...prev,
      [today]: {
        ...(prev[today] ?? {}),
        [habit.id]: next,
      },
    }))
  }

  const perHabitScores = useMemo(() => {
    const result: Record<string, number> = {}
    for (const h of allHabits) {
      const v = valuesForToday[h.id]
      result[h.id] = calculateHabitScore(h as Habit, v as HabitValue)
    }
    return result
  }, [valuesForToday])

  const totalScore = useMemo(() => Object.values(perHabitScores).reduce((sum, s) => sum + (Number.isFinite(s) ? s : 0), 0), [perHabitScores])

  function handleSubmitDay() {
    setDailyScores((prev) => ({ ...prev, [today]: Math.round(totalScore) }))
    const msg = pickMotivation(totalScore)
    setMessage(msg)
    setShowToast(true)
    setPulse(true)
    setTimeout(() => setPulse(false), 650)
  }

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Habits</h1>
          <p className="mt-1 text-gray-600">Track your daily habits.</p>
        </div>
        <div className={`text-right ${pulse ? 'success-pulse rounded-md px-2' : ''}`}>
          <div className="text-sm text-gray-500">Today</div>
          <div className="text-2xl font-bold text-sky-700">{Math.round(totalScore)} pts</div>
          <div className="text-xs text-gray-500">Submit to save and get motivation</div>
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="bg-white rounded-lg border shadow-sm">
          <div className="px-4 py-2 border-b font-medium flex items-center justify-between">
            <span>{cat}</span>
            <span className="text-xs text-gray-500">{habitsByCategory[cat]?.length ?? 0} items</span>
          </div>
          <div className="divide-y">
            {habitsByCategory[cat]?.map((h) => (
              <HabitRow
                key={h.id}
                habit={h}
                value={valuesForToday[h.id]}
                onChange={updateValue}
                score={perHabitScores[h.id] ?? 0}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button onClick={handleSubmitDay} className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 active:scale-[.99] transition">
          Submit Daily Log
        </button>
      </div>

      {showToast && (
        <Toast
          message={message}
          variant="success"
          onClose={() => setShowToast(false)}
        />)
      }
    </section>
  )
}

function HabitRow({ habit, value, onChange, score }: { habit: Habit; value: HabitValue | undefined; onChange: (h: Habit, v: HabitValue) => void; score: number }) {
  return (
    <div className="px-4 py-3 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-medium truncate">{habit.title}</div>
          {habit.dailyMax != null && (
            <span className="text-xs text-gray-500">max {habit.dailyMax}{habit.inputType === 'time_hours' ? 'h' : ''}</span>
          )}
          {habit.dailyPointsCap != null && (
            <span className="text-xs text-gray-500">cap {habit.dailyPointsCap} pts/day</span>
          )}
        </div>
        {habit.description && <div className="text-sm text-gray-500">{habit.description}</div>}
      </div>

      <div className="w-48">
        <HabitInput
          type={habit.inputType}
          value={value}
          onValue={(v) => onChange(habit, v)}
          max={habit.dailyMax}
          unitLabel={habit.inputType === 'time_hours' ? 'h' : habit.unitLabel}
        />
      </div>

      <div className="w-24 text-right text-sm font-semibold text-sky-700">{Math.round(score)} pts</div>
    </div>
  )
}

function HabitInput({ type, value, onValue, max, unitLabel }: { type: HabitInputType; value: HabitValue | undefined; onValue: (v: HabitValue) => void; max?: number; unitLabel?: string }) {
  if (type === 'checkbox') {
    return (
      <label className="inline-flex items-center gap-2 select-none cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 accent-sky-600"
          checked={Boolean(value)}
          onChange={(e) => onValue(e.target.checked)}
        />
        <span className="text-sm text-gray-700">Done</span>
      </label>
    )
  }

  const step = type === 'time_hours' ? 0.25 : 1
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        min={0}
        max={max}
        step={step}
        value={typeof value === 'number' ? value : ('' as any)}
        placeholder={type === 'time_hours' ? '0.0' : '0'}
        onChange={(e) => onValue(e.target.value === '' ? 0 : Number(e.target.value))}
      />
      {unitLabel && <span className="text-xs text-gray-500">{unitLabel}</span>}
    </div>
  )
}