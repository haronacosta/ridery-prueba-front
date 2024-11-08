<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Lista de Vehículos</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          class="q-mb-md"
          label="Agregar Vehículo"
          @click="showForm"
          color="primary"
        />

        <div class="flex justify-around items-center q-mb-md">
          <q-input
            style="width: 40%"
            v-model="search"
            placeholder="Buscar..."
          />
          <q-select
            style="width: 40%"
            v-model="filterStatus"
            :options="[{ label: 'Todos', value: null }, ...statusOptions]"
            label="Filtrar por estado"
            filled
            dense
            stack-label
          />
        </div>

        <q-table
          :rows="filteredVehicles"
          :columns="columns"
          row-key="id"
          v-model:pagination="pagination"
          :rows-per-page-options="[10, 20, 30]"
          :loading="loading"
          :filter="search"
        >
          <template v-slot:body-cell-status="props">
            <q-td style="max-width: 60px" :props="props">
              <q-select
                v-model="props.row.status"
                :options="statusOptions"
                @update:model-value="updateVehicle(props.row)"
                map-options
                emit-value
                filled
                dense
                class="responsive-select"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="dialog" persistent>
    <vehicle-form @close="dialog = false" />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useVehicleStore } from "src/stores/vehicle";
import VehicleForm from "../components/VehicleForm.vue";

const vehicleStore = useVehicleStore();
const search = ref("");
const filterStatus = ref({ label: "Todos", value: null });

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
  rowsPerPage: 10,
});

const dialog = ref(false);

const statusOptions = ref([
  { label: "Disponible", value: "available" },
  { label: "En Mantenimiento", value: "maintenance" },
  { label: "En Servicio", value: "in_service" },
]);

const showForm = () => {
  dialog.value = true;
};

const fetchVehicles = () => {
  vehicleStore.fetchVehicles();
};

const updateVehicle = async (vehicle) => {
  await vehicleStore.updateVehicle(vehicle);
};

onMounted(() => {
  fetchVehicles();
});

const vehicles = computed(() => vehicleStore.vehicles);
const loading = computed(() => vehicleStore.loading);

const filteredVehicles = computed(() => {
  return vehicles.value.filter((vehicle) => {
    const matchesStatus =
      filterStatus.value.value !== null
        ? vehicle.status === filterStatus.value.value
        : true;

    return matchesStatus;
  });
});
</script>
