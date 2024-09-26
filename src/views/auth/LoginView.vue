<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";
const router = useRouter();

const toast = inject("toast");

const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await AuthAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", token);
    router.push({ name: "my-appointments" });
  } catch (error) {
    console.log(error.response.data.msg);
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-bold text-center text-white">Inicia sesión</h1>
  <p class="text-center text-white text-2xl">
    Inicia sesión para poder agendar tus citas de manera fácil y rápida.
  </p>

  <FormKit
    id="login-form"
    type="form"
    @submit="handleSubmit"
    :actions="false"
    incomplete-message="Por favor, completa todos los campos."
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
    <FormKit
      type="password"
      name="password"
      label="Contraseña"
      placeholder="Contraseña"
      validation="required"
      :validation-messages="{
        required: 'La contraseña es requerida',
      }"
    />
    <FormKit type="submit" label="Iniciar sesión" />
  </FormKit>
</template>

<style lang="css" scoped></style>
