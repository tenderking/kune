<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { z } from 'zod'
import { confirmResetPasswordValidationSchema } from '~/validations/auth'

definePageMeta({
  validate: async (route) => {
    // Check if the id is a valid hash
    return (
      typeof route.params.token === 'string'
      && /^[a-z0-9]{40}$/i.test(route.params.token)
    )
  },
})

useHead({
  title: 'Reset password',
  meta: [
    {
      name: 'description',
      content: 'Reset password',
    },
  ],
})

type Schema = z.output<typeof confirmResetPasswordValidationSchema>

const state = reactive({
  password: undefined,
  confirmPassword: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  if (!state.confirmPassword)
    errors.push({ path: 'confirmPassword', message: 'Required' })
  if (state.password !== state.confirmPassword)
    errors.push({ path: 'confirmPassword', message: 'Passwords do not match' })
  return errors
}

const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const isResetPasswordCompleted = ref(false)
const isResetPassowordCompleted = isResetPasswordCompleted
const isTokenInvalid = ref(false)

const route = useRoute()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Submitting form...', state)
  isLoading.value = true

  try {
    const formData = new FormData()
    formData.append('password', event.data.password)
    formData.append('confirmPassword', event.data.confirmPassword)
    const response: any = await $fetch(
      `/api/auth/reset-password/${route.params.token}`,
      {
        method: 'POST',
        body: formData,
      },
    )

    isLoading.value = false

    if (response || (response && response.ok)) {
      isResetPasswordCompleted.value = true
      await navigateTo('/profile')
    }
  }
  catch (error: any) {
    // Check if the token is invalid
    if (error.data?.data?.token || error.data?.message?.includes('token') || error.status === 400) {
      isTokenInvalid.value = true
      return
    }
    // Set the errors
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page flex items-center justify-center">
    <!-- If the token is valid -->
    <div v-if="!isTokenInvalid" class="glass-card w-full max-w-md p-8 md:p-10 space-y-6">
      <div class="text-center space-y-2">
        <h1 class="auth-title">New Password</h1>
        <p class="auth-subtitle">Please enter a new password for your account</p>
      </div>

      <UForm :validate="validate" :schema="confirmResetPasswordValidationSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Password" name="password" required>
          <UInput
            v-model="state.password"
            placeholder="password"
            :disabled="isLoading"
            icon="i-heroicons-lock-closed"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            :type="showPassword ? 'text' : 'password'"
            size="md"
            class="mt-1"
          >
            <template #trailing>
              <UButton
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                type="button"
                size="xs"
                :padded="false"
                variant="ghost"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField label="Confirm Password" name="confirmPassword" required>
          <UInput
            v-model="state.confirmPassword"
            placeholder="confirm password"
            :disabled="isLoading"
            icon="i-heroicons-lock-closed"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            :type="showConfirmPassword ? 'text' : 'password'"
            size="md"
            class="mt-1"
          >
            <template #trailing>
              <UButton
                :icon="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                type="button"
                size="xs"
                :padded="false"
                variant="ghost"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton
          class="auth-submit-btn mt-6"
          type="submit"
          block
          size="md"
          color="primary"
          :loading="isLoading"
        >
          Change Password
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

    <!-- If the token is invalid -->
    <div v-else class="glass-card w-full max-w-md p-8 md:p-10 space-y-6 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-2">
        <Icon name="i-heroicons-exclamation-triangle" size="36" />
      </div>
      
      <div class="space-y-2">
        <h1 class="auth-title text-red-500">Invalid Link</h1>
        <p class="auth-subtitle">
          This reset password link is invalid or has expired.
        </p>
      </div>

      <div class="pt-4 space-y-3">
        <UButton
          to="/auth/reset-password"
          block
          size="md"
          color="primary"
          class="auth-submit-btn"
        >
          Request New Link
        </UButton>
        
        <p class="auth-footer-text pt-2">
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
