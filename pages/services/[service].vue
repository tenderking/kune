<script lang="ts" setup>
import type { ServiceJson } from '@/types/ServiceJson'

// const router = useRouter()
const route = useRoute()
// my_path is after the /services/ part of the route using fullpath
const my_path = ref(route.fullPath.split('/services/')[1])

const { data: service } = await useFetch(
  `/api/services/${my_path.value}`,
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
    <UContainer 
      :ui="{
        base: 'flex',
        padding: 'p-8',
      }"
      >
    <ServicesGridItem :service="serviceDetails" />
    <UContainer 
    :ui="{
        padding: 'p-8 gap-4',
        constrained: 'max-w-7xl',
         }"
      class="Ucontainer"
     >
    <UBadge size="lg">{{ serviceDetails.category }}</UBadge>
    <UBadge v-for="tag in serviceDetails.tags">{{ tag }}</UBadge>
    </UContainer>
    </UContainer>
  
  </main>
</template>
<style scoped>
.Ucontainer {
  margin: 0 auto;
  max-width: 1200px;
}

</style>

