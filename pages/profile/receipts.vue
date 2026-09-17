<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const { data: receipts, refresh } = await useFetch<any[]>('/api/notifications')

async function markRead(id?: string) {
  await $fetch('/api/notifications/read', { method: 'POST', body: { id } })
  await refresh()
}
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <div class="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-2xl font-bold">Receipts</h1>
        <p class="text-sm opacity-80 mt-1">Purchase, redeem, refund, and featured placement receipts. Email is sent when SMTP is configured.</p>
      </div>
      <UButton v-if="receipts?.some(r => !r.read)" variant="outline" color="neutral" size="sm" @click="markRead()">
        Mark all read
      </UButton>
    </div>

    <div v-if="!receipts?.length" class="p-12 text-center rounded-lg border-2 border-dashed border-[var(--color--card-border)]">
      <p class="font-medium">No receipts yet</p>
      <p class="text-sm opacity-70 mt-1">Buy a deal or feature a listing to get a receipt here.</p>
    </div>

    <div v-else class="space-y-3">
      <article
        v-for="item in receipts"
        :key="item.id"
        class="p-4 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)]"
        :class="{ 'opacity-70': item.read }"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="font-bold">{{ item.title }}</p>
            <p class="text-sm opacity-80 mt-1 whitespace-pre-wrap">{{ item.body }}</p>
            <NuxtLink v-if="item.link" :to="item.link" class="text-sm text-[var(--clr--primary)] font-semibold mt-2 inline-block">
              Open
            </NuxtLink>
          </div>
          <UButton v-if="!item.read" size="xs" variant="ghost" @click="markRead(item.id)">
            Read
          </UButton>
        </div>
        <p class="text-xs opacity-60 mt-2">{{ new Date(item.created_at).toLocaleString() }}</p>
      </article>
    </div>
  </div>
</template>
