<script setup lang="ts">
// import type { Services } from "@/types/Services";
const { data: services } = await useFetch('/api/services')
// const servicesData = services != null ? JSON.parse(services) : null

// if (services) {
//   console.log(services.value)
// } else {
//   console.log('services data is null')
// }
</script>

<template>
  <div v-if="services" class="grid-wrap">
    <!-- <template v-for="service in services" :key="service.ServiceID">
      <div v-for="card in servicesData" :key="card.ServiceID" class="rands">
        <ServicesGridItem :service="card" />
      </div>
    </template> -->
    <pre>
      {{ services }}
    </pre>
    <!-- <ul>
      <li v-for="service in services" :key="service.id">{{service.service_name}}</li>
    </ul> -->
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
