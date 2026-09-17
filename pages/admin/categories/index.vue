<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const toast = useToast()
const { data, refresh, pending } = await useFetch<any>('/api/admin/categories')

const newCategoryName = ref('')
const newTagName = ref('')
const isRenameModalOpen = ref(false)
const selectedCategory = ref<any>(null)
const renamedCategoryValue = ref('')
const loadingAction = ref(false)

async function createCategory() {
  const name = newCategoryName.value.trim()
  if (!name) return
  loadingAction.value = true
  try {
    await $fetch('/api/admin/categories', {
      method: 'POST',
      body: { name, type: 'category' },
    })
    toast.add({ title: `Category "${name}" created`, color: 'success' })
    newCategoryName.value = ''
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Could not create category', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function createTag() {
  const name = newTagName.value.trim()
  if (!name) return
  loadingAction.value = true
  try {
    await $fetch('/api/admin/categories', {
      method: 'POST',
      body: { name, type: 'tag' },
    })
    toast.add({ title: `Tag "${name}" created`, color: 'success' })
    newTagName.value = ''
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Could not create tag', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

function openRenameModal(cat: any) {
  selectedCategory.value = cat
  renamedCategoryValue.value = cat.name
  isRenameModalOpen.value = true
}

async function handleRenameCategory() {
  if (!selectedCategory.value || !renamedCategoryValue.value.trim()) return
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/categories/${selectedCategory.value.id}`, {
      method: 'PUT',
      body: { name: renamedCategoryValue.value.trim() },
    })
    toast.add({ title: 'Category renamed', color: 'success' })
    isRenameModalOpen.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Rename failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function deleteCategory(cat: any) {
  if (!confirm(`Delete category "${cat.name}"?`)) return
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/categories/${cat.id}`, { method: 'DELETE' })
    toast.add({ title: 'Category deleted', color: 'success' })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Delete failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}
</script>

<template>
  <div class="space-y-8 max-w-5xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-[var(--color--heading)]">
          Categories & Tags Management
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Organize platform listings, add new taxonomy categories, and rename categories.
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

    <!-- Two column layout: Categories & Tags -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Categories Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-[var(--color--heading)]">Categories ({{ data?.categories?.length || 0 }})</h2>
        </div>

        <!-- Add Category Form -->
        <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] space-y-3">
          <p class="text-xs font-semibold uppercase tracking-wider opacity-75">Add New Category</p>
          <div class="flex gap-2">
            <UInput
              v-model="newCategoryName"
              placeholder="e.g. Healthcare, Solar, Legal..."
              class="flex-1"
              @keydown.enter.prevent="createCategory"
            />
            <UButton color="primary" :loading="loadingAction" @click="createCategory">Add</UButton>
          </div>
        </div>

        <!-- Categories List -->
        <div class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] divide-y divide-[var(--color--card-border)] overflow-hidden shadow-sm">
          <div
            v-for="cat in data?.categories"
            :key="cat.id"
            class="p-3 flex items-center justify-between gap-3 text-sm hover:bg-[var(--color--bg)]/50 transition-colors"
          >
            <div>
              <p class="font-semibold text-[var(--color--heading)]">{{ cat.name }}</p>
              <p class="text-xs opacity-70">{{ cat.services_count }} services</p>
            </div>

            <div class="flex items-center gap-1">
              <UButton
                size="xs"
                variant="ghost"
                color="neutral"
                icon="i-heroicons-pencil"
                title="Rename category"
                @click="openRenameModal(cat)"
              />
              <UButton
                v-if="cat.services_count === 0"
                size="xs"
                variant="ghost"
                color="error"
                icon="i-heroicons-trash"
                title="Delete empty category"
                @click="deleteCategory(cat)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Tags Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-[var(--color--heading)]">Tags ({{ data?.tags?.length || 0 }})</h2>
        </div>

        <!-- Add Tag Form -->
        <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] space-y-3">
          <p class="text-xs font-semibold uppercase tracking-wider opacity-75">Add New Tag</p>
          <div class="flex gap-2">
            <UInput
              v-model="newTagName"
              placeholder="e.g. Mobile, Delivery, Urgent..."
              class="flex-1"
              @keydown.enter.prevent="createTag"
            />
            <UButton color="neutral" variant="outline" :loading="loadingAction" @click="createTag">Add Tag</UButton>
          </div>
        </div>

        <!-- Tags List -->
        <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] flex flex-wrap gap-2 shadow-sm">
          <UBadge
            v-for="t in data?.tags"
            :key="t.id"
            size="md"
            color="primary"
            variant="subtle"
            class="px-2.5 py-1"
          >
            {{ t.name }}
            <span class="text-[10px] opacity-70 ml-1.5">({{ t.services_count }})</span>
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Rename Category Modal -->
    <UModal v-model:open="isRenameModalOpen" title="Rename Category">
      <template #body>
        <div v-if="selectedCategory" class="space-y-4">
          <UFormField label="Category Name" required>
            <UInput v-model="renamedCategoryValue" class="w-full" @keydown.enter.prevent="handleRenameCategory" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isRenameModalOpen = false">Cancel</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleRenameCategory">Save</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
