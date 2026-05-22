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
  <NavBar class="main" />
  <aside
    class="fixed dashboard p-4 top-20 rounded-md left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-10"
  >
    <!-- line -->

    <UNavigationMenu
      orientation="vertical"
      :items="links"
      class="w-full"
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
aside {
  position: fixed;
  top: 5rem;
  left: 0;
  width: 16rem;
  height: 100vh;
  z-index: 10;
  padding: 1rem;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

@media (min-width: 640px) {
  aside {
    transform: translateX(0);
  }
  main {
    margin-left: 16rem;
  }
}

main {
  padding-top: 1rem;
}

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
