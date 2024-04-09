<script lang="ts" setup>
const route = useRoute()
const category = computed(() => route.query.category)
const tags = computed(() => route.query.tags)
const nuxtApp = useNuxtApp()

const { data: services, pending } = await useFetch<Service>("/api/services", {
  headers: { Accept: "application/json" },
  query: { category: category, tags: tags },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData) return
    return cachedData
  },
})
</script>

<template>
  <header class="container">
    <ServicesNav />
  </header>
  <main class="container">
    <template v-if="pending">
      <h2>Loading...</h2>
    </template>
    <template v-else-if="services">
      <ServicesGrid :services="services" />
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
