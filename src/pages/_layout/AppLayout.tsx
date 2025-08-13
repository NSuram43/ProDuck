import { Link, NavLink, Outlet } from 'react-router-dom'
import { MobileNav } from './MobileNav'

export function AppLayout() {
	return (
		<div className="min-h-screen grid grid-rows-[auto,1fr] pb-12 md:pb-0">
			<header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
				<div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
					<Link to="/" className="text-lg font-semibold tracking-tight">Pro Duck</Link>
				</div>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-[260px,1fr]">
				<aside className="border-r bg-white hidden md:block">
					<nav className="p-4 space-y-1">
						<SidebarLink to="/">Dashboard</SidebarLink>
						<SidebarLink to="/habits">Habits</SidebarLink>
						<SidebarLink to="/stats">Stats</SidebarLink>
						<SidebarLink to="/settings">Settings</SidebarLink>
					</nav>
				</aside>
				<main className="p-4 md:p-6">
					<Outlet />
				</main>
			</div>
			<MobileNav />
		</div>
	)
}

function SidebarLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`block rounded px-3 py-2 text-sm transition-colors ${
					isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
				}`
			}
		>
			{children}
		</NavLink>
	)
} 