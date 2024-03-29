<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

definePageMeta({
  layout: "full-width",
})

const isOpen = ref(false)
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}
</script>
<template>
  <UContainer class="p-8 rounded-md flex flex-col gap-4">
    <h2>Services</h2>
    <template v-if="services.length === 0">
      <p>no Services</p>
    </template>
    <template v-else>
      <UTable
        :columns="columns"
        :rows="services"
        :ui="{ tbody: 'divide-green-500' }"
        class="bg-gray-800 rounded-md w-1/2"
      >
        <template #actions-data="{ row }">
          <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
        </template>
      </UTable>
    </template>
    <div>
      <UButton label="Add service" @click="isOpen = true" />

      <UModal v-model="isOpen">
        <div class="p-4 flex-1">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit"> Submit </UButton>
          </UForm>
        </div>
      </UModal>
    </div>
  </UContainer>
</template>
