<script setup lang="ts">
// const user = useUserStore()

// // Define a custom object to hold your store instances
// interface CustomStores {
//   user: typeof user
// }

// // Attach the custom object to the Window object
// declare global {
//   interface Window {
//     stores: CustomStores
//   }
// }

// // Assign your store instances to the 'stores' property
// if (typeof window !== 'undefined') {
//   window.stores = {
//     user,
//   }
// }
</script>

<template>
  <main class="user">
    <h1>This is the user page for </h1>

    <ServiceFormPost />
  </main>
</template>
