<template>
  <div class="filter-section mb-4">
    <v-btn
      @click="setFilter('all')"
      :class="{ 'bg-primary': currentFilter === 'all' }"
      variant="tonal"
      class="mr-2"
    >
      Все ({{ tasks.length }})
    </v-btn>
    <v-btn
      @click="setFilter('active')"
      :class="{ 'bg-primary': currentFilter === 'active' }"
      variant="tonal"
      class="mr-2"
    >
      Активные ({{ activeCount }})
    </v-btn>
    <v-btn
      @click="setFilter('completed')"
      :class="{ 'bg-primary': currentFilter === 'completed' }"
      variant="tonal"
      class="mr-2"
    >
      Завершенные ({{ completedCount }})
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'
import type { TaskFilter } from '@/types'

const { tasks, currentFilter, activeCount, completedCount } = useTasks()

const setFilter = (filter: TaskFilter) => {
  currentFilter.value = filter
}
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>


