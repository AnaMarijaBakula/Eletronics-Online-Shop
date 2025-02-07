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
        <a :href="article.url" target="_blank">Pročitaj više</a>
      </div>
    </div>
    <div v-else>
      <p>Trenutno nema vijesti.</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/styles/settings.scss' // Povezivanje s vašim globalnim SCSS datotekama za varijable

.news-container
  padding: 2rem
  background-color: $quantity-color
  color: $text
  text-align: center

  h2
    font-size: 2rem
    margin-bottom: 1rem
    color: $text

.news-list
  display: flex
  flex-direction: column
  gap: 1.5rem

.news-card
  background-color: $subtle-text-color
  padding: 1rem
  border-radius: 8px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
  transition: transform 0.3s

  &:hover
    transform: translateY(-5px)

  h3
    font-size: 1.5rem
    margin-bottom: 0.5rem
    color: $quantity-color

  p
    font-size: 1rem
    color: $text-color
    margin-bottom: 1rem

  a
    text-decoration: none
    color: $text-color
    font-weight: bold

</style>
