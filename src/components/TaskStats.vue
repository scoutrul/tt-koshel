<template>
  <v-card class="mt-6">
    <v-card-text>
      <p>Всего задач: {{ total }}</p>
      <p>Активных: {{ active }}</p>
      <p>Завершенных: {{ completed }}</p>
      <p>
        Процент завершения:
        {{
          total
            ? ((completed / total) * 100).toFixed(1)
            : '0.0'
        }}%
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  total: number
  active: number
  completed: number
}>()
</script>

<style scoped>
</style>


