<template>
  <v-card class="mt-6">
    <v-card-text>
      <p>Всего задач: {{ tasks.length }}</p>
      <p>Активных: {{ activeCount }}</p>
      <p>Завершенных: {{ completedCount }}</p>
      <p>
        Процент завершения:
        {{
          tasks.length
            ? ((completedCount / tasks.length) * 100).toFixed(1)
            : '0.0'
        }}%
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'

const { tasks, activeCount, completedCount } = useTasks()
</script>

<style scoped>
</style>
