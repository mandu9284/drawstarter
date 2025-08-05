import { describe, it, expect, vi } from 'vitest'
import { getUtcRange } from '@/lib/day'

vi.setSystemTime(new Date('2021-12-31T15:00:00.000Z'))

// day
describe('getUtcRange', () => {
  it('should return the correct UTC range', () => {
    const { startUtc, endUtc } = getUtcRange('Asia/Seoul', 'day')
    expect(startUtc).toBe('2021-12-31T15:00:00.000Z')
    expect(endUtc).toBe('2022-01-01T14:59:59.999Z')
  })
})

// week
vi.setSystemTime(new Date('2021-12-31T15:00:00.000Z'))
describe('getUtcRange', () => {
  it('should return the correct UTC range', () => {
    const { startUtc, endUtc } = getUtcRange('Asia/Seoul', 'week')
    expect(startUtc).toBe('2021-12-25T15:00:00.000Z')
    expect(endUtc).toBe('2022-01-01T14:59:59.999Z')
  })
})

// month
vi.setSystemTime(new Date('2021-12-31T15:00:00.000Z'))
describe('getUtcRange', () => {
  it('should return the correct UTC range', () => {
    const { startUtc, endUtc } = getUtcRange('Asia/Seoul', 'month')
    expect(startUtc).toBe('2021-12-31T15:00:00.000Z')
    expect(endUtc).toBe('2022-01-31T14:59:59.999Z')
  })
})

// year
vi.setSystemTime(new Date('2021-12-31T15:00:00.000Z'))
describe('getUtcRange', () => {
  it('should return the correct UTC range', () => {
    const { startUtc, endUtc } = getUtcRange('Asia/Seoul', 'year')
    expect(startUtc).toBe('2021-12-31T15:00:00.000Z')
    expect(endUtc).toBe('2022-12-31T14:59:59.999Z')
  })
})
