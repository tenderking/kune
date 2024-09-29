<script setup lang="ts">
import type { User } from 'lucia'

definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
  auth: { authenticatedRedirectTo: '/signin' },
})
const { data: user } = await useFetch<User>('/api/auth/user')
const columns = [
  {
    key: 'service',
    label: 'Service',
  },
  {
    key: 'actions',
  },
]

const profile = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
})

const { data: services, error } = await useFetch('/api/users/favorites')
async function removeFavorite(serviceId: string) {
  try {
    const response = await $fetch('/api/users/favorites', {
      method: 'DELETE',
      body: {
        service: serviceId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // eslint-disable-next-line no-console
    console.log('deleting', response)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
const rows = services?.value?.map((service) => {
  return {
    service: service.name,
    actions: service.id,
  }
}) || []

if (error.value) {
  console.error('Error fetching favorite services:', error.value)
}
</script>

<template>
  <div class="py-4 grid grid-cols-3 gap-16">
    <h3>Profile</h3>

    <UForm :state="{}" class="card p-4 col-span-3 row-gap-4 rounded-md">
      <UFormGroup
        label="Your Name" description="We'll only use this for spam."
        help="We will never share your email with anyone else." required class="grid grid-cols-2 gap-2 items-center"
      >
        <UInput v-model="profile.name" type="text" name="name" />
      </UFormGroup>
      <UDivider class="py-4" />

      <UFormGroup
        label="Your Email" description="We'll only use this for spam."
        help="We will never share your email with anyone else." required class="grid grid-cols-2 gap-2 items-centern"
      >
        <UInput v-model="profile.email" type="email" name="email" />
      </UFormGroup>
      <UDivider />

      <UButton type="submit" color="orange" class="mt-10">
        Save
      </UButton>
    </UForm>
    <div class="col-span-3 p-4 rounded-md flex flex-col gap-4 min-w-[300px]">
      <h3>Favorites</h3>
      <template v-if="!rows" />
      <template v-else>
        <UTable :columns="columns" :rows="rows" :ui="{ tbody: 'divide-green-500' }" class="card rounded-md min-w-max">
          <template #actions-data="{ row }">
            <UButton
              color="gray" variant="ghost" icon="i-heroicons-trash-20-solid"
              @click="removeFavorite(row.actions)"
            />
          </template>
        </UTable>
      </template>
    </div>
  </div>
  <!-- <ServiceFormPost /> -->
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
