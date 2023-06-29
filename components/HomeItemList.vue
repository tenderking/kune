<script setup lang="ts">
const { data: services } = await useFetch('/api/services')
const servicesList = await services.value
</script>

<template>
  <div class="category-picker">
    <p class="category-picker-text">
      Discover the best local businesses and services in your area
    </p>
    <div class="category-container">
      <template v-for="service in servicesList" :key="service.id">
        <ServicesGridItem :service="service" />
      </template>
    </div>
  </div>
</template>

<style>
.category-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 275px);
  gap: 1em;
  row-gap: 2em;
  align-items: stretch;
  justify-content: center;

}
</style>
