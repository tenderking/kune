<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  mode: 'signin' | 'register'
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()

const showPassword = ref(false)

const schema = computed(() => {
  if (props.mode === 'signin') {
    return z.object({
      username: z.string().min(3, 'Username must be at least 3 characters long'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
  } else {
    return z.object({
      name: z.string().min(1, 'Name is required'),
      username: z.string().min(3, 'Username must be at least 3 characters long'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
  }
})

const state = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
})

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data)
}
</script>

<template>
  <div class="bg-[var(--color-card-bg)] border border-[var(--color--card-border)] rounded-[var(--radius-lg)] p-8 md:p-10 shadow-md w-full">
    <UForm :schema="schema" :state="state" class="flex flex-col gap-6" @submit="onSubmit">
      <!-- Name (Register mode only) -->
      <UFormField v-if="mode === 'register'" label="Name" name="name" required>
        <UInput
          v-model="state.name"
          placeholder="John Doe"
          class="w-full"
        />
      </UFormField>

      <!-- Username (Both modes) -->
      <UFormField label="Username" name="username" required>
        <UInput
          v-model="state.username"
          placeholder="johndoe"
          class="w-full"
        />
      </UFormField>

      <!-- Email (Register mode only) -->
      <UFormField v-if="mode === 'register'" label="Email" name="email" required>
        <UInput
          v-model="state.email"
          type="email"
          placeholder="john@example.com"
          class="w-full"
        />
      </UFormField>

      <!-- Password (Both modes) -->
      <UFormField name="password" required>
        <template #label>
          <div class="flex justify-between items-center w-full">
            <span>Password</span>
            <NuxtLink v-if="mode === 'signin'" to="/auth/reset-password" class="text-[var(--step--1)] text-[var(--clr--primary)] font-semibold no-underline hover:underline transition-opacity duration-200">
              Forgot password?
            </NuxtLink>
          </div>
        </template>
        <UInput
          v-model="state.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              type="button"
              size="xs"
              variant="ghost"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <div v-if="error" class="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-[var(--radius-sm)] text-center text-[var(--step--1)]">
        {{ error }}
      </div>

      <UButton type="submit" size="md" color="primary" class="mt-4 font-semibold hover:-translate-y-0.5 transition-transform duration-200 justify-center">
        {{ mode === 'signin' ? 'Sign In' : 'Create Account' }}
      </UButton>
    </UForm>
  </div>
</template>
