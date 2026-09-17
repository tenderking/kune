<script setup lang="ts">
defineProps<{
  services: Service[]
  deals?: any[]
}>()
</script>

<template>
  <section class="featured-section">
    <div class="featured-header">
      <div>
        <h2 class="featured-title">
          Featured businesses
        </h2>
        <p class="featured-subtitle">
          Spotlight listings with a larger card — businesses owners choose to feature on Kune
        </p>
      </div>
      <NuxtLink to="/services" class="browse-all-link">
        <span>Browse all</span>
        <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div v-if="services.filter(s => s.featured).length" class="featured-stack">
      <FeaturedServiceCard
        v-for="service in services.filter(s => s.featured).slice(0, 3)"
        :key="service.name"
        :service="service"
      />
    </div>
    <div v-else class="empty-state">
      <p>No featured businesses yet. Listing owners can feature their service from the dashboard.</p>
    </div>
  </section>

  <section v-if="deals?.length" class="deals-section">
    <div class="featured-header">
      <div>
        <h2 class="featured-title">Live deals</h2>
        <p class="featured-subtitle">Time-limited coupons you can buy and redeem</p>
      </div>
      <NuxtLink to="/deals" class="browse-all-link">
        <span>All deals</span>
        <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
      </NuxtLink>
    </div>
    <div class="deals-grid">
      <DealCard v-for="deal in deals.slice(0, 3)" :key="deal.id" :deal="deal" />
    </div>
  </section>

  <section class="featured-section">
    <div class="featured-header">
      <div>
        <h2 class="featured-title">More services</h2>
        <p class="featured-subtitle">Discover Zimbabwean digital platforms and local businesses</p>
      </div>
    </div>
    <div v-if="services.filter(s => !s.featured).length" class="services-grid">
      <div v-for="service in services.filter(s => !s.featured).slice(0, 6)" :key="service.name" class="service-card-wrapper">
        <ServicesGridItem :service="service" />
      </div>
    </div>
    <div v-else class="empty-state">
      <p>No other services found.</p>
    </div>
  </section>
</template>

<style scoped>
.featured-section, .deals-section {
  margin-top: 1rem;
  margin-bottom: 3.5rem;
}

.featured-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .featured-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.featured-title {
  font-size: var(--step-2);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color--heading);
}

.featured-subtitle {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.75;
  margin-top: 0.25rem;
}

.browse-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--clr--primary);
  text-decoration: none;
  white-space: nowrap;
}

.featured-stack {
  display: grid;
  gap: 1.5rem;
}

.deals-grid, .services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .deals-grid, .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .deals-grid, .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card-wrapper {
  display: flex;
  height: 100%;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  opacity: 0.7;
  background: var(--color-card-bg);
  border: 1px dashed var(--color--card-border, rgba(128,128,128,0.3));
  border-radius: var(--radius-lg);
}
</style>
