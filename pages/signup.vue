<script lang="ts" setup>
definePageMeta({
  middleware: ['guest'],
})
const error = ref<string | null>(null)

async function signup(e: Event) {
  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: new FormData(e.target as HTMLFormElement),
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
  <UContainer class="my-5 py-8 flex flex-col items-center">
    <h1>Create an account</h1>

    <p class="max-w-lg">
      Please fill in the details to create your account.
    </p>

    <UForm method="post" action="/api/auth/login" :state="{}" @submit.prevent="signup">
      <UFormGroup label="Name" required class="mt-5">
        <UInput type="text" name="name" class="w-full" />
      </UFormGroup>

      <UFormGroup label="Username" required class="mt-5">
        <UInput type="text" name="username" class="w-full" />
      </UFormGroup>

      <UFormGroup label="Password" required class="mt-5">
        <UInput type="password" name="password" class="w-full" />
      </UFormGroup>

      <UFormGroup label="Email" required class="mt-5">
        <UInput type="email" name="email" class="w-full" />
      </UFormGroup>

      <UButton type="submit" color="orange" class="mt-10">
        Continue
      </UButton>

      <p class="text-red-500 mt-5">
        {{ error }}
      </p>
    </UForm>

    <NuxtLink to="/login" class="mt-5 text-blue-500">
      Sign in
    </NuxtLink>
  </UContainer>
</template>
