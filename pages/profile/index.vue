<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  auth: { authenticatedRedirectTo: '/signin' },
})
const columns = [
  {
    key: 'service',
    label: 'Service',
  },
  {
    key: 'actions',
  },
]

const profile = {
  name: 'John Doe',
  email: 'example@x.com',
}

const services = [
  {
    service: 'service 1',
  },
  {
    service: 'service 2',
  },
  {
    service: 'service 3',
  },
]
</script>

<template>
  <div class="py-4 grid grid-cols-3 gap-16">
    <h3>Profile</h3>
    <UForm class="card p-4 col-span-3 row-gap-4 rounded-md">
      <UFormGroup
        label="Your Name"
        description="We'll only use this for spam."
        help="We will never share your email with anyone else."
        required
        class="grid grid-cols-2 gap-2 items-center"
      >
        <UInput v-model="profile.name" type="text" name="name" />
      </UFormGroup>
      <UDivider class="py-4" />

      <UFormGroup
        label="Your Email"
        description="We'll only use this for spam."
        help="We will never share your email with anyone else."
        required
        class="grid grid-cols-2 gap-2 items-centern"
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
      <template v-if="services.length === 0" />
      <template v-else>
        <UTable
          :columns="columns"
          :rows="services"
          :ui="{ tbody: 'divide-green-500' }"
          class="card rounded-md min-w-max"
        >
          <template #actions-data>
            <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
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
