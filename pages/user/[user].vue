<script setup lang="ts">

const columns = [ {
  key: 'service',
  label: 'Service'
}, {
  key: 'actions'
}]
const services = [
  {
      service: "service 1",
  },
  {
      service: "service 2",
  },
  {
      service: "service 3",
  }
]
const items = (row: Object) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
const column = "my services"
const user = "user"
</script>

<template>
  
    <h1>{{ user}} dashboard </h1>
    <div class="wrapper"> 
    <h2>my favorites</h2>
    <template v-if="services.length === 0">
      <p>no favorited </p>
    </template>
    <template v-else>
      <UTable :columns="columns"  :rows="services" >
       <template #actions-data="{ row }">
        <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
    </template>
    </UTable>
    </template>

    </div>
<div class="wrapper">
      <h2> my services </h2>
      <template v-if="services.length === 0">
      <p>no services</p>
    </template>
    <template v-else>
   <UTable :columns="columns"  :rows="services" >
       <template #actions-data="{ row }">
        <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
    </template>
    </UTable>
    </template>  
      <UButton class="cta__link" >add service</UButton>

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
.wrapper a{
  max-width: fit-content;
}
</style>
```