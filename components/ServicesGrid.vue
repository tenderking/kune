<script setup lang="ts">
// const store = useApiStore()
// // trigger the fetch services action when store.category changes
// watch(() => store.category, () => store.fetchServices())
// watch(services, (newValue) => {
//   if (!newValue || newValue.length === 0)
//     store.fetchServices()
// })
defineProps<{
  services: any
}>()
</script>

<template>
  <div v-if="services" class="grid-wrap">
    <template v-for="service in services" :key="service.name">
      <NuxtLink :to="`/services/${service.name}`">
        <div class="rands">
          <ServicesGridItem :service="service" />
        </div>
      </NuxtLink>
    </template>
  </div>
  <div v-else>
    No services
  </div>
  <!-- <pre>{{ services }}</pre> -->
</template>

<style scoped>
.grid-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5em;
  align-items: start;
}
</style>
