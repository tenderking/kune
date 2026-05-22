<script lang="ts" setup>
// definePageMeta({
//   middleware: 'client-auth',
// })
const route = useRoute()
const category = computed(() => route.query.category || '')
const tags = computed(() => route.query.tags)
const sort = computed(() => route.query.sort)
const nuxtApp = useNuxtApp()

const { data: services, status } = await useFetch<Service>('/api/services', {
  headers: { Accept: 'application/json' },
  query: { category, tags, sort },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData)
      return
    return cachedData
  },
  immediate: true,
})
</script>

<template>
  <header class="">
    <ServicesNav />
  </header>
  <main class="container">
    <template v-if="status === 'pending'">
      <h2>Loading...</h2>
    </template>
    <template v-else-if="services">
      <ServicesGrid :services="services" />
    </template>
    <h2 v-else>
      No services
    </h2>
  </main>
</template>

<style scoped>
header.container {
  border-bottom: 2px solid var(--clr--accent);
}

.container {
  padding: 1em;
}

@media (min-width: 550px) {}
</style>
