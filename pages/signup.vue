<script lang="ts" setup>
definePageMeta({
  middleware: ['guest'],
})
const error = ref<string | null>(null)

async function signup(data: any) {
  try {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: formData,
    })
    await navigateTo('/')
  }
  catch (err) {
    const errorMessage = (err as any).data?.message ?? (err as Error).message ?? null
    error.value = errorMessage
  }
}
</script>

<template>
  <div class="max-w-[600px] mx-auto py-12 px-4 flex flex-col gap-10">
    <div class="text-center">
      <h1 class="text-[var(--step-3)] font-extrabold text-[var(--color--heading)] mb-4 tracking-tight">Create Account</h1>
      <p class="text-[var(--step-0)] text-[var(--color--text)] opacity-80 leading-relaxed">
        Please fill in details to create your account.
      </p>
    </div>

    <AuthForm mode="register" :error="error" @submit="signup" />

    <div class="text-center -mt-4">
      <p class="text-[var(--step--1)] text-[var(--color--text)] opacity-80">
        Already have an account?
        <NuxtLink to="/login" class="text-[var(--clr--primary)] font-semibold no-underline hover:underline transition-opacity duration-200">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
