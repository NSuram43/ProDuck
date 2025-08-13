import DailyScoresChart from '../components/DailyScoresChart'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Habit } from '../data/habits'
import { habits as allHabits } from '../data/habits'
import { calculateHabitScore } from '../utils/scoring'
import { getLastNDates, getToday, toMonthDay } from '../utils/date'

interface HabitInputsByDate {
  [date: string]: {
    [habitId: string]: number | boolean
  }
}

interface DailyScoresMap {
  [date: string]: number
}

export default function Stats() {
  const today = getToday()
  const [inputsByDate] = useLocalStorage<HabitInputsByDate>('produck.habitInputs', {})
  const [dailyScores] = useLocalStorage<DailyScoresMap>('produck.dailyScores', {})

  const values = inputsByDate[today] ?? {}
  const liveToday = allHabits.reduce((sum, h) => sum + calculateHabitScore(h as Habit, values[h.id] ?? 0), 0)
  const todayTotal = Math.round(dailyScores[today] ?? liveToday)

  const last7 = getLastNDates(7).map((d) => ({
    date: toMonthDay(d),
    score: Math.round(dailyScores[d] ?? 0),
  }))
  const last7Total = last7.reduce((s, p) => s + p.score, 0)

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Stats</h1>
        <p className="mt-1 text-gray-600">Your scores and recent progress.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Today’s score</div>
          <div className="mt-2 text-3xl font-bold text-sky-700">{todayTotal} pts</div>
          <div className="text-xs text-gray-500">Auto-updates until you submit</div>
        </div>
        <div className="bg-white border rounded-lg p-4 sm:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Last 7 days</div>
            <div className="text-sm text-gray-500">Total {last7Total} pts</div>
          </div>
          <DailyScoresChart data={last7} />
        </div>
      </div>
    </section>
  )
}