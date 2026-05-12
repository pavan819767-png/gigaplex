/** Gigaplex product constants (savings rule, tiers, copy). */
export const SAVINGS_RATE = 0.0275 // 2.75% auto-save per completed order
export const MIN_REWARD_STARS = 3

export const PLATFORMS = [
  'Uber',
  'Swiggy',
  'Zomato',
  'Urban Company',
  'Fiverr',
  'Upwork',
  'Amazon Flex',
] as const

export type PlatformName = (typeof PLATFORMS)[number]
