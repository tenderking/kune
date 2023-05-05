<template>
  <MainLayout>
    <header class="container">
      <ServicesNav></ServicesNav>



    </header>

    <main class="container">
      <template v-if="services">
        <ServicesGrid />
      </template>
      <h2 v-else>No services</h2>

      <!-- <pre>
      {{servicesList}}</pre> -->
    </main>
  </MainLayout>
</template>
<script lang="ts" setup>

const { data: services } = await useFetch('/api/services')

if (services) {
  console.log(services.value)
} else {
  console.log('services data is null')
}
</script>


<style>
header.container {
  border-bottom: 2px solid var(--color-border);
}

.container {
  padding: 1em;
}

@media (min-width: 550px) {}
</style>

