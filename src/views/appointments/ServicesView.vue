<script setup>
import ServiceItemComponent from "@/components/ServiceItemComponent.vue";
import { useServicesStore } from "@/stores/services";

const servicesStore = useServicesStore();
</script>

<template>
  <h2 class="text-4xl font-bold text-slate-100 text-center mb-4">Servicios</h2>
  <p class="text-slate-100 text-center mb-4">
    A continuación elige el servicio que deseas agendar
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ServiceItemComponent
      v-for="service in servicesStore.services"
      :key="service._id"
      :service="service"
    />
  </div>
</template>

<style lang="css" scoped></style>
