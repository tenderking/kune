<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const toast = useToast()

const searchQuery = ref(String(route.query.q || ''))
const statusFilter = ref(String(route.query.status || ''))
const isTransferModalOpen = ref(false)
const isStatusModalOpen = ref(false)
const selectedVoucher = ref<any>(null)
const transferRecipient = ref('')
const newStatus = ref('')
const loadingAction = ref(false)

const url = computed(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (statusFilter.value) params.set('status', statusFilter.value)
  const qs = params.toString()
  return qs ? `/api/admin/vouchers?${qs}` : '/api/admin/vouchers'
})

const { data: vouchers, refresh, pending } = await useFetch<any[]>(() => url.value)

async function revertRedemption(voucher: any) {
  if (!confirm(`Revert voucher ${voucher.code} from "redeemed" back to "paid"? This allows the customer to redeem it again.`)) {
    return
  }
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/vouchers/${voucher.id}/status`, {
      method: 'PUT',
      body: { status: 'paid' },
    })
    toast.add({ title: 'Redemption reverted: Voucher is now active/paid', color: 'success' })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Error', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

function openTransferModal(voucher: any) {
  selectedVoucher.value = voucher
  transferRecipient.value = ''
  isTransferModalOpen.value = true
}

async function handleTransfer() {
  if (!selectedVoucher.value || !transferRecipient.value.trim()) {
    toast.add({ title: 'Enter the new recipient email or user ID', color: 'error' })
    return
  }
  loadingAction.value = true
  try {
    const updated = await $fetch(`/api/admin/vouchers/${selectedVoucher.value.id}/transfer`, {
      method: 'PUT',
      body: { recipient: transferRecipient.value.trim() },
    })
    toast.add({
      title: `Voucher transferred to ${updated.buyer?.email || transferRecipient.value}`,
      color: 'success',
    })
    isTransferModalOpen.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Transfer failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

function openStatusModal(voucher: any) {
  selectedVoucher.value = voucher
  newStatus.value = voucher.status
  isStatusModalOpen.value = true
}

async function handleStatusUpdate() {
  if (!selectedVoucher.value || !newStatus.value) return
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/vouchers/${selectedVoucher.value.id}/status`, {
      method: 'PUT',
      body: { status: newStatus.value },
    })
    toast.add({ title: `Voucher status updated to "${newStatus.value}"`, color: 'success' })
    isStatusModalOpen.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function resendNotification(voucher: any) {
  loadingAction.value = true
  try {
    const res = await $fetch<any>(`/api/admin/vouchers/${voucher.id}/resend`, { method: 'POST' })
    toast.add({ title: res.message || 'Notification resent', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Failed to resend', description: err.data?.statusMessage || err.message, color: 'error' })
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
          Voucher Rescue Center
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Fix accidental redemptions, reassign vouchers to the correct customer, or adjust voucher statuses.
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
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] flex flex-col md:flex-row items-center gap-3">
      <div class="w-full md:flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search by code (KUNE-...), customer email, or deal name..."
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
          <option value="paid">Paid / Active</option>
          <option value="redeemed">Redeemed</option>
          <option value="refunded">Refunded</option>
          <option value="pending">Pending</option>
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

    <!-- Vouchers Table -->
    <div v-if="!vouchers?.length" class="p-12 text-center rounded-xl border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color-card-bg)]">
      <Icon name="heroicons:ticket" class="w-12 h-12 opacity-30 mx-auto mb-2" />
      <p class="font-semibold text-base">No vouchers found</p>
      <p class="text-sm opacity-70 mt-1">Try clearing your search query or filter.</p>
    </div>

    <div v-else class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] overflow-x-auto shadow-sm">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-[var(--color--card-border)] bg-[var(--color--bg)]/60 text-xs font-semibold text-[var(--color--heading)] uppercase tracking-wider">
            <th class="p-3.5">Code</th>
            <th class="p-3.5">Deal & Service</th>
            <th class="p-3.5">Current Buyer</th>
            <th class="p-3.5">Status</th>
            <th class="p-3.5">Dates</th>
            <th class="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color--card-border)]">
          <tr v-for="v in vouchers" :key="v.id" class="hover:bg-[var(--color--bg)]/40 transition-colors">
            <!-- Code -->
            <td class="p-3.5 font-mono font-bold text-[var(--clr--primary)]">
              {{ v.code }}
            </td>

            <!-- Deal -->
            <td class="p-3.5 max-w-xs">
              <p class="font-medium truncate">{{ v.deal?.title || 'Deal' }}</p>
              <p class="text-xs opacity-75 truncate">{{ v.deal?.service?.name }}</p>
            </td>

            <!-- Buyer -->
            <td class="p-3.5">
              <p class="font-medium">{{ v.buyer?.name || 'Customer' }}</p>
              <p class="text-xs opacity-75">{{ v.buyer?.email }}</p>
            </td>

            <!-- Status -->
            <td class="p-3.5">
              <UBadge
                :color="v.status === 'redeemed' ? 'neutral' : v.status === 'paid' ? 'success' : v.status === 'refunded' ? 'error' : 'warning'"
                size="sm"
              >
                {{ v.status }}
              </UBadge>
              <p v-if="v.waiting_for_tip" class="text-[11px] text-amber-600 mt-0.5">waiting for tip</p>
            </td>

            <!-- Dates -->
            <td class="p-3.5 text-xs opacity-75 whitespace-nowrap">
              <div>Created: {{ new Date(v.created_at).toLocaleDateString() }}</div>
              <div v-if="v.redeemed_at" class="text-amber-600 font-medium">Used: {{ new Date(v.redeemed_at).toLocaleDateString() }}</div>
            </td>

            <!-- Actions -->
            <td class="p-3.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1.5">
                <!-- Undo Redemption -->
                <UButton
                  v-if="v.status === 'redeemed'"
                  color="warning"
                  variant="subtle"
                  size="xs"
                  icon="i-heroicons-arrow-uturn-left"
                  title="Undo redemption (revert to paid)"
                  @click="revertRedemption(v)"
                >
                  Undo Use
                </UButton>

                <!-- Transfer Voucher -->
                <UButton
                  color="neutral"
                  variant="outline"
                  size="xs"
                  icon="i-heroicons-user-plus"
                  title="Transfer voucher to another customer"
                  @click="openTransferModal(v)"
                >
                  Transfer
                </UButton>

                <!-- Change Status -->
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-heroicons-adjustments-horizontal"
                  title="Change status"
                  @click="openStatusModal(v)"
                />

                <!-- Resend Receipt -->
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-heroicons-paper-airplane"
                  title="Resend receipt notification"
                  @click="resendNotification(v)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Transfer Voucher Modal -->
    <UModal v-model:open="isTransferModalOpen" title="Transfer Voucher to Customer">
      <template #body>
        <div v-if="selectedVoucher" class="space-y-4">
          <div class="p-3 rounded-lg bg-[var(--color--bg)] border border-[var(--color--card-border)] text-sm">
            <p class="font-mono font-bold">{{ selectedVoucher.code }}</p>
            <p class="text-xs opacity-75 mt-1">
              Current Owner: <span class="font-semibold">{{ selectedVoucher.buyer?.email || selectedVoucher.buyer?.name }}</span>
            </p>
          </div>

          <UFormField label="New Recipient Email or User ID" required>
            <UInput
              v-model="transferRecipient"
              placeholder="customer@example.com"
              class="w-full"
              @keydown.enter.prevent="handleTransfer"
            />
          </UFormField>

          <p class="text-xs opacity-70">
            The voucher will be reassigned immediately, and notifications will be sent to both the new recipient and previous owner.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isTransferModalOpen = false">Cancel</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleTransfer">Confirm Transfer</UButton>
        </div>
      </template>
    </UModal>

    <!-- Change Status Modal -->
    <UModal v-model:open="isStatusModalOpen" title="Override Voucher Status">
      <template #body>
        <div v-if="selectedVoucher" class="space-y-4">
          <div class="p-3 rounded-lg bg-[var(--color--bg)] border border-[var(--color--card-border)] text-sm">
            <p class="font-mono font-bold">{{ selectedVoucher.code }}</p>
            <p class="text-xs opacity-75">Deal: {{ selectedVoucher.deal?.title }}</p>
          </div>

          <UFormField label="Select Target Status" required>
            <select
              v-model="newStatus"
              class="w-full p-2.5 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
            >
              <option value="paid">Paid (Active & Redeemable)</option>
              <option value="redeemed">Redeemed (Used by Merchant)</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </UFormField>

          <p class="text-xs opacity-70">
            Note: Setting status to "paid" automatically clears the redemption timestamp and restores the coupon.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isStatusModalOpen = false">Cancel</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleStatusUpdate">Save Status</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
