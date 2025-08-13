import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { categories, exampleHabits } from '../data/habits'

interface OnboardingData {
  focus: string
  preferredHabits: string[]
  note?: string
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [data, setData] = useLocalStorage<OnboardingData>('produck.onboarding', {
    focus: '',
    preferredHabits: [],
    note: '',
  })

  const [local, setLocal] = useState<OnboardingData>(data)

  function toggleHabit(id: string) {
    setLocal((prev) => {
      const exists = prev.preferredHabits.includes(id)
      return {
        ...prev,
        preferredHabits: exists ? prev.preferredHabits.filter((h) => h !== id) : [...prev.preferredHabits, id],
      }
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setData(local)
    navigate('/')
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Welcome to Pro Duck</h1>
      <p className="mt-1 text-gray-600">Let’s personalize your experience.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary focus</label>
          <select
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={local.focus}
            onChange={(e) => setLocal((prev) => ({ ...prev, focus: e.target.value }))}
          >
            <option value="">Select a focus</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-700">Preferred habits</div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exampleHabits.map((h) => (
              <label key={h.id} className="flex items-center gap-2 rounded border p-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-sky-600"
                  checked={local.preferredHabits.includes(h.id)}
                  onChange={() => toggleHabit(h.id)}
                />
                <span className="text-sm">{h.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Anything else?</label>
          <textarea
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows={4}
            placeholder="Share a note with your future self."
            value={local.note}
            onChange={(e) => setLocal((prev) => ({ ...prev, note: e.target.value }))}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="submit" className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 active:scale-[.99] transition">
            Continue to Dashboard
          </button>
        </div>
      </form>
    </section>
  )
}