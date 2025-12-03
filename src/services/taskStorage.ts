import type { Task } from '@/types'

const STORAGE_KEY = 'tasks'

export const loadTasksFromStorage = (): Task[] | null => {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Array<
      Omit<Task, 'createdAt' | 'updatedAt' | 'completedAt'> & {
        createdAt: string | null
        updatedAt: string | null
        completedAt: string | null
      }
    >

    return parsed.map(item => ({
      ...item,
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      completedAt: item.completedAt ? new Date(item.completedAt) : null,
    }))
  } catch {
    return null
  }
}

export const saveTasksToStorage = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return

  const payload = tasks.map(task => ({
    ...task,
    createdAt: task.createdAt?.toISOString?.() ?? null,
    updatedAt: task.updatedAt?.toISOString?.() ?? null,
    completedAt: task.completedAt?.toISOString?.() ?? null,
  }))

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}


