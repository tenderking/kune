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
  <UContainer v-if="!isResetPasswordSent" class="flex flex-col items-center justify-center bg-white outline outline-1 rounded-lg gap-4 p-4 my-8 mx-auto min-w-max max-w-min">
    <h1 class="mb-2 text-center text-lg font-bold">
      Reset Password
    </h1>
    <UForm :validate="validate" :schema="sendResetPasswordValidationSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput
          v-model="state.email"
          placeholder="example@example.com"
          :disabled="isLoading"
          icon="i-heroicons-envelope"
        />
      </UFormGroup>

      <UButton
        type="submit"
      >
        Continue
      </UButton>
    </UForm>

    <p class="text-muted-foreground text-center text-sm">
      Have you remembered your password?
      <NuxtLink href="/login" class="text-primary font-bold hover:underline">
        Login now
      </NuxtLink>
    </p>
  </UContainer>

  <UContainer v-else class="flex max-w-sm flex-col gap-4 px-4 py-16">
    <h1 class="mb-2 text-center text-3xl font-bold text-white">
      Reset Password
    </h1>
    <p class="text-center text-white">
      If the email exists in our system, we will send you an email with
      instructions to reset your password.
    </p>
    <p class="text-muted-foreground text-center text-sm">
      Have you remembered your password?
      <NuxtLink href="/login" class="text-primary font-bold hover:underline">
        Login now
      </NuxtLink>
    </p>
  </UContainer>
</template>
