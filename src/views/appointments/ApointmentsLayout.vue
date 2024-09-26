<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">App Salón</h1>
    <div class="flex flex-col space-y-4">
      <div class="flex gap-2 items-center">
        <p class="text-white">
          Hola: <span class="font-bold">{{ userStore.getUserName }}</span>
        </p>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-md"
          @click="userStore.logout"
        >
          Cerrar Sesión
        </button>
      </div>

      <nav class="flex gap-2 justify-end">
        <RouterLink
          :to="{ name: 'my-appointments' }"
          class="text-white px-4 py-2 rounded-md"
        >
          Mis Citas
        </RouterLink>

        <RouterLink
          :to="{ name: 'new-appointment' }"
          class="bg-teal-500 text-white px-4 py-2 rounded-md"
        >
          Nueva Cita
        </RouterLink>
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style lang="css" scoped></style>
