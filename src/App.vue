<template>
  <v-app>
    <AppHeader />

    <v-main>
      <TasksBody
        :tasks="tasks"
        :filtered-tasks="filteredTasks"
        :current-filter="currentFilter"
        :new-task-title="newTaskTitle"
        :active-count="tasks.filter(t => !t.completed).length"
        :completed-count="tasks.filter(t => t.completed).length"
        :pending-deletions="pendingDeletions"
        :deletion-timers="deletionTimers"
        :format-date="formatDate"
        @change-filter="currentFilter = $event"
        @update:newTaskTitle="newTaskTitle = $event"
        @add-task="addTask"
        @toggle-task="toggleTask"
        @start-deletion="startDeletion"
        @cancel-deletion="cancelDeletion"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TasksBody from '@/components/TasksBody.vue'
import { startDeletionTimer, cancelDeletionTimer, clearAllDeletionTimers, type DeletionTimer } from '@/utils/deletionTimers'
import type { Task } from '@/types'

const tasks = ref<Task[]>([])
const newTaskTitle = ref('')
const currentFilter = ref<'all' | 'active' | 'completed'>('all')
const pendingDeletions = ref<Set<number>>(new Set())
const deletionTimers = ref<Record<number, DeletionTimer>>({})

const formatDate = (date: Date | null) => {
  if (!date) return '—'
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

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

const loadTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  tasks.value = [
    {
      id: 1,
      title: 'Изучить Vue 3 Composition API',
      completed: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      completedAt: new Date('2024-01-20')
    },
    {
      id: 2,
      title: 'Написать тестовое задание',
      completed: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      completedAt: null
    },
    {
      id: 3,
      title: 'Рефакторинг legacy кода',
      completed: false,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      completedAt: null
    },
    {
      id: 4,
      title: 'Изучить Pinia и лучшие практики',
      completed: true,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-30'),
      completedAt: new Date('2024-01-30')
    }
  ]
}

const addTask = () => {
  if (!newTaskTitle.value.trim()) return
  
  const newTask: Task = {
    id: Date.now(),
    title: newTaskTitle.value,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null
  }
  
  tasks.value.push(newTask)
  newTaskTitle.value = ''
}

const toggleTask = (id: number) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    task.updatedAt = new Date()
    task.completedAt = task.completed ? new Date() : null
  }
}

const startDeletion = (id: number) => {
  startDeletionTimer(id, tasks, pendingDeletions, deletionTimers)
}

const cancelDeletion = (id: number) => {
  cancelDeletionTimer(id, pendingDeletions, deletionTimers)
}

onMounted(() => {
  loadTasks()
})

onUnmounted(() => {
  clearAllDeletionTimers(pendingDeletions, deletionTimers)
})
</script>

<style scoped>
</style>