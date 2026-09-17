<script lang="ts" setup>
import type { PublicDeal } from '~/types/deals'

const route = useRoute()
const user = useUser()
const slug = computed(() => String(route.params.slug || ''))

const { data: deal, status, error } = await useFetch<PublicDeal>(() => `/api/deals/${slug.value}`)

useSeoMeta({
  title: computed(() => deal.value ? `${deal.value.title} — Kune Deals` : 'Deal — Kune'),
  description: computed(() => deal.value?.description || 'Limited-time deal on Kune.'),
})

function money(amount: number, currency = 'USD') {
  return `${currency} ${Number(amount).toFixed(2)}`
}

function buy() {
  if (!user.value) {
    navigateTo(`/login?redirect=/deals/${slug.value}/checkout`)
    return
  }
  navigateTo(`/deals/${slug.value}/checkout`)
}
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <NuxtLink to="/deals" class="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100 hover:text-[var(--clr--primary)] mb-6">
      <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
      All deals
    </NuxtLink>

    <div v-if="status === 'pending'" class="h-80 rounded-2xl bg-[var(--color--card-border)] opacity-30 animate-pulse" />

    <div v-else-if="error || !deal" class="text-center py-16 bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color--card-border)] p-8">
      <h2 class="text-xl font-bold mb-2">Deal not found</h2>
      <p class="opacity-75 mb-6">This coupon may have expired or been removed.</p>
      <UButton to="/deals" color="primary">Browse deals</UButton>
    </div>

    <div v-else class="deal-layout">
      <div class="deal-main">
        <div class="deal-hero">
          <ServiceCover
            class="deal-cover"
            :name="deal.service.name"
            :category="deal.service.category"
            :src="deal.service.image_url"
            :alt="deal.title"
          />
        </div>
        <div class="info-card">
          <div class="flex flex-wrap gap-2 mb-3">
            <UBadge v-if="deal.discount_percent > 0" color="primary">{{ deal.discount_percent }}% off</UBadge>
            <UBadge color="neutral" variant="subtle">{{ deal.live_status.replace('_', ' ') }}</UBadge>
            <UBadge v-if="deal.service.featured" color="warning" variant="subtle">Featured business</UBadge>
          </div>
          <p class="opacity-70 text-sm font-semibold mb-1">{{ deal.service.name }}</p>
          <h1 class="hero-title">{{ deal.title }}</h1>
          <p class="mt-4 leading-relaxed opacity-90">{{ deal.description || 'Limited-time voucher from this business.' }}</p>
          <div v-if="deal.redemption_instructions" class="mt-6">
            <h2 class="font-bold mb-1">How to redeem</h2>
            <p class="opacity-80 text-sm">{{ deal.redemption_instructions }}</p>
          </div>
          <div v-if="deal.terms" class="mt-4">
            <h2 class="font-bold mb-1">Terms</h2>
            <p class="opacity-80 text-sm">{{ deal.terms }}</p>
          </div>
        </div>
      </div>

      <aside class="buy-card">
        <p class="price-now">{{ money(deal.deal_price, deal.currency) }}</p>
        <p v-if="deal.original_price > deal.deal_price" class="price-was">
          Was {{ money(deal.original_price, deal.currency) }} · save {{ money(deal.savings, deal.currency) }}
        </p>
        <ul class="buy-meta">
          <li>{{ deal.quantity_sold }} bought</li>
          <li>{{ deal.quantity_remaining }} remaining</li>
          <li v-if="deal.has_tipped">Deal tipped — vouchers can be redeemed</li>
          <li v-else>Need {{ deal.buyers_needed }} more buyer{{ deal.buyers_needed === 1 ? '' : 's' }} to tip</li>
        </ul>
        <UButton
          color="primary"
          size="lg"
          class="w-full justify-center font-semibold mt-4"
          :disabled="!deal.is_buyable"
          @click="buy"
        >
          {{ deal.is_buyable ? 'Buy voucher' : 'Deal unavailable' }}
        </UButton>
        <p class="trust-note">
          You pay now and get a voucher code. If this deal does not reach {{ deal.min_buyers }} buyer{{ deal.min_buyers === 1 ? '' : 's' }} before it ends, you are refunded.
        </p>
        <NuxtLink :to="`/services/${deal.service.name}`" class="merchant-link">
          View {{ deal.service.name }} listing
        </NuxtLink>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.deal-layout {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .deal-layout {
    grid-template-columns: 1.6fr 1fr;
    align-items: start;
  }
}
.deal-hero {
  height: 240px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 1rem;
  background: rgba(0,0,0,0.05);
}
.deal-cover { width: 100%; height: 100%; }
.info-card, .buy-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}
.hero-title {
  font-size: var(--step-2);
  font-weight: 800;
}
.price-now {
  font-size: var(--step-3);
  font-weight: 800;
  color: var(--clr--primary);
}
.price-was { opacity: 0.7; margin-bottom: 1rem; }
.buy-meta { display: flex; flex-direction: column; gap: 0.35rem; opacity: 0.8; font-size: var(--step--1); }
.trust-note { font-size: var(--step--2); opacity: 0.7; margin-top: 0.75rem; line-height: 1.5; }
.merchant-link { display: inline-block; margin-top: 0.75rem; color: var(--clr--primary); font-weight: 600; font-size: var(--step--1); }
</style>
