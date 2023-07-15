<script lang="ts" setup>
import type { ServiceJson } from '@/types/ServiceJson'

const router = useRouter()
const route = useRoute()
const { data: service } = await useFetch(
  `/api/services/${route.params.service}`,
)
if (typeof service.value !== 'object' || service.value === null)
  throw new Error('Invalid service data') // Optional: Handle the error appropriately
const serviceDetails: ServiceJson = service.value as ServiceJson

async function deleteItem() {
  await fetch(
    `/api/services/${route.params.service}`,
    {
      method: 'DELETE',
    },
  ).then(() => router.push('/services'))
}
</script>

<template>
  <header class="container">
    <ServicesNav />
  </header>

  <main class="container">
    <h2>Details</h2>
    <template v-if="serviceDetails">
      <div class="card">
        <div class="card__image">
          <img
            class="service-item-image"
            :alt="`${serviceDetails.serviceName}-img`"
            src="@/assets/images/placeholder-image.png"
          >
        </div>
        <div class="card__text">
          <h2 class="card__text-title">
            {{ serviceDetails.serviceName }}
          </h2>
          <p class="card__text-description">
            {{ serviceDetails.description }}
          </p>
        </div>

        <div class="flex">
          <IconWhatsApp width="16px" height="16px" />
          <span> 077-233-222-999 </span>
        </div>
        <div>
          <button @click="deleteItem">
            Delete
          </button>
        </div>
      </div>
    </template>
    <h2 v-else>
      No services here
    </h2>

    <!-- <pre>
      {{servicesList}}</pre> -->
  </main>
</template>
