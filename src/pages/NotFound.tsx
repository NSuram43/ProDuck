import { Link } from 'react-router-dom'

export function NotFound() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Not Found</h1>
			<p className="text-gray-600">The page you requested does not exist.</p>
			<Link to="/" className="text-gray-900 underline">Go home</Link>
		</div>
	)
} 