import type { TaskEvent } from '@/types'

const STORAGE_KEY = 'taskEvents'

export const loadTaskEventsFromStorage = (): TaskEvent[] => {
  if (typeof window === 'undefined') return []

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as Array<
      Omit<TaskEvent, 'timestamp'> & { timestamp: string | null }
    >

    return parsed.map(item => ({
      ...item,
      timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
    }))
  } catch {
    return []
  }
}

export const saveTaskEventsToStorage = (events: TaskEvent[]): void => {
  if (typeof window === 'undefined') return

  const payload = events.map(event => ({
    ...event,
    timestamp: event.timestamp?.toISOString?.() ?? null,
  }))

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}
