<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us — Kune',
  description: 'Reach out to Kune with any questions or feedback.',
})
</script>

<template>
  <div class="max-w-[600px] mx-auto py-12 px-4 flex flex-col gap-10">
    <div class="text-center">
      <h1 class="text-[var(--step-3)] font-extrabold text-[var(--color--heading)] mb-4 tracking-tight">Contact Us</h1>
      <p class="text-[var(--step-0)] text-[var(--color--text)] opacity-80 leading-relaxed">
        We're always happy to hear from you. Please feel free to reach out with any
        questions, suggestions, or feedback.
      </p>
    </div>

    <ContactForm />
  </div>
</template>
