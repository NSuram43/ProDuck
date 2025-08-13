import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface OnboardingData {
	lifeFocus: 'health' | 'productivity' | 'learning' | 'wellbeing'
	preferredHabits: string[]
}

const options = [
	{ id: 'health', label: 'Health' },
	{ id: 'productivity', label: 'Productivity' },
	{ id: 'learning', label: 'Learning' },
	{ id: 'wellbeing', label: 'Wellbeing' },
]

export function Onboarding() {
	const navigate = useNavigate()
	const [stored, setStored] = useLocalStorage<OnboardingData | null>('onboarding', null)
	const [lifeFocus, setLifeFocus] = useState<OnboardingData['lifeFocus']>(stored?.lifeFocus ?? 'health')
	const [preferred, setPreferred] = useState<string[]>(stored?.preferredHabits ?? [])

	function togglePreferred(id: string) {
		setPreferred((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		setStored({ lifeFocus, preferredHabits: preferred })
		navigate('/')
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
			<h1 className="text-2xl font-semibold">Onboarding</h1>
			<div className="space-y-2">
				<label className="text-sm font-medium">Primary life focus</label>
				<div className="grid grid-cols-2 gap-2">
					{options.map((o) => (
						<label key={o.id} className={`rounded border p-3 cursor-pointer ${lifeFocus === o.id ? 'bg-gray-900 text-white' : ''}`}>
							<input
								type="radio"
								name="lifeFocus"
								className="mr-2"
								checked={lifeFocus === (o.id as OnboardingData['lifeFocus'])}
								onChange={() => setLifeFocus(o.id as OnboardingData['lifeFocus'])}
							/>
							{o.label}
						</label>
					))}
				</div>
			</div>
			<div className="space-y-2">
				<label className="text-sm font-medium">Preferred habit categories</label>
				<div className="grid grid-cols-2 gap-2">
					{options.map((o) => (
						<label key={o.id} className={`rounded border p-3 cursor-pointer ${preferred.includes(o.id) ? 'bg-gray-100' : ''}`}>
							<input
								type="checkbox"
								className="mr-2"
								checked={preferred.includes(o.id)}
								onChange={() => togglePreferred(o.id)}
							/>
							{o.label}
						</label>
					))}
				</div>
			</div>
			<button type="submit" className="rounded bg-gray-900 text-white px-4 py-2">Continue</button>
		</form>
	)
} 