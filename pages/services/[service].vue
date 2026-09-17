<script lang="ts" setup>
const route = useRoute()
const serviceName = computed(() => route.params.service as string)

const { data: service, status } = await useFetch<any>(`/api/services/${serviceName.value}`, {
  onResponseError({ response }) {
    console.error('Error fetching service details:', response)
  },
})

useSeoMeta({
  title: computed(() => service.value ? `${service.value.name} — Kune` : 'Service Details — Kune'),
  description: computed(() => service.value?.description || 'Discover Zimbabwean digital services on Kune.'),
})
</script>

<template>
  <div class="service-detail-page max-w-5xl mx-auto py-2">
    <!-- Breadcrumbs -->
    <div class="mb-6">
      <NuxtLink
        to="/services"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color--text)] opacity-70 hover:opacity-100 hover:text-[var(--clr--primary)] transition-all"
      >
        <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
        Back to all services
      </NuxtLink>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="status === 'pending'" class="animate-pulse space-y-6">
      <div class="h-48 rounded-2xl bg-[var(--color--card-border)] opacity-30" />
      <div class="h-64 rounded-2xl bg-[var(--color--card-border)] opacity-30" />
    </div>

    <!-- Service Details -->
    <ServicesDetails v-else-if="service" :service="service" />

    <!-- Not Found -->
    <div v-else class="text-center py-16 bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color--card-border)] p-8">
      <h2 class="text-xl font-bold mb-2 text-[var(--color--heading)]">Service not found</h2>
      <p class="opacity-75 mb-6 text-sm">The service you're looking for doesn't exist or may have been updated.</p>
      <UButton to="/services" color="primary">
        Browse all services
      </UButton>
    </div>
  </div>
</template>
