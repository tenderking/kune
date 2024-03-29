<script lang="ts" setup>
// Define the type for a service
const route = useRoute()
interface Service {
  id: number
  name: string
  description: string
  // Add other properties as needed
}

// Initialize services as null
const services = ref<Service[] | null>(null)

// Function to handle category slug change
async function onSlugChanged(slug: string) {
  console.log("Slug changed:", slug)
  try {
    // Fetch data using the slug
    const data = await fetchData(slug)
    services.value = data
  } catch (error) {
    console.error("Error fetching data:", error)
    // Handle potential errors (optional: display error message)
  }
}

async function fetchData(slug: string): Promise<Service[]> {
  let url = `api/services/categories/${slug}` // Replace with your API endpoint
  if (!slug) {
    url = `api/services` // Default endpoint if no slug is provided
  }

  if (route.query.tags) {
    url = `api/services/tags/${route.query.tags}`
  }
  const { data: response, pending, error } = await useFetch(url)
  return response.value as Service[] // Parse the JSON response
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

    <!-- <pre>
      {{servicesList}}</pre> -->
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
