<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="md:flex h-screen">
    <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-app"></div>
    <div class="md:w-2/3 p-12 py-5 min-h-full overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
