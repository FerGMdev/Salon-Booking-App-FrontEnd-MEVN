<script setup>
import AppointmentComponent from "@/components/AppointmentComponent.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <h2 class="text-4xl font-bold text-gray-100 text-center mb-4">Mis citas</h2>
  <p class="text-gray-100 text-center mb-4">
    A continuación podrás visualizar tus citas
  </p>
  <div class="flex flex-col items-center justify-center">
    <p class="text-gray-100 text-center mb-4"></p>
  </div>

  <p v-if="userStore.loading" class="text-gray-100 text-center mb-4">
    Cargando...
  </p>
  <div v-else>
    <p v-if="userStore.noAppointments" class="text-gray-100 text-center mb-4">
      No tienes citas
    </p>
    <div v-else class="w-full space-y-4">
      <AppointmentComponent
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
