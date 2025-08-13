import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts' // requires `recharts` dependency
import { useLocalStorage } from '../hooks/useLocalStorage'

function getLast7Days(): string[] {
	const out: string[] = []
	const d = new Date()
	for (let i = 6; i >= 0; i--) {
		const t = new Date(d)
		t.setDate(d.getDate() - i)
		const yyyy = t.getFullYear()
		const mm = String(t.getMonth() + 1).padStart(2, '0')
		const dd = String(t.getDate()).padStart(2, '0')
		out.push(`${yyyy}-${mm}-${dd}`)
	}
	return out
}

type DailyScores = Record<string, number>

export function Stats() {
	const [dailyScores] = useLocalStorage<DailyScores>('daily-scores', {})

	const data = useMemo(() => {
		return getLast7Days().map((date) => ({
			date: date.slice(5),
			score: dailyScores[date] ?? 0,
		}))
	}, [dailyScores])

	const today = data[data.length - 1]?.score ?? 0

	return (
		<div className="space-y-6">
			<div className="flex items-end justify-between">
				<h1 className="text-2xl font-semibold">Stats</h1>
				<div className="text-sm text-gray-600">Today’s total: <span className="font-medium text-gray-900">{today}</span></div>
			</div>
			<div className="h-64 w-full">
				<ResponsiveContainer>
					<BarChart data={data} margin={{ left: 8, right: 8 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="score" fill="#111827" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
} 