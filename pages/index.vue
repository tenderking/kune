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
        <span class="kune">Kune</span> — Digital discovery<br>
        made easy
      </h1>
      <p>
        Find every Zimbabwean digital service you need, all in one place.
        <span class="kune">Kune</span> makes discovery pleasant — innovation and
        convenience, curated for you.
      </p>

      <UButton to="/signup" external color="primary" size="lg">
        Get started
      </UButton>
    </div>
  </header>

  <main class="motivation-section">
    <div class="motivation-card">
      <div class="motivation-icon">🌐</div>
      <h3>Digital</h3>
      <p>Promoting a digital Zimbabwe. As more people come online, we provide the gateway
      to a rich, connected experience.</p>
    </div>
    <div class="motivation-card">
      <div class="motivation-icon">🔍</div>
      <h3>Discover</h3>
      <p>At <span class="kune">Kune</span> we showcase Zimbabwean websites — their services,
      their locations, their stories. Bookmark the ones that matter to you.</p>
    </div>
    <div class="motivation-card">
      <div class="motivation-icon">📣</div>
      <h3>Advertise</h3>
      <p>Business owner? Showcase your business and attract customers directly on
      <span class="kune">Kune</span>.</p>
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
  padding: 2rem 0 2rem;
  gap: 2.5rem;
}

header p {
  margin-bottom: 1.75rem;
  line-height: 1.7;
}

.home-text {
  max-width: 50ch;
}

.subtitle {
  font-size: var(--step-3);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.kune {
  color: var(--clr--primary);
  font-weight: 900;
}

@media (min-width: 550px) {
  header {
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 3rem 0;
  }
}

main {
  margin-bottom: 3rem;
  padding: 0.5rem 0;
}

.motivation-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.motivation-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-left: 3px solid var(--clr--primary);
  padding: 1.5rem;
  border-radius: var(--radius-md, 0.75em);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.motivation-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.motivation-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.motivation-card h3 {
  font-size: var(--step-0);
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color--heading);
}

.motivation-card p {
  line-height: 1.65;
  opacity: 0.8;
}

@media (min-width: 550px) {
  .motivation-section {
    flex-direction: row;
    gap: 1.25rem;
  }

  .motivation-card {
    flex: 1;
  }
}
</style>

