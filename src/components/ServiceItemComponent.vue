<script setup>
import { formatPrice } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentsStore = useAppointmentsStore();
const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="p-4 rounded-lg shadow-md cursor-pointer"
    :class="
      appointmentsStore.isServiceSelected(service._id)
        ? 'bg-sky-500 text-slate-100'
        : 'bg-slate-100'
    "
    @click="appointmentsStore.onServiceSelected(service)"
  >
    <p class="text-lg font-light">{{ service.name }}</p>
    <p class="text-2xl font-bold">
      {{ formatPrice(service.price) }}
    </p>
  </div>
</template>
