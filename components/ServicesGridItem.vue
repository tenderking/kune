<script lang="ts" setup>
const props = defineProps<{ service: Service }>()

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
  <div class="card group" @click="navigateTo(`/services/${service.name}`)">
    <div class="card__image">
      <ServiceCover
        class="service-item-image"
        :name="service.name"
        :category="service.category"
        :src="service.image_url"
        :alt="service.name"
      />
      <div class="card__badge">
        <UBadge v-if="service.featured" color="warning" variant="solid" size="sm" class="font-semibold shadow-sm">
          Featured
        </UBadge>
        <UBadge v-else-if="service.category" color="primary" variant="subtle" size="sm" class="font-medium shadow-sm">
          {{ service.category }}
        </UBadge>
      </div>
      <button
        type="button"
        class="card__fav-btn"
        :class="{ 'is-active': isFavorited }"
        :aria-label="isFavorited ? 'Remove from favorites' : 'Save to favorites'"
        @click.stop.prevent="toggleFavorite"
      >
        <Icon :name="isFavorited ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'" class="w-5 h-5 text-[var(--clr--primary)]" />
      </button>
    </div>

    <div class="card__text">
      <h3 class="card__name group-hover:text-[var(--clr--primary)] transition-colors">
        {{ service.name }}
      </h3>

      <p class="card__text-description">
        {{ service.description || 'No description provided.' }}
      </p>

      <div v-if="service.tags && service.tags.length" class="card__tags">
        <span
          v-for="tag in service.tags.slice(0, 3)"
          :key="tag"
          class="card__tag"
        >
          #{{ tag }}
        </span>
      </div>

      <div class="card__footer">
        <a
          v-if="service.whatsapp"
          :href="`https://wa.me/${service.whatsapp.replace(/[^0-9]/g, '')}`"
          target="_blank"
          rel="noopener noreferrer"
          class="card__whatsapp"
          @click.stop
        >
          <Icon name="ic:baseline-whatsapp" class="w-4 h-4 text-[#25D366]" />
          <span>{{ service.whatsapp }}</span>
        </a>
        <a
          v-else-if="service.webUrl"
          :href="service.webUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="card__web"
          @click.stop
        >
          <Icon name="ic:baseline-web" class="w-4 h-4 opacity-70" />
          <span class="truncate max-w-[130px]">{{ service.webUrl.replace(/^https?:\/\//, '') }}</span>
        </a>
        <span v-else class="text-xs opacity-50">Local service</span>

        <span class="card__view-link">
          View
          <Icon name="heroicons:arrow-right-20-solid" class="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-md, 0.75em);
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  border-color: var(--clr--primary);
}

.card__image {
  width: 100%;
  height: 170px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.05);
}

.service-item-image {
  width: 100%;
  height: 100%;
}

.card:hover .service-item-image :deep(.service-cover__image) {
  transform: scale(1.04);
}

.card__badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
}

.card__fav-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.card__fav-btn:hover {
  transform: scale(1.1);
}

.card__text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  flex: 1;
}

.card__name {
  font-size: var(--step-0);
  font-weight: 700;
  color: var(--color--heading);
  line-height: 1.3;
}

.card__text-description {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.5;
  flex: 1;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.25rem;
}

.card__tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background-color: var(--color--card-border);
  opacity: 0.8;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color--card-border, rgba(0, 0, 0, 0.06));
}

.card__whatsapp, .card__web {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--step--2);
  color: var(--color--text);
  opacity: 0.85;
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.card__whatsapp:hover, .card__web:hover {
  opacity: 1;
  color: var(--clr--primary);
}

.card__view-link {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--clr--primary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}
</style>
