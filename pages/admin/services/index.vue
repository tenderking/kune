<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const toast = useToast()

const searchQuery = ref(String(route.query.q || ''))
const categoryFilter = ref(String(route.query.category || ''))
const featuredFilter = ref(String(route.query.featured || ''))

const isEditModalOpen = ref(false)
const selectedService = ref<any>(null)
const loadingAction = ref(false)

const serviceForm = reactive({
  name: '',
  description: '',
  category: '',
  website_url: '',
  phone_number: '',
  address: '',
  image_url: '',
  service_owner_id: '',
  featured: false,
  featured_until: '',
  tags: [] as string[],
})

const tagInput = ref('')

const url = computed(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (categoryFilter.value) params.set('category', categoryFilter.value)
  if (featuredFilter.value) params.set('featured', featuredFilter.value)
  const qs = params.toString()
  return qs ? `/api/admin/services?${qs}` : '/api/admin/services'
})

const { data: services, refresh, pending } = await useFetch<any[]>(() => url.value)
const { data: categoriesData } = await useFetch<any>('/api/admin/categories')
const { data: usersData } = await useFetch<any>('/api/admin/users?limit=100')

function openEditModal(service: any) {
  selectedService.value = service
  serviceForm.name = service.name || ''
  serviceForm.description = service.description || ''
  serviceForm.category = service.category || ''
  serviceForm.website_url = service.website_url || service.website || ''
  serviceForm.phone_number = service.phone_number || ''
  serviceForm.address = service.address || ''
  serviceForm.image_url = service.image_url || service.imgUrl || ''
  serviceForm.service_owner_id = service.service_owner_id || service.service_owner?.id || ''
  serviceForm.featured = Boolean(service.featured)
  serviceForm.featured_until = service.featured_until ? new Date(service.featured_until).toISOString().slice(0, 10) : ''
  serviceForm.tags = Array.isArray(service.tags) ? [...service.tags] : []
  isEditModalOpen.value = true
}

function addTag() {
  const t = tagInput.value.trim()
  if (t && !serviceForm.tags.includes(t)) {
    serviceForm.tags.push(t)
  }
  tagInput.value = ''
}

function removeTag(idx: number) {
  serviceForm.tags.splice(idx, 1)
}

async function handleSaveService() {
  if (!selectedService.value || !serviceForm.name || !serviceForm.category) {
    toast.add({ title: 'Name and Category are required', color: 'error' })
    return
  }
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/services/${selectedService.value.id}`, {
      method: 'PUT',
      body: {
        ...serviceForm,
        featured_until: serviceForm.featured_until ? new Date(serviceForm.featured_until).toISOString() : null,
      },
    })
    toast.add({ title: 'Service updated successfully', color: 'success' })
    isEditModalOpen.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function toggleFeatured(service: any) {
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/services/${service.id}`, {
      method: 'PUT',
      body: {
        featured: !service.featured,
      },
    })
    toast.add({
      title: service.featured ? 'Removed featured placement' : 'Promoted to featured listing',
      color: 'success',
    })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Toggle failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function deleteService(service: any) {
  if (!confirm(`Permanently delete "${service.name}"? This action cannot be undone.`)) {
    return
  }
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/services/${service.id}`, { method: 'DELETE' })
    toast.add({ title: 'Service deleted', color: 'success' })
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
          Services Catalog Management
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Fix listing details, reassign listings to the correct owner, grant or remove featured badges, and moderate listings.
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

    <!-- Search & Filters -->
    <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] flex flex-col md:flex-row items-center gap-3">
      <div class="w-full md:flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search listings by name, owner email, or keyword..."
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        />
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <select
          v-model="categoryFilter"
          class="p-2 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
        >
          <option value="">All Categories</option>
          <option v-for="c in categoriesData?.categories" :key="c.id" :value="c.name">
            {{ c.name }}
          </option>
        </select>

        <select
          v-model="featuredFilter"
          class="p-2 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
        >
          <option value="">All Placements</option>
          <option value="true">Featured Only</option>
          <option value="false">Standard Only</option>
        </select>

        <UButton
          v-if="searchQuery || categoryFilter || featuredFilter"
          variant="ghost"
          color="neutral"
          size="sm"
          @click="searchQuery = ''; categoryFilter = ''; featuredFilter = ''"
        >
          Clear
        </UButton>
      </div>
    </div>

    <!-- Services Table -->
    <div v-if="!services?.length" class="p-12 text-center rounded-xl border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color-card-bg)]">
      <Icon name="heroicons:building-office-2" class="w-12 h-12 opacity-30 mx-auto mb-2" />
      <p class="font-semibold text-base">No services found</p>
      <p class="text-sm opacity-70 mt-1">Try modifying your search or filters.</p>
    </div>

    <div v-else class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] overflow-x-auto shadow-sm">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-[var(--color--card-border)] bg-[var(--color--bg)]/60 text-xs font-semibold text-[var(--color--heading)] uppercase tracking-wider">
            <th class="p-3.5">Listing</th>
            <th class="p-3.5">Category</th>
            <th class="p-3.5">Owner Account</th>
            <th class="p-3.5">Placement</th>
            <th class="p-3.5">Deals</th>
            <th class="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color--card-border)]">
          <tr v-for="s in services" :key="s.id" class="hover:bg-[var(--color--bg)]/40 transition-colors">
            <!-- Listing -->
            <td class="p-3.5">
              <div class="flex items-center gap-3">
                <NuxtImg
                  v-if="s.image_url || s.imgUrl"
                  :src="s.image_url || s.imgUrl"
                  class="w-9 h-9 rounded object-cover border border-[var(--color--card-border)]"
                />
                <div v-else class="w-9 h-9 rounded bg-[var(--color--bg)] border border-[var(--color--card-border)] flex items-center justify-center font-bold text-xs">
                  {{ s.name[0] }}
                </div>
                <div>
                  <p class="font-semibold text-[var(--color--heading)]">{{ s.name }}</p>
                  <a v-if="s.website_url || s.website" :href="s.website_url || s.website" target="_blank" class="text-xs text-[var(--clr--primary)] hover:underline truncate max-w-[180px] block">
                    {{ s.website_url || s.website }}
                  </a>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="p-3.5">
              <UBadge variant="subtle" color="neutral" size="sm">
                {{ s.category }}
              </UBadge>
            </td>

            <!-- Owner -->
            <td class="p-3.5">
              <div v-if="s.service_owner">
                <p class="font-medium text-xs">{{ s.service_owner.name || 'Owner' }}</p>
                <p class="text-xs opacity-70 font-mono">{{ s.service_owner.email }}</p>
              </div>
              <span v-else class="text-xs opacity-50 italic">Unassigned</span>
            </td>

            <!-- Featured Placement -->
            <td class="p-3.5">
              <UBadge :color="s.featured ? 'warning' : 'neutral'" size="sm">
                {{ s.featured ? 'Featured' : 'Standard' }}
              </UBadge>
              <p v-if="s.featured_until" class="text-[11px] opacity-70 mt-0.5">
                Until {{ new Date(s.featured_until).toLocaleDateString() }}
              </p>
            </td>

            <!-- Deals -->
            <td class="p-3.5 text-xs opacity-75">
              {{ s.deals_count || 0 }} deals
            </td>

            <!-- Actions -->
            <td class="p-3.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1.5">
                <!-- Toggle Featured -->
                <UButton
                  size="xs"
                  :color="s.featured ? 'neutral' : 'warning'"
                  variant="subtle"
                  icon="i-heroicons-star"
                  :title="s.featured ? 'Remove featured' : 'Make featured'"
                  @click="toggleFeatured(s)"
                />

                <!-- Edit Service -->
                <UButton
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-heroicons-pencil-square"
                  title="Edit service details & reassign owner"
                  @click="openEditModal(s)"
                >
                  Edit
                </UButton>

                <!-- Delete Service -->
                <UButton
                  size="xs"
                  color="error"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  title="Delete service"
                  @click="deleteService(s)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Service Modal -->
    <UModal v-model:open="isEditModalOpen" title="Edit Service & Reassign Owner" scrollable>
      <template #body>
        <div v-if="selectedService" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Service Name" required class="col-span-1">
              <UInput v-model="serviceForm.name" class="w-full" />
            </UFormField>

            <UFormField label="Category" required class="col-span-1">
              <UInput v-model="serviceForm.category" class="w-full" />
            </UFormField>

            <UFormField label="Website URL" class="col-span-1">
              <UInput v-model="serviceForm.website_url" placeholder="https://..." class="w-full" />
            </UFormField>

            <UFormField label="Phone / WhatsApp" class="col-span-1">
              <UInput v-model="serviceForm.phone_number" class="w-full" />
            </UFormField>

            <UFormField label="Image URL" class="col-span-1">
              <UInput v-model="serviceForm.image_url" class="w-full" />
            </UFormField>

            <UFormField label="Assigned Owner Account (Reassign if customer made mistake)" class="col-span-1">
              <select
                v-model="serviceForm.service_owner_id"
                class="w-full p-2.5 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
              >
                <option value="">-- No Owner (Unassigned) --</option>
                <option v-for="u in usersData?.users" :key="u.id" :value="u.id">
                  {{ u.name || u.username || 'User' }} ({{ u.email }})
                </option>
              </select>
            </UFormField>
          </div>

          <UFormField label="Physical Address">
            <UInput v-model="serviceForm.address" class="w-full" />
          </UFormField>

          <UFormField label="Description">
            <UTextarea v-model="serviceForm.description" class="w-full" />
          </UFormField>

          <!-- Featured Placement controls -->
          <div class="p-3 rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] space-y-3">
            <div class="flex items-center gap-2">
              <input id="featuredCheckbox" v-model="serviceForm.featured" type="checkbox" class="rounded" />
              <label for="featuredCheckbox" class="text-sm font-semibold cursor-pointer">
                Featured Placement Enabled
              </label>
            </div>

            <div v-if="serviceForm.featured">
              <UFormField label="Featured Until Date">
                <UInput v-model="serviceForm.featured_until" type="date" class="w-full" />
              </UFormField>
            </div>
          </div>

          <!-- Tags -->
          <UFormField label="Tags">
            <div class="flex gap-2">
              <UInput v-model="tagInput" placeholder="Add tag..." class="flex-1" @keydown.enter.prevent="addTag" />
              <UButton color="neutral" variant="outline" size="sm" @click="addTag">Add</UButton>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2">
              <UBadge
                v-for="(t, idx) in serviceForm.tags"
                :key="t"
                size="sm"
                color="primary"
                variant="subtle"
                class="flex items-center gap-1"
              >
                {{ t }}
                <Icon name="heroicons:x-mark" class="w-3 h-3 cursor-pointer" @click="removeTag(idx)" />
              </UBadge>
            </div>
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isEditModalOpen = false">Cancel</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleSaveService">Save Service</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
