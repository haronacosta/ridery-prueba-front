<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 300px">
      <q-card-section class="bg-teal-14">
        <div class="text-h6 text-white">Registro</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="name" label="Nombre" />
        <q-input v-model="email" label="Correo" type="email" />
        <q-input v-model="password" label="Contraseña" type="password" />
        <q-input
          v-model="confirmPassword"
          label="Confirmar contraseña"
          type="password"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Registrarse" @click="register" color="primary" />
      </q-card-actions>

      <q-btn size="sm" label="Iniciar sesion" to="/auth/login" flat />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

import { useQuasar } from "quasar";

const $q = useQuasar();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const authStore = useAuthStore();
const router = useRouter();

const register = async () => {
  try {
    await authStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    $q.notify({
      type: "positive",
      message: "Registro exitoso, por favor inicia sesión",
    });
    router.push("/auth/login");
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error?.response?.data?.msg,
    });
  }
};
</script>
