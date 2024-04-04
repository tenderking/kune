<script lang="ts" setup>
const route = useRoute()
interface Service {
  id: number
  name: string
  description: string
}

const services = ref<Service[] | null>(null)

async function onSlugChanged(slug: string) {
  console.log("Slug changed to:", slug)
  try {
    const data = await fetchData(slug)
    services.value = data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

async function fetchData(slug: string): Promise<Service[]> {
  let url = `api/services/categories/${slug}`
  if (!slug) {
    url = `api/services`
  }
  if (route.query.tags) {
    url = `api/services/tags/${route.query.tags}`
  }
  const response = await $fetch(url)
  return response as Service[]
}

onMounted(() => {
  onSlugChanged("")
})
</script>

<template>
  <header class="container">
    <ServicesNav @category-slug="onSlugChanged" />
  </header>
  <main class="container">
    <template v-if="services">
      <ServicesGrid :services />
    </template>
    <h2 v-else>No services</h2>
  </main>
</template>

<style scoped>
header.container {
  border-bottom: 2px solid var(--clr--accent);
}

.container {
  padding: 1em;
}

@media (min-width: 550px) {
}
</style>
