<template>
    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item._id"
            cols="4"
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useBasketStore } from '@/stores/basket';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAdmin = route.path.includes('/adminpanel');

//Pinia store i ispis dodanih itema u konzoli
const basketStore = useBasketStore();
console.log(basketStore.items);

const items = ref([]);

// Funkcija za dohvat stavki
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data.items;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};


onMounted(() => {
  fetchItems();
});

axios.defaults.withCredentials = true;

</script>

<style scoped lang="sass">
/* Vaši stilovi ovdje */
</style>
