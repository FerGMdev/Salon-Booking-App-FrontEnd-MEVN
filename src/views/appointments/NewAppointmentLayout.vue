<script setup>
import { onMounted } from "vue";
import { useAppointmentsStore } from "@/stores/appointments";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
const appointmentStore = useAppointmentsStore();

// Limpiar el estado de la cita al montar el componente
onMounted(() => {
  appointmentStore.clearAppointmentData();
});
</script>

<template>
  <div class="flex my-5 gap-3">
    <RouterLink
      :to="{ name: 'new-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-sky-500 hover:text-white rounded-lg"
      :class="
        route.name === 'new-appointment'
          ? 'bg-sky-500 text-white'
          : 'bg-white text-black'
      "
    >
      Servicios
    </RouterLink>
    <RouterLink
      :to="{ name: 'details-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-sky-500 hover:text-white rounded-lg"
      :class="
        route.name === 'details-appointment'
          ? 'bg-sky-500 text-white'
          : 'bg-white text-black'
      "
    >
      Cita y Resumen
    </RouterLink>
  </div>
  <RouterView />
</template>

<style lang="css" scoped></style>
