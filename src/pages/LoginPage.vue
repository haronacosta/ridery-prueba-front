<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 300px">
      <q-card-section class="bg-teal-14">
        <div class="text-h6 text-white">Iniciar Sesion</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Correo electronico" type="email" />
        <q-input v-model="password" label="Contraseña" type="password" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Iniciar sesion" @click="login" color="primary" />
      </q-card-actions>

      <q-btn size="sm" label="Registrarse" to="/auth/register" flat />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import { useAuthStore } from "src/stores/auth";
import { useQuasar } from "quasar";

const $q = useQuasar();

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    console.log(error);
    $q.notify({
      type: "negative",
      message: error?.response?.data?.msg || "A ocurrido un error inesperado",
    });
  }
};
</script>
