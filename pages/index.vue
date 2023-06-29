<script lang="ts" setup>

</script>

<template>
  <HomeHeader />
  <!-- second section -->

  <main class="motivation-section">
    <div class="motivation-card">
      <h3>Digital</h3>
      Our focus is promoting a digital Zimbabwe. More and more people are
      starting to use internet, and in the vastness of the internet, we
      provide the opportunity for a rich experience.
    </div>
    <div class="motivation-card">
      <h3>Discover</h3>
      At <span class="kune"> Kune </span>we showcase a vast number of
      Zimbabwean websites, what type of services they offer and where they a
      located. You can easily bookmark the services you find interesting if
      you want to come back to them
    </div>
    <div class="motivation-card">
      <h3>Advertise</h3>
      <p>
        Are you a business owner and looking for the place to showcase your
        business and attract customers. At
        <span class="kune"> Kune </span> you can do exaclty just that.
      </p>
    </div>
  </main>

  <HomeItemList />
</template>

<style scoped>
main {
  margin-bottom: 2em;
  padding: 1em;
}

footer {
  padding: 1em;
  margin-bottom: 2em;
}

div,
section {
  margin-bottom: 1rem;
}

@media (min-width: 550px) {
  main {
    display: flex;
    justify-content: space-between;
    gap: 1em;
  }

  main.motivation-section>* {
    max-width: 35ch;
  }
}
</style>
