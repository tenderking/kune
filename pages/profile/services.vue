<script setup lang="ts">
import { ref } from 'vue' // Ensure ref is imported if not already
import { useToast } from '#imports' // Or your specific import path for useToast

definePageMeta({
  layout: 'dashboard',
  middleware: 'protected',
})

const toast = useToast()
const isOpen = ref(false)
const services = ref(await $fetch('/api/users/services')) // Make services a ref

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Service',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]

async function deleteService(serviceId: string) {
  if (!confirm('Are you sure you want to delete this service?'))
    return

  try {
    await $fetch(`/api/services/${serviceId}`, {
      method: 'DELETE',
    })
    toast.add({ title: 'Service deleted successfully', color: 'green' })
    // Refresh the services list
    services.value = await $fetch('/api/users/services')
  }
  catch (error: any) {
    console.error('Error deleting service:', error)
    toast.add({
      title: 'Error deleting service',
      description: error.data?.message || error.message || 'An unknown error occurred.',
      color: 'red',
    })
  }
}

function editService(serviceId: string) {
  navigateTo(`/profile/services/edit/${serviceId}`)
}

async function handleSuccess() {
  isOpen.value = false
  services.value = await $fetch('/api/users/services')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Block -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-[var(--color--heading)]">
          My Listed Services
        </h1>
        <p class="text-sm text-[var(--color--text)] opacity-80 mt-1">
          Manage, update, or remove the services you have listed on the platform.
        </p>
      </div>
      <div>
        <UButton
          label="Add New Service"
          icon="i-heroicons-plus"
          color="primary"
          class="font-semibold shadow-sm cursor-pointer"
          @click.prevent="isOpen = true"
        />
      </div>
    </div>

    <!-- Empty State -->
    <template v-if="!services?.length">
      <div class="flex flex-col items-center justify-center p-12 text-center rounded-lg border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color--bg)]">
        <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-[var(--color--text)] opacity-40 mb-3" />
        <p class="text-lg font-medium text-[var(--color--heading)]">No services listed yet</p>
        <p class="text-sm text-[var(--color--text)] opacity-70 mt-1 mb-6">
          Get started by adding your first service to the platform.
        </p>
        <UButton
          label="Add New Service"
          icon="i-heroicons-plus"
          color="primary"
          @click.prevent="isOpen = true"
        />
      </div>
    </template>

    <!-- Data Table -->
    <template v-else>
      <div class="overflow-x-auto rounded-lg border border-[var(--color--card-border)] shadow-sm bg-[var(--color--bg)]">
        <UTable :columns="columns" :data="services" class="w-full">
          <template #actions-cell="{ row }">
            <div class="flex items-center gap-1">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-pencil-square-20-solid"
                title="Edit Service"
                class="hover:text-[var(--clr--primary)] hover:bg-[var(--clr--primary)]/10 transition-colors cursor-pointer"
                @click="editService(row.original.id)"
              />
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-trash-20-solid"
                title="Delete Service"
                class="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                @click="deleteService(row.original.id)"
              />
            </div>
          </template>
        </UTable>
      </div>
    </template>

    <!-- Modal Form -->
    <UModal v-model:open="isOpen" title="Add New Service" scrollable>
      <template #body>
        <ServiceFormPost @success="handleSuccess" @close="isOpen = false" />
      </template>
    </UModal>
  </div>
</template>

