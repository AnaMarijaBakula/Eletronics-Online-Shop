<template>
  <v-app-bar extended>
    <v-app-bar-title>Electronic Shop</v-app-bar-title>
    <v-spacer></v-spacer>

    <!-- Prikaz za desktop -->
    <v-btn v-if="!isMobile" @click="$router.push('/')">Početna</v-btn>
    <v-btn v-if="!isMobile" @click="$router.push('/about')">O nama</v-btn>
    <v-btn v-if="!isMobile" @click="$router.push('/')">Proizvodi</v-btn>
    <v-btn v-if="!isMobile" @click="$router.push('/contact')">Kontakt</v-btn>

    <!-- Hamburger meni za mobilne uređaje -->
    <v-menu v-if="isMobile" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push('/')">Početna</v-list-item>
        <v-list-item @click="$router.push('/about')">O nama</v-list-item>
        <v-list-item @click="$router.push('/')">Proizvodi</v-list-item>
        <v-list-item @click="$router.push('/contact')">Kontakt</v-list-item>
      </v-list>
    </v-menu>

    <!-- Ikona košarice ostaje van menija -->
    <v-btn icon @click="$router.push('/basket')">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<style scoped lang="sass">
@import '@/styles/settings'

.v-btn
  color: $text

.v-btn:hover
  background-color: $secondary
</style>
