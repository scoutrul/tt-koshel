<template>
  <v-container class="fill-height">
    <v-row class="fill-height" align="stretch">
      <v-col cols="12" lg="8">
        <h1 class="text-h4 mb-4">Мои задачи</h1>

        <TaskFilters />

        <AddTaskForm />

        <TaskList
          :tasks="filteredTasks"
          :pending-deletions="pendingDeletions"
          :deletion-timers="deletionTimers"
          :format-date="formatDate"
          @toggle-task="toggleTask"
          @start-deletion="startDeletion"
          @cancel-deletion="cancelDeletion"
        />

        <TaskStats />
      </v-col>

      <v-col
        cols="12"
        lg="4"
        class="mt-4 mt-lg-0"
      >
        <TaskEventsFeed class="tasks-body__events" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TaskList from './TaskList.vue'
import TaskStats from './TaskStats.vue'
import TaskFilters from './TaskFilters.vue'
import AddTaskForm from './AddTaskForm.vue'
import TaskEventsFeed from './TaskEventsFeed.vue'
import { useTasks } from '@/composables/useTasks'
import {
  startDeletionTimer,
  cancelDeletionTimer,
  clearAllDeletionTimers,
  type DeletionTimer,
} from '@/utils/deletionTimers'

const {
  tasks,
  filteredTasks,
  formatDate,
  loadTasks,
  toggleTask,
  removeTask,
} = useTasks()

const pendingDeletions = ref<Set<number>>(new Set())
const deletionTimers = ref<Record<number, DeletionTimer>>({})

const startDeletion = (id: number) => {
  startDeletionTimer(id, removeTask, pendingDeletions, deletionTimers)
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
.tasks-body__events {
  height: 100%;
}
</style>

