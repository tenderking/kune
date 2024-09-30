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
        class="service-item-image" :alt="`${service.name}-img`"
        src="https://kune.co.zw/Images/placeholder-image.png"
      />
      <div class="card__overlay">
        <h3 class="card__text-title">
          {{ service.name }}
        </h3>
      </div>
    </div>
    <div class="card__text">
      <h3 class=" text-left text-base pb-1">
        {{ service.name }}
      </h3>
      <p class="card__text-description">
        {{ service.description }}
      </p>

      <div class="flex space-between items-center gap-2 mt-2">
        <Icon name="ic:baseline-whatsapp" width="16px" height="16px" />
        <span> {{ service.whatsapp || '123 456 789' }} </span>
      </div>
      <UButton icon="material-symbols:favorite-outline" color="orange" class="absolute bottom-4 right-4" @click.stop.prevent="toggleFavorite()">
        Save
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
  align-items: center;
  position: relative;
  width: 275px;
  height: 375px;
  background-color: var(--color-card-bg);
  outline: solid var(--color--secondary);
  border-radius: 6px;
}

.card__image {
  display: inline-block;
  justify-items: center;
  width: 100%;
  height: 40%;
  margin-top: 0;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  position: relative;
}

.card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__text-title {
  color: white;
  text-align: center;
  font-size: 1.2em;
}

.card__text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1em;
  height: 60%;
  background-color: var(--color-card-bg);
  margin-top: 0;
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
  line-clamp: 4;
  -webkit-line-clamp: 4;
}

.card__icons:hover {
  background-color: floralwhite;
  cursor: pointer;
}
</style>
