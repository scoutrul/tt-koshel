<template>
  <v-form @submit.prevent="$emit('add-task')" class="mb-6">
    <v-text-field
      :model-value="newTaskTitle"
      @update:model-value="$emit('update:newTaskTitle', $event)"
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
defineProps<{
  newTaskTitle: string
}>()

defineEmits<{
  (e: 'update:newTaskTitle', value: string): void
  (e: 'add-task'): void
}>()
</script>

<style scoped>
</style>


