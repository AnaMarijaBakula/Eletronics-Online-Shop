<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5 text-center success-card" elevation="10">
      <v-icon color="green" size="64">mdi-check-circle</v-icon>
      <v-card-title class="text text-h5 font-weight-bold">Narudžba uspješno poslana!</v-card-title>
      <v-card-subtitle class="text">Bit ćete preusmjereni na početnu stranicu...</v-card-subtitle>
    </v-card>
  </v-container>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push('/'); // Vraća na početnu stranicu
  }, 4000); // 4 sekunde
});
</script>

<style scoped>
.text{
  color: #333; /* Tamno siva boja teksta */

}

.success-card {
  max-width: 400px;
  border-radius: 12px;
  background-color: #e8f5e9; /* Svijetlo zelena pozadina */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
