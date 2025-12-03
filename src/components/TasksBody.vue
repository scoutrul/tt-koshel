<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="text-h4 mb-4">Мои задачи</h1>

              <TaskFilters
                :current-filter="currentFilter"
                :total="tasks.length"
                :active-count="activeCount"
                :completed-count="completedCount"
                @change-filter="$emit('change-filter', $event)"
              />

              <AddTaskForm
                :new-task-title="newTaskTitle"
                @update:newTaskTitle="$emit('update:newTaskTitle', $event)"
                @add-task="$emit('add-task')"
              />

              <TaskList
                :tasks="filteredTasks"
                :pending-deletions="pendingDeletions"
                :deletion-timers="deletionTimers"
                :format-date="formatDate"
                @toggle-task="$emit('toggle-task', $event)"
                @start-deletion="$emit('start-deletion', $event)"
                @cancel-deletion="$emit('cancel-deletion', $event)"
              />

              <TaskStats
                :total="tasks.length"
                :active="activeCount"
                :completed="completedCount"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TaskList from './TaskList.vue'
import TaskStats from './TaskStats.vue'
import TaskFilters from './TaskFilters.vue'
import AddTaskForm from './AddTaskForm.vue'
import type { Task } from '@/types'
import type { DeletionTimer } from '@/utils/deletionTimers'

type Filter = 'all' | 'active' | 'completed'

defineProps<{
  tasks: Task[]
  filteredTasks: Task[]
  currentFilter: Filter
  newTaskTitle: string
  activeCount: number
  completedCount: number
  pendingDeletions: Set<number>
  deletionTimers: Record<number, DeletionTimer>
  formatDate: (date: Date | null) => string
}>()

defineEmits<{
  (e: 'change-filter', filter: Filter): void
  (e: 'update:newTaskTitle', value: string): void
  (e: 'add-task'): void
  (e: 'toggle-task', id: number): void
  (e: 'start-deletion', id: number): void
  (e: 'cancel-deletion', id: number): void
}>()
</script>

<style scoped>
</style>


