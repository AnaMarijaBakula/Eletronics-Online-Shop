<template>
  <div v-if="item" class="edit-product-card">
    <h2>Uredi Proizvod: {{ item.name }}</h2>
    <div class="item-details">
      <label for="name">Ime proizvoda:</label>
      <input type="text" id="name" v-model="editedItem.name" />

      <label for="price">Cijena proizvoda:</label>
      <input type="number" id="price" v-model="editedItem.price" placeholder="Unesite novu cijenu" />

      <label for="category">Kategorija proizvoda:</label>
      <input type="text" id="category" v-model="editedItem.category" />

      <label for="image">URL slike proizvoda:</label>
      <input type="text" id="image" v-model="editedItem.image" placeholder="Unesite URL slike" />

      <button @click="saveChanges">Spremi promjene</button>
      <button @click="$emit('close')">Odustani</button>
    </div>
  </div>
  <div v-else>
    <h2>Proizvod nije pronađen ili nije moguće uređivati.</h2>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps(['item']);
const emit = defineEmits(['close']);

// Kopiramo item u editedItem kako bismo izbjegli direktno mijenjanje prop-a
const editedItem = ref({ ...props.item });

// Ažuriraj editedItem kada se promijeni item iz props-a
watch(() => props.item, (newItem) => {
  editedItem.value = { ...newItem };
});

// Spremi promjene na proizvodu
const saveChanges = async () => {
  try {
    await axios.put(`http://localhost:5001/api/admin/items/${editedItem.value._id}`, editedItem.value);
    emit('close'); // Zatvori modal nakon spremanja
  } catch (error) {
    console.error('Greška prilikom ažuriranja proizvoda:', error);
  }
};
</script>

<style scoped>
.edit-product-card {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  background-color: #181818;
}

.item-details {
  margin-top: 20px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

button {
  margin-right: 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:first-of-type {
  background-color: #4CAF50;
  color: white;
}

button:last-of-type {
  background-color: #d9534f;
  color: white;
}
</style>
