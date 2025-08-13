export const motivationalMessages = {
  low: [
    'Small steps add up. You showed up today.',
    'Keep going—consistency beats intensity.',
    'Every bit counts. You’ve got this tomorrow too.',
  ],
  medium: [
    'Nice momentum—steady progress today!',
    'Good work—your habits are stacking up.',
    'Solid day. Keep the streak alive!',
  ],
  high: [
    'Fantastic performance—ducktastic day!',
    'You crushed it. Celebrate the wins!',
    'Amazing effort—your future self says thanks!',
  ],
}

export function pickMotivation(score: number) {
  if (score >= 70) {
    const pool = motivationalMessages.high
    return pool[Math.floor(Math.random() * pool.length)]
  }
  if (score >= 30) {
    const pool = motivationalMessages.medium
    return pool[Math.floor(Math.random() * pool.length)]
  }
  const pool = motivationalMessages.low
  return pool[Math.floor(Math.random() * pool.length)]
}