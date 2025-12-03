<template>
  <v-card class="task-events-feed">
    <v-card-title class="text-subtitle-1 font-weight-medium">
      Лента изменений
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-list density="compact" class="task-events-feed__list">
        <v-list-item
          v-for="event in recentEvents"
          :key="event.id"
        >
          <template #prepend>
            <v-avatar size="20" :color="getColor(event.action)">
              <v-icon size="16">{{ getIcon(event.action) }}</v-icon>
            </v-avatar>
          </template>

          <v-list-item-title class="text-body-2">
            {{ getActionLabel(event.action) }} — {{ event.titleShort }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption text-grey">
            {{ formatEventTime(event.timestamp) }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-if="recentEvents.length === 0">
          <v-list-item-title class="text-body-2 text-grey">
            Пока нет изменений
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTaskEvents } from '@/composables/useTaskEvents'

const { recentEvents, formatEventTime, getActionLabel } = useTaskEvents()

const getColor = (action: string) => {
  switch (action) {
    case 'created':
      return 'primary'
    case 'completed':
      return 'success'
    case 'reopened':
      return 'warning'
    case 'deleted':
      return 'error'
    default:
      return 'primary'
  }
}

const getIcon = (action: string) => {
  switch (action) {
    case 'created':
      return 'mdi-plus'
    case 'completed':
      return 'mdi-check'
    case 'reopened':
      return 'mdi-restore'
    case 'deleted':
      return 'mdi-delete'
    default:
      return 'mdi-circle'
  }
}
</script>

<style scoped>
.task-events-feed {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.task-events-feed__list {
  max-height: 100%;
  overflow-y: auto;
}
</style>
