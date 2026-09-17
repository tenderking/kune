<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const toast = useToast()

const searchQuery = ref(String(route.query.q || ''))
const statusFilter = ref(String(route.query.status || ''))

const isEditModalOpen = ref(false)
const selectedDeal = ref<any>(null)
const loadingAction = ref(false)
const settlingDeals = ref(false)

function toLocal(value?: string) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const dealForm = reactive({
  title: '',
  description: '',
  original_price: 0,
  deal_price: 0,
  currency: 'USD',
  quantity_total: 10,
  quantity_sold: 0,
  min_buyers: 1,
  starts_at: '',
  ends_at: '',
  status: 'active',
  redemption_instructions: '',
  terms: '',
})

const url = computed(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (statusFilter.value) params.set('status', statusFilter.value)
  const qs = params.toString()
  return qs ? `/api/admin/deals?${qs}` : '/api/admin/deals'
})

const { data: deals, refresh, pending } = await useFetch<any[]>(() => url.value)

function openEditModal(deal: any) {
  selectedDeal.value = deal
  dealForm.title = deal.title || ''
  dealForm.description = deal.description || ''
  dealForm.original_price = Number(deal.original_price || 0)
  dealForm.deal_price = Number(deal.deal_price || 0)
  dealForm.currency = deal.currency || 'USD'
  dealForm.quantity_total = Number(deal.quantity_total || 10)
  dealForm.quantity_sold = Number(deal.quantity_sold || 0)
  dealForm.min_buyers = Number(deal.min_buyers || 1)
  dealForm.starts_at = toLocal(deal.starts_at)
  dealForm.ends_at = toLocal(deal.ends_at)
  dealForm.status = deal.status || 'active'
  dealForm.redemption_instructions = deal.redemption_instructions || ''
  dealForm.terms = deal.terms || ''
  isEditModalOpen.value = true
}

async function handleSaveDeal() {
  if (!selectedDeal.value || !dealForm.title) {
    toast.add({ title: 'Deal title is required', color: 'error' })
    return
  }
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/deals/${selectedDeal.value.id}`, {
      method: 'PUT',
      body: {
        ...dealForm,
        starts_at: new Date(dealForm.starts_at).toISOString(),
        ends_at: new Date(dealForm.ends_at).toISOString(),
      },
    })
    toast.add({ title: 'Deal updated successfully', color: 'success' })
    isEditModalOpen.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function settleDeals() {
  if (!confirm('Run deal settlement now? Untipped deals past deadline will be marked failed and refunded.')) {
    return
  }
  settlingDeals.value = true
  try {
    const res = await $fetch<any>('/api/admin/deals/settle', { method: 'POST' })
    toast.add({ title: res.message || 'Settlement complete', color: 'success' })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Settlement error', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    settlingDeals.value = false
  }
}

async function deleteDeal(deal: any) {
  if (!confirm(`Delete or cancel deal "${deal.title}"?`)) {
    return
  }
  loadingAction.value = true
  try {
    const res = await $fetch<any>(`/api/admin/deals/${deal.id}`, { method: 'DELETE' })
    toast.add({ title: res.message || 'Deal removed', color: 'success' })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Delete failed', description: err.data?.statusMessage || err.message, color: 'error' })
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
          Deals & Coupons Management
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Correct pricing mistakes, adjust min-buyers tipping thresholds, extend deal end dates, or force settlement.
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
          Settle Untipped Deals
        </UButton>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] flex flex-col md:flex-row items-center gap-3">
      <div class="w-full md:flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search deals by title, listing name, or owner email..."
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
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="sold_out">Sold Out</option>
          <option value="expired">Expired</option>
          <option value="failed">Failed / Untipped</option>
          <option value="draft">Draft</option>
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

    <!-- Deals Table -->
    <div v-if="!deals?.length" class="p-12 text-center rounded-xl border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color-card-bg)]">
      <Icon name="heroicons:ticket" class="w-12 h-12 opacity-30 mx-auto mb-2" />
      <p class="font-semibold text-base">No deals found</p>
      <p class="text-sm opacity-70 mt-1">Try clearing your filters.</p>
    </div>

    <div v-else class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] overflow-x-auto shadow-sm">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-[var(--color--card-border)] bg-[var(--color--bg)]/60 text-xs font-semibold text-[var(--color--heading)] uppercase tracking-wider">
            <th class="p-3.5">Deal & Service</th>
            <th class="p-3.5">Pricing</th>
            <th class="p-3.5">Sales / Tip</th>
            <th class="p-3.5">Window</th>
            <th class="p-3.5">Status</th>
            <th class="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color--card-border)]">
          <tr v-for="d in deals" :key="d.id" class="hover:bg-[var(--color--bg)]/40 transition-colors">
            <!-- Deal & Service -->
            <td class="p-3.5 max-w-xs">
              <NuxtLink :to="`/deals/${d.slug}`" target="_blank" class="font-semibold text-[var(--color--heading)] hover:text-[var(--clr--primary)] hover:underline truncate block">
                {{ d.title }}
              </NuxtLink>
              <p class="text-xs opacity-75 truncate">{{ d.service?.name }} · {{ d.owner?.email }}</p>
            </td>

            <!-- Pricing -->
            <td class="p-3.5">
              <span class="font-bold text-emerald-600">${{ Number(d.deal_price).toFixed(2) }}</span>
              <span class="text-xs line-through opacity-50 ml-1.5">${{ Number(d.original_price).toFixed(2) }}</span>
              <span class="text-[11px] text-[var(--clr--primary)] font-semibold block">{{ d.discount_percent }}% off</span>
            </td>

            <!-- Sales / Tip -->
            <td class="p-3.5 text-xs">
              <div class="font-medium">{{ d.quantity_sold }} / {{ d.quantity_total }} sold</div>
              <div :class="d.has_tipped ? 'text-emerald-600' : 'text-amber-600'">
                {{ d.has_tipped ? '✓ Tipped' : `Min ${d.min_buyers} (${d.buyers_needed} needed)` }}
              </div>
            </td>

            <!-- Window -->
            <td class="p-3.5 text-xs opacity-75 whitespace-nowrap">
              <div>Starts: {{ new Date(d.starts_at).toLocaleDateString() }}</div>
              <div>Ends: {{ new Date(d.ends_at).toLocaleDateString() }}</div>
            </td>

            <!-- Status -->
            <td class="p-3.5">
              <UBadge
                :color="d.status === 'active' ? 'success' : d.status === 'paused' ? 'warning' : 'neutral'"
                size="sm"
              >
                {{ d.status }}
              </UBadge>
            </td>

            <!-- Actions -->
            <td class="p-3.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1.5">
                <!-- Edit Deal -->
                <UButton
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-heroicons-pencil-square"
                  title="Edit deal parameters & dates"
                  @click="openEditModal(d)"
                >
                  Edit
                </UButton>

                <!-- Delete / Cancel -->
                <UButton
                  size="xs"
                  color="error"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  title="Delete or cancel deal"
                  @click="deleteDeal(d)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Deal Modal -->
    <UModal v-model:open="isEditModalOpen" title="Edit Deal Parameters & Fix Mistakes" scrollable>
      <template #body>
        <div v-if="selectedDeal" class="space-y-4">
          <UFormField label="Deal Title" required>
            <UInput v-model="dealForm.title" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Original Price ($)" required>
              <UInput v-model.number="dealForm.original_price" type="number" step="0.01" class="w-full" />
            </UFormField>

            <UFormField label="Deal / Coupon Price ($)" required>
              <UInput v-model.number="dealForm.deal_price" type="number" step="0.01" class="w-full" />
            </UFormField>

            <UFormField label="Total Available Quantity" required>
              <UInput v-model.number="dealForm.quantity_total" type="number" min="1" class="w-full" />
            </UFormField>

            <UFormField label="Sold Count (Manual Override)">
              <UInput v-model.number="dealForm.quantity_sold" type="number" min="0" class="w-full" />
            </UFormField>

            <UFormField label="Minimum Buyers to Tip" required>
              <UInput v-model.number="dealForm.min_buyers" type="number" min="1" class="w-full" />
            </UFormField>

            <UFormField label="Status" required>
              <select
                v-model="dealForm.status"
                class="w-full p-2.5 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="sold_out">Sold Out</option>
                <option value="expired">Expired</option>
                <option value="failed">Failed</option>
              </select>
            </UFormField>

            <UFormField label="Starts At" required>
              <UInput v-model="dealForm.starts_at" type="datetime-local" class="w-full" />
            </UFormField>

            <UFormField label="Ends At" required>
              <UInput v-model="dealForm.ends_at" type="datetime-local" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Description">
            <UTextarea v-model="dealForm.description" class="w-full" />
          </UFormField>

          <UFormField label="Redemption Instructions">
            <UTextarea v-model="dealForm.redemption_instructions" class="w-full" />
          </UFormField>

          <UFormField label="Terms & Conditions">
            <UTextarea v-model="dealForm.terms" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isEditModalOpen = false">Cancel</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleSaveDeal">Save Changes</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
