import { Habit } from '../types/habits'

export const categories = [
	{ id: 'health', name: 'Health' },
	{ id: 'productivity', name: 'Productivity' },
	{ id: 'learning', name: 'Learning' },
	{ id: 'wellbeing', name: 'Wellbeing' },
]

export const exampleHabits: Habit[] = [
	{
		id: 'h1',
		title: 'Morning Run',
		category: 'health',
		description: 'Light jog or run',
		inputType: 'time_hours',
		dailyMax: 2,
		scoringRule: '10 points/hour',
		date: '2025-01-01',
	},
	{
		id: 'h2',
		title: 'Read Book',
		category: 'learning',
		description: 'Read non-fiction book',
		inputType: 'unit_count',
		dailyMax: 50,
		scoringRule: '1 points/page',
		date: '2025-01-01',
	},
	{
		id: 'h3',
		title: 'Meditate',
		category: 'wellbeing',
		description: '5-10 minutes mindfulness',
		inputType: 'checkbox',
		completedValue: 5,
		scoringRule: '5 points',
		date: '2025-01-01',
	},
	{
		id: 'h4',
		title: 'Inbox Zero',
		category: 'productivity',
		description: 'Clear your email inbox',
		inputType: 'checkbox',
		completedValue: 10,
		scoringRule: '10 points',
		date: '2025-01-01',
	},
] 