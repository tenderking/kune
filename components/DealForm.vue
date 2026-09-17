<script lang="ts" setup>
const props = defineProps<{
  dealId?: string
  initial?: Record<string, any>
  services?: { id: string, name: string }[]
}>()

const emit = defineEmits(['success', 'close'])
const toast = useToast()
const isEdit = computed(() => Boolean(props.dealId))
const isSubmitting = ref(false)

function defaultEnd() {
  const date = new Date()
  date.setDate(date.getDate() + 14)
  return date.toISOString().slice(0, 16)
}

function toLocal(value?: string) {
  if (!value)
    return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const state = reactive({
  service_id: props.initial?.service?.id || props.initial?.service_id || '',
  title: props.initial?.title || '',
  description: props.initial?.description || '',
  original_price: props.initial?.original_price ?? 20,
  deal_price: props.initial?.deal_price ?? 10,
  quantity_total: props.initial?.quantity_total ?? 50,
  min_buyers: props.initial?.min_buyers ?? 1,
  starts_at: toLocal(props.initial?.starts_at) || toLocal(new Date().toISOString()),
  ends_at: toLocal(props.initial?.ends_at) || defaultEnd(),
  redemption_instructions: props.initial?.redemption_instructions || 'Show this voucher code at the business to redeem.',
  terms: props.initial?.terms || '',
  status: props.initial?.status || 'active',
})

async function onSubmit() {
  if (!state.service_id || !state.title) {
    toast.add({ title: 'Choose a listing and add a deal title.', color: 'error' })
    return
  }
  isSubmitting.value = true
  try {
    const payload = {
      ...state,
      starts_at: new Date(state.starts_at).toISOString(),
      ends_at: new Date(state.ends_at).toISOString(),
    }
    if (isEdit.value) {
      await $fetch(`/api/deals/${props.dealId}`, { method: 'PUT', body: payload })
      toast.add({ title: 'Deal updated', color: 'success' })
    }
    else {
      await $fetch('/api/deals', { method: 'POST', body: payload })
      toast.add({ title: 'Deal published', color: 'success' })
    }
    emit('success')
  }
  catch (error: any) {
    toast.add({
      title: isEdit.value ? 'Could not update deal' : 'Could not create deal',
      description: error.data?.statusMessage || error.data?.message || error.message,
      color: 'error',
    })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UForm :state="state" class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
    <UFormField label="Your listing" required class="md:col-span-2">
      <select v-model="state.service_id" class="deal-select" :disabled="isEdit">
        <option value="" disabled>
          Select a service
        </option>
        <option v-for="service in services" :key="service.id" :value="service.id">
          {{ service.name }}
        </option>
      </select>
    </UFormField>

    <UFormField label="Deal title" required class="md:col-span-2">
      <UInput v-model="state.title" placeholder="e.g. 50% off first consultation" class="w-full" />
    </UFormField>

    <UFormField label="Original price (USD)" required>
      <UInput v-model.number="state.original_price" type="number" min="0" step="0.01" class="w-full" />
    </UFormField>
    <UFormField label="Deal price (USD)" required>
      <UInput v-model.number="state.deal_price" type="number" min="0" step="0.01" class="w-full" />
    </UFormField>
    <UFormField label="Vouchers available" required>
      <UInput v-model.number="state.quantity_total" type="number" min="1" class="w-full" />
    </UFormField>
    <UFormField label="Minimum buyers">
      <UInput v-model.number="state.min_buyers" type="number" min="1" class="w-full" />
    </UFormField>
    <UFormField label="Starts">
      <UInput v-model="state.starts_at" type="datetime-local" class="w-full" />
    </UFormField>
    <UFormField label="Ends" required>
      <UInput v-model="state.ends_at" type="datetime-local" class="w-full" />
    </UFormField>
    <UFormField label="What customers get" class="md:col-span-2">
      <UTextarea v-model="state.description" class="w-full" />
    </UFormField>
    <UFormField label="How to redeem" class="md:col-span-2">
      <UTextarea v-model="state.redemption_instructions" class="w-full" />
    </UFormField>
    <UFormField v-if="isEdit" label="Status">
      <select v-model="state.status" class="deal-select">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="draft">Draft</option>
      </select>
    </UFormField>
    <UFormField label="Terms" class="md:col-span-2">
      <UTextarea v-model="state.terms" class="w-full" />
    </UFormField>

    <div class="md:col-span-2 flex justify-end gap-3 mt-2 pt-4 border-t border-[var(--color--card-border)]">
      <UButton type="button" color="neutral" variant="subtle" @click="emit('close')">
        Cancel
      </UButton>
      <UButton type="submit" color="primary" :loading="isSubmitting">
        {{ isEdit ? 'Save deal' : 'Publish deal' }}
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>
.deal-select {
  width: 100%;
  appearance: none;
  background-color: var(--color--bg);
  color: var(--color--text);
  border: 1px solid var(--color--card-border, rgba(128,128,128,0.2));
  padding: 0.55rem 0.85rem;
  border-radius: var(--radius-sm, 0.5em);
  font-family: inherit;
}
</style>
