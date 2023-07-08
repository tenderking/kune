<script setup lang="ts">
const { data: services } = await useFetch('/api/services')
</script>

<template>
  <div class="category-picker">
    <h3 class="subtitle">
      Discover the best local businesses and services in your area
    </h3>

    <div v-if="services" class="category-container">
      <template v-for="service in services.services.slice(0, 3)" :key="service.ServiceID">
        <NuxtLink :to="`/services/${service.ServiceID}&${service.ServiceName}`">
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
