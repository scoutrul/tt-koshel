<template>
  <v-list lines="two" class="elevation-1 rounded">
    <v-list-item v-for="task in tasks" :key="task.id">
      <template #prepend>
        <v-checkbox
          :model-value="task.completed"
          @update:model-value="$emit('toggle-task', task.id)"
          density="comfortable"
        />
      </template>

      <v-list-item-title
        :class="{ 'text-decoration-line-through text-grey': task.completed }"
        class="font-weight-medium"
      >
        {{ task.title }}
      </v-list-item-title>

      <v-list-item-subtitle>
        Создано: {{ formatDate(task.createdAt) }}
        | Обновлено: {{ formatDate(task.updatedAt) }}
        <span v-if="task.completed">
          | Завершено: {{ formatDate(task.completedAt) }}
        </span>
      </v-list-item-subtitle>

      <template #append>
        <div v-if="pendingDeletions.has(task.id)" class="deletion-pending">
          <v-chip color="error" size="small" class="mr-2">
            Удаление через {{ deletionTimers[task.id]?.timeLeft ?? 10 }}
          </v-chip>
          <v-btn
            @click="$emit('cancel-deletion', task.id)"
            variant="text"
            color="warning"
            size="small"
          >
            Отмена
          </v-btn>
        </div>
        <v-btn
          v-else
          icon
          @click="$emit('start-deletion', task.id)"
          variant="text"
          color="error"
          size="small"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import type { DeletionTimer } from '@/utils/deletionTimers'

const props = defineProps<{
  tasks: Task[]
  pendingDeletions: Set<number>
  deletionTimers: Record<number, DeletionTimer>
  formatDate: (date: Date | null) => string
}>()

defineEmits<{
  (e: 'toggle-task', id: number): void
  (e: 'start-deletion', id: number): void
  (e: 'cancel-deletion', id: number): void
}>()
</script>

<style scoped>
.deletion-pending {
  display: flex;
  align-items: center;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>


