export function getToday(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getLastNDates(n: number, inclusiveToday = true): string[] {
  const dates: string[] = []
  const base = new Date()
  if (!inclusiveToday) {
    base.setDate(base.getDate() - 1)
  }
  for (let i = 0; i < n; i++) {
    const dt = new Date(base)
    dt.setDate(base.getDate() - (n - 1 - i))
    const y = dt.getFullYear()
    const m = String(dt.getMonth() + 1).padStart(2, '0')
    const d = String(dt.getDate()).padStart(2, '0')
    dates.push(`${y}-${m}-${d}`)
  }
  return dates
}

export function toMonthDay(date: string): string {
  const [, m, d] = date.split('-')
  return `${m}-${d}`
}