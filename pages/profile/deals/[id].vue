<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const route = useRoute()
const id = computed(() => String(route.params.id || ''))
const { data: deal, status, error } = await useFetch<any>(() => `/api/deals/${id.value}`)
const { data: services } = await useFetch<any[]>('/api/users/services')

function handleSuccess() {
  navigateTo('/profile/deals')
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div class="pb-4 border-b border-[var(--color--card-border)]">
      <NuxtLink to="/profile/deals" class="inline-flex items-center gap-1.5 text-sm opacity-70 hover:text-[var(--clr--primary)] mb-3">
        <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
        Back to deals
      </NuxtLink>
      <h1 class="text-2xl font-bold">Edit deal</h1>
    </div>

    <div v-if="status === 'pending'" class="h-64 rounded-lg bg-[var(--color--card-border)] opacity-30 animate-pulse" />
    <div v-else-if="error || !deal" class="p-8 text-center rounded-lg border">
      <p class="font-medium">Deal not found</p>
      <UButton to="/profile/deals" color="primary" class="mt-4">Return to deals</UButton>
    </div>
    <div v-else class="rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] p-6">
      <DealForm :deal-id="id" :initial="deal" :services="services || []" @success="handleSuccess" @close="navigateTo('/profile/deals')" />
    </div>
  </div>
</template>
