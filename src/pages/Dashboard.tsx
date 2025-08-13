import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome to Pro Duck.</p>
      </div>
      <div className="flex gap-3">
        <Link className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700" to="/onboarding">
          Onboarding
        </Link>
        <Link className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50" to="/habits">
          Go to Habits
        </Link>
      </div>
    </section>
  )
}