<script setup>
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";

import SelectedServiceComponent from "@/components/SelectedServiceComponent.vue";
import { useAppointmentsStore } from "@/stores/appointments";
import { formatPrice } from "@/helpers";

const appointmentsStore = useAppointmentsStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMM",
});

// Pendiente de revisar
function disabledDates(date) {
  return date < dayjs() || date > dayjs().add(1, "month");
}
</script>

<template>
  <h2 class="text-4xl font-bold text-gray-100 text-center mb-4">
    Detalles de la cita y resumen
  </h2>
  <p class="text-gray-100 text-center mb-4">
    A continuación verifica la información y confirma tu cita
  </p>
  <div v-if="appointmentsStore.noServicesSelected">
    <p class="text-gray-100 text-center text-2xl">
      No se han seleccionado servicios
    </p>
  </div>
  <div v-else class="grid grid-cols-1 gap-4">
    <h3 class="text-2xl font-bold text-gray-100 text-center mb-4">Servicios</h3>
    <SelectedServiceComponent
      v-for="service in appointmentsStore.services"
      :key="service._id"
      :service="service"
    />
    <p class="text-gray-100 text-end text-2xl">
      Total a pagar:
      <span class="font-bold">{{
        formatPrice(appointmentsStore.totalPrice)
      }}</span>
    </p>
  </div>

  <div vi class="space-y-8">
    <h3 class="text-2xl font-bold text-gray-100 text-center mb-4">
      Selecciona una fecha y hora
    </h3>

    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-transparent justify-center flex rounded-lg">
        <VueTailwindDatepicker
          i18n="es-mx"
          :disable-date="disabledDates"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointmentsStore.date"
        />
      </div>
      <div
        v-if="appointmentsStore.isDateSelected"
        class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 mt-10 lg:mt-0"
      >
        <button
          type="button"
          class="rounded-lg p-4 text-2xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          :class="
            appointmentsStore.time === hour
              ? 'bg-sky-500 text-gray-100 font-bold'
              : 'bg-gray-100 text-gray-900 font-light'
          "
          v-for="hour in appointmentsStore.hours"
          :key="hour"
          @click="appointmentsStore.time = hour"
          :disabled="appointmentsStore.disableTime(hour)"
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="bg-sky-500 text-gray-100 w-full md:w-auto rounded-lg p-4 text-2xl transition-all duration-300 hover:bg-sky-600 disabled:bg-gray-500 disabled:text-gray-100 disabled:cursor-not-allowed"
        :disabled="!appointmentsStore.isReservationReady"
        @click="appointmentsStore.saveAppointment"
      >
        Confirmar cita
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
