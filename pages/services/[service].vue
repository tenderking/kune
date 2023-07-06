<script lang="ts" setup>
import type { Services } from '@/types/Services'

const router = useRouter()
const route = useRoute()
const { data: service } = await useFetch(
  `/api/services/${route.params.service}`,
)
if (typeof service.value !== 'object' || service.value === null)
  throw new Error('Invalid service data') // Optional: Handle the error appropriately
const serviceDetails: Services = service.value as Services

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
            :alt="`${serviceDetails.ServiceName.S}-img`"
            src="@/assets/images/placeholder-image.png"
          >
        </div>
        <div class="card__text">
          <h2 class="card__text-title">
            {{ serviceDetails.ServiceName.S }}
          </h2>
          <p class="card__text-description">
            {{ serviceDetails.Description.S }}
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
