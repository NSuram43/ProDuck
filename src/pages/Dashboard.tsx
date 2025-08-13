import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

function todayKey() {
	const d = new Date()
	const yyyy = d.getFullYear()
	const mm = String(d.getMonth() + 1).padStart(2, '0')
	const dd = String(d.getDate()).padStart(2, '0')
	return `${yyyy}-${mm}-${dd}`
}

type DailyScores = Record<string, number>

export function Dashboard() {
	const [dailyScores] = useLocalStorage<DailyScores>('daily-scores', {})
	const today = dailyScores[todayKey()] ?? 0

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<div className="rounded border p-4 bg-white">
				<div className="text-sm text-gray-600">Today's score</div>
				<div className="text-3xl font-bold">{today}</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<Link to="/habits" className="rounded border p-4 hover:bg-gray-50">
					<div className="font-medium">Log Habits</div>
					<p className="text-sm text-gray-600">Track today's habits and earn points.</p>
				</Link>
				<Link to="/stats" className="rounded border p-4 hover:bg-gray-50">
					<div className="font-medium">View Stats</div>
					<p className="text-sm text-gray-600">See your progress over the last week.</p>
				</Link>
				<Link to="/onboarding" className="rounded border p-4 hover:bg-gray-50">
					<div className="font-medium">Onboarding</div>
					<p className="text-sm text-gray-600">Update your focus and preferences.</p>
				</Link>
			</div>
		</div>
	)
} 