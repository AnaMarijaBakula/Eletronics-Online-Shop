<template>
  <v-container>
    <v-row class="mb-4">
      <!-- Stavke u košarici -->
      <v-col cols="12" md="8">
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            <h3>Stavke u košarici</h3>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-row v-for="item in basketStore.items" :key="item._id" class="mb-2">
              <v-col cols="6">
                <v-img :src="item.image" max-width="80" />
                <span>{{ item.name }}</span>
              </v-col>
              <v-col cols="3">
                <span>{{ item.quantity }} x {{ item.price.toFixed(2) }} $</span>
              </v-col>
              <v-col cols="3" class="text-right">
                <span>{{ (item.quantity * item.price).toFixed(2) }} $</span>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="$router.push('/basket')">Vrati se na shopping</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Podaci za dostavu i ukupna cijena -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            <h3>Podaci za dostavu</h3>
          </v-card-title>
          <v-text-field label="Ime i Prezime" outlined v-model="user.name" required />
          <v-text-field label="Adresa" outlined v-model="user.address" required />
          <v-text-field label="E-mail" outlined v-model="user.email" required />

          <v-divider></v-divider>

          <v-card-title>
            <h3>Ukupno</h3>
          </v-card-title>
          <v-row>
            <v-col>
              <span>Ukupna cijena:</span>
              <span>{{ basketStore.totalPrice.toFixed(2) }} $</span>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-btn color="success" block @click="placeOrder">Završi narudžbu</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useBasketStore } from '@/stores/basket';
import { useRouter } from 'vue-router';

const basketStore = useBasketStore();
const router = useRouter();

// Podaci o korisniku
const user = ref({
  name: '',
  address: '',
  email: ''
});

const placeOrder = async () => {
  if (!user.value.name || !user.value.address || !user.value.email) {
    alert("Molimo unesite sve podatke.");
    return;
  }

  const orderData = {
    name: user.value.name,
    email: user.value.email,
    address: user.value.address,
    orderItems: basketStore.items.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    totalAmount: parseFloat(basketStore.totalPrice.toFixed(2)) // Uvijek zaokruži na 2 decimale
  };
  console.log(orderData)

  try {
    const response = await axios.post('http://localhost:5001/api/order', orderData);
    console.log('Narudžba uspješno poslana:', response.data);

    basketStore.clearBasket(); // Očisti košaricu nakon uspješne narudžbe
    router.push('/checkoutsuccess')
  } catch (error) {
    console.error('Greška prilikom slanja narudžbe:', error);
    alert("Došlo je do pogreške prilikom narudžbe.");
  }
};
</script>
<style scoped>
/* Dodatni stilovi po želji */
</style>
