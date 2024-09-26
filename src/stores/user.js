import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";
import AppointmentAPI from "@/api/AppointmentAPI";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref({});
  const userAppointments = ref([]);
  const loading = ref(true);

  // Funcion para obtener los datos del usuario
  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data.user;
      await getUserAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  // Funcion para obtener las citas del usuario
  const getUserAppointments = async () => {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  };

  // Funcion para cerrar la sesion
  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  // Funcion para obtener el nombre del usuario - Pendiente por revisar
  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );

  const noAppointments = computed(() => userAppointments.value.length === 0);

  return {
    user,
    userAppointments,
    getUserAppointments,
    loading,
    getUserName,
    logout,
    noAppointments,
  };
});
