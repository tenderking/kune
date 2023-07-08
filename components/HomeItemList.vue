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
  display: grid;
  grid-template-columns: repeat(auto-fill, 275px);
  gap: 1em;
  row-gap: 2em;
  align-items: stretch;
  justify-content: center;

}
.subtitle {
  text-align: center;
  margin-bottom: 1em;
  }
</style>
