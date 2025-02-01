<template>
  <v-app id="inspire">
    <v-main class="main">
      <v-container>
        <!-- Filtri -->
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="filters.category"
              :items="uniqueCategories"
              label="Kategorija"
              outlined
            ></v-select>
          </v-col>
          <!-- Pretraga -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters.search"
              label="Pretraži proizvode"
              outlined
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Proizvodi -->
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
              <v-btn @click="addItemToBasket(item)">Dodaj u košaricu</v-btn>
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
      <!--Prikazivanje poruka kada se proizvod doda u kosaricu-->
      <v-snackbar v-model="snackbar.show" :timeout="3000" color="success">
        {{ snackbar.message }}
      </v-snackbar>
    </v-main>
  </v-app>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useBasketStore } from '@/stores/basket';

// Snackbar za prikazivanje poruka
const snackbar = ref({
  show: false,
  message: '',
});

// Pinia store za košaricu
const basketStore = useBasketStore();

const addItemToBasket = (item) => {
  basketStore.addItem(item); // Dodaje proizvod u košaricu
  snackbar.value.message = `${item.name} je dodan u košaricu!`; // Postavlja poruku
  snackbar.value.show = true; // Prikazuje snackbar
};


const items = ref([]);
const filters = ref({
  category: '', // Kategorija za filtriranje
  search: '', // Pretraga za filtriranje
});

// Parametri paginacije
const currentPage = ref(1);
const itemsPerPage = 6;

// Dohvati proizvode
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data.items; // Sprema proizvode u items
  } catch (error) {
    console.error('Error fetching items: ', error);
  }
};

// Dohvati jedinstvene kategorije
const uniqueCategories = computed(() => {
  const categories = items.value.map(item => item.category); // Dohvaća sve kategorije
  return ['Sve kategorije', ...categories.filter((value, index, self) => self.indexOf(value) === index)];
});

// Filtriranje proizvoda prema kategoriji i pretrazi
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    // Provjera kategorije
    const matchesCategory = filters.value.category && filters.value.category !== 'Sve kategorije'
      ? item.category === filters.value.category
      : true; // Ako nije postavljena kategorija, dopuštaju se svi proizvodi

    // Provjera pretrage
    const matchesSearch = filters.value.search
      ? item.name.toLowerCase().includes(filters.value.search.toLowerCase()) // Provjerava ime proizvoda
      : true; // Ako nije unesena pretraga, dopuštaju se svi proizvodi

    return matchesCategory && matchesSearch; // Vraća proizvode koji zadovoljavaju oba uvjeta
  });
});

// Paginacija - filtrirani proizvodi
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage; // Izračunava početak stranice
  return filteredItems.value.slice(start, start + itemsPerPage); // Vraća odgovarajući broj proizvoda za trenutnu stranicu
});

// Računa ukupan broj stranica
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));


// Navigacija na sljedeću stranicu
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++; // Ako nije na zadnjoj stranici, ide na sljedeću
};

// Navigacija na prethodnu stranicu
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--; // Ako nije na prvoj stranici, ide na prethodnu
};

// Dohvati proizvode prilikom učitavanja komponente
onMounted(() => {
  fetchItems(); // Pokreće funkciju za dohvat proizvoda
});
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
