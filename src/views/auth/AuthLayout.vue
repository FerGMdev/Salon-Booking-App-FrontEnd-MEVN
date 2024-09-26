<script setup>
import { RouterView, useRoute } from "vue-router";

const route = useRoute();

const authRoutes = [
  { name: "register", text: "Crear una cuenta" },
  { name: "login", text: "Iniciar sesión" },
  { name: "forgot-password", text: "Olvide mi contraseña" },
];
</script>

<template>
  <div class="mx-auto lg:w-2/3">
    <RouterView />
    <nav
      class="flex flex-col space-y-5 mt-10 justify-between items-center lg:flex-row lg:space-x-5 lg:space-y-0"
    >
      <RouterLink
        v-for="authRoute in authRoutes"
        :to="{ name: authRoute.name }"
        class="text-white font-bold hover:text-gray-900"
        :class="{ hidden: route.name === authRoute.name }"
        >{{ authRoute.text }}</RouterLink
      >
    </nav>
  </div>
</template>
