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

    <ItemsList />
  </v-app>
</template>

<script setup lang="ts">

import ItemsList from '@/components/ItemsList.vue';

</script>

<style scoped lang="sass">
/* Vaši stilovi ovdje */
</style>
