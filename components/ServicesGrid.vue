<script setup lang="ts">
const { data: services } = await useFetch('/api/services')
</script>

<template>
  <div v-if="services" class="grid-wrap">
    <template v-for="service in services.services" :key="service.ServiceID">
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
