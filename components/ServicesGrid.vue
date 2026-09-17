<script setup lang="ts">
// const store = useApiStore()
// // trigger the fetch services action when store.category changes
// watch(() => store.category, () => store.fetchServices())
// watch(services, (newValue) => {
//   if (!newValue || newValue.length === 0)
//     store.fetchServices()
// })
defineProps<{
  services: any
}>()
</script>

<template>
  <div v-if="services && services.length" class="grid-wrap">
    <ServicesGridItem
      v-for="service in services"
      :key="service.name"
      :service="service"
    />
  </div>
  <div v-else class="empty-state">
    <Icon name="heroicons:magnifying-glass" class="empty-icon" />
    <h3 class="empty-title">No services found</h3>
    <p class="empty-desc">Try clearing your search query or selecting a different category.</p>
  </div>
</template>

<style scoped>
.grid-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: stretch;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background-color: var(--color-card-bg);
  border: 1px dashed var(--color--card-border, rgba(128, 128, 128, 0.3));
  border-radius: var(--radius-lg);
  margin: 1.5rem 0;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: var(--clr--primary);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: var(--step-1);
  font-weight: 700;
  color: var(--color--heading);
  margin-bottom: 0.5rem;
}

.empty-desc {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.75;
  max-width: 40ch;
}
</style>
