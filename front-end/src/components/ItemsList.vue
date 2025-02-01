<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Electronic Shop</v-app-bar-title>
      <v-card-subtitle class="text-center">Najbolja elektronika po pristupačnim cijenama - pronađite svoje idealne proizvode uz samo nekoliko klikova!</v-card-subtitle>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push('/basket')">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item._id"
            cols="12"
            :md="4"
          >
            <v-card>
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
import { ref, onMounted } from 'vue';
import axios from 'axios'; //HTTP zahtjevi
import { useBasketStore } from '@/stores/basket';//pinia

//Pinia store i ispis trenutne proizvode u košarici
const basketStore = useBasketStore();
console.log(basketStore.items);

const items = ref([]);// dohvačeni proizvod iz back

// Funkcija za dohvačanje iz back
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data.items;// Ako je uspjesno sprema se u items.value
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

//prikazivanje proizvoda
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
  text-align: right // Cijena-desno
  font-weight: bold
  color: $text

.v-btn
  font-weight: bold
  color: $text
  background-color: $style-color
  width: 100% // proširenje gumba
  text-transform: none
  margin-top: 16px

.v-btn:hover
  background-color: $secondary

</style>


