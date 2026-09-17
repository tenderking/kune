<script setup lang="ts">
import type { User } from '~/composables/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
  auth: { authenticatedRedirectTo: '/signin' },
})
const toast = useToast()
const saving = ref(false)
const sessionUser = useUser()
const { data: user, refresh: refreshUser } = await useFetch<User>('/api/auth/user')
const columns = [
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]

const profile = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
})

const { data: services, error, refresh } = await useFetch<any[]>('/api/users/favorites')

async function removeFavorite(serviceId: string) {
  try {
    await $fetch('/api/users/favorites', {
      method: 'DELETE',
      body: {
        service: serviceId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (services.value) {
      services.value = services.value.filter((s: any) => s.id !== serviceId && s.name !== serviceId)
    }
  }
  catch (error) {
    console.error('Error:', error)
  }
}

const rows = computed(() => {
  return (services.value || []).map((service: any) => ({
    service: service.name,
    actions: service.id,
  }))
})

if (error.value) {
  console.error('Error fetching favorite services:', error.value)
}

async function saveProfile() {
  saving.value = true
  try {
    const updated = await $fetch('/api/users/profile', {
      method: 'PUT',
      body: {
        name: profile.name,
        email: profile.email,
      },
    })
    profile.name = updated.name || ''
    profile.email = updated.email || ''
    if (sessionUser.value) {
      sessionUser.value = { ...sessionUser.value, name: updated.name, email: updated.email }
    }
    await refreshUser()
    toast.add({ title: 'Profile saved', color: 'success' })
  }
  catch (err: any) {
    toast.add({
      title: 'Could not save profile',
      description: err.data?.statusMessage || err.data?.message || err.message,
      color: 'error',
    })
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="py-4 flex flex-col gap-8 max-w-3xl">
    <div>
      <h3 class="text-xl font-bold mb-4">
        Account Profile
      </h3>

      <UForm :state="profile" class="card p-6 rounded-lg border border-[var(--color--card-border)] flex flex-col gap-4" @submit.prevent="saveProfile">
        <UFormField
          label="Your Name"
          description="Your public display name on Kune."
          required
        >
          <UInput v-model="profile.name" type="text" name="name" size="md" class="w-full" />
        </UFormField>

        <USeparator class="my-2" />

        <UFormField
          label="Your Email"
          description="Used for notifications and account security."
          required
        >
          <UInput v-model="profile.email" type="email" name="email" size="md" class="w-full" />
        </UFormField>

        <div class="pt-2">
          <UButton type="submit" color="primary" :loading="saving">
            Save Changes
          </UButton>
        </div>
      </UForm>
    </div>

    <div>
      <h3 class="text-xl font-bold mb-4">
        Saved Favorites
      </h3>

      <div v-if="rows.length === 0" class="card p-8 rounded-lg border border-[var(--color--card-border)] text-center">
        <Icon name="heroicons:bookmark" class="w-10 h-10 opacity-40 mx-auto mb-2" />
        <p class="font-medium text-[var(--color--heading)]">
          No saved favorites yet
        </p>
        <p class="text-sm opacity-70 mt-1 mb-4">
          Save services you use frequently for quick access.
        </p>
        <UButton to="/services" color="primary" variant="subtle" size="sm">
          Browse Services
        </UButton>
      </div>

      <div v-else class="card rounded-lg border border-[var(--color--card-border)] overflow-hidden">
        <UTable :columns="columns" :data="rows">
          <template #service-cell="{ row }">
            <NuxtLink :to="`/services/${row.original.service}`" class="font-semibold text-[var(--clr--primary)] hover:underline">
              {{ row.original.service }}
            </NuxtLink>
          </template>
          <template #actions-cell="{ row }">
            <UButton
              color="error"
              variant="ghost"
              icon="i-heroicons-trash-20-solid"
              size="sm"
              aria-label="Remove favorite"
              @click="removeFavorite(row.original.actions)"
            />
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 2em;
  background-color: var(--color-card-bg);
  padding: 2em;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.wrapper a {
  max-width: fit-content;
}

.bgDark {
  background-color: var(--color--bg);
}

.card {
  background-color: var(--color--bg);
}
</style>
