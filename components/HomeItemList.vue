<script setup lang="ts">
import type { ServiceJson } from '@/types/ServiceJson'

const { data: services } = await useFetch('/api/services')
const data: ServiceJson = services.value?.services as ServiceJson[]
</script>

<template>
  <div class="category-picker">
    <h3 class="subtitle">
      Discover the best local businesses and services in your area
    </h3>

    <div v-if="data" class="category-container">
      <template v-for="service in data.slice(0, 3)" :key="service.ServiceID">
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
