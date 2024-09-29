<script lang="ts" setup>
definePageMeta({
  middleware: ['guest'],
})

const error = ref<string | null>(null)
const state = ref({ username: '', password: '' })

async function login() {
  try {
    const formData = new FormData()
    formData.append('username', state.value.username)
    formData.append('password', state.value.password)
    await $fetch('/api/auth/login', {
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
  <UContainer class="my-5 py-8 flex flex-col items-center">
    <h1>Sign in</h1>

    <p class="max-w-lg">
      Please enter your credentials to sign in.
    </p>

    <UForm method="post" :state="state" @submit.prevent="login">
      <UFormGroup label="Username" required>
        <UInput v-model="state.username" type="text" name="username" />
      </UFormGroup>

      <UFormGroup label="Password" required class="mt-5">
        <UInput v-model="state.password" type="password" name="password" />
      </UFormGroup>

      <UButton type="submit" color="orange" class="mt-10">
        Continue
      </UButton>

      <p class="text-red-500 mt-5">
        {{ error }}
      </p>
    </UForm>

    <NuxtLink to="/signup" class="mt-5 text-blue-500">
      Create an account
    </NuxtLink>
  </UContainer>
</template>
