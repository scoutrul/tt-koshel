import { computed, ref } from 'vue'
import type { Task, TaskFilter } from '@/types'
import { formatDate } from '@/utils/dateFormatter'
import { loadTasksFromStorage, saveTasksToStorage } from '@/services/taskStorage'
import { useTaskEvents } from '@/composables/useTaskEvents'

const tasks = ref<Task[]>([])
const newTaskTitle = ref('')
const currentFilter = ref<TaskFilter>('all')

const { addEvent } = useTaskEvents()

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return tasks.value.filter(t => !t.completed)
    case 'completed':
      return tasks.value.filter(t => t.completed)
    default:
      return tasks.value
  }
})

const activeCount = computed(() => tasks.value.filter(t => !t.completed).length)
const completedCount = computed(() => tasks.value.filter(t => t.completed).length)

const loadTasks = async () => {
  if (tasks.value.length) return

  const stored = loadTasksFromStorage()
  if (stored && stored.length) {
    tasks.value = stored
    return
  }

  await new Promise(resolve => setTimeout(resolve, 300))
  tasks.value = [
    {
      id: 1,
      title: 'Изучить Vue 3 Composition API',
      completed: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      completedAt: new Date('2024-01-20'),
    },
    {
      id: 2,
      title: 'Написать тестовое задание',
      completed: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      completedAt: null,
    },
    {
      id: 3,
      title: 'Рефакторинг legacy кода',
      completed: false,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      completedAt: null,
    },
    {
      id: 4,
      title: 'Изучить Pinia и лучшие практики',
      completed: true,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-30'),
      completedAt: new Date('2024-01-30'),
    },
  ]

  saveTasksToStorage(tasks.value)
}

const addTask = (): boolean => {
  if (!newTaskTitle.value.trim()) return false

  const newTask: Task = {
    id: Date.now(),
    title: newTaskTitle.value,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
  }

  tasks.value.push(newTask)
  newTaskTitle.value = ''
  saveTasksToStorage(tasks.value)
  addEvent(newTask, 'created')

  return true
}

const toggleTask = (id: number) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    task.updatedAt = new Date()
    task.completedAt = task.completed ? new Date() : null
    saveTasksToStorage(tasks.value)
    addEvent(task, task.completed ? 'completed' : 'reopened')
  }
}

const removeTask = (id: number) => {
  const task = tasks.value.find(t => t.id === id)
  if (!task) return

  tasks.value = tasks.value.filter(t => t.id !== id)
  saveTasksToStorage(tasks.value)
  addEvent(task, 'deleted')
}

export const useTasks = () => {
  return {
    tasks,
    newTaskTitle,
    currentFilter,
    filteredTasks,
    activeCount,
    completedCount,
    formatDate,
    loadTasks,
    addTask,
    toggleTask,
    removeTask,
  }
}


