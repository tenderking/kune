<script lang="ts" setup>
useSeoMeta({
  title: 'Browse Zimbabwean Digital Services — Kune',
  description: 'Explore verified digital services, websites, fintech, and businesses in Zimbabwe.',
})

const route = useRoute()
const category = computed(() => route.query.category || '')
const tags = computed(() => route.query.tags)
const sort = computed(() => route.query.sort)
const searchQuery = computed(() => (route.query.q as string || '').toLowerCase().trim())
const nuxtApp = useNuxtApp()

const { data: services, status } = await useFetch<any[]>('/api/services', {
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

const filteredServices = computed(() => {
  if (!services.value || !Array.isArray(services.value))
    return []
  if (!searchQuery.value)
    return services.value

  const q = searchQuery.value
  return services.value.filter((s: any) => {
    const matchName = s.name?.toLowerCase().includes(q)
    const matchDesc = s.description?.toLowerCase().includes(q)
    const matchCat = s.category?.toLowerCase().includes(q)
    const matchTag = s.tags?.some((t: string) => t.toLowerCase().includes(q))
    return matchName || matchDesc || matchCat || matchTag
  })
})

const featuredServices = computed(() => filteredServices.value.filter((s: any) => s.featured))
const regularServices = computed(() => filteredServices.value.filter((s: any) => !s.featured))
</script>

<template>
  <div class="services-page">
    <ServicesNav />

    <div class="services-header mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold opacity-75">
        <span v-if="category">Category: {{ category }} &bull; </span>
        <span v-if="searchQuery">Search: "{{ searchQuery }}" &bull; </span>
        <span>{{ filteredServices.length }} {{ filteredServices.length === 1 ? 'service' : 'services' }}</span>
      </h2>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
      <div v-for="i in 6" :key="i" class="h-72 rounded-xl bg-[var(--color--card-border)] opacity-30" />
    </div>

    <!-- Featured spotlight -->
    <div v-if="status !== 'pending' && featuredServices.length" class="featured-spotlight mb-8 space-y-4">
      <h2 class="text-lg font-bold tracking-tight">Featured businesses</h2>
      <FeaturedServiceCard
        v-for="service in featuredServices"
        :key="service.name"
        :service="service"
      />
    </div>

    <!-- Services Grid -->
    <ServicesGrid v-if="status !== 'pending'" :services="regularServices" />
  </div>
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
