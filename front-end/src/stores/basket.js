import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from 'vue';


export const useBasketStore = defineStore('BasketStore', () => {
  const items = useLocalStorage('BasketStore:items', ref([]));

  // Getteri- služe sa izračunavanje vrijednosti
  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((total, item) => total + item.price * item.quantity, 0));

  // Akcije- upravljaju podacima u košarici
  // Dodavanje proizvoda u košaricu
  function addItem(item) {
    console.log("Item ID:", item._id);
    console.log("Dodajem proizvod:", item);
    // Provjeri postoji li proizvod u košarici prema id-u
    const existingItem = this.items.find((i) => {
      console.log(i._id, item._id);  // Ovo će ispisivati svaki id koji se uspoređuje
      return i._id === item._id;
    });

    // Ako proizvod već postoji, samo povećaš količinu
    if (existingItem) {
      console.log("Povećavam količinu proizvoda:", existingItem);
      existingItem.quantity++;

    } else {
      // Inače dodaj novi proizvod s količinom 1
      console.log("Dodajem novi proizvod:", item);
      this.items.push({
        ...item,  // Kopiraj sve podatke iz proizvoda(naziv slika)
        quantity: 1,  // Dodaj quantity sa početnom vrijednošću 1
      });
    }
  }

  function removeItem(id) {
    // Filtriraj sve proizvode osim onog koji ima id koji želimo ukloniti
    this.items = this.items.filter(item => item._id !== id);
  }

  function increaseQuantity(id) {
    // Pronađi proizvod u košarici prema njegovom ID-u
    const existingItem = this.items.find(item => item._id === id);
    if (existingItem) {
      existingItem.quantity++;
    }
    console.log("Povećavam za jedan proizvod, gumb +")
  }

  function decreaseQuantity(id) {
    const existingItem = this.items.find(item => item._id === id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    }
    console.log("Smanjujem za jedan proizvod , - gumb")
  }

  function clearBasket() {
    localStorage.removeItem("BasketStore:items");
    items.value = [];// brise sve iz košarice
  }

  return { items, totalItems, totalPrice, addItem, removeItem,increaseQuantity,decreaseQuantity, clearBasket };
});
