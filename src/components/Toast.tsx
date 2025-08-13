import { useEffect, useState } from 'react'

export type ToastVariant = 'success' | 'info' | 'warning'

export default function Toast({
  message,
  variant = 'info',
  durationMs = 4000,
  onClose,
}: {
  message: string
  variant?: ToastVariant
  durationMs?: number
  onClose?: () => void
}) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true)
      const end = setTimeout(() => onClose?.(), 250)
      return () => clearTimeout(end)
    }, durationMs)
    return () => clearTimeout(t)
  }, [durationMs, onClose])

  const color =
    variant === 'success'
      ? 'bg-emerald-600 border-emerald-700'
      : variant === 'warning'
      ? 'bg-amber-500 border-amber-600'
      : 'bg-sky-600 border-sky-700'

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        role="status"
        className={`max-w-md w-full text-white ${color} border text-sm rounded-lg shadow-lg px-4 py-3 toast ${
          exiting ? 'toast-exit' : 'toast-enter'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="inline-block pt-0.5">{message}</span>
          <button
            aria-label="Close"
            className="ml-auto text-white/80 hover:text-white"
            onClick={() => {
              setExiting(true)
              setTimeout(() => onClose?.(), 200)
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}