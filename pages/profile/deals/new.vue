<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const route = useRoute()
const { data: services } = await useFetch<any[]>('/api/users/services')
const initial = computed(() => ({
  service_id: String(route.query.service || ''),
}))

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
      <h1 class="text-2xl font-bold">Create a deal</h1>
      <p class="text-sm opacity-80 mt-1">Shoppers will see this coupon on Deals and can buy a voucher.</p>
    </div>

    <div v-if="!services?.length" class="p-8 text-center rounded-lg border border-[var(--color--card-border)]">
      <p class="font-medium">List a service first</p>
      <p class="text-sm opacity-70 mt-1 mb-4">Deals are attached to businesses you own.</p>
      <UButton to="/profile/services" color="primary">Add a listing</UButton>
    </div>

    <div v-else class="rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] p-6">
      <DealForm :services="services" :initial="initial" @success="handleSuccess" @close="navigateTo('/profile/deals')" />
    </div>
  </div>
</template>
