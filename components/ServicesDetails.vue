<script lang="ts" setup>
const props = defineProps<{ service: any }>()

const user = useUser()
const isFavorited = ref(false)

async function toggleFavorite() {
  if (!user.value) {
    navigateTo('/login')
    return
  }

  try {
    isFavorited.value = !isFavorited.value
    await $fetch('/api/users/favorites', {
      method: 'POST',
      body: {
        service: props.service.name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  catch (error) {
    console.error('Error toggling favorite:', error)
    isFavorited.value = !isFavorited.value
  }
}
</script>

<template>
  <div class="service-details">
    <!-- Header Hero Card -->
    <div class="details-hero">
      <div class="hero-image-wrap">
        <ServiceCover
          class="hero-image"
          :name="service.name"
          :category="service.category"
          :src="service.image_url"
          :alt="`${service.name} cover`"
        />
      </div>

      <div class="hero-content">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <UBadge v-if="service.category" color="primary" variant="subtle" size="md" class="font-medium">
            {{ service.category }}
          </UBadge>
          <UBadge v-if="service.featured" color="warning" variant="subtle" size="md">
            Featured
          </UBadge>
          <UBadge v-if="service.claimed" color="success" variant="subtle" size="md">
            Owner listed
          </UBadge>
        </div>

        <h1 class="hero-title">{{ service.name }}</h1>

        <div v-if="service.tags && service.tags.length" class="hero-tags">
          <NuxtLink
            v-for="tag in service.tags"
            :key="tag"
            :to="`/services?tags=${encodeURIComponent(tag)}`"
          >
            <span class="tag-pill">#{{ tag }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 2-Column Grid -->
    <div class="details-grid">
      <!-- Left: Description and Info -->
      <div class="details-main">
        <div class="info-card">
          <h2 class="card-heading">About this service</h2>
          <p class="description-text">
            {{ service.description || 'No detailed description provided for this service yet.' }}
          </p>

          <div v-if="service.address" class="address-section">
            <h3 class="address-title">
              <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4 text-[var(--clr--primary)]" />
              Location / Address
            </h3>
            <p class="address-value">{{ service.address }}</p>
          </div>
        </div>
      </div>

      <!-- Right: Action Sidebar -->
      <div class="details-sidebar">
        <div class="action-card">
          <h3 class="action-title">Connect & Discover</h3>

          <div class="action-buttons">
            <UButton
              v-if="service.webUrl"
              :to="service.webUrl"
              target="_blank"
              external
              color="primary"
              size="lg"
              icon="i-heroicons-globe-alt"
              class="w-full justify-center font-semibold"
            >
              Visit Official Website
            </UButton>

            <a
              v-if="service.whatsapp"
              :href="`https://wa.me/${service.whatsapp.replace(/[^0-9]/g, '')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="whatsapp-action-btn"
            >
              <Icon name="ic:baseline-whatsapp" class="w-5 h-5 text-white" />
              <span>Message on WhatsApp</span>
            </a>

            <UButton
              color="neutral"
              variant="outline"
              size="md"
              :icon="isFavorited ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
              class="w-full justify-center mt-1"
              @click="toggleFavorite"
            >
              {{ isFavorited ? 'Saved in Favorites' : 'Save to Favorites' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div v-if="service.deals?.length" class="info-card">
      <h2 class="card-heading">Live deals</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <DealCard v-for="deal in service.deals" :key="deal.id" :deal="deal" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.details-hero {
  display: flex;
  flex-direction: column;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg, 1.25em);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

@media (min-width: 640px) {
  .details-hero {
    flex-direction: row;
    align-items: center;
  }
}

.hero-image-wrap {
  width: 100%;
  height: 220px;
  background-color: rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .hero-image-wrap {
    width: 280px;
    height: 220px;
  }
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-title {
  font-size: var(--step-2);
  font-weight: 800;
  color: var(--color--heading);
  line-height: 1.2;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag-pill {
  font-size: 0.8rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background-color: var(--color--bg);
  border: 1px solid var(--color--card-border, rgba(128, 128, 128, 0.2));
  color: var(--color--text);
  opacity: 0.85;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.tag-pill:hover {
  border-color: var(--clr--primary);
  color: var(--clr--primary);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .details-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.info-card, .action-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg, 1.25em);
  padding: 1.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.card-heading {
  font-size: var(--step-0);
  font-weight: 700;
  color: var(--color--heading);
  margin-bottom: 1rem;
}

.description-text {
  font-size: var(--step--1);
  line-height: 1.75;
  color: var(--color--text);
  opacity: 0.9;
}

.address-section {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color--card-border, rgba(0, 0, 0, 0.06));
}

.address-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--color--heading);
  margin-bottom: 0.25rem;
}

.address-value {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.8;
  margin-left: 1.4rem;
}

.action-title {
  font-size: var(--step-0);
  font-weight: 700;
  color: var(--color--heading);
  margin-bottom: 1.25rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.whatsapp-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #25D366;
  color: white;
  font-weight: 600;
  font-size: var(--step--1);
  padding: 0.65rem 1rem;
  border-radius: var(--radius-sm, 0.5em);
  text-decoration: none;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.whatsapp-action-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}
</style>
