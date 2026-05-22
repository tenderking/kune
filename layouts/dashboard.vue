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
  <aside class="dashboard-sidebar dashboard rounded-md">
    <!-- line -->

    <UNavigationMenu
      orientation="vertical"
      :items="links"
      class="w-full"
    />
  </aside>
  <main class="dashboard-main">
    <UContainer class="dashboard-content p-4 mx-2 rounded-md max-w-none">
      <h2>Dashboard</h2>
      <slot />
    </UContainer>
  </main>
</template>

<style scoped>
.dashboard-sidebar {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 16rem;
  height: calc(100vh - 4rem);
  z-index: 10;
  padding: 1rem;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  overflow-y: auto;
}

@media (min-width: 640px) {
  .dashboard-sidebar {
    transform: translateX(0);
  }
  .dashboard-main {
    margin-left: 16rem;
  }
}

.dashboard-main {
  padding-top: 1rem;
}

.dashboard-content {
  min-height: calc(100vh - 6rem);
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
