<script lang="ts" setup>
import { navigateTo } from 'nuxt/app'
import { ref } from 'vue'

const error = ref<string | null>(null)
const state = ref({ email: '' })

async function resetPassword() {
  try {
    const formData = new FormData()
    formData.append('email', state.value.email)
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: formData,
    }).then((res: unknown) => {
      const rese = res as Response
      if (rese.status !== 200) {
        throw new Error('Failed to send email')
      }
      if (rese.status === 200) {
      // eslint-disable-next-line no-alert
        alert('Email sent. Please check your inbox.')
      }
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
      Please enter your email to reset password.
    </p>

    <UForm method="post" :state="state" @submit.prevent="resetPassword">
      <UFormGroup label="Username" required>
        <UInput v-model="state.email" type="text" name="email" />
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
