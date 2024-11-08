import { defineStore } from "pinia";
import axios from "axios";

import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      const response = await api.post("/api/auth/login", { email, password });

      console.log(response);

      this.token = response.data.token;

      localStorage.setItem("token", this.token);

      await this.getUser();
    },
    async register(name, email, password, confirm_password) {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
        confirm_password,
      });
    },
    async getUser() {
      const response = await api.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.user = response.data;

      console.log(this.user);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
