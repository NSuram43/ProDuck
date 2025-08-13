import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AppLayout } from './pages/_layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Habits } from './pages/Habits'
import { Stats } from './pages/Stats'
import { Settings } from './pages/Settings'
import { Onboarding } from './pages/Onboarding'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: 'habits', element: <Habits /> },
			{ path: 'stats', element: <Stats /> },
			{ path: 'settings', element: <Settings /> },
			{ path: 'onboarding', element: <Onboarding /> },
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
) 