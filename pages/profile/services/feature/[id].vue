<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const route = useRoute()
const toast = useToast()
const config = useRuntimeConfig()
const serviceId = computed(() => String(route.params.id || ''))
const orderId = computed(() => String(route.query.order || ''))
const price = Number(config.public.featuredPrice || 15)
const days = Number(config.public.featuredDays || 30)

const { data: services } = await useFetch<any[]>('/api/users/services')
const service = computed(() => (services.value || []).find((item: any) => item.id === serviceId.value))

const state = reactive({
  method: 'ecocash',
  phone: '',
})
const submitting = ref(false)
const confirming = ref(false)

async function startCheckout() {
  submitting.value = true
  try {
    const created = await $fetch('/api/featured/checkout', {
      method: 'POST',
      body: {
        service_id: serviceId.value,
        method: state.method,
        phone: state.phone,
      },
    })
    if (created.redirect_url) {
      window.location.href = created.redirect_url
      return
    }
    await navigateTo(`/profile/services/feature/${serviceId.value}?order=${created.order_id}`)
  }
  catch (err: any) {
    toast.add({
      title: 'Could not start featured checkout',
      description: err.data?.statusMessage || err.data?.message || err.message,
      color: 'error',
    })
  }
  finally {
    submitting.value = false
  }
}

async function confirmPayment() {
  if (!orderId.value)
    return
  confirming.value = true
  try {
    await $fetch('/api/featured/confirm', { method: 'POST', body: { order_id: orderId.value } })
    toast.add({ title: 'Featured placement is live', color: 'success' })
    await navigateTo('/profile/services')
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
</script>

<template>
  <div class="space-y-6 max-w-xl">
    <NuxtLink to="/profile/services" class="inline-flex items-center gap-1.5 text-sm opacity-70 hover:text-[var(--clr--primary)]">
      <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
      Back to listings
    </NuxtLink>

    <div class="p-6 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)]">
      <h1 class="text-2xl font-bold">Feature this business</h1>
      <p class="mt-2 opacity-80">
        Spotlight <strong>{{ service?.name || 'your listing' }}</strong> with a larger card on home and browse
        for {{ days }} days. Price: USD {{ price.toFixed(2) }}.
      </p>
      <p class="text-sm opacity-70 mt-2">
        Same Paynow-ready checkout as deals (EcoCash, OneMoney, InnBucks, or card).
      </p>

      <div v-if="orderId" class="mt-6 space-y-4">
        <UButton color="primary" size="lg" class="w-full justify-center font-semibold" :loading="confirming" @click="confirmPayment">
          Pay USD {{ price.toFixed(2) }} now
        </UButton>
      </div>

      <UForm v-else :state="state" class="mt-6 space-y-4" @submit.prevent="startCheckout">
        <UFormField label="Payment method" required>
          <select v-model="state.method" class="w-full bg-[var(--color--bg)] border border-[var(--color--card-border)] rounded-md px-3 py-2">
            <option value="ecocash">EcoCash</option>
            <option value="onemoney">OneMoney</option>
            <option value="innbucks">InnBucks</option>
            <option value="card">Visa / Mastercard</option>
          </select>
        </UFormField>
        <UFormField v-if="state.method !== 'card'" label="Mobile money number" required>
          <UInput v-model="state.phone" placeholder="0772 000 000" class="w-full" />
        </UFormField>
        <UButton type="submit" color="primary" size="lg" class="w-full justify-center font-semibold" :loading="submitting">
          Continue to pay USD {{ price.toFixed(2) }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>
