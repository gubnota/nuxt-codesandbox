<template>
  <!-- <NuxtRouteAnnouncer /> -->
  <!-- <NuxtPage /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import "~/assets/css/main.css";
const appConfig = useAppConfig();

// console.log(appConfig.theme.colors.primary);
</script>
