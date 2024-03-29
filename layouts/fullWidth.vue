<script setup lang="ts">
const links = [
  {
    label: "Profile",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/739984?v=4",
    },
    // badge: 100,
  },

  {
    label: "Service",
    icon: "i-heroicons-chart-bar",
    to: "/profile/services",
  },
  {
    label: "Settings",
    icon: "i-heroicons-cog",
    // to: "/navigation/command-palette",
  },
]
const user = "user"
</script>

<template>
  <NavBar class="main" :fixed="true" />
  <aside
    class="fixed top-16 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-500"
  >
    <UVerticalNavigation
      :links="links"
      :ui="{
        wrapper: ' border-gray-200 p-4 dark:border-red-800 space-y-2',
        base: 'group block border-s -ms-px lg:leading-6 before:hidden',
        padding: 'p-4',
        rounded: 'rounded-md',
        ring: '',
        size: 'text-lg',
        inactive:
          'border-transparent flex justify-between hover:border-gray-400 dark:hover:border-gray-500 text-green-700 hover:text-gray-900 ',
      }"
    />
  </aside>
  <main class="main p-4 sm:ml-64">
    <UContainer class="p-4 outline-dashed">
      <h1>{{ user }} Dashboard</h1>
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
</style>
```
