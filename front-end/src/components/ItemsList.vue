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
        </v-row>

        <!-- Proizvodi -->
        <v-row>
          <v-col
            v-for="item in filteredItems"
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useBasketStore } from '@/stores/basket';

const basketStore = useBasketStore();
const items = ref([]);
const filters = ref({
  category: '',
});

// Dohvat proizvoda
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data.items;
  } catch (error) {
    console.error('Error fetching items: ', error);
  }
};

// Dohvati jedinstvene kategorije iz proizvoda
const uniqueCategories = computed(() => {
  // Izdvajanje kategorija iz items array
  const categories = items.value.map(item => item.category);

  // Filtriranje jedinstvenih kategorija
  return categories.filter((value, index, self) => self.indexOf(value) === index);
});


// Computed property za filtrirane proizvode
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesCategory = filters.value.category ? item.category === filters.value.category : true;
    return matchesCategory ;
  });
});

// Prikazivanje proizvoda pri učitavanju
onMounted(() => {
  fetchItems(); // Dohvati proizvode
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
</style>
