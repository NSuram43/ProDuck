import { Link, NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import DecorBackground from '../components/DecorBackground'

export default function AppLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <DecorBackground />
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 glass">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight gradient-text">
            Pro Duck
          </Link>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[240px,1fr]">
        <aside className="glass md:min-h-[calc(100vh-56px)]">
          <nav className="p-3 space-y-1">
            <SidebarLink to="/" label="Dashboard" />
            <SidebarLink to="/habits" label="Habits" />
            <SidebarLink to="/stats" label="Stats" />
            <SidebarLink to="/settings" label="Settings" />
          </nav>
        </aside>

        <main className="p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-white/60 dark:hover:bg-gray-800/60 ${
          isActive ? 'bg-white/70 text-sky-700 dark:bg-gray-800/70 dark:text-sky-400' : 'text-gray-700 dark:text-gray-300'
        }`
      }
      end
    >
      {label}
    </NavLink>
  )
}