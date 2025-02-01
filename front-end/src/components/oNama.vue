<template>
  <div class="about-us-container">
    <header class="about-us-header">
      <h1>Electronic shop</h1>
      <p>Tehnologija koja pokreće budućnost</p>
    </header>

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

<script>

export default {
  name: "AboutUs",
  components: {AppFooter},
};
</script>

<style scoped lang="scss">
@import '@/styles/settings.scss';

.about-us-container {
  background-color: $quantity-color;
  color: #FFFFFF; // Bijeli tekst za cijelu stranicu

  .about-us-header {
    text-align: center;
    padding: 2rem;
    background-color: $quantity-color;
    color: #FFFFFF;

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
    margin: 2rem 0;
    color: #FFFFFF; // Bijeli tekst
  }

  .about-us-values {
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    background-color: $quantity-color;

    .value-card {
      background-color: $card-background; // Bijela pozadina kartica
      border: 1px solid $card-border; // Svijetlo siva granica
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      width: 30%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      h3 {
        font-size: 1.5rem;
        color: $quantity-color; // Bijeli tekst u karticama
      }

      p {
        font-size: 1rem;
        color: $quantity-color; // Sivi tekst unutar kartica
      }
    }
  }

  .about-us-footer {
    text-align: center;
    padding: 1.5rem;
    background-color: $quantity-color;
    color: #FFFFFF;
    font-size: 1rem;
  }
}
</style>
