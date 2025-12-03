<template>
  <v-app-bar color="white" density="compact">
    <template v-slot:prepend>
      <v-img
      class="logo mr-4"
      src="https://storage.yandexcloud.net/forlogo/logo.svg"
      alt="Логотип"
      contain
    />
  </template>

    <v-app-bar-title class="text-truncate">
      Управление задачами
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>


