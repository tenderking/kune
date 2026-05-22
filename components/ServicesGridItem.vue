<script lang="ts" setup>
const props = defineProps<{ service: Service }>()

// function isFavorite() {
//   // Add your logic here to determine if the service is a favorite or not
//   return true
// }
const user = useUser()

async function toggleFavorite() {
  if (!user.value) {
    // Redirect to login page if user is not authenticated
    navigateTo('/login')
    return
  }

  try {
    const response = await $fetch('/api/users/favorites', {
      method: 'POST',
      body: {
        service: props.service.name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // eslint-disable-next-line no-console
    console.log('Toggling favorite status', response)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <div class="card">
    <div class="card__image">
      <NuxtImg
        class="service-item-image"
        :title="service.name"
        :src="service.image_url || '/assets/images/placeholder-image.png'"
      />
      <div class="card__overlay">
        <h3 class="card__text-title">
          {{ service.name }}
        </h3>
      </div>
    </div>
    <div class="card__text">
      <h3 class="card__name">
        {{ service.name }}
      </h3>
      <p class="card__text-description">
        {{ service.description }}
      </p>

      <div class="card__whatsapp">
        <Icon name="ic:baseline-whatsapp" width="16" height="16" color="#25D366" />
        <span>{{ service.whatsapp || '123 456 789' }}</span>
      </div>
      <UButton icon="material-symbols:favorite-outline" color="primary" class="card__save-btn" @click.stop.prevent="toggleFavorite()">
        Save
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-md, 0.75em);
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.card__image {
  width: 100%;
  height: 160px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.service-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.card:hover .service-item-image {
  transform: scale(1.05);
}

.card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%);
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
}

.card__text-title {
  color: white;
  font-size: var(--step-0);
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

.card__text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  flex: 1;
  position: relative;
}

.card__name {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--color--heading);
}

.card__text-description {
  font-size: var(--step--2);
  color: var(--color--text);
  opacity: 0.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 1.5;
  flex: 1;
}

.card__whatsapp {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--step--2);
  color: var(--color--text);
  opacity: 0.75;
}

.card__save-btn {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
}
</style>
