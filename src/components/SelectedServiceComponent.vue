<script setup>
import { formatPrice } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentsStore = useAppointmentsStore();

defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex justify-between items-center p-4 bg-transparent text-slate-100 border-b-2 border-slate-600"
  >
    <div>
      <p class="text-lg font-light">{{ service.name }}</p>
      <p class="text-2xl font-bold">{{ formatPrice(service.price) }}</p>
    </div>
    <button
      type="button"
      class="bg-red-600 text-slate-100 inline-flex justify-center items-center px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:bg-red-700"
      @click="appointmentsStore.onServiceSelected(service)"
    >
      Eliminar
    </button>
  </div>
</template>
