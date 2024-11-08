<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Lista de Vehículos</div>
      </q-card-section>
      <q-card-section>
        <q-btn label="Agregar Vehículo" @click="showForm" color="primary" />
        <q-table
          :rows="vehicles"
          :columns="columns"
          row-key="id"
          v-model:pagination="pagination"
          :rows-per-page-options="[5, 10, 20]"
          :loading="loading"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-select
                v-model="props.row.status"
                :options="statusOptions"
                @input="updateVehicle(props.row)"
                dense
              />
            </q-td>
          </template>
        </q-table>

        <q-dialog v-model="dialog">
          <vehicle-form @submit="fetchVehicles" />
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "src/stores/auth";
import VehicleForm from "../components/VehicleForm.vue";

const authStore = useAuthStore();

const vehicles = ref([]);

const columns = ref([
  {
    name: "brand",
    required: true,
    label: "Marca",
    align: "left",
    field: (row) => row.brand,
  },
  {
    name: "model",
    required: true,
    label: "Modelo",
    align: "left",
    field: (row) => row.model,
  },
  { name: "year", label: "Año", align: "left", field: (row) => row.year },
  {
    name: "status",
    label: "Estado",
    align: "left",
    field: (row) => row.status,
  },
]);
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});
const loading = ref(false);
const dialog = ref(false);
const statusOptions = ref([
  { label: "Disponible", value: "available" },
  { label: "En Mantenimiento", value: "maintenance" },
  { label: "En Servicio", value: "in_service" },
]);

const showForm = () => {
  dialog.value = true;
};

const fetchVehicles = async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:5000/api/vehicles", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    vehicles.value = response.data;
  } catch (error) {
    this.$q.notify({
      type: "negative",
      message: "Error fetching vehicles",
    });
  } finally {
    loading.value = false;
  }
};

const updateVehicle = async (vehicle) => {
  try {
    await axios.put(
      `http://localhost:5000/api/vehicles/${vehicle._id}`,
      vehicle,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
    this.$q.notify({
      type: "positive",
      message: "Vehicle status updated",
    });
  } catch (error) {
    this.$q.notify({
      type: "negative",
      message: "Error updating vehicle",
    });
  }
};

onMounted(() => {
  fetchVehicles();
});
</script>
