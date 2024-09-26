<script setup>
import { displayDate } from "@/helpers/date";
import { formatPrice } from "@/helpers/index";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentsStore = useAppointmentsStore();

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white p-4 rounded-md shadow-md">
    <p class="text-gray-800">
      Fecha: <span class="font-bold">{{ displayDate(appointment.date) }}</span>
    </p>
    <p class="text-gray-800">
      Hora: <span class="font-bold">{{ appointment.time }} Horas</span>
    </p>
    <p class="text-gray-800 text-2xl font-bold border-t-2 border-gray-300 py-2">
      Servicios Solicitados en la cita:
    </p>
    <div v-for="service in appointment.services" :key="service._id">
      <p class="text-gray-800 text-xl">{{ service.name }}</p>
      <p class="text-sky-600 text-xl font-bold">
        {{ formatPrice(service.price) }}
      </p>
    </div>
    <p class="text-gray-800 text-xl text-right font-black">
      Total a pagar:
      <span class="text-sky-600">{{
        formatPrice(appointment.totalPrice)
      }}</span>
    </p>

    <div class="flex gap-2">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
        class="bg-gray-800 text-white px-4 py-2 rounded-md font-bold text-lg"
      >
        Editar cita
      </RouterLink>
      <button
        class="bg-red-600 text-white px-4 py-2 rounded-md font-bold text-lg"
        @click="appointmentsStore.deleteAppointment(appointment._id)"
      >
        Cancelar cita
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
