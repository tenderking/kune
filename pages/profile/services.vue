<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const isOpen = ref(false)
const services = await $fetch('/api/users/services')
const columns = [
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
</script>

<template>
  <UContainer class="rounded-md">
    <h2>Services</h2>
    <template v-if="services.length === 0">
      <p>no Services</p>
    </template>
    <template v-else>
      <UTable :columns="columns" :rows="services" class="card rounded-md lg:w-1/2">
        <template #actions-data="">
          <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-pencil-square-20-solid"
          />
        </template>
      </UTable>
    </template>

    <UButton label="Add service" class="mt-4" @click.prevent="isOpen = true" />

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
