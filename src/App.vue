<template>
  <v-app>
    <AppHeader />

    <v-main>
      <TasksBody />
    </v-main>

    <v-footer app class="pa-4 justify-center text-caption">
      © {{ new Date().getFullYear() }} ·
      <a
        href="https://t.me/antonGolova"
        target="_blank"
        rel="noopener noreferrer"
        class="ml-1 text-decoration-none"
      >
        @antonGolova
      </a>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import TasksBody from '@/components/TasksBody.vue'
</script>

<style scoped>
a {
  color: inherit;
}
</style>