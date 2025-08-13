import { useEffect, useState } from 'react'

export function AnimateCheck({ trigger }: { trigger: boolean }) {
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		if (trigger) {
			setVisible(true)
			const t = setTimeout(() => setVisible(false), 600)
			return () => clearTimeout(t)
		}
	}, [trigger])
	return (
		<div className={`pointer-events-none fixed inset-0 flex items-center justify-center transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}>
			<div className="rounded-full bg-green-500 text-white px-4 py-2 shadow-lg">Nice!</div>
		</div>
	)
} 