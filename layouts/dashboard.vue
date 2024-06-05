<script setup lang="ts">
const links = [
  {
    label: 'Profile',
    icon: 'i-heroicons-face-smile',
    to: '/profile',
    badge: 100,
  },

  {
    label: 'Services',
    icon: 'i-heroicons-chart-bar',
    to: '/profile/services',
  },
]
</script>

<template>
  <NavBar class="main" :fixed="true" />
  <aside
    class="fixed dashboard p-4 top-20 rounded-md left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-10"
  >
    <!-- line -->

    <divider />
    <UVerticalNavigation
      :links="links"
      :ui="{
        inactive:
          'border-transparent dashboard-cards flex justify-between hover:border-gray-400 dark:hover:border-gray-500 text-green-700 hover:text-gray-900 ',
        active: 'active',
      }"
    />
  </aside>
  <main class="pt-4 sm:ml-64">
    <UContainer class="p-4 mx-2 rounded-md dashboard max-w-none">
      <h2>Dashboard</h2>
      <slot />
    </UContainer>
  </main>
</template>

<style scoped>
/* .main{
margin: 0 1em;
}

@media (min-width: 950px) {
  .main{

  margin: 0 15%;
} }*/
.dashboard {
  background-color: var(--color-card-bg);
}
.dashboard-cards {
  background-color: var(--color--bg);
}
.active {
  background-color: var(--clr--primary);
  color: var(--clr--text);
}
</style>
```
