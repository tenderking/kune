<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useUser, useToast } from '#imports'

const toast = useToast()
const user = useUser()
const emit = defineEmits(['success', 'close'])

const state = reactive({
  name: '',
  description: '',
  category: '',
  address: '',
  website: '',
  imgUrl: '',
  tags: [] as string[]
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
    await $fetch('/api/services', {
      method: 'POST',
      body: {
        name: state.name,
        description: state.description,
        category: state.category,
        address: state.address,
        website: state.website,
        imgUrl: state.imgUrl,
        tags: state.tags.length > 0 ? state.tags : ['General'],
        serviceowner: user.value?.email || 'admin@kune.co.zw'
      }
    })
    toast.add({ title: 'Service listed successfully', color: 'green' })
    emit('success')
  }
  catch (error: any) {
    console.error('Submit error:', error)
    toast.add({
      title: 'Failed to create service',
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
        Submit
      </UButton>
    </div>
  </UForm>
</template>

