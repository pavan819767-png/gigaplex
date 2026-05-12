/**
 * Deterministic seed: 124 workers + payouts + work history + AI predictions.
 * Mirrors frontend demo generators for consistency in investor demos.
 */
const platforms = ['Uber', 'Swiggy', 'Zomato', 'Urban Company', 'Fiverr', 'Upwork', 'Amazon Flex']

function mulberry32(seed) {
  return function rand() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildWorkers(n) {
  const rand = mulberry32(42)
  const first = ['Aisha', 'Rohan', 'Priya', 'Diego', 'Yuki', 'Amara', 'Liam', 'Sofia']
  const last = ['Khan', 'Verma', 'Patel', 'Silva', 'Tanaka', 'Hassan', 'Nguyen', 'Garcia']
  const out = []
  for (let i = 0; i < n; i++) {
    const fn = first[i % first.length]
    const ln = last[i % last.length]
    out.push({
      id: `w-${i + 1}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@demo.gigaplex`,
      name: `${fn} ${ln}`,
      role: 'worker',
      ratingAvg: Math.round((3 + rand() * 2) * 10) / 10,
      kycStatus: rand() > 0.08 ? 'verified' : 'pending',
      createdAt: new Date(Date.now() - rand() * 86400000 * 400).toISOString(),
    })
  }
  return out
}

function buildPayouts(rand, n) {
  const methods = ['UPI', 'Bank', 'Wallet']
  const out = []
  for (let i = 0; i < n; i++) {
    out.push({
      id: `p-${i}`,
      workerId: 'w-1',
      amount: Math.round(800 + rand() * 12000),
      method: methods[Math.floor(rand() * 3)],
      status: rand() > 0.92 ? 'pending' : 'completed',
      createdAt: new Date(Date.now() - rand() * 86400000 * 60).toISOString(),
      reference: `GPX-${Math.floor(rand() * 1e12)}`,
    })
  }
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

function buildWorkHistory(rand, n) {
  const types = ['Ride', 'Delivery', 'Task', 'Consult', 'Shift']
  const out = []
  for (let i = 0; i < n; i++) {
    const platform = platforms[Math.floor(rand() * platforms.length)]
    out.push({
      jobId: `GP-${100000 + i}`,
      platform,
      workType: types[Math.floor(rand() * types.length)],
      date: new Date(Date.now() - rand() * 86400000 * 45).toISOString().slice(0, 10),
      hoursWorked: Math.round(rand() * 120) / 10,
      distanceOrTasks: `${Math.floor(rand() * 40)} km`,
      earnings: Math.round(200 + rand() * 4200),
      rating: Math.round((3 + rand() * 2) * 10) / 10,
      status: 'completed',
    })
  }
  return out
}

export function buildDemoDataset() {
  const rand = mulberry32(7)
  const workers = buildWorkers(124)
  const payouts = buildPayouts(rand, 200)
  const workHistory = buildWorkHistory(rand, 500)
  const aiPredictions = [
    {
      id: 'pred-1',
      workerId: 'w-1',
      horizonDays: 14,
      predictedIncome: 42800,
      confidence: 0.86,
      factors: ['Seasonality', 'Weather', 'City demand', 'Rating momentum'],
      generatedAt: new Date().toISOString(),
    },
  ]
  return { workers, payouts, workHistory, aiPredictions }
}
