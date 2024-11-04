<template>
  <v-container>
    <v-card>
      <v-card-title>
        Your Basket
        <v-spacer></v-spacer>
        <v-btn @click="checkout" color="success">Checkout</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="item in basket.items"
              :key="item._id"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.price }}$</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="removeItem(item._id)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-subtitle>
        Total: {{ totalPrice }}$
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const basket = ref({ items: [] });
const totalPrice = ref(0);

// Funkcija za dohvatanje korpe
const fetchBasket = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/basket');
    basket.value = response.data; // Postavljamo podatke korpe
    calculateTotal(); // Izračunavamo ukupnu cenu
  } catch (error) {
    console.error('Error fetching basket: ', error);
  }
};

// Funkcija za uklanjanje stavke iz korpe
const removeItem = async (itemId) => {
  try {
    await axios.delete('http://localhost:5001/api/basket/removeItem', { data: { itemId } });
    fetchBasket(); // Ponovo učitajte korpu nakon uklanjanja
  } catch (error) {
    console.error('Error removing item: ', error);
  }
};

// Funkcija za izračunavanje ukupne cene
const calculateTotal = () => {
  totalPrice.value = basket.value.items.reduce((total, item) => total + item.price, 0);
};

// Funkcija za proces checkout-a
const checkout = () => {
  // Implementirajte logiku za checkout
  console.log('Proceeding to checkout');
};

// Učitaj korpu prilikom montaže komponente
onMounted(() => {
  fetchBasket();
});
</script>

<style scoped lang="sass">

</style>
