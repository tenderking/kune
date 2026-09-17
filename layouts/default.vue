<script setup lang="ts">
useSeoMeta({
  title: 'Kune - Digital discovery made easy',
  ogTitle: 'Kune',
  description: 'Digital discovery made easy',
  ogDescription: 'Digital discovery made easy',
  // ogImage: "https://example.com/image.png",
})
useHead({
  meta: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, user-scalable=yes, maximum-scale=2.0',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--color--bg)] text-[var(--color--text)] transition-colors duration-200">
    <NavBar />
    <main class="site-main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.site-main {
  flex: 1;
  max-width: 80rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem 1rem;
}

@media (min-width: 640px) {
  .site-main {
    padding: 1.5rem;
  }
}
</style>
