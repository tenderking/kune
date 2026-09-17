<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const toast = useToast()
const deals = ref(await $fetch('/api/users/deals').catch(() => []))

async function removeDeal(id: string) {
  if (!confirm('Remove or pause this deal?'))
    return
  try {
    await $fetch(`/api/deals/${id}`, { method: 'DELETE' })
    deals.value = await $fetch('/api/users/deals')
    toast.add({ title: 'Deal updated', color: 'success' })
  }
  catch (error: any) {
    toast.add({
      title: 'Could not update deal',
      description: error.data?.statusMessage || error.message,
      color: 'error',
    })
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">My Deals</h1>
        <p class="text-sm opacity-80 mt-1">Create coupon links shoppers can browse and buy.</p>
      </div>
      <UButton to="/profile/deals/new" color="primary" icon="i-heroicons-plus" class="font-semibold">
        Create deal
      </UButton>
    </div>

    <div v-if="!deals?.length" class="flex flex-col items-center justify-center p-12 text-center rounded-lg border-2 border-dashed border-[var(--color--card-border)]">
      <p class="text-lg font-medium">No deals yet</p>
      <p class="text-sm opacity-70 mt-1 mb-6">Publish a time-limited coupon for one of your listings.</p>
      <UButton to="/profile/deals/new" color="primary">Create your first deal</UButton>
    </div>

    <div v-else class="grid gap-4">
      <div v-for="deal in deals" :key="deal.id" class="p-4 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <p class="font-bold">{{ deal.title }}</p>
          <p class="text-sm opacity-75">{{ deal.service.name }} · {{ deal.live_status }} · {{ deal.quantity_sold }}/{{ deal.quantity_total }} sold</p>
        </div>
        <div class="flex gap-2">
          <UButton :to="`/deals/${deal.slug}`" variant="outline" color="neutral" size="sm">View</UButton>
          <UButton :to="`/profile/deals/${deal.id}`" variant="ghost" color="neutral" size="sm">Edit</UButton>
          <UButton variant="ghost" color="error" size="sm" @click="removeDeal(deal.id)">Remove</UButton>
        </div>
      </div>
    </div>
  </div>
</template>
