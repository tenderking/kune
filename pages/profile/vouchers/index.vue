<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const { data: vouchers } = await useFetch<any[]>('/api/vouchers')
</script>

<template>
  <div class="space-y-6">
    <div class="pb-4 border-b border-[var(--color--card-border)]">
      <h1 class="text-2xl font-bold">My vouchers</h1>
      <p class="text-sm opacity-80 mt-1">Codes from deals you bought. Show the paid code to the business.</p>
    </div>

    <div v-if="!vouchers?.length" class="flex flex-col items-center p-12 text-center rounded-lg border-2 border-dashed border-[var(--color--card-border)]">
      <p class="text-lg font-medium">No vouchers yet</p>
      <p class="text-sm opacity-70 mt-1 mb-6">Browse live deals and buy a coupon to get a redeemable code.</p>
      <UButton to="/deals" color="primary">Browse deals</UButton>
    </div>

    <div v-else class="grid gap-3">
      <NuxtLink
        v-for="voucher in vouchers"
        :key="voucher.id"
        :to="`/profile/vouchers/${voucher.code}`"
        class="p-4 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] hover:border-[var(--clr--primary)] transition-colors"
      >
        <p class="font-mono font-bold tracking-wide">{{ voucher.code }}</p>
        <p class="text-sm opacity-75 mt-1">
          {{ voucher.deal?.title }} · {{ voucher.status }}
          <span v-if="voucher.waiting_for_tip"> · waiting to tip</span>
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
