<template>
    <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Electronic Shop</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn  @click="$router.push('/')">Početna</v-btn>
      <v-btn  @click="$router.push('/about')">O nama</v-btn>
      <v-btn  @click="$router.push('/products')">Proizvodi</v-btn>
      <v-btn  @click="$router.push('/contact')">Kontakt</v-btn>

      <v-btn icon @click="$router.push('/basket')">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">


</script>

<style scoped lang="sass">
/* Vaši stilovi ovdje */
</style>
