<template>
  <v-form @submit.prevent="addTask" class="mb-6">
    <v-text-field
      v-model="newTaskTitle"
      label="Новая задача"
      :rules="[value => !!value || 'Введите текст задачи']"
      variant="outlined"
      density="comfortable"
    />
    <v-btn type="submit" color="primary" class="mt-2">
      Добавить
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'

const { newTaskTitle, addTask } = useTasks()
</script>

<style scoped>
</style>
