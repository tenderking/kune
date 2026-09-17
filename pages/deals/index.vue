<script lang="ts" setup>
import type { PublicDeal } from '~/types/deals'

const { data: deals, status } = await useFetch<PublicDeal[]>('/api/deals')

useSeoMeta({
  title: 'Deals & coupons — Kune',
  description: 'Browse time-limited deals from Zimbabwean businesses and buy vouchers you can redeem in person.',
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-[var(--step-2)] font-extrabold text-[var(--color--heading)] tracking-tight">
        Deals & coupons
      </h1>
      <p class="opacity-80 mt-1 max-w-2xl">
        Limited-time offers from listed businesses. Buy a voucher, get a code, redeem it with the merchant.
      </p>
    </div>

    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      <div v-for="i in 6" :key="i" class="h-72 rounded-xl bg-[var(--color--card-border)] opacity-30" />
    </div>

    <div v-else-if="deals?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DealCard v-for="deal in deals" :key="deal.id" :deal="deal" />
    </div>

    <div v-else class="empty-state">
      <Icon name="heroicons:ticket" class="empty-icon" />
      <h2 class="empty-title">No live deals yet</h2>
      <p class="empty-desc">
        Business owners can publish coupon links from their dashboard. Check back soon, or browse the directory.
      </p>
      <UButton to="/services" color="primary" class="mt-4">
        Browse services
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background-color: var(--color-card-bg);
  border: 1px dashed var(--color--card-border, rgba(128, 128, 128, 0.3));
  border-radius: var(--radius-lg);
}
.empty-icon {
  width: 3rem;
  height: 3rem;
  color: var(--clr--primary);
  margin-bottom: 1rem;
}
.empty-title {
  font-size: var(--step-1);
  font-weight: 700;
}
.empty-desc {
  max-width: 46ch;
  opacity: 0.75;
  margin-top: 0.5rem;
}
</style>
