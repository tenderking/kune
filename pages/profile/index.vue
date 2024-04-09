<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
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
  memberSince: '2021-10-10',
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
    <div class="col-span-1 p-4 rounded-md">
      <h2>Profile</h2>
      <UCard class="card rounded-md my-4">
        <ul>
          <li>
            <span>name:{{ profile.name }}</span>
            <span>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-pencil-square-20-solid"
              />
            </span>
          </li>
          <li>
            <span>email:{{ profile.email }}</span>
            <span>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-pencil-square-20-solid"
              />
            </span>
          </li>
          <li>
            <span>member since:{{ profile.memberSince }}</span>
            <span>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-pencil-square-20-solid"
              />
            </span>
          </li>
        </ul>
      </UCard>
    </div>
    <div class="col-span-2 p-4 rounded-md flex flex-col gap-4 min-w-[300px]">
      <h2>Favorites</h2>
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
