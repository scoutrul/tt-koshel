<template>
  <v-app>
    <v-main>
      <AppHeader />
      <TasksBody />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import TasksBody from '@/components/TasksBody.vue'
</script>

<style scoped>
</style>