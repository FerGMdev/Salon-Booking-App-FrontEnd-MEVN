<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");

const handleSubmit = async ({ email }) => {
  try {
    const { data } = await AuthAPI.forgotPassword({ email });
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("forgot-password-form"); // Resetea el formulario una vez que se ha enviado el correo
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-bold text-center text-white">
    Olvide mi contraseña
  </h1>
  <p class="text-center text-white text-2xl">
    Recupera tu contraseña para poder iniciar sesión.
  </p>

  <FormKit
    id="forgot-password-form"
    type="form"
    @submit="handleSubmit"
    :actions="false"
  >
    <FormKit
      type="email"
      name="email"
      label="Correo electrónico"
      placeholder="Correo electrónico"
      validation="required|email"
      :validation-messages="{
        required: 'El email es requerido',
        email: 'El email no es válido',
      }"
    />
    <FormKit type="submit">Enviar Instrucciones</FormKit>
  </FormKit>
</template>

<style lang="css" scoped></style>
