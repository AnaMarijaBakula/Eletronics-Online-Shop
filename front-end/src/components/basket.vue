<template>
  <v-container class="cart-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5 cart-card" elevation="10">
          <h2 class="text-center mb-6 cart-title">Vaša Košarica</h2>

          <!-- Artikli u košarici -->
          <div v-if="basketStore.items.length > 0">
            <v-card
              v-for="item in basketStore.items"
              :key="item.id"
              class="mb-4 cart-item-card"
            >
              <v-row align="center">
                <v-col cols="4">
                  <v-img
                    :src="item.image"
                    alt="item.name"
                    class="rounded"
                    aspect-ratio="1"
                  />
                </v-col>
                <v-col cols="5">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ item.name }}</h3>
                  <p class="text-grey-600">{{ item.price }} kn</p>
                </v-col>
                <v-col cols="3" class="text-center">
                  <v-btn icon small color="primary" @click="basketStore.decreaseQuantity(item._id)">
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                  <span class="quantity">{{ item.quantity }}</span>
                  <v-btn icon small color="primary" @click="basketStore.increaseQuantity(item._id)">
                    <v-icon>mdi-plus-circle</v-icon>
                  </v-btn>
                  <v-btn icon small color="red" @click="basketStore.removeItem(item._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Ako je košarica prazna -->
          <div v-if="basketStore.items.length === 0" class="text-center mt-4 ">
            <v-card class="pa-5 text-white-500 text-h6" outlined>
              <v-icon size="40" color="grey">mdi-cart-outline</v-icon>
              <p>Vaša košarica je prazna.</p>
            </v-card>
          </div>

          <!-- Promotivni kod -->
          <v-row align="center" justify="space-between" class="mt-6">
            <v-col cols="8">
              <v-text-field
                v-model="promoCode"
                label="Promotivni kod"
                outlined
                dense
                color="primary"
              />
            </v-col>
            <v-col cols="4">
              <v-btn color="primary" block @click="applyPromoCode">
                Primijeni
              </v-btn>
            </v-col>
          </v-row>

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

<script setup >
import { useBasketStore } from '@/stores/basket';

const basketStore = useBasketStore();
</script>

<style scoped>

.cart-title {
  font-size: 2rem;
  font-weight: bold;
  color: #FFFFFF;
}

.cart-item-card {
  border: 1px solid #333;
  border-radius: 12px;
  padding: 12px;
  background-color: #555;
  margin-bottom: 20px; /* Razmak između kartica */
}

.cart-item-card h3 {
  color: #FFFFFF;
}

.quantity {
  font-size: 1rem;
  font-weight: bold;
  color: #FFFFFF;
  margin: 0 8px;
}

.total-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 20px;
}

.checkout-btn {
  font-size: 1rem;
  font-weight: bold;
  background-color: #28A745; /* Zeleni gumb */
  color: #FFFFFF;
}

.v-btn.primary {
  background-color: #FF5733; /* Primarna boja */
  color: white;
}

/* Stilizacija inputa za promotivni kod */
.v-text-field input {
  font-size: 1rem;
  color: #333;
}

.v-text-field label {
  color: #555;
}

/* Responzivnost za mobilne uređaje */
@media (max-width: 600px) {
  .cart-card {
    padding: 16px; /* Manji razmak na manjim ekranima */
  }

  .cart-title {
    font-size: 1.6rem; /* Manji font na manjim ekranima */
  }

  .quantity {
    font-size: 0.9rem; /* Manji font za količinu */
  }

  .total-price {
    font-size: 1.2rem; /* Manji font za ukupni iznos */
  }

  .checkout-btn {
    font-size: 0.9rem; /* Manji font za gumb */
    padding: 10px; /* Manji razmak na gumba */
  }

  .v-btn {
    font-size: 0.9rem; /* Manji font za gumbe */
    padding: 8px 12px; /* Manje paddinga na mobilnim uređajima */
  }

  /* Manji razmaci između gumba */
  .v-btn.primary {
    font-size: 0.9rem;
  }

  .v-text-field input {
    font-size: 0.9rem; /* Manji font za inpute */
  }
}
</style>



