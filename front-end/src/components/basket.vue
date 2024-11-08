<template>
  <div>
    <h1>Košarica</h1>
    <!-- Provjeravamo je li dohvaćen `basket` i sadrži li stavke -->
    <div v-if="basket && basket.items && basket.items.length">
      <v-row dense>
        <v-col cols="12" v-for="(itemData, index) in basket.items" :key="itemData._id">
          <v-card class="mx-auto" max-width="400">
            <v-card-title>{{ itemData.item.name }}</v-card-title>
            <v-card-subtitle>Kategorija: {{ itemData.item.category }}</v-card-subtitle>
            <v-card-text>
              Cijena: {{ itemData.item.price }} kn <br>
              Količina: {{ itemData.quantity }}
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" @click="addItem(itemData.item)">+</v-btn>
              <v-btn text color="error" @click="removeItem(itemData.item)">-</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-text-field label="Napišite promocijski kod"></v-text-field>
      </v-row>
      <p class="text-h6 mt-4">Ukupno: {{ basket.total }} kn</p>
    </div>
    <div v-else>
      <p>Košarica je prazna.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      basket: [] // Postavili smo `basket` kao niz za kompatibilnost s dobivenom strukturom podataka
    };
  },
  methods: {
    async fetchBasketItems() {
      try {
        const response = await axios.get('http://localhost:5001/api/basket',{
          withCredentials: true
        });
        console.log('Dohvaceni podaci: ',response.data);

        this.basket = response.data; // Spremamo podatke iz odgovora u `basket`
      } catch (error) {
        console.error("Greška prilikom dohvaćanja košarice:", error);
      }
    },

    async addItem(item) {
      try {
        const response = await axios.post('http://localhost:5001/api/basket/addItem', {
          itemId: item._id
        },{withCredentials: true});
        console.log('Stavka dodana u košaricu:', response.data);
        this.fetchBasketItems();
      } catch (error) {
        console.error('Greška prilikom dodavanja stavke u košaricu:', error);
      }
    },

    async removeItem(item) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/basket/${item._id}`, {
          withCredentials: true
        });
        console.log('Stavka uklonjena iz košarice:', response.data);
        this.fetchBasketItems();
      } catch (error) {
        console.error('Greška prilikom uklanjanja stavke iz košarice:', error.response ? error.response.data : error.message);
      }
    },
    async addPromotion(){

    }
  },

  mounted() {
    this.fetchBasketItems();
  },
};

</script>
