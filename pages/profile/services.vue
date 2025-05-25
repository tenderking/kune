<script setup lang="ts">
import { ref } from 'vue' // Ensure ref is imported if not already
import { useToast } from '#imports' // Or your specific import path for useToast

definePageMeta({
  layout: 'dashboard',
})

const toast = useToast()
const isOpen = ref(false)
const services = ref(await $fetch('/api/users/services')) // Make services a ref

const columns = [
  {
    key: 'id', // Assuming 'id' is a column you might want to display or have available
    label: 'ID',
    sortable: true,
  },
  {
    key: 'name',
    label: 'Service',
  },
  {
    key: 'category',
    label: 'Category',
  },

  {
    key: 'actions',
    label: 'Actions',
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
</script>

<template>
  <UContainer class="rounded-md">
    <h2>My Listed Services</h2>
    <template v-if="!services?.length">
      <p>no Services</p>
    </template>
    <template v-else>
      <UTable :columns="columns" :rows="services" class="card rounded-md lg:w-1/2">
        <template #actions-data="{ row }">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-trash-20-solid"
            @click="deleteService(row.id)"
          />
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-pencil-square-20-solid"
            @click="editService(row.id)"
          />
        </template>
      </UTable>
    </template>

    <UButton
      label="Add service"
      class="mt-4"
      color="orange"
      @click.prevent="isOpen = true"
    />

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
