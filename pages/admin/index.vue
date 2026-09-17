<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const toast = useToast()
const { data: stats, refresh, pending } = await useFetch<any>('/api/admin/stats')

// Quick voucher lookup state
const quickVoucherCode = ref('')
const quickVoucherResult = ref<any>(null)
const lookingUpVoucher = ref(false)
const actionLoading = ref(false)

// Deal settlement
const settlingDeals = ref(false)

async function lookupVoucher() {
  const code = quickVoucherCode.value.trim().toUpperCase()
  if (!code) {
    toast.add({ title: 'Enter a voucher code to search', color: 'error' })
    return
  }

  lookingUpVoucher.value = true
  quickVoucherResult.value = null
  try {
    const list = await $fetch<any[]>(`/api/admin/vouchers?q=${encodeURIComponent(code)}`)
    if (!list.length) {
      toast.add({ title: 'No voucher found matching that code', color: 'warning' })
    } else {
      quickVoucherResult.value = list[0]
    }
  } catch (err: any) {
    toast.add({ title: 'Search failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    lookingUpVoucher.value = false
  }
}

async function revertVoucher(id: string) {
  actionLoading.value = true
  try {
    const updated = await $fetch(`/api/admin/vouchers/${id}/status`, {
      method: 'PUT',
      body: { status: 'paid' },
    })
    toast.add({ title: 'Voucher restored to active/paid status', color: 'success' })
    if (quickVoucherResult.value && quickVoucherResult.value.id === id) {
      quickVoucherResult.value = updated
    }
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Could not restore voucher', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    actionLoading.value = false
  }
}

async function settleDeals() {
  if (!confirm('Run deal settlement now? Untipped deals past their deadline will be marked failed and refunded.')) {
    return
  }
  settlingDeals.value = true
  try {
    const res = await $fetch<any>('/api/admin/deals/settle', { method: 'POST' })
    toast.add({ title: res.message || 'Deals settled', color: 'success' })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Settlement error', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    settlingDeals.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-[var(--color--heading)]">
          Global Admin Dashboard
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Manage system entities and fix customer mistakes (wrong emails, accidental redemptions, deal params, stuck payments).
        </p>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          variant="outline"
          color="neutral"
          icon="i-heroicons-arrow-path"
          size="sm"
          :loading="pending"
          @click="refresh()"
        >
          Refresh
        </UButton>
        <UButton
          variant="solid"
          color="warning"
          icon="i-heroicons-bolt"
          size="sm"
          :loading="settlingDeals"
          @click="settleDeals"
        >
          Run Deal Settlement
        </UButton>
      </div>
    </div>

    <!-- KPI Metric Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] shadow-sm">
        <p class="text-xs font-semibold text-[var(--clr--primary)] uppercase tracking-wider">Users</p>
        <p class="text-2xl font-bold mt-1 text-[var(--color--heading)]">{{ stats?.overview?.totalUsers ?? '-' }}</p>
        <NuxtLink to="/admin/users" class="text-xs opacity-75 hover:underline mt-2 inline-block">Manage users →</NuxtLink>
      </div>

      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] shadow-sm">
        <p class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Services</p>
        <p class="text-2xl font-bold mt-1 text-[var(--color--heading)]">{{ stats?.overview?.totalServices ?? '-' }}</p>
        <span class="text-xs opacity-70">{{ stats?.overview?.featuredServices ?? 0 }} featured</span>
      </div>

      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] shadow-sm">
        <p class="text-xs font-semibold text-amber-600 uppercase tracking-wider">Active Deals</p>
        <p class="text-2xl font-bold mt-1 text-[var(--color--heading)]">{{ stats?.overview?.activeDeals ?? '-' }}</p>
        <span class="text-xs opacity-70">{{ stats?.overview?.totalDeals ?? 0 }} total</span>
      </div>

      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] shadow-sm">
        <p class="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Vouchers</p>
        <p class="text-2xl font-bold mt-1 text-[var(--color--heading)]">{{ stats?.overview?.totalVouchers ?? '-' }}</p>
        <span class="text-xs opacity-70">{{ stats?.overview?.paidVouchers ?? 0 }} paid / {{ stats?.overview?.redeemedVouchers ?? 0 }} used</span>
      </div>

      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] shadow-sm">
        <p class="text-xs font-semibold text-teal-600 uppercase tracking-wider">Revenue</p>
        <p class="text-2xl font-bold mt-1 text-[var(--color--heading)]">${{ Number(stats?.overview?.totalRevenue || 0).toFixed(2) }}</p>
        <span class="text-xs opacity-70">{{ stats?.overview?.paidPayments ?? 0 }} paid</span>
      </div>

      <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] shadow-sm" :class="{ 'border-amber-400/50 bg-amber-50/10': stats?.overview?.pendingPayments > 0 }">
        <p class="text-xs font-semibold text-amber-500 uppercase tracking-wider">Pending Orders</p>
        <p class="text-2xl font-bold mt-1 text-[var(--color--heading)]">{{ stats?.overview?.pendingPayments ?? '-' }}</p>
        <NuxtLink to="/admin/payments" class="text-xs text-amber-600 hover:underline mt-2 inline-block">Resolve pending →</NuxtLink>
      </div>
    </div>

    <!-- Quick Mistake Solver / Rescue Tool -->
    <div class="p-6 rounded-xl border-2 border-[var(--clr--primary)]/30 bg-[var(--color-card-bg)] shadow-sm space-y-4">
      <div class="flex items-center gap-2">
        <Icon name="heroicons:lifebuoy" class="w-6 h-6 text-[var(--clr--primary)]" />
        <h2 class="text-lg font-bold text-[var(--color--heading)]">
          Quick Customer Mistake Resolver
        </h2>
      </div>
      <p class="text-sm opacity-80">
        Enter a customer's voucher code below to instantly inspect it, undo an accidental redemption, or transfer it to another account.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 max-w-2xl">
        <UInput
          v-model="quickVoucherCode"
          placeholder="e.g. KUNE-XXXX-XXXX"
          size="lg"
          class="flex-1 font-mono uppercase"
          @keydown.enter.prevent="lookupVoucher"
        />
        <UButton
          color="primary"
          size="lg"
          icon="i-heroicons-magnifying-glass"
          :loading="lookingUpVoucher"
          @click="lookupVoucher"
        >
          Inspect Voucher
        </UButton>
      </div>

      <!-- Quick Inspection Result Card -->
      <div v-if="quickVoucherResult" class="mt-4 p-4 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--color--card-border)]">
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-base text-[var(--clr--primary)]">{{ quickVoucherResult.code }}</span>
            <UBadge :color="quickVoucherResult.status === 'redeemed' ? 'neutral' : quickVoucherResult.status === 'paid' ? 'success' : 'warning'">
              {{ quickVoucherResult.status }}
            </UBadge>
          </div>
          <span class="text-xs opacity-70">Created: {{ new Date(quickVoucherResult.created_at).toLocaleString() }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p class="text-xs opacity-70">Buyer</p>
            <p class="font-medium">{{ quickVoucherResult.buyer?.name || 'N/A' }}</p>
            <p class="text-xs opacity-75">{{ quickVoucherResult.buyer?.email }}</p>
          </div>
          <div>
            <p class="text-xs opacity-70">Deal</p>
            <p class="font-medium">{{ quickVoucherResult.deal?.title }}</p>
            <p class="text-xs opacity-75">${{ Number(quickVoucherResult.deal?.deal_price || 0).toFixed(2) }}</p>
          </div>
          <div>
            <p class="text-xs opacity-70">Redeemed At</p>
            <p class="font-medium">{{ quickVoucherResult.redeemed_at ? new Date(quickVoucherResult.redeemed_at).toLocaleString() : 'Not redeemed yet' }}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--color--card-border)]">
          <UButton
            v-if="quickVoucherResult.status === 'redeemed'"
            color="success"
            variant="solid"
            size="sm"
            icon="i-heroicons-arrow-uturn-left"
            :loading="actionLoading"
            @click="revertVoucher(quickVoucherResult.id)"
          >
            Undo Accidental Redemption (Restore to Paid)
          </UButton>

          <UButton
            :to="`/admin/vouchers?q=${quickVoucherResult.code}`"
            variant="outline"
            color="neutral"
            size="sm"
            icon="i-heroicons-arrow-top-right-on-square"
          >
            Full Voucher Tools (Transfer / Status / Resend)
          </UButton>
        </div>
      </div>
    </div>

    <!-- Two-column Recent Streams -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Vouchers -->
      <div class="p-6 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-[var(--color--heading)]">Recent Vouchers</h2>
          <NuxtLink to="/admin/vouchers" class="text-xs text-[var(--clr--primary)] font-semibold hover:underline">
            View all vouchers →
          </NuxtLink>
        </div>

        <div v-if="!stats?.recentVouchers?.length" class="p-6 text-center opacity-60 text-sm">
          No vouchers recorded yet.
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="v in stats.recentVouchers"
            :key="v.id"
            class="p-3 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] flex items-center justify-between gap-3 text-sm"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-mono font-semibold truncate">{{ v.code }}</span>
                <UBadge :color="v.status === 'redeemed' ? 'neutral' : v.status === 'paid' ? 'success' : 'warning'" size="xs">
                  {{ v.status }}
                </UBadge>
              </div>
              <p class="text-xs opacity-75 truncate mt-0.5">{{ v.deal?.title }} · {{ v.buyer?.email }}</p>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <UButton
                v-if="v.status === 'redeemed'"
                size="xs"
                variant="subtle"
                color="warning"
                title="Undo redemption"
                @click="revertVoucher(v.id)"
              >
                Undo
              </UButton>
              <UButton
                :to="`/admin/vouchers?q=${v.code}`"
                size="xs"
                variant="ghost"
                color="neutral"
                icon="i-heroicons-pencil-square"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Payments -->
      <div class="p-6 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-[var(--color--heading)]">Recent Payments</h2>
          <NuxtLink to="/admin/payments" class="text-xs text-[var(--clr--primary)] font-semibold hover:underline">
            View all payments →
          </NuxtLink>
        </div>

        <div v-if="!stats?.recentPayments?.length" class="p-6 text-center opacity-60 text-sm">
          No payments recorded yet.
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="p in stats.recentPayments"
            :key="p.id"
            class="p-3 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] flex items-center justify-between gap-3 text-sm"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold">{{ p.currency }} {{ Number(p.amount).toFixed(2) }}</span>
                <UBadge :color="p.status === 'paid' ? 'success' : p.status === 'pending' ? 'warning' : 'error'" size="xs">
                  {{ p.status }}
                </UBadge>
              </div>
              <p class="text-xs opacity-75 truncate mt-0.5">{{ p.deal?.title }} · {{ p.buyer?.email }}</p>
            </div>

            <NuxtLink :to="`/admin/payments?q=${p.id}`" class="text-xs text-[var(--clr--primary)] hover:underline shrink-0">
              Manage →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
