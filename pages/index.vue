<script lang="ts" setup>
// import type { Service } from '~/types/services';
const nuxtApp = useNuxtApp()
definePageMeta({
  middleware: ['guest'],
})
const { data: services } = await useFetch<Service>('/api/services', {
  headers: { Accept: 'application/json' },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData)
      return
    return cachedData
  },
})
</script>

<template>
  <header>
    <HomeIllustration />

    <div class="home-text">
      <h1 class="subtitle">
        <span class="kune"> Kune </span>, Digital discovery<br>
        made easy
      </h1>
      <p>
        Are you looking for place to easily find businesses that you need in one place?
        <span class="kune"> Kune </span> makes it a pleasant journey. You will find
        innovation and convience. We provide an overwiew of Zimbabwean digital services
      </p>

      <UButton to="/signup" external color="orange">
        Sign up
      </UButton>
    </div>
  </header>

  <main class="motivation-section">
    <div class="motivation-card">
      <h3>Digital</h3>
      Our focus is promoting a digital Zimbabwe. More and more people are starting to use
      internet, and in the vastness of the internet, we provide the opportunity for a rich
      experience.
    </div>
    <div class="motivation-card">
      <h3>Discover</h3>
      At <span class="kune"> Kune </span>we showcase a vast number of Zimbabwean websites,
      what type of services they offer and where they a located. You can easily bookmark
      the services you find interesting if you want to come back to them
    </div>
    <div class="motivation-card">
      <h3>Advertise</h3>
      <p>
        Are you a business owner and looking for the place to showcase your business and
        attract customers. At
        <span class="kune"> Kune </span> you can do exaclty just that.
      </p>
    </div>
  </main>
  <template v-if="services">
    <HomeItemList :services />
  </template>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 2em;
  padding: 1em;
  max-width: max-content;
  gap: 2em;
}

.mondrian {
  max-width: 100%;
}

header p {
  margin-bottom: 2em;
}

header h2 {
  font-weight: 700;
  margin-bottom: 0.5em;
}

img.illustration {
  max-width: 350px;
}

.home-text {
  max-width: 50ch;
}

.main__title {
  background: linear-gradient(315deg, var(--clr--primary) 25%, var(--clr--accent));
  background-clip: border-box;
  background-clip: text;
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  font-weight: 900;
}

.kune {
  color: var(--clr--primary);
  font-weight: 900;
}

@media (min-width: 550px) {
  header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
  }
}

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

.motivation-card {
  background-color: var(--color-card-bg);
  padding: 2em;
  border-radius: 0.5em;
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
