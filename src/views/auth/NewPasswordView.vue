<script setup>
import { onMounted, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");
const router = useRouter();
const route = useRoute();
const { token } = route.params;
const isTokenValid = ref(false);

onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyPasswordResetToken(token);
    console.log(data);
    isTokenValid.value = true;
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await AuthAPI.updatePassword(token, { password });
    toast.open({
      message: data.msg,
      type: "success",
    });
    setTimeout(() => {
      router.push({ name: "login" });
    }, 3000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <div v-if="isTokenValid">
    <h1 class="text-6xl font-bold text-center text-white">
      Restablecer contraseña
    </h1>
    <p class="text-center text-white text-2xl">Coloca tu nueva contraseña.</p>

    <FormKit
      id="new-password-form"
      type="form"
      @submit="handleSubmit"
      :actions="false"
      incomplete-message="Verifica tu contraseña"
    >
      <FormKit
        type="password"
        name="password"
        label="Contraseña"
        placeholder="Contraseña"
        validation="required|length:8"
        :validation-messages="{
          required: 'La contraseña es requerida',
          length: 'La contraseña debe tener al menos 8 caracteres',
        }"
      />
      <FormKit type="submit">Restablecer contraseña</FormKit>
    </FormKit>
  </div>
  <div v-else>
    <p class="text-center text-white text-2xl">Tóken no válido.</p>
  </div>
</template>

<style lang="css" scoped></style>
