<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const route = useRoute()
const code = computed(() => String(route.params.code || ''))
const { data: voucher, error } = await useFetch<any>(() => `/api/vouchers/${code.value}`)
</script>

<template>
  <div class="max-w-xl space-y-4">
    <NuxtLink to="/profile/vouchers" class="inline-flex items-center gap-1.5 text-sm opacity-70 hover:text-[var(--clr--primary)]">
      <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
      All vouchers
    </NuxtLink>

    <div v-if="error" class="p-8 text-center rounded-lg border">
      <p class="font-medium">Voucher not found</p>
      <UButton to="/profile/vouchers" color="primary" class="mt-4">Back</UButton>
    </div>

    <div v-else-if="voucher" class="p-6 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)]">
      <p class="text-xs uppercase tracking-wide opacity-70 mb-2">Purchase receipt</p>
      <UBadge :color="voucher.status === 'paid' ? 'success' : voucher.status === 'redeemed' ? 'neutral' : voucher.status === 'refunded' ? 'warning' : 'neutral'">
        {{ voucher.status }}
      </UBadge>
      <h1 class="text-2xl font-mono font-extrabold tracking-wider mt-3">{{ voucher.code }}</h1>
      <p class="mt-2 font-semibold">{{ voucher.deal?.title }}</p>
      <p class="text-sm opacity-75">{{ voucher.deal?.service?.name }}</p>
      <p v-if="voucher.waiting_for_tip" class="mt-4 text-sm">
        Group-buy has not tipped yet. Redeem after {{ voucher.deal?.buyers_needed }} more buyer(s). If the deal ends first, this voucher is refunded.
      </p>
      <p v-else-if="voucher.status === 'refunded'" class="mt-4 text-sm">
        This deal did not reach the minimum buyers. Your payment is marked refunded on Kune.
      </p>
      <p v-else class="mt-4 text-sm leading-relaxed">{{ voucher.deal?.redemption_instructions }}</p>
      <p v-if="voucher.payment" class="text-xs opacity-70 mt-4">
        {{ voucher.payment.status === 'refunded' ? 'Refunded' : 'Paid' }}
        {{ voucher.payment.currency }} {{ Number(voucher.payment.amount).toFixed(2) }} via {{ voucher.payment.method }}
      </p>
      <p v-if="voucher.purchased_at" class="text-xs opacity-60 mt-1">
        Purchased {{ new Date(voucher.purchased_at).toLocaleString() }}
      </p>
      <UButton to="/profile/receipts" variant="outline" color="neutral" size="sm" class="mt-4">
        View all receipts
      </UButton>
    </div>
  </div>
</template>
