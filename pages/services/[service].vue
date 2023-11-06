<script lang="ts" setup>
import type { ServiceJson } from '@/types/ServiceJson'

// const router = useRouter()
const route = useRoute()
const { data: service } = await useFetch(
  `/api/services/${route.params.service}`,
)
if (typeof service.value !== 'object' || service.value === null)
  throw new Error('Invalid service data') // Optional: Handle the error appropriately
const serviceDetails: ServiceJson = service.value as ServiceJson

// async function deleteItem() {
//   await fetch(
//     `/api/services/${route.params.service}`,
//     {
//       method: 'DELETE',
//     },
//   ).then(() => router.push('/services'))
// }
</script>

<template>
  <header class="container">
    <ServicesNav />
  </header>

  <main class="container">
    <h2>Details</h2>
    <ServicesGridItem :service="serviceDetails" />
    <!-- <pre>
      {{servicesList}}</pre> -->
  </main>
</template>
