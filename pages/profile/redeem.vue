<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const toast = useToast()
const code = ref('')
const loading = ref(false)
const { data: redemptions, refresh } = await useFetch<any[]>('/api/users/redemptions')

async function redeem() {
  loading.value = true
  try {
    await $fetch('/api/vouchers/redeem', {
      method: 'POST',
      body: { code: code.value },
    })
    toast.add({ title: 'Voucher redeemed', color: 'success' })
    code.value = ''
    await refresh()
  }
  catch (error: any) {
    toast.add({
      title: 'Could not redeem',
      description: error.data?.statusMessage || error.data?.message || error.message,
      color: 'error',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <div>
      <h1 class="text-2xl font-bold">Redeem vouchers</h1>
      <p class="text-sm opacity-80 mt-1">Customers show you a KUNE code. Confirm it here when they use the deal.</p>
    </div>

    <UForm :state="{ code }" class="p-6 rounded-lg border border-[var(--color--card-border)] space-y-4" @submit.prevent="redeem">
      <UFormField label="Voucher code" required>
        <UInput v-model="code" placeholder="KUNE-XXXX-XXXX" class="w-full font-mono uppercase" />
      </UFormField>
      <UButton type="submit" color="primary" :loading="loading">
        Redeem
      </UButton>
    </UForm>

    <div>
      <h2 class="font-bold mb-3">Recent purchases</h2>
      <div v-if="!redemptions?.length" class="p-8 text-center rounded-lg border-dashed border-2 border-[var(--color--card-border)]">
        <p class="opacity-70">No paid vouchers on your deals yet.</p>
      </div>
      <div v-else class="space-y-2">
        <div v-for="item in redemptions" :key="item.id" class="p-3 rounded-lg border border-[var(--color--card-border)] flex justify-between gap-3">
          <div>
            <p class="font-mono font-semibold">{{ item.code }}</p>
            <p class="text-xs opacity-70">{{ item.deal?.title }} · {{ item.buyer?.email || item.buyer?.name }}</p>
          </div>
          <UBadge :color="item.status === 'redeemed' ? 'neutral' : 'success'">{{ item.status }}</UBadge>
        </div>
      </div>
    </div>
  </div>
</template>
