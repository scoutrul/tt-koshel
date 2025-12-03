<template>
  <div class="filter-section mb-4">
    <v-btn
      @click="$emit('change-filter', 'all')"
      :class="{ 'bg-primary': currentFilter === 'all' }"
      variant="tonal"
      class="mr-2"
    >
      Все ({{ total }})
    </v-btn>
    <v-btn
      @click="$emit('change-filter', 'active')"
      :class="{ 'bg-primary': currentFilter === 'active' }"
      variant="tonal"
      class="mr-2"
    >
      Активные ({{ activeCount }})
    </v-btn>
    <v-btn
      @click="$emit('change-filter', 'completed')"
      :class="{ 'bg-primary': currentFilter === 'completed' }"
      variant="tonal"
      class="mr-2"
    >
      Завершенные ({{ completedCount }})
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { TaskFilter } from '@/types'

defineProps<{
  currentFilter: TaskFilter
  total: number
  activeCount: number
  completedCount: number
}>()

defineEmits<{
  (e: 'change-filter', filter: TaskFilter): void
}>()
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


