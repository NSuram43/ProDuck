import { NavLink } from 'react-router-dom'

export function MobileNav() {
	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white">
			<ul className="grid grid-cols-4">
				<Tab to="/">Dash</Tab>
				<Tab to="/habits">Habits</Tab>
				<Tab to="/stats">Stats</Tab>
				<Tab to="/settings">Settings</Tab>
			</ul>
		</nav>
	)
}

function Tab({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`block text-center py-2 text-sm ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}`
				}
			>
				{children}
			</NavLink>
		</li>
	)
} 