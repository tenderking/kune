<script setup lang="ts"></script>

<template>
  <main>
    <slot />
  </main>
</template>

<style scoped>
main {
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
