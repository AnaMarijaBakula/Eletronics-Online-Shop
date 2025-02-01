<template>
  <v-container class="cart-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="pa-5 cart-card" elevation="10">
          <h2 class="text-center mb-6 cart-title">Vaša Košarica</h2>

          <!-- Artikli u košarici -->
          <div v-if="basketStore.items.length > 0">
            <v-card v-for="item in basketStore.items" :key="item.id" class="mb-4 cart-item-card">
              <v-row align="center" class="cart-item">
                <v-col cols="12" sm="4" class="text-center">
                  <v-img :src="item.image" alt="item.name" class="rounded item-image" aspect-ratio="1" />
                </v-col>
                <v-col cols="12" sm="5" class="text-center text-sm-left">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ item.name }}</h3>
                  <p class="text-grey-600">{{ item.price }} $</p>
                </v-col>
                <v-col cols="12" sm="3" class="text-center">
                  <div class="quantity-controls">
                    <v-btn icon small class="quantity-btn minus" @click="basketStore.decreaseQuantity(item._id)">
                      <v-icon>mdi-minus-circle</v-icon>
                    </v-btn>
                    <span class="quantity">{{ item.quantity }}</span>
                    <v-btn icon small class="quantity-btn plus" @click="basketStore.increaseQuantity(item._id)">
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                    <v-btn icon small class="delete-btn" @click="basketStore.removeItem(item._id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Ako je košarica prazna -->
          <div v-if="basketStore.items.length === 0" class="text-center mt-4">
            <v-card class="pa-5 text-white-500 text-h6" outlined>
              <v-icon size="40" color="grey">mdi-cart-outline</v-icon>
              <p>Vaša košarica je prazna.</p>
            </v-card>
          </div>

          <!-- Ukupni iznos -->
          <div class="text-center mt-6">
            <h3 class="total-price">Ukupno: {{ basketStore.totalPrice }} $</h3>
          </div>

          <!-- Gumb za nastavak kupnje -->
          <div class="text-center mt-4">
            <v-btn color="success" large block class="checkout-btn" @click="$router.push('/checkout')">
              Nastavi na plaćanje
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBasketStore } from '@/stores/basket';
const basketStore = useBasketStore();
</script>

<style scoped lang="sass">
@import '@/styles/settings'

.cart-item-card
  padding: 12px
  background-color: $style-color
  margin-bottom: 20px

.cart-item
  display: flex
  align-items: center
  flex-wrap: wrap

.item-image
  max-width: 100px
  max-height: 100px
  margin: auto

.quantity-controls
  display: flex
  align-items: center
  justify-content: center
  gap: 8px

.quantity-btn
  width: 32px
  height: 32px
  border: 1px solid white
  background-color: transparent
  color: white
  border-radius: 4px
  transition: all 0.3s ease

.quantity-btn.plus:hover, .quantity-btn.minus:hover
  background-color: $secondary

.delete-btn
  color: white
  margin-left: 8px
  transition: all 0.3s ease

.delete-btn:hover
  color: red

.quantity
  width: 40px
  height: 32px
  display: flex
  align-items: center
  justify-content: center
  border: 1px solid white
  background-color: transparent
  color: white
  font-size: 16px
  font-weight: bold
  border-radius: 4px

.checkout-btn
  font-size: 1rem
  font-weight: bold
  background-color: $secondary
  color: $text

@media (max-width: 600px)
  .quantity-controls
    gap: 4px
  .quantity-btn
    width: 28px
    height: 28px
  .quantity
    width: 32px
    height: 28px
    font-size: 14px
</style>
