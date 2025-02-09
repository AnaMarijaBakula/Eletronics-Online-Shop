<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Ref za pohranu vijesti
const articles = ref([]);

// API ključ
const apiKey = 'ee790fcc3f2645ee9069640a2588b235';

// Funkcija za dohvat vijesti
const fetchNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'electrical engineering',  // Korištenje ključnih riječi vezanih uz elektrotehniku
        apiKey: apiKey,
        sortBy: 'publishedAt',  // Sortiraj po datumima
        pageSize: 5,  // Prikazuj samo 5 vijesti
      },
    });
    console.log(response.data); // Dodajte logiranje odgovora API-a
    articles.value = response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

// Dohvati vijesti kada je komponenta montirana
onMounted(() => {
  fetchNews();
  setInterval(fetchNews, 86400000); // Ažuriranje vijesti svakih 24 sata
});
</script>

<template>
  <div class="news-container">
    <h2>Najnovije vijesti iz elektrotehnike</h2>
    <div v-if="articles.length > 0" class="news-list">
      <div v-for="(article, index) in articles" :key="index" class="news-card">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <a :href="article.url" target="_blank" class="read-more">Pročitaj više</a>
      </div>
    </div>
    <div v-else>
      <p>Trenutno nema vijesti.</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/styles/settings.scss'

.news-container
  padding: 2rem
  color: $text
  text-align: center

  h2
    font-size: 2rem
    margin-bottom: 1rem
    color: $secondary

.news-list
  display: flex
  flex-direction: column
  gap: 1.5rem

.news-card
  background-color: $card-border
  padding: 1rem
  transition: transform 0.3s

  &:hover
    transform: translateY(-5px)

  h3
    font-size: 1.5rem
    font-weight: bold
    margin-bottom: 0.5rem
    color: $background

  p
    font-size: 1rem
    color: $quantity
    margin-bottom: 1rem

.read-more
  text-decoration: none
  color: $background
  font-weight: bold
  transition: color 0.3s ease

  &:hover
    color: $secondary
</style>
