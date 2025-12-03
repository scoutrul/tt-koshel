import { ref, computed } from 'vue'
import type { Task, TaskEvent, TaskEventAction } from '@/types'
import { formatDate } from '@/utils/dateFormatter'
import {
  loadTaskEventsFromStorage,
  saveTaskEventsToStorage,
} from '@/services/taskEventsStorage'

const events = ref<TaskEvent[]>(loadTaskEventsFromStorage())

const addEvent = (task: Task, action: TaskEventAction) => {
  const titleShort =
    task.title.length > 30 ? `${task.title.slice(0, 30)}…` : task.title

  const event: TaskEvent = {
    id: Date.now(),
    taskId: task.id,
    titleShort,
    action,
    timestamp: new Date(),
  }

  events.value = [event, ...events.value]
  saveTaskEventsToStorage(events.value)
}

const recentEvents = computed(() => events.value.slice(0, 50))

const formatEventTime = (date: Date | null) => formatDate(date)

const getActionLabel = (action: TaskEventAction): string => {
  switch (action) {
    case 'created':
      return 'Создана'
    case 'completed':
      return 'Завершена'
    case 'reopened':
      return 'Возобновлена'
    case 'deleted':
      return 'Удалена'
    default:
      return ''
  }
}

export const useTaskEvents = () => ({
  events,
  recentEvents,
  addEvent,
  formatEventTime,
  getActionLabel,
})
