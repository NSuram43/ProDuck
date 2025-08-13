import { Habit } from '../types/habits'

interface HabitItemProps {
	habit: Habit
	value: number | boolean
	onChange: (value: number | boolean) => void
	score: number
}

export function HabitItem({ habit, value, onChange, score }: HabitItemProps) {
	return (
		<div className="flex items-center justify-between rounded border p-3">
			<div className="min-w-0 pr-3">
				<div className="font-medium truncate">{habit.title}</div>
				{habit.description ? (
					<p className="text-sm text-gray-600 truncate">{habit.description}</p>
				) : null}
			</div>
			<div className="flex items-center gap-3">
				{habit.inputType === 'checkbox' ? (
					<input
						type="checkbox"
						className="h-5 w-5"
						checked={Boolean(value)}
						onChange={(e) => onChange(e.target.checked)}
					/>
				) : habit.inputType === 'time_hours' ? (
					<div className="flex items-center gap-2">
						<input
							type="number"
							min={0}
							step={0.25}
							className="w-24 rounded border px-2 py-1"
							value={typeof value === 'number' ? value : 0}
							onChange={(e) => onChange(Number(e.target.value))}
						/>
						<span className="text-sm text-gray-600">hrs</span>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<input
							type="number"
							min={0}
							step={1}
							className="w-24 rounded border px-2 py-1"
							value={typeof value === 'number' ? value : 0}
							onChange={(e) => onChange(Number(e.target.value))}
						/>
						<span className="text-sm text-gray-600">units</span>
					</div>
				)}
				<div className="text-sm font-medium min-w-[3rem] text-right">{score}</div>
			</div>
		</div>
	)
} 