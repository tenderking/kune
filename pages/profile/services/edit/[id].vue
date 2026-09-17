<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const route = useRoute()
const serviceId = computed(() => String(route.params.id || ''))

const { data: service, status, error } = await useFetch<any>(
  () => `/api/services/${serviceId.value}`,
)

function handleSuccess() {
  navigateTo('/profile/services')
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div class="pb-4 border-b border-[var(--color--card-border)]">
      <NuxtLink
        to="/profile/services"
        class="inline-flex items-center gap-1.5 text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--clr--primary)] transition-all mb-3"
      >
        <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
        Back to listed services
      </NuxtLink>
      <h1 class="text-2xl font-bold tracking-tight text-[var(--color--heading)]">
        Edit Service
      </h1>
      <p class="text-sm text-[var(--color--text)] opacity-80 mt-1">
        Update the listing details for this service.
      </p>
    </div>

    <div v-if="status === 'pending'" class="animate-pulse h-64 rounded-lg bg-[var(--color--card-border)] opacity-30" />

    <div
      v-else-if="error || !service"
      class="p-8 text-center rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)]"
    >
      <p class="font-medium text-[var(--color--heading)]">
        Service not found
      </p>
      <p class="text-sm opacity-70 mt-1 mb-4">
        This listing may have been removed, or you may not have access to edit it.
      </p>
      <UButton to="/profile/services" color="primary">
        Return to services
      </UButton>
    </div>

    <div v-else class="rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] p-6">
      <ServiceFormPost
        :service-id="serviceId"
        :initial="service"
        @success="handleSuccess"
        @close="navigateTo('/profile/services')"
      />
    </div>
  </div>
</template>
