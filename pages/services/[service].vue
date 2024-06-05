<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
let serviceTags: string[] = []
// my_path is after the /services/ part of the route using fullpath
const my_path = ref(route.fullPath.split('/services/')[1])

const { data: service } = await useFetch<Service>(`/api/services/${my_path.value}`, {
  onResponseError({ response }) {
    // Handle the response errors
    console.error('Error fetching data:', response)
  },
})
if (service.value) {
  if (typeof service.value === 'object' && 'tags' in service.value)
    serviceTags = (await service.value.tags) as string[]
}
// async function deleteItem() {
//   await fetch(
//     `/api/services/${route.params.service}`,
//     {
//       method: 'DELETE',
//     },
//   ).then(() => router.push('/services'))
// }
async function getServicesByTags(tag: string) {
  router.push({
    path: '/services',
    query: { tags: tag },
  })
}
</script>

<template>
  <!-- <header class="container">
    <ServicesNav />
  </header> -->

  <main class="container">
    <h2>Details</h2>
    <UContainer
      :ui="{
        base: 'flex',
        padding: 'p-8',
      }"
    >
      <ServicesGridItem v-if="service" :service="service" />
      <UContainer
        v-if="service"
        :ui="{
          padding: 'p-8 gap-4',
          constrained: 'max-w-7xl',
        }"
        class="Ucontainer"
      >
        <!-- <UBadge size="lg">{{
          typeof service === "object" && "category" in service ? service.category : ""
        }}</UBadge> -->
        <template v-if="serviceTags">
          <UBadge v-for="tag in serviceTags" :key="tag" @click="getServicesByTags(tag)">
            {{ tag }}
          </UBadge>
        </template>
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
