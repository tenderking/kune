<script lang="ts" setup>
import type { PublicDeal } from '~/types/deals'

defineProps<{ deal: PublicDeal }>()

function money(amount: number, currency = 'USD') {
  return `${currency} ${amount.toFixed(2)}`
}

function timeLeft(endsAt: string) {
  const ms = new Date(endsAt).getTime() - Date.now()
  if (ms <= 0)
    return 'Ended'
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  if (days > 0)
    return `${days}d ${hours}h left`
  return `${Math.max(hours, 1)}h left`
}
</script>

<template>
  <article class="deal-card" @click="navigateTo(`/deals/${deal.slug}`)">
    <div class="deal-card__image">
      <ServiceCover
        :name="deal.service.name"
        :category="deal.service.category"
        :src="deal.service.image_url"
        :alt="deal.title"
      />
      <div class="deal-card__discount" v-if="deal.discount_percent > 0">
        {{ deal.discount_percent }}% off
      </div>
    </div>
    <div class="deal-card__body">
      <p class="deal-card__merchant">
        {{ deal.service.name }}
      </p>
      <h3 class="deal-card__title">
        {{ deal.title }}
      </h3>
      <p class="deal-card__desc">
        {{ deal.description || 'Limited-time coupon from this business.' }}
      </p>
      <div class="deal-card__price">
        <strong>{{ money(deal.deal_price, deal.currency) }}</strong>
        <span v-if="deal.original_price > deal.deal_price">{{ money(deal.original_price, deal.currency) }}</span>
      </div>
      <div class="deal-card__meta">
        <span>{{ deal.quantity_sold }} bought</span>
        <span>{{ deal.quantity_remaining }} left</span>
        <span>{{ timeLeft(deal.ends_at) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.deal-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-md, 0.75em);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.deal-card:hover {
  transform: translateY(-4px);
  border-color: var(--clr--primary);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.deal-card__image {
  position: relative;
  height: 170px;
  background: rgba(0, 0, 0, 0.05);
}

.deal-card__discount {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--clr--primary);
  color: #1f1f20;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
}

.deal-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.15rem;
  flex: 1;
}

.deal-card__merchant {
  font-size: var(--step--2);
  opacity: 0.7;
  font-weight: 600;
}

.deal-card__title {
  font-size: var(--step-0);
  font-weight: 800;
  color: var(--color--heading);
}

.deal-card__desc {
  font-size: var(--step--1);
  opacity: 0.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex: 1;
}

.deal-card__price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.35rem;
}

.deal-card__price strong {
  font-size: var(--step-1);
  color: var(--clr--primary);
}

.deal-card__price span {
  text-decoration: line-through;
  opacity: 0.55;
  font-size: var(--step--1);
}

.deal-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: var(--step--2);
  opacity: 0.7;
  margin-top: 0.4rem;
}
</style>
