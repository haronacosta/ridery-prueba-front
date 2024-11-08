<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Ridery - Prueba tecnica </q-toolbar-title>
        <q-btn flat round icon="logout" @click="logout" aria-label="Logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-blue-grey-11">
      <q-toolbar>
        <div class="text-grey-10">&copy; 2024 Haron Acosta</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/auth/login");
};
</script>
