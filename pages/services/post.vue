<script setup lang="ts">
definePageMeta({
  middleware: 'protected',
})

function handleSuccess() {
  navigateTo('/profile/services')
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-2">List your service</h1>
    <p class="opacity-80 mb-6">Add your business to the directory, then publish deals and feature your listing.</p>
    <div class="rounded-lg border border-[var(--color--card-border)] bg-[var(--color-card-bg)] p-6">
      <ServiceFormPost @success="handleSuccess" @close="navigateTo('/services')" />
    </div>
  </div>
</template>
