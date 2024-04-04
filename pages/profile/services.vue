<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

definePageMeta({
  layout: "dashboard",
})

const isOpen = ref(false)
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
})

type Schema = z.output<typeof schema>

const services = await $fetch("/api/users/services")

const state = reactive({
  email: undefined,
  password: undefined,
})
const columns = [
  {
    key: "name",
    label: "Service",
  },
  {
    key: "category",
    label: "Category",
  },

  {
    key: "actions",
    label: "Actions",
  },
]
// const services = [
//   {
//     service: "service 1",
//   },
//   {
//     service: "service 2",
//   },
//   {
//     service: "service 3",
//   },
// ]
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

// async function onSubmit(event: FormSubmitEvent<Schema>) {
//   // Do something with data
//   console.log(event.data)
// }
</script>
<template>
  <UContainer class="rounded-mdflex flex-col gap-4">
    <h2>Services</h2>
    <template v-if="services.length === 0">
      <p>no Services</p>
    </template>
    <template v-else>
      <UTable :columns="columns" :rows="services" class="card rounded-md w-1/2">
        <template #actions-data="{ row }">
          <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-pencil-square-20-solid"
          />
        </template>
      </UTable>
    </template>

    <UButton label="Add service" @click.prevent="isOpen = true" class="mt-4" />

    <UModal v-model="isOpen">
      <div class="p-4 flex-1">
        <ServiceFormPost />
      </div>
    </UModal>
  </UContainer>
</template>
<style scoped>
.card {
  background-color: var(--color--bg);
}
</style>
