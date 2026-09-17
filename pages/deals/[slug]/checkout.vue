<script lang="ts" setup>
import type { PublicDeal } from '~/types/deals'

definePageMeta({
  middleware: 'protected',
})

const route = useRoute()
const toast = useToast()
const slug = computed(() => String(route.params.slug || ''))
const paymentId = computed(() => String(route.query.payment || ''))

const { data: deal, error } = await useFetch<PublicDeal>(() => `/api/deals/${slug.value}`)

const state = reactive({
  method: 'ecocash',
  phone: '',
})
const submitting = ref(false)
const confirming = ref(false)
const result = ref<any>(null)

const methods = [
  { value: 'ecocash', label: 'EcoCash' },
  { value: 'onemoney', label: 'OneMoney' },
  { value: 'innbucks', label: 'InnBucks' },
  { value: 'card', label: 'Visa / Mastercard' },
]

async function startCheckout() {
  submitting.value = true
  try {
    const created = await $fetch('/api/payments/checkout', {
      method: 'POST',
      body: {
        deal_id: deal.value?.id,
        method: state.method,
        phone: state.phone,
      },
    })
    if (created.redirect_url) {
      window.location.href = created.redirect_url
      return
    }
    await navigateTo(`/deals/${slug.value}/checkout?payment=${created.payment_id}`)
    result.value = created
  }
  catch (err: any) {
    toast.add({
      title: 'Could not start checkout',
      description: err.data?.statusMessage || err.data?.message || err.message,
      color: 'error',
    })
  }
  finally {
    submitting.value = false
  }
}

async function confirmPayment() {
  if (!paymentId.value)
    return
  confirming.value = true
  try {
    const paid = await $fetch(`/api/payments/${paymentId.value}/confirm`, { method: 'POST' })
    toast.add({ title: 'Payment received. Voucher issued.', color: 'success' })
    await navigateTo(`/profile/vouchers/${paid.voucher.code}`)
  }
  catch (err: any) {
    toast.add({
      title: 'Payment not complete',
      description: err.data?.statusMessage || err.data?.message || err.message,
      color: 'error',
    })
  }
  finally {
    confirming.value = false
  }
}

onMounted(async () => {
  if (!paymentId.value)
    return
  try {
    result.value = await $fetch(`/api/payments/${paymentId.value}`)
    if (result.value?.status === 'paid' && result.value.voucher?.code)
      await navigateTo(`/profile/vouchers/${result.value.voucher.code}`)
  }
  catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="max-w-xl mx-auto">
    <NuxtLink :to="`/deals/${slug}`" class="inline-flex items-center gap-1.5 text-sm opacity-70 hover:text-[var(--clr--primary)] mb-6">
      <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
      Back to deal
    </NuxtLink>

    <div v-if="error || !deal" class="p-8 text-center rounded-lg border border-[var(--color--card-border)]">
      <p class="font-medium">This deal is unavailable.</p>
      <UButton to="/deals" color="primary" class="mt-4">Browse deals</UButton>
    </div>

    <div v-else class="checkout-card">
      <h1 class="text-2xl font-bold mb-1">Checkout</h1>
      <p class="opacity-80 mb-6">{{ deal.title }} · {{ deal.currency }} {{ deal.deal_price.toFixed(2) }}</p>

      <div v-if="paymentId" class="space-y-4">
        <p>
          Complete payment with {{ result?.method || 'your selected method' }}. This checkout is Paynow-ready:
          when merchant keys are configured, shoppers are sent to Paynow (EcoCash, OneMoney, cards).
        </p>
        <UButton color="primary" size="lg" class="w-full justify-center font-semibold" :loading="confirming" @click="confirmPayment">
          Pay {{ deal.currency }} {{ deal.deal_price.toFixed(2) }} now
        </UButton>
        <p class="text-xs opacity-70">
          Paying issues a unique voucher immediately. Plug in <code>PAYNOW_ID</code> and <code>PAYNOW_KEY</code> to use live Paynow.
        </p>
      </div>

      <UForm v-else :state="state" class="space-y-4" @submit.prevent="startCheckout">
        <UFormField label="Payment method" required>
          <select v-model="state.method" class="method-select">
            <option v-for="method in methods" :key="method.value" :value="method.value">
              {{ method.label }}
            </option>
          </select>
        </UFormField>
        <UFormField v-if="state.method !== 'card'" label="Mobile money number" required>
          <UInput v-model="state.phone" placeholder="0772 000 000" class="w-full" />
        </UFormField>
        <UButton type="submit" color="primary" size="lg" class="w-full justify-center font-semibold" :loading="submitting" :disabled="!deal.is_buyable">
          Continue to pay {{ deal.currency }} {{ deal.deal_price.toFixed(2) }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<style scoped>
.checkout-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
}
.method-select {
  width: 100%;
  background: var(--color--bg);
  color: var(--color--text);
  border: 1px solid var(--color--card-border, rgba(128,128,128,0.2));
  padding: 0.55rem 0.85rem;
  border-radius: var(--radius-sm);
  font-family: inherit;
}
</style>
