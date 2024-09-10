<script lang="ts" setup>
const props = defineProps<{ service: Service }>()

function isFavorite() {
  // Add your logic here to determine if the service is a favorite or not
  return true
}

async function toggleFavorite() {
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
    <div class=" flex space-between">
      <NuxtImg class="card__image" :alt="`${service.name}-img`" src="/assets/images/placeholder-image.png" />
      <div class="card__text">
        <h4 class="bold ">
          {{ service.name }}
        </h4>
        <p class="card__text-description">
          {{ service.description }}
        </p>
      </div>
    </div>

    <div>
      <div class="w-100 lr-0 flex col flex-start center pt-2">
        <Icon name="ic:baseline-web" width="16px" height="16px" />
        <NuxtLink :href="service.webUrl"> Visit {{ service.webUrl }} </NuxtLink>
      </div>

      <div class="flex space-between">
        <Icon name="ic:baseline-whatsapp" width="16px" height="16px" />
        <span> {{ service.whatsapp || '123 456 789' }} </span>
      </div>

      <div class="flex space-between">
        <Icon name="ic:baseline-category" width="16px" height="16px" />
        <span> {{ service.category || '123 456 789' }} </span>
      </div>

      <UButton color="orange" class="w-100 flex col center bg-white" @click.stop.prevent="toggleFavorite()">
        Save
        <Icon v-if="isFavorite()" name="material-symbols:favorite-outline" />
      </UButton>
    </div>

  </div>
</template>

<style scoped>
.card-container {
  max-width: max-content;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--color-card-bg);
  outline: solid var(--color--secondary);
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.card__image {
  justify-items: center;
  width: 60%;
  height: auto;
  border-radius: 6px;
  overflow: hidden;
}

.card__text-title {
  color: white;
  text-align: center;
}

.card__text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1em;
  height: max-content;
  background-color: var(--color-card-bg);
}

.card__text-description {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 6;
  -webkit-line-clamp: 6;
}

.card__icons:hover {
  background-color: floralwhite;
  cursor: pointer;
}

.flex {
  display: flex;
  gap: 0.5em;
  align-items: center;
  background-color: var(---color-card-bg);
}
</style>
