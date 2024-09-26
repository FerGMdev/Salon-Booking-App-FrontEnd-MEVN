<script setup>
import { onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");
const route = useRoute();
const router = useRouter();
const { token } = route.params;

/**
 * @description: Esta función verifica la cuenta del usuario.
 * @returns {Promise<void>}
 */
onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyAccount(token);
    console.log(data);
    toast.success(data.msg);
    setTimeout(() => {
      router.push({ name: "login" });
    }, 5000);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
});
</script>

<template>
  <div>From ConfirmAccountView</div>
</template>

<style lang="css" scoped></style>
