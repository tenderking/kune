<script setup lang="ts">
const store = useApiStore()
// trigger the fetch services
onMounted(() => {
  store.category = ''
  store.fetchServices()
})
watch(() => store.myservices, (newValue) => {
  if (!newValue || newValue.length === 0)
    store.fetchServices()
})
</script>

<template>
  <div class="category-picker">
    <h3 class="subtitle">
      Discover the best local businesses and services in your area
    </h3>

    <div v-if="store.myservices" class="category-container">
      <template v-for="service in store.myservices.slice(0, 3)" :key="service.ServiceID">
        <NuxtLink :to="`/services/${service.serviceID}&${service.serviceName}`">
          <div class="rands">
            <ServicesGridItem :service="service" />
          </div>
        </NuxtLink>
      </template>
    </div>
    <div v-else>
      No services
    </div>
  </div>
</template>

<style scoped>
 .category-container {
  display: flex;
  flex-direction: column;
 align-items: center;
  gap: 4em;
  margin-bottom: 2em;
}
@media (min-width: 768px) {
  .category-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1em;
  margin-bottom: 2em;
}
}
.subtitle {
  text-align: center;
  margin-bottom: 2em;
  }
</style>
