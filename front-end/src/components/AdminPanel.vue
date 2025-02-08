<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar Navigacija -->
      <v-col cols="2">
        <v-navigation-drawer permanent app>
          <v-list>
            <v-list-item @click="setView('products')">
              Svi proizvodi
            </v-list-item>
            <v-list-item @click="setView('promotions')">
              Sve promocije
            </v-list-item>
            <v-list-item @click="setView('addProduct')">
              Dodaj proizvod
            </v-list-item>
            <v-list-item @click="setView('addPromotion')">
              Dodaj promociju
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

      <!-- Glavni Sadržaj -->
      <v-col cols="12" class=" justify-center">
        <!-- Prikazivanje svih proizvoda -->
        <ItemsList v-if="currentView === 'products'" :basketStore.addItem(item)="false" />
        <!-- Prikazivanje svih promocija -->
        <v-row v-if="currentView === 'promotions'">
          <v-col v-for="promotion in promotions" :key="promotion._id" cols="4">
            <v-card>
              <v-card-title>{{ promotion.code }}</v-card-title>
              <v-card-subtitle>
                <span v-if="promotion.discount_type === 'percentage'">{{ promotion.discount_value }}% popusta</span> <!-- Ako je tip popusta postotak -->
                <span v-else>{{ promotion.discount_value }}$ manje</span> <!-- Ako je tip popusta fiksni iznos -->
              </v-card-subtitle>
              <!-- Provjera za 'is_conjunction' -->
              <v-card-subtitle>
                <span v-if="promotion.is_conjunction">Može se kombinirati</span>
                <span v-else>Ne može se kombinirati</span>
              </v-card-subtitle>

              <v-btn @click="deletePromotion(promotion._id)" color="red" small>
                Izbriši
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <!-- Dodavanje proizvoda -->
        <div v-if="currentView === 'addProduct'">
          <h2>Dodavanje Proizvoda</h2>
          <v-form @submit.prevent="addProduct">
            <v-text-field v-model="product.name" label="Naziv Proizvoda" required></v-text-field>
            <v-text-field v-model="product.price" label="Cijena" type="number" required></v-text-field>
            <v-text-field v-model="product.category" label="Kategorija" required></v-text-field>
            <v-text-field v-model="product.image" label="URL Slike" required></v-text-field>
            <v-btn type="submit" color="primary">Dodaj Proizvod</v-btn>
          </v-form>
        </div>
        <!-- Dodavanje promocija -->
        <div v-if="currentView === 'addPromotion'">
          <h2>Dodavanje Promocija</h2>
          <v-form @submit.prevent="addNewPromotion">
            <v-text-field v-model="promotion.code" label="Kod Promocije" required></v-text-field>
            <v-text-field v-model="promotion.discount_value" label="Vrijednost Popusta" type="number" required></v-text-field>
            <v-select v-model="promotion.discount_type" :items="['percentage', 'fixed']" label="Vrsta Popusta" required></v-select>
            <v-switch v-model="promotion.is_conjunction" label="Može li se kombinirati?" />
            <v-btn type="submit" color="primary">Dodaj Promociju</v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ItemsList from '@/components/ItemsList.vue';
import axios from "axios";

// Stanja za proizvode i promocije
const product = ref({ name: '', price: '', category: '', image: '' });
const promotion = ref({ code: '', discount_value: '', discount_type: '', is_conjunction: false });

const promotions = ref([]); // Za pohranu svih promocija

// Dohvati sve promocije iz baze
const getPromotions = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/admin/promotions');
    console.log(response.data)
    promotions.value = response.data; // Spremi podatke u 'promotions' varijablu
  } catch (error) {
    console.error('Greška pri dohvaćanju promocija:', error);
  }
};

// Funkcija za brisanje promocije
const deletePromotion = async (_id) => {
  try {
    await axios.delete(`http://localhost:5001/api/admin/promotions/${_id}`); // API endpoint za brisanje promocije prema _id-u
    promotions.value = promotions.value.filter(promotion => promotion._id !== _id); // Ukloni iz liste lokalno
    console.log(`Promocija s ID-om ${_id} je izbrisana.`);
  } catch (error) {
    console.error('Greška pri brisanju promocije:', error);
  }
};

// Funkcija za dodavanje promocije u bazu
const addNewPromotion = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/admin/promotions', promotion.value);
    console.log('Dodana promocija:', response.data);

    // Osvježi listu promocija nakon dodavanja
    promotions.value.push(response.data); // Dodaj novu promociju u lokalnu listu
    promotion.value = { code: '', discount_value: '', discount_type: '', is_conjunction: false }; // Resetiraj formu
  } catch (error) {
    console.error('Greška pri dodavanju promocije:', error);
  }
};

// Funkcija za dodavanje proizvoda u bazu
const addProduct = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/admin/item', product.value);
    console.log('Proizvod je uspješno dodan:', response.data);
    product.value = { name: '', price: '', category: '', image: '' };
  } catch (error) {
    console.error('Greška pri dodavanju proizvoda:', error);
  }
};

// Stanje za kontrolu prikaza sadržaja,prvi prikaz na tojr uti bit ce products
const currentView = ref('products');

// Postavljanje prikaza
const setView = (view) => {
  currentView.value = view;
};

// Dohvati promocije kada se komponenta učita
onMounted(() => {
  getPromotions();
});
</script>

<style scoped>
</style>
