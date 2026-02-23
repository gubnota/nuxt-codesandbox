<!-- <template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template> -->
<template>
  <div id="app">
    <!-- <AppNavbar v-if="authStore.isLoggedIn" /> -->
    <AppNavbar v-if="true" />
    <main>
      <slot />
    </main>
    <!-- <ToastContainer /> -->
  </div>
</template>

<script setup lang="ts">
// const authStore = useAuthStore()

// onMounted(() => {
//   authStore.init()
// })
</script>
