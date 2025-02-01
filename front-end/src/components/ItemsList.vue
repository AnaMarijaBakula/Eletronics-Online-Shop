<template>
  <v-app id="inspire">
    <v-main class="main">
      <v-container>
        <v-row>
          <v-col
            v-for="item in paginatedItems"
            :key="item._id"
            cols="12"
            :md="4"
          >
            <v-card>
              <v-card-subtitle>{{ item.category }}</v-card-subtitle>
              <v-img :src="item.image" height="200"></v-img>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ item.price }}$</v-card-subtitle>
              <v-btn @click="basketStore.addItem(item)">Dodaj u košaricu</v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Navigacija za paginaciju sa strelicama u istom redu -->
        <v-row justify="center" class="pagination-row">
          <v-icon
            class="pagination-icon"
            :class="{ disabled: currentPage === 1 }"
            @click="prevPage">
            mdi-chevron-left
          </v-icon>

          <span>Stranica {{ currentPage }} od {{ totalPages }}</span>

          <v-icon
            class="pagination-icon"
            :class="{ disabled: currentPage === totalPages }"
            @click="nextPage">
            mdi-chevron-right
          </v-icon>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useBasketStore } from '@/stores/basket';

const basketStore = useBasketStore();
const items = ref([]);

// Parametri paginacije
const currentPage = ref(1);
const itemsPerPage = 6;

// Dohvaćanje podataka s backend-a
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data.items;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

// Paginirani podaci
const paginatedItems = computed(() => {
  // Izračun početnog indeksa na temelju trenutne stranice
  const start = (currentPage.value - 1) * itemsPerPage;

  // Vraća samo one proizvode koji pripadaju trenutnoj stranici
  return items.value.slice(start, start + itemsPerPage);
});

// Ukupan broj stranica
const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));

// Navigacija na sljedeću stranicu
const nextPage = () => {
  // Ako trenutna stranica nije posljednja, povećaj broj stranice
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Navigacija na prethodnu stranicu
const prevPage = () => {
  // Ako trenutna stranica nije prva, smanji broj stranice
  if (currentPage.value > 1) currentPage.value--;
};


onMounted(() => {
  fetchItems();
});

axios.defaults.withCredentials = true;
</script>

<style scoped lang="sass">
@import '@/styles/settings'

.v-card
  flex-direction: column
  height: 100%
  padding: 16px

.v-card-subtitle
  text-align: right
  font-weight: bold
  color: $text

.v-btn
  font-weight: bold
  color: $text
  background-color: $style-color
  width: 100%
  text-transform: none
  margin-top: 16px

.v-btn:hover
  background-color: $secondary

.pagination-row
  margin-top: 16px
  align-items: center
  display: flex
  gap: 16px

.pagination-icon
  font-size: 28px
  cursor: pointer
  color: $style-color

.pagination-icon.disabled
  color: $card-border-color
  cursor: default
</style>
