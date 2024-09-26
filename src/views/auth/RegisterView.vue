<script setup>
import { inject } from "vue";
import AuthAPI from "@/api/AuthAPI";
import { reset } from "@formkit/vue";

const toast = inject("toast");

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    // En lugar de recibir toda la respuesta del servidor y luego acceder a la propiedad "data" a través de response.data, se extrae directamente la propiedad "data" del objeto de respuesta.
    // Cuando se usa axios, si la respuesta es exitosa, se devuelve un objeto con una propiedad "data" que contiene los datos del servidor.
    const { data } = await AuthAPI.register(formData);
    console.log(data);
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("register-form");
  } catch (error) {
    console.log(error);
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-bold text-center text-white">Crea una cuenta</h1>
  <p class="text-center text-white text-2xl">
    Crea una cuenta para poder agendar tus citas de manera fácil y rápida.
  </p>

  <FormKit
    id="register-form"
    type="form"
    @submit="handleSubmit"
    :actions="false"
    incomplete-message="Por favor, completa todos los campos."
  >
    <FormKit
      type="text"
      name="name"
      label="Nombre de Usuario"
      placeholder="Nombre de Usuario"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es requerido',
        length: 'El nombre debe tener al menos 3 caracteres',
      }"
    />
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
      validation="required|length:8"
      :validation-messages="{
        required: 'La contraseña es requerida',
        length: 'La contraseña debe tener al menos 8 caracteres',
      }"
    />
    <FormKit
      type="password"
      name="password_confirm"
      label="Confirmar contraseña"
      placeholder="Confirmar contraseña"
      validation="required|confirm"
      :validation-messages="{
        required: 'La confirmación de la contraseña es requerida',
        confirm: 'Las contraseñas no coinciden',
      }"
    />
    <FormKit type="submit" label="Crear cuenta" />
  </FormKit>
</template>

<style lang="css" scoped></style>
