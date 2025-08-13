import { Link, NavLink, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            <span className="text-sky-600">Pro</span> Duck
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[240px,1fr]">
        <aside className="border-r bg-white md:min-h-[calc(100vh-56px)]">
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
        `block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-700 ${
          isActive ? 'bg-sky-100 text-sky-700' : 'text-gray-700'
        }`
      }
      end
    >
      {label}
    </NavLink>
  )
}