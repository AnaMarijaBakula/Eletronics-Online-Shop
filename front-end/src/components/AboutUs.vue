<template>
  <div class="about-us-container">
    <div class="about-us-header">
      <h1>Electronic shop</h1>
      <p>Tehnologija koja pokreće budućnost</p>
    </div>

    <p class="main-text">
      Dobrodošli u naš online shop, gdje tehnologija susreće praktičnost.<br>
      Naša ponuda uključuje najnovije uređaje i rješenja u svijetu pametnih domova i tehnologije. <br>
      Bilo da tražite najnoviji pametan uređaj za vašu kuću, opremu za upravljanje dronovima ili inovativne IoT proizvode,
      ovdje ćete pronaći sve što vam treba.<br> S naglaskom na kvalitetu i performanse, naš cilj je olakšati vam život kroz tehnologiju.
    </p>

    <section class="about-us-values">
      <div class="value-card">
        <h3>Inovacija</h3>
        <p>Uvijek u potrazi za najnovijim tehnologijama i inovacijama koje unapređuju život i posao.</p>
      </div>
      <div class="value-card">
        <h3>Sigurnost</h3>
        <p>Naši uređaji su sigurni, pouzdani i dizajnirani s ciljem zaštite vaših podataka i privatnosti.</p>
      </div>
      <div class="value-card">
        <h3>Integracija</h3>
        <p>Naši proizvodi lako se integriraju u vaš pametan dom i poslovne procese, omogućujući jednostavno upravljanje i kontrolu.</p>
      </div>
    </section>
  </div>
</template>

<script></script>

<style scoped lang="scss">
@import '@/styles/settings.scss';

.about-us-container {
  color: $text-color;

  .about-us-header {
    text-align: center;
    padding: 2rem;
    color: $text-color;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.2rem;
    }
  }

  .main-text {
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.5;
    color: $text-color;
  }

  .about-us-values {
    display: flex;
    flex-wrap: wrap; /* Omogućuje karticama da se prilagode širini ekrana */
    justify-content: space-between; /* Jednako raspoređivanje kartica */
    gap: 1.5rem; /* Razmak između kartica */
    padding: 2rem;
  }

  .value-card {
    background-color: $card-background;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    width: 30%; /* Svaka kartica zauzima 30% širine na velikim ekranima */

    h3 {
      font-size: 1.5rem;
      color: $background;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: $quantity-color;
    }
  }

  /* Medijski upiti za mobilne uređaje */
  @media (max-width: 768px) {
    .about-us-header h1 {
      font-size: 2rem;
    }

    .about-us-header p {
      font-size: 1rem;
    }

    .main-text {
      font-size: 1rem;
    }

    .about-us-values {
      padding: 1rem;
      justify-content: center; /* Centriranje kartica na manjim ekranima */
    }

    .value-card {
      width: 100%; /* Kartice zauzimaju cijeli prostor na manjim ekranima */
    }
  }
}
</style>
