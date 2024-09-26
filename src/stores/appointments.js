import { defineStore } from "pinia";
import { ref, computed, onMounted, inject, watch } from "vue";
import { useRouter } from "vue-router";

import AppointmentAPI from "@/api/AppointmentAPI";
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date";
import { useUserStore } from "@/stores/user";
export const useAppointmentsStore = defineStore("appointments", () => {
  // Initial states of store
  const appointmentId = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  const toast = inject("toast");
  const router = useRouter();
  const userStore = useUserStore();
  onMounted(() => {
    const hourStart = 10;
    const hourEnd = 19;
    for (let hour = hourStart; hour <= hourEnd; hour++) {
      hours.value.push(`${hour}:00`);
    }
  });
  //console.log(hours.value);

  watch(date, async () => {
    // Si no se ha seleccionado una fecha, no se puede obtener las citas
    if (date.value === "") return;
    // Si se ha seleccionado una fecha, se limpia el horario para evitar que puedan seleccionar un horario ya ocupado si cambian de fecha
    time.value = "";
    // Obtenemos las citas de la fecha seleccionada
    const { data } = await AppointmentAPI.getByDate(date.value);

    // Si se ha seleccionado una cita, se deshabilita el horario de la cita actual
    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value
      ); // Filtramos la cita actual para que no se deshabilite

      time.value = data.find(
        (appointment) => appointment._id === appointmentId.value
      ).time; // Obtenemos el horario de la cita actual para que se pueda seleccionar
    } else {
      appointmentsByDate.value = data;
    }
  });

  // Actions - Funciones que modifican el estado

  // Autocompletado de la cita seleccionada
  function setSelectedAppointment(appointment) {
    services.value = appointment.services;
    const newDate = convertToDDMMYYYY(appointment.date);
    date.value = newDate;
    time.value = appointment.time;
    appointmentId.value = appointment._id; // Si tiene id es porque es una edicion
  }

  function onServiceSelected(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      );
      console.log("El servicio se eliminó de la cita");
    } else {
      // Limitar a maximo 2 servicios
      if (services.value.length === 2) {
        alert("No se puede agregar más de 2 servicios");
        return;
      }
      services.value.push(service);
      console.log("Se agregó el servicio a la cita");
    }
  }

  // Crear una cita
  async function saveAppointment() {
    console.log("Servicios seleccionados:", services.value);
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalPrice: totalPrice.value,
    };

    if (appointmentId.value) {
      // Código para actualizar una cita
      try {
        const { data } = await AppointmentAPI.update(
          appointmentId.value,
          appointment
        );
        console.log(data);
        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Código para crear una cita
      try {
        const { data } = await AppointmentAPI.create(appointment);
        console.log(data);
        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }

    clearAppointmentData(); // Limpiamos el estado de la cita
    userStore.getUserAppointments(); // Actualizamos las citas del usuario una vez guardada la cita
    router.push({ name: "my-appointments" }); // Redireccionamos a la página de citas del usuario
  }

  function clearAppointmentData() {
    appointmentId.value = "";
    services.value = [];
    date.value = "";
    time.value = "";
  }

  async function deleteAppointment(id) {
    console.log("eliminando cita");

    if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      try {
        const { data } = await AppointmentAPI.delete(id);
        console.log(data);
        toast.open({
          message: data.msg,
          type: "success",
        });
        //userStore.getUserAppointments(); // Actualizamos las citas del usuario una vez eliminada la cita

        // Filtramos las citas del usuario para eliminar la cita eliminada
        userStore.userAppointments = userStore.userAppointments.filter(
          (appointment) => appointment._id !== id
        );
      } catch (error) {
        console.log(error);
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    }
  }

  // Getters - Funciones que devuelven el estado

  // Verificar si un servicio está seleccionado
  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  // Verificar si no se ha seleccionado ningún servicio
  const noServicesSelected = computed(() => services.value.length === 0);

  // Calcular el precio total de los servicios seleccionados
  const totalPrice = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  // Verificar si la reserva está lista para ser confirmada
  const isReservationReady = computed(() => {
    return services.value.length > 0 && date.value !== "" && time.value !== "";
  });

  // Verificar si la fecha está seleccionada
  const isDateSelected = computed(() => date.value !== "");

  // Verificar si el horario está disponible
  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.some(
        (appointment) => appointment.time === hour
      );
    };
  });

  return {
    services,
    date,
    hours,
    time,
    setSelectedAppointment,
    onServiceSelected,
    saveAppointment,
    clearAppointmentData,
    deleteAppointment,
    isServiceSelected,
    totalPrice,
    noServicesSelected,
    isReservationReady,
    isDateSelected,
    disableTime,
  };
});
