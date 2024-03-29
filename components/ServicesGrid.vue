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
    <template v-for="service in services" :key="service.PK">
      <NuxtLink :to="`/services/${service.name}`">
        <div class="rands">
          <ServicesGridItem :service="service" />
        </div>
      </NuxtLink>
    </template>
  </div>
  <div v-else>No services</div>
  <!-- <pre>{{ services }}</pre> -->
</template>

<style scoped>
.grid-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, 275px);
  gap: 1em;
  row-gap: 2em;
  align-items: stretch;
  justify-content: center;
}

.rands {
  outline: salmon;
}
</style>
