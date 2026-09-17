<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useToast } from '#imports'

const props = defineProps<{
  serviceId?: string
  initial?: {
    name?: string
    description?: string
    category?: string
    address?: string
    website?: string
    website_url?: string
    webUrl?: string
    imgUrl?: string
    image_url?: string
    tags?: string[]
  }
}>()

const toast = useToast()
const emit = defineEmits(['success', 'close'])
const isEdit = computed(() => Boolean(props.serviceId))

const state = reactive({
  name: props.initial?.name || '',
  description: props.initial?.description || '',
  category: props.initial?.category || '',
  address: props.initial?.address || '',
  website: props.initial?.website || props.initial?.website_url || props.initial?.webUrl || '',
  imgUrl: props.initial?.imgUrl || props.initial?.image_url || '',
  phone_number: (props.initial as any)?.phone_number || (props.initial as any)?.whatsapp || '',
  tags: [...(props.initial?.tags || [])] as string[],
})

const taginput = ref('')
const isSubmitting = ref(false)

function pushTag() {
  const tag = taginput.value.trim()
  if (tag && !state.tags.includes(tag)) {
    state.tags.push(tag)
  }
  taginput.value = ''
}

function removeTag(idx: number) {
  state.tags.splice(idx, 1)
}

async function onSubmit() {
  if (!state.name || !state.category) {
    toast.add({ title: 'Service Name and Category are required.', color: 'red' })
    return
  }

  isSubmitting.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/services/${props.serviceId}`, {
        method: 'PUT',
        body: {
          name: state.name,
          description: state.description,
          category: state.category,
          address: state.address,
          website: state.website,
          imgUrl: state.imgUrl,
          phone_number: state.phone_number,
          tags: state.tags.length > 0 ? state.tags : ['General'],
        },
      })
      toast.add({ title: 'Service updated successfully', color: 'green' })
    }
    else {
      await $fetch('/api/services', {
        method: 'POST',
        body: {
          name: state.name,
          description: state.description,
          category: state.category,
          address: state.address,
          website: state.website,
          imgUrl: state.imgUrl,
          phone_number: state.phone_number,
          tags: state.tags.length > 0 ? state.tags : ['General'],
        },
      })
      toast.add({ title: 'Service listed successfully', color: 'green' })
    }
    emit('success')
  }
  catch (error: any) {
    console.error('Submit error:', error)
    toast.add({
      title: isEdit.value ? 'Failed to update service' : 'Failed to create service',
      description: error.data?.message || error.message || 'Unknown error occurred.',
      color: 'red'
    })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UForm :state="state" class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
    <UFormField label="Service Name" required class="col-span-1">
      <UInput v-model="state.name" placeholder="E.g., Classifieds" class="w-full" />
    </UFormField>

    <UFormField label="Category" required class="col-span-1">
      <UInput v-model="state.category" placeholder="E.g., Market" class="w-full" />
    </UFormField>

    <UFormField label="Website URL" class="col-span-1">
      <UInput v-model="state.website" placeholder="https://example.com" class="w-full" />
    </UFormField>

    <UFormField label="Phone / WhatsApp" class="col-span-1">
      <UInput v-model="state.phone_number" placeholder="0772 000 000" class="w-full" />
    </UFormField>

    <UFormField label="Image URL" class="col-span-1">
      <UInput v-model="state.imgUrl" placeholder="/images/logo.png" class="w-full" />
    </UFormField>

    <UFormField label="Address" class="md:col-span-2">
      <UInput v-model="state.address" placeholder="Physical address" class="w-full" />
    </UFormField>

    <UFormField label="Description" class="md:col-span-2">
      <UTextarea v-model="state.description" placeholder="Short description of the service" class="w-full" />
    </UFormField>

    <UFormField label="Tags" class="md:col-span-2">
      <div class="flex gap-2 w-full">
        <UInput
          v-model="taginput"
          placeholder="E.g., Tech, Money"
          class="flex-1"
          @keydown.enter.prevent="pushTag"
        />
        <UButton
          color="gray"
          variant="outline"
          class="cursor-pointer px-4 font-medium"
          @click.prevent="pushTag"
        >
          Add Tag
        </UButton>
      </div>

      <!-- Horizontal Tags List -->
      <div v-if="state.tags.length" class="flex flex-wrap gap-2 mt-3 p-2 bg-[var(--color--bg)] border border-[var(--color--card-border)] rounded-[var(--radius-sm)]">
        <UBadge
          v-for="(tag, idx) in state.tags"
          :key="tag"
          size="md"
          color="primary"
          variant="subtle"
          class="flex items-center gap-1.5 px-2.5 py-1"
        >
          {{ tag }}
          <UButton
            icon="i-heroicons-x-mark"
            size="xs"
            variant="ghost"
            color="gray"
            class="p-0.5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
            @click.prevent="removeTag(idx)"
          />
        </UBadge>
      </div>
    </UFormField>

    <div class="md:col-span-2 flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color--card-border)]">
      <UButton
        type="button"
        color="gray"
        variant="subtle"
        class="font-semibold px-5 justify-center cursor-pointer"
        @click="emit('close')"
      >
        Cancel
      </UButton>
      <UButton
        type="submit"
        color="primary"
        :loading="isSubmitting"
        class="font-semibold px-6 justify-center cursor-pointer"
      >
        {{ isEdit ? 'Save changes' : 'Submit' }}
      </UButton>
    </div>
  </UForm>
</template>

