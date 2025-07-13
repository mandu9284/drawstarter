import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function getUtcRange(
  userTimeZone: string,
  range: 'day' | 'week' | 'month' | 'year',
) {
  const startInUserTZ = dayjs().tz(userTimeZone).startOf(range)
  const endInUserTZ = dayjs().tz(userTimeZone).endOf(range)

  return {
    startUtc: startInUserTZ.toISOString(),
    endUtc: endInUserTZ.toISOString(),
  }
}
