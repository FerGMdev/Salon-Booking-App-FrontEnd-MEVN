<script setup>
import { onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import AppointmentAPI from "@/api/AppointmentAPI";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentsStore = useAppointmentsStore();

const route = useRoute();
const router = useRouter();

const { id } = route.params;

onMounted(async () => {
  try {
    const { data } = await AppointmentAPI.getById(id); // Obtener la cita por ID
    appointmentsStore.setSelectedAppointment(data); // Autocompletado de la cita seleccionada
  } catch (error) {
    console.log(error);
    router.push({ name: "my-appointments" }); // Redireccionar a la página de citas en caso de error
  }
});
</script>

<template>
  <div class="flex my-5 gap-3">
    <RouterLink
      :to="{ name: 'edit-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-sky-500 hover:text-white rounded-lg"
      :class="
        route.name === 'edit-appointment'
          ? 'bg-sky-500 text-white'
          : 'bg-white text-black'
      "
    >
      Servicios
    </RouterLink>
    <RouterLink
      :to="{ name: 'edit-details-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-sky-500 hover:text-white rounded-lg"
      :class="
        route.name === 'edit-details-appointment'
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
