<script lang="ts" setup>
defineProps<{ service: Service }>()
</script>

<template>
  <article class="featured-card" @click="navigateTo(`/services/${service.name}`)">
    <div class="featured-card__media">
      <ServiceCover
        class="featured-card__image"
        :name="service.name"
        :category="service.category"
        :src="service.image_url"
        :alt="`${service.name} cover`"
      />
    </div>
    <div class="featured-card__body">
      <div class="featured-card__badges">
        <UBadge color="primary" variant="solid" size="sm" class="font-semibold">
          Featured
        </UBadge>
        <UBadge v-if="service.category" color="neutral" variant="subtle" size="sm">
          {{ service.category }}
        </UBadge>
        <UBadge v-if="service.claimed" color="success" variant="subtle" size="sm">
          Owner listed
        </UBadge>
      </div>
      <h3 class="featured-card__title">
        {{ service.name }}
      </h3>
      <p class="featured-card__desc">
        {{ service.description || 'No description provided.' }}
      </p>
      <div v-if="service.tags?.length" class="featured-card__tags">
        <span v-for="tag in service.tags.slice(0, 4)" :key="tag" class="featured-card__tag">#{{ tag }}</span>
      </div>
      <div class="featured-card__actions">
        <UButton color="primary" size="md" class="font-semibold" @click.stop="navigateTo(`/services/${service.name}`)">
          View listing
        </UButton>
        <UButton
          v-if="service.webUrl"
          :to="service.webUrl"
          external
          target="_blank"
          color="neutral"
          variant="outline"
          size="md"
          @click.stop
        >
          Website
        </UButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.featured-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg, 1.25em);
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.featured-card:hover {
  transform: translateY(-4px);
  border-color: var(--clr--primary);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

@media (min-width: 768px) {
  .featured-card {
    grid-template-columns: minmax(280px, 0.9fr) 1.2fr;
    min-height: 320px;
  }
}

.featured-card__media {
  min-height: 220px;
  background: rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
  .featured-card__media {
    min-height: 100%;
  }
}

.featured-card__image {
  width: 100%;
  height: 100%;
}

.featured-card__body {
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.featured-card__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.featured-card__title {
  font-size: var(--step-2);
  font-weight: 800;
  line-height: 1.2;
  color: var(--color--heading);
}

.featured-card__desc {
  font-size: var(--step--1);
  line-height: 1.7;
  opacity: 0.85;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.featured-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.featured-card__tag {
  font-size: 0.8rem;
  opacity: 0.75;
}

.featured-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
</style>
