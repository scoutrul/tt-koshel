<template>
  <v-app-bar density="compact">
    <template #prepend>
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

    <template #append>
      <v-btn
        icon
        variant="text"
        href="https://github.com/scoutrul/tt-koshel"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="'Открыть репозиторий на GitHub'"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </template>
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

