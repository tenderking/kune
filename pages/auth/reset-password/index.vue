<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { z } from 'zod'
import { sendResetPasswordValidationSchema } from '~/validations/auth'

useHead({
  title: 'Reset password',
  meta: [
    {
      name: 'description',
      content: 'Reset password',
    },
  ],
})

type Schema = z.output<typeof sendResetPasswordValidationSchema>

const state = reactive({
  email: undefined,
})
const isLoading = ref(false)
const isResetPasswordSent = ref(false)
function validate(state: any): FormError[] {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // eslint-disable-next-line no-console
  console.log(event.data.email)
  isLoading.value = true
  try {
    // If validation passes, send the request
    const formData = new FormData()
    formData.append('email', event.data.email)

    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: formData,
    })
    isLoading.value = false
  }
  catch (error: any) {
    // Set the errors
    console.error(error)
    isLoading.value = false
  }
  isResetPasswordSent.value = true
}
</script>

<template>
  <div class="auth-page flex items-center justify-center">
    <!-- If not sent yet -->
    <div v-if="!isResetPasswordSent" class="glass-card w-full max-w-md p-8 md:p-10 space-y-6">
      <div class="text-center space-y-2">
        <h1 class="auth-title">Reset Password</h1>
        <p class="auth-subtitle">Enter your email and we'll send you instructions to reset your password</p>
      </div>

      <UForm :validate="validate" :schema="sendResetPasswordValidationSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email" required>
          <UInput
            v-model="state.email"
            placeholder="example@example.com"
            :disabled="isLoading"
            icon="i-heroicons-envelope"
            size="md"
            class="mt-1"
          />
        </UFormField>

        <UButton
          type="submit"
          block
          size="md"
          color="primary"
          :loading="isLoading"
          class="auth-submit-btn mt-6"
        >
          Send Reset Link
        </UButton>
      </UForm>

      <div class="text-center pt-2">
        <p class="auth-footer-text">
          Remembered your password?
          <NuxtLink to="/login" class="auth-link">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- If sent -->
    <div v-else class="glass-card w-full max-w-md p-8 md:p-10 space-y-6 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
        <Icon name="i-heroicons-check-circle" size="36" />
      </div>
      <div class="space-y-2">
        <h1 class="auth-title">Check Your Email</h1>
        <p class="auth-subtitle">
          If that email exists in our system, we've sent instructions to reset your password.
        </p>
      </div>

      <div class="pt-4 space-y-2">
        <p class="auth-footer-text">
          Need to try another email?
          <button class="auth-link font-semibold focus:outline-none bg-transparent border-none p-0 cursor-pointer" @click="isResetPasswordSent = false">
            Go back
          </button>
        </p>
        <p class="auth-footer-text">
          Or
          <NuxtLink to="/login" class="auth-link">
            Sign in now
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 70vh;
  padding: 2rem 0;
}

.glass-card {
  background: var(--color--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color--card-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  transition: all var(--transition-base);
}

.auth-title {
  font-size: var(--step-2);
  font-weight: 700;
  color: var(--color--heading);
  letter-spacing: -0.02em;
}

.auth-subtitle {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.8;
  line-height: 1.6;
}

.auth-link {
  color: var(--clr--primary);
  font-weight: 600;
  transition: opacity var(--transition-fast);
}

.auth-link:hover {
  text-decoration: underline;
  opacity: 0.9;
}

.auth-footer-text {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.8;
}

.auth-submit-btn {
  background-color: var(--clr--primary);
  color: #fff;
  font-weight: 600;
  border: none;
  transition: all var(--transition-base);
}

.auth-submit-btn:hover {
  background-color: var(--clr--primary) !important;
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.auth-submit-btn:active {
  transform: translateY(0);
}
</style>
