<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const toast = useToast()

const activeTab = ref<'payments' | 'featured'>('payments')
const searchQuery = ref(String(route.query.q || ''))
const statusFilter = ref(String(route.query.status || ''))
const loadingAction = ref(false)

const paymentsUrl = computed(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (statusFilter.value) params.set('status', statusFilter.value)
  const qs = params.toString()
  return qs ? `/api/admin/payments?${qs}` : '/api/admin/payments'
})

const { data: payments, refresh: refreshPayments, pending: pendingPayments } = await useFetch<any[]>(() => paymentsUrl.value)
const { data: featuredOrders, refresh: refreshFeatured, pending: pendingFeatured } = await useFetch<any[]>('/api/admin/featured-orders')

async function refreshAll() {
  await Promise.all([refreshPayments(), refreshFeatured()])
}

async function markPaid(payment: any) {
  if (!confirm(`Mark payment ${payment.id} as PAID? This will automatically generate and issue a paid voucher to ${payment.buyer?.email}.`)) {
    return
  }
  loadingAction.value = true
  try {
    const res = await $fetch<any>(`/api/admin/payments/${payment.id}/status`, {
      method: 'PUT',
      body: { status: 'paid' },
    })
    toast.add({
      title: 'Payment confirmed & voucher issued!',
      description: `Issued voucher ${res.voucher?.code || ''}`,
      color: 'success',
    })
    await refreshAll()
  } catch (err: any) {
    toast.add({ title: 'Confirmation failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function markRefunded(payment: any) {
  if (!confirm(`Mark payment ${payment.id} and its associated vouchers as REFUNDED?`)) {
    return
  }
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/payments/${payment.id}/status`, {
      method: 'PUT',
      body: { status: 'refunded' },
    })
    toast.add({ title: 'Payment marked as refunded', color: 'success' })
    await refreshAll()
  } catch (err: any) {
    toast.add({ title: 'Refund update failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function activateFeatured(order: any) {
  if (!confirm(`Activate featured placement for "${order.service?.name}" for ${order.duration_days} days?`)) {
    return
  }
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/featured-orders/${order.id}/activate`, { method: 'POST' })
    toast.add({ title: 'Featured placement activated!', color: 'success' })
    await refreshAll()
  } catch (err: any) {
    toast.add({ title: 'Activation failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-[var(--color--heading)]">
          Payments & Order Reconciliation
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Fix payment webhook drops: manually confirm payments to auto-issue vouchers, manage refunds, and activate featured orders.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          variant="outline"
          color="neutral"
          icon="i-heroicons-arrow-path"
          size="sm"
          :loading="pendingPayments || pendingFeatured"
          @click="refreshAll()"
        >
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex border-b border-[var(--color--card-border)] gap-6">
      <button
        class="pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer"
        :class="activeTab === 'payments' ? 'border-[var(--clr--primary)] text-[var(--clr--primary)]' : 'border-transparent opacity-70 hover:opacity-100'"
        @click="activeTab = 'payments'"
      >
        Deal Voucher Payments ({{ payments?.length || 0 }})
      </button>

      <button
        class="pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer"
        :class="activeTab === 'featured' ? 'border-[var(--clr--primary)] text-[var(--clr--primary)]' : 'border-transparent opacity-70 hover:opacity-100'"
        @click="activeTab = 'featured'"
      >
        Featured Placement Orders ({{ featuredOrders?.length || 0 }})
      </button>
    </div>

    <!-- TAB 1: DEAL PAYMENTS -->
    <div v-if="activeTab === 'payments'" class="space-y-4">
      <!-- Search & Filters -->
      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] flex flex-col md:flex-row items-center gap-3">
        <div class="w-full md:flex-1">
          <UInput
            v-model="searchQuery"
            placeholder="Search payments by ID, customer email, phone, or deal title..."
            icon="i-heroicons-magnifying-glass"
            class="w-full"
          />
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <select
            v-model="statusFilter"
            class="p-2 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending (Stuck / Unconfirmed)</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>

          <UButton
            v-if="searchQuery || statusFilter"
            variant="ghost"
            color="neutral"
            size="sm"
            @click="searchQuery = ''; statusFilter = ''"
          >
            Clear
          </UButton>
        </div>
      </div>

      <div v-if="!payments?.length" class="p-12 text-center rounded-xl border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color-card-bg)]">
        <Icon name="heroicons:credit-card" class="w-12 h-12 opacity-30 mx-auto mb-2" />
        <p class="font-semibold text-base">No payments found</p>
      </div>

      <div v-else class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] overflow-x-auto shadow-sm">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="border-b border-[var(--color--card-border)] bg-[var(--color--bg)]/60 text-xs font-semibold text-[var(--color--heading)] uppercase tracking-wider">
              <th class="p-3.5">Payment ID</th>
              <th class="p-3.5">Customer</th>
              <th class="p-3.5">Deal</th>
              <th class="p-3.5">Amount</th>
              <th class="p-3.5">Method / Phone</th>
              <th class="p-3.5">Status</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--color--card-border)]">
            <tr v-for="p in payments" :key="p.id" class="hover:bg-[var(--color--bg)]/40 transition-colors">
              <td class="p-3.5 font-mono text-xs text-[var(--clr--primary)]">
                {{ p.id.slice(0, 10) }}...
              </td>

              <td class="p-3.5">
                <p class="font-medium text-xs">{{ p.buyer?.name || 'Customer' }}</p>
                <p class="text-xs opacity-75 font-mono">{{ p.buyer?.email }}</p>
              </td>

              <td class="p-3.5 max-w-xs">
                <p class="font-medium text-xs truncate">{{ p.deal?.title }}</p>
                <p class="text-[11px] opacity-75 truncate">{{ p.deal?.service?.name }}</p>
              </td>

              <td class="p-3.5 font-bold text-sm text-[var(--color--heading)]">
                {{ p.currency }} {{ Number(p.amount).toFixed(2) }}
              </td>

              <td class="p-3.5 text-xs opacity-80">
                <p class="capitalize font-semibold">{{ p.method }} ({{ p.provider }})</p>
                <p v-if="p.phone" class="font-mono">{{ p.phone }}</p>
              </td>

              <td class="p-3.5">
                <UBadge
                  :color="p.status === 'paid' ? 'success' : p.status === 'pending' ? 'warning' : p.status === 'refunded' ? 'neutral' : 'error'"
                  size="sm"
                >
                  {{ p.status }}
                </UBadge>
                <p v-if="p.vouchers?.length" class="text-[11px] font-mono opacity-75 mt-0.5">
                  {{ p.vouchers[0].code }}
                </p>
              </td>

              <td class="p-3.5 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <!-- One-click Mark Paid & Issue Voucher -->
                  <UButton
                    v-if="p.status === 'pending' || p.status === 'failed'"
                    size="xs"
                    color="success"
                    variant="solid"
                    icon="i-heroicons-check"
                    title="Mark paid & auto-issue voucher"
                    :loading="loadingAction"
                    @click="markPaid(p)"
                  >
                    Confirm Paid & Issue
                  </UButton>

                  <!-- Mark Refunded -->
                  <UButton
                    v-if="p.status === 'paid'"
                    size="xs"
                    color="error"
                    variant="subtle"
                    title="Mark payment and voucher refunded"
                    :loading="loadingAction"
                    @click="markRefunded(p)"
                  >
                    Refund
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 2: FEATURED PLACEMENT ORDERS -->
    <div v-else class="space-y-4">
      <div v-if="!featuredOrders?.length" class="p-12 text-center rounded-xl border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color-card-bg)]">
        <Icon name="heroicons:star" class="w-12 h-12 opacity-30 mx-auto mb-2" />
        <p class="font-semibold text-base">No featured orders found</p>
      </div>

      <div v-else class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] overflow-x-auto shadow-sm">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="border-b border-[var(--color--card-border)] bg-[var(--color--bg)]/60 text-xs font-semibold text-[var(--color--heading)] uppercase tracking-wider">
              <th class="p-3.5">Service Listing</th>
              <th class="p-3.5">Owner</th>
              <th class="p-3.5">Amount</th>
              <th class="p-3.5">Duration</th>
              <th class="p-3.5">Status</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--color--card-border)]">
            <tr v-for="fo in featuredOrders" :key="fo.id" class="hover:bg-[var(--color--bg)]/40 transition-colors">
              <td class="p-3.5 font-medium">
                {{ fo.service?.name }}
              </td>

              <td class="p-3.5 text-xs">
                <p class="font-semibold">{{ fo.owner?.name || 'Owner' }}</p>
                <p class="opacity-75 font-mono">{{ fo.owner?.email }}</p>
              </td>

              <td class="p-3.5 font-bold">
                {{ fo.currency }} {{ Number(fo.amount).toFixed(2) }}
              </td>

              <td class="p-3.5 text-xs opacity-75">
                {{ fo.duration_days }} days
                <div v-if="fo.ends_at" class="text-emerald-600 font-medium">
                  Until {{ new Date(fo.ends_at).toLocaleDateString() }}
                </div>
              </td>

              <td class="p-3.5">
                <UBadge :color="fo.status === 'paid' ? 'success' : 'warning'" size="sm">
                  {{ fo.status }}
                </UBadge>
              </td>

              <td class="p-3.5 text-right whitespace-nowrap">
                <UButton
                  v-if="fo.status !== 'paid'"
                  size="xs"
                  color="success"
                  variant="solid"
                  icon="i-heroicons-bolt"
                  title="Manually activate featured placement"
                  :loading="loadingAction"
                  @click="activateFeatured(fo)"
                >
                  Activate Placement
                </UButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
