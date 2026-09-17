<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const router = useRouter()
const heroSearch = ref('')

const popularCategories = ['Banking', 'Ecommerce', 'Software', 'Media', 'Travel']

function handleSearch() {
  const query = heroSearch.value.trim()
  if (query) {
    router.push({ path: '/services', query: { q: query } })
  }
  else {
    router.push('/services')
  }
}

const { data: services } = await useFetch<Service[]>('/api/services', {
  headers: { Accept: 'application/json' },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData)
      return
    return cachedData
  },
})

const { data: deals } = await useFetch('/api/deals')
</script>

<template>
  <header class="hero-header">
    <div class="hero-illustration-wrap">
      <HomeIllustration />
    </div>

    <div class="home-text">
      <h1 class="subtitle">
        <span class="kune">Kune</span> — Digital discovery<br>
        made easy
      </h1>
      <p class="hero-desc">
        Find every Zimbabwean digital service you need, all in one place.
        <span class="kune">Kune</span> makes discovery pleasant — innovation and
        convenience, curated for you.
      </p>

      <!-- Hero Search Bar -->
      <form class="hero-search-form" @submit.prevent="handleSearch">
        <div class="hero-search-box">
          <UInput
            v-model="heroSearch"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search services (e.g. EcoCash, InnBucks)..."
            size="lg"
            class="flex-1"
          />
          <UButton
            type="submit"
            color="primary"
            size="lg"
            class="px-6 font-semibold"
          >
            Search
          </UButton>
        </div>

        <div class="popular-tags">
          <span class="popular-label">Popular:</span>
          <NuxtLink
            v-for="cat in popularCategories"
            :key="cat"
            :to="`/services?category=${cat}`"
            class="popular-chip"
          >
            {{ cat }}
          </NuxtLink>
        </div>
      </form>

      <div class="hero-cta-buttons">
        <UButton to="/deals" color="primary" variant="subtle" size="md" icon="heroicons:ticket-20-solid">
          Browse Deals
        </UButton>
        <UButton to="/services" color="primary" variant="subtle" size="md" icon="heroicons:squares-2x2-20-solid">
          Explore All Services
        </UButton>
        <UButton to="/services/post" variant="outline" color="neutral" size="md" icon="heroicons:plus-circle-20-solid">
          List Your Service
        </UButton>
      </div>
    </div>
  </header>

  <main class="motivation-section">
    <div class="motivation-card">
      <div class="motivation-icon">🌐</div>
      <h3>Digital</h3>
      <p>Promoting a digital Zimbabwe. As more people come online, we provide the gateway to a rich, connected experience.</p>
    </div>
    <div class="motivation-card">
      <div class="motivation-icon">🔍</div>
      <h3>Discover</h3>
      <p>At <span class="kune">Kune</span> we showcase Zimbabwean websites — their services, locations, and direct contact.</p>
    </div>
    <div class="motivation-card">
      <div class="motivation-icon">📣</div>
      <h3>Advertise</h3>
      <p>Business owner? Showcase your business and reach thousands of customers directly on <span class="kune">Kune</span>.</p>
    </div>
  </main>

  <template v-if="services">
    <HomeItemList :services="services" :deals="deals || []" />
  </template>
</template>

<style scoped>
.hero-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 2.5rem;
  gap: 2.5rem;
}

.hero-illustration-wrap {
  width: 100%;
  max-width: 420px;
  display: flex;
  justify-content: center;
}

.home-text {
  max-width: 54ch;
  width: 100%;
}

.hero-desc {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: var(--step-0);
  opacity: 0.9;
}

.hero-search-form {
  margin-bottom: 1.75rem;
}

.hero-search-box {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.popular-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: var(--step--1);
}

.popular-label {
  opacity: 0.6;
  font-weight: 500;
}

.popular-chip {
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  color: var(--color--text);
  opacity: 0.85;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all var(--transition-fast);
}

.popular-chip:hover {
  opacity: 1;
  color: var(--clr--primary);
  border-color: var(--clr--primary);
}

.hero-cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
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

@media (min-width: 768px) {
  .hero-header {
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 3.5rem 0;
  }
}

main {
  margin-bottom: 3.5rem;
  padding: 0.5rem 0;
}

.motivation-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.motivation-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-left: 3px solid var(--clr--primary);
  padding: 1.75rem;
  border-radius: var(--radius-md, 0.75em);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.motivation-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.motivation-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
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
  font-size: var(--step--1);
}

@media (min-width: 640px) {
  .motivation-section {
    flex-direction: row;
    gap: 1.5rem;
  }

  .motivation-card {
    flex: 1;
  }
}
</style>

