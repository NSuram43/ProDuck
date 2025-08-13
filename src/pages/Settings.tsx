import { useLocalStorage } from '../hooks/useLocalStorage'

export function Settings() {
	const [, setDailyScores] = useLocalStorage<Record<string, number>>('daily-scores', {})
	const [, setValues] = useLocalStorage<Record<string, unknown>>(`habit-values:dummy`, {})

	function resetData() {
		localStorage.removeItem('daily-scores')
		Object.keys(localStorage)
			.filter((k) => k.startsWith('habit-values:'))
			.forEach((k) => localStorage.removeItem(k))
		setDailyScores({})
		setValues({})
		alert('Local data reset')
	}

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Settings</h1>
			<p className="text-gray-600">Adjust preferences and app configuration.</p>
			<button aria-label="Reset local data" onClick={resetData} className="rounded bg-gray-900 text-white px-3 py-2">Reset Local Data</button>
		</div>
	)
} 