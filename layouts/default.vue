<script setup lang="ts">
useSeoMeta({
  title: "Kune - Digital discovery made easy",
  ogTitle: "Kune",
  description: "Digital discovery made easy",
  ogDescription: "Digital discovery made easy",
  // ogImage: "https://example.com/image.png",
})
</script>

<template>
  <NavBar class="main" />
  <main class="main">
    <slot />
  </main>
  <TheFooter />
</template>

<style scoped>
.main {
  margin: 0 1em;
}

@media (min-width: 950px) {
  .main {
    margin: 0 15%;
  }
}
</style>
```
