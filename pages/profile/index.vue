<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}

definePageMeta({
  layout: "full-width",
})
const columns = [
  {
    key: "service",
    label: "Service",
  },
  {
    key: "actions",
  },
]
const services = [
  {
    service: "service 1",
  },
  {
    service: "service 2",
  },
  {
    service: "service 3",
  },
]
const items = (row: Object) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
]
const column = "my services"
const isOpen = ref(false)
</script>

<template>
  <div class="py-4 grid grid-cols-3 gap-16">
    <div class="col-span-1 p-4 rounded-md outline-dotted">
      <h2>Profile</h2>
      <div class="bg-red-800">
        <USkeleton class="w-[250px]" />
      </div>
    </div>
    <div
      class="col-span-2 p-4 rounded-md flex flex-col gap-4 outline-dashed min-w-[300px]"
    >
      <h2>Favorites</h2>
      <template v-if="services.length === 0"> </template>
      <template v-else>
        <UTable
          :columns="columns"
          :rows="services"
          :ui="{ tbody: 'divide-green-500' }"
          class="bg-gray-800 rounded-md min-w-max"
        >
          <template #actions-data="{ row }">
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
</style>
