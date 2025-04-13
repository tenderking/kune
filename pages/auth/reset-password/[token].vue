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

const isResetPassowordCompleted = ref(false)
const isTokenInvalid = ref(false)

const route = useRoute()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Submitting form...', state) // ✅ Debugging log
  isLoading.value = true

  try {
    // If validation passes, send the request
    // eslint-disable-next-line no-console
    console.log('password is:', event.data.password)
    const formData = new FormData()
    formData.append('password', event.data.password)
    formData.append('confirmPassword', event.data.confirmPassword)
    const response: Response = await $fetch(
      `/api/auth/reset-password/${route.params.token}`,
      {
        method: 'POST',
        body: formData,

      },
    )

    isLoading.value = false

    if (response.ok) {
      isResetPassowordCompleted.value = true
      await navigateTo('/profile')
    }
  }
  catch (error: any) {
    // Check if the token is invalid
    if (error.data.data.token) {
      isTokenInvalid.value = true
      return
    }
    // Set the errors
    isLoading.value = false
  }
}
</script>

<template>
  <!-- If the token is valid -->
  <UContainer v-if="!isTokenInvalid" class="flex bg-white outline outline-1 rounded-lg mx-auto my-8 p-8 flex-col gap-4 max-w-min min-w-max">
    <h1 class="mb-1 text-center  font-bold ">
      Reset Password
    </h1>
    <p>Enter a new password for your account.</p>

    <UForm :validate="validate" :schema="confirmResetPasswordValidationSchema" :state="state" @submit="onSubmit">
      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          placeholder="password"
          :disabled="isLoading"

          icon="material-symbols:key-vertical-rounded"
          :ui="{ icon: { trailing: { pointer: '' } } }"

          type="password"
        >
          <template #trailing>
            <UButton
              :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
              type="button"
              size="xs"
              :padded="false"
              variant="ghost"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup label="Confirm Password" name="confirm-password" class="mt-4">
        <UInput
          v-model="state.confirmPassword"
          placeholder="confirm password"
          :disabled="isLoading"
          icon="material-symbols:key-vertical-rounded"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          type="password"
        >
          <template #trailing>
            <UButton
              :icon="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'"
              type="button"
              size="xs"
              :padded="false"
              variant="ghost"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </UInput>
      </UFormGroup>
      <UButton
        class="w-full mt-8 text-center " :loading="isLoading"
        type="submit"
      >
        Change Password
      </UButton>
    </UForm>

    <p class="text-muted-foreground text-center text-sm">
      Have you remembered your password?
      <NuxtLink href="/login" class="link link-primary font-bold">
        Login now
      </NuxtLink>
    </p>
  </UContainer>

  <!-- If the token is invalid -->
  <UContainer v-else-if="isTokenInvalid" class="flex flex-col gap-4">
    <h1 class="mb-2 text-center  font-bold ">
      Reset Password
    </h1>
    <p class="text-center">
      The reset password link is invalid.
    </p>
    <p class="text-muted-foreground text-center text-sm">
      Have you remembered your password?
      <UButton to="/login" class="mt-4">
        Login now
      </UButton>
    </p>
  </UContainer>
</template>
