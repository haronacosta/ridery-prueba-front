<template>
  <q-card class="bg-white">
    <q-card-section>
      <div class="text-h6">Registrar Vehículo</div>
    </q-card-section>
    <q-form @submit.prevent="submit" @validation-error="onValidationError">
      <q-card-section>
        <q-input
          v-model="brand"
          label="Marca"
          dense
          outlined
          :rules="[(val) => !!val || 'Marca es obligatoria']"
        />
        <q-input
          v-model="model"
          label="Modelo"
          dense
          outlined
          :rules="[(val) => !!val || 'Modelo es obligatorio']"
        />
        <q-input
          v-model="year"
          label="Año"
          dense
          outlined
          type="number"
          :rules="[validateYear]"
        />
        <q-select
          v-model="status"
          label="Estado"
          dense
          outlined
          :options="statusOptions"
          map-options
          :rules="[(val) => !!val || 'Estado es obligatorio']"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          type="submit"
          label="Registrar"
          color="primary"
          :disable="!formIsValid"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useVehicleStore } from "src/stores/vehicle";

const emit = defineEmits(["close"]);
const brand = ref("");
const model = ref("");
const year = ref("");
const status = ref("available");
const statusOptions = ref([
  { label: "Disponible", value: "available" },
  { label: "En Mantenimiento", value: "maintenance" },
  { label: "En Servicio", value: "in_service" },
]);
const vehicleStore = useVehicleStore();

const formIsValid = computed(() => {
  return brand.value && model.value && year.value && status.value;
});

const submit = async () => {
  await vehicleStore.addVehicle({
    brand: brand.value,
    model: model.value,
    year: year.value,
    status: status.value,
  });

  await vehicleStore.fetchVehicles();

  emit("close");
};

const validateYear = (val) => {
  const currentYear = new Date().getFullYear();
  if (!val) return "Año es obligatorio";
  if (val < 1886 || val > currentYear)
    return `Año debe estar entre 1886 y ${currentYear}`;

  return true;
};

const onValidationError = () => {
  this.$q.notify({
    type: "negative",
    message: "Por favor, complete todos los campos correctamente.",
  });
};
</script>
