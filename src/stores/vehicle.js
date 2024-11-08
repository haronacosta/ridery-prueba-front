import { defineStore } from "pinia";
import { api } from "src/boot/axios";

import { Notify, useQuasar } from "quasar";
import { useAuthStore } from "./auth";

export const useVehicleStore = defineStore("vehicle", {
  state: () => ({
    vehicles: [],
    loading: false,

    totalItems: 0,
  }),
  actions: {
    async fetchVehicles() {
      const $q = useQuasar();
      this.loading = true;
      try {
        const response = await api.get("/api/vehicles", {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });
        this.vehicles = response.data;

        this.totalItems = response.data.length;
      } catch (error) {
        console.log(error);
        $q.notify({
          type: "negative",
          message: "Error fetching vehicles",
        });
      } finally {
        this.loading = false;
      }
    },
    async addVehicle(vehicle) {
      try {
        await api.post("/api/vehicles", vehicle, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });

        Notify.create({
          type: "positive",
          message: "Vehículo creado correctamente",
          timeout: 2000,
          position: "top-right",
        });
      } catch (error) {
        Notify.create({
          type: "negative",
          message: "Error creando el vehículo",
          timeout: 2000,
          position: "top-right",
        });
      }
    },
    async updateVehicle(vehicle) {
      try {
        await api.put(`/api/vehicles/${vehicle._id}`, vehicle, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });

        const index = this.vehicles.findIndex((v) => v._id === vehicle._id);
        if (index !== -1) {
          this.vehicles[index] = vehicle;
        }

        Notify.create({
          type: "positive",
          message: "Vehículo actualizado correctamente",
          timeout: 2000,
          position: "top-right",
        });
      } catch (error) {
        Notify.create({
          type: "negative",
          message: "Error actualizando el vehiculo",
        });

        console.log(error);
      }
    },
  },
});
