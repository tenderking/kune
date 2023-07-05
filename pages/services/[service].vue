<script lang="ts" setup>
import { useFetch } from "@vueuse/core";
const route = useRoute();
const { data: service } = await useFetch(
  `/api/services/${route.params.service}`
);
</script>

<template>
  <header class="container">
    <ServicesNav />
  </header>

  <main class="container">
    <h2>Details</h2>
    <template v-if="service">
      <pre>
      {{ service }}
      </pre>
    </template>
    <h2 v-else>No services here</h2>

    <!-- <pre>
      {{servicesList}}</pre> -->
  </main>
</template>
