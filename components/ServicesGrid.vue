<script setup lang="ts">
// import type { ServiceJson } from 'types/ServiceJson'

// const { data: services } = await useFetch('/api/services')
// const data: ServiceJson = services.value?.services as ServiceJson[]
const store = useApiStore()
// trigger the fetch services action when store.category changes
watch(() => store.category, () => store.fetchServices())
watch(() => store.myservices, (newValue) => {
  if (!newValue || newValue.length === 0)
    store.fetchServices()
})
</script>

<template>
  <div v-if="store.myservices" class="grid-wrap">
    <template v-for="service in store.getServices" :key="service.ServiceID">
      <NuxtLink
        :to="`/services/${service.serviceID}&${service.serviceName}`"
      >
        <div class="rands">
          <ServicesGridItem :service="service" />
        </div>
      </NuxtLink>
    </template>
  </div>
  <div v-else>
    No services
  </div>
  <!-- <pre>{{ store.myservices }}</pre> -->
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
