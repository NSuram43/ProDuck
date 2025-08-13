import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export interface DailyScorePoint {
  date: string
  score: number
}

export default function DailyScoresChart({ data }: { data: DailyScorePoint[] }) {
  const axisStyle = {
    fill: 'currentColor',
  } as any

  return (
    <div className="w-full h-64 text-gray-800 dark:text-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} tick={axisStyle} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} tick={axisStyle} />
          <Tooltip cursor={{ fill: 'rgba(14,165,233,0.08)' }} />
          <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}