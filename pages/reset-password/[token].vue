<script setup lang="ts">
const route = useRoute()
const token = route.params.token as string

const password = ref('')
const error = ref<null | unknown>(null)

async function resetPassword() {
  error.value = null
  try {
    await $fetch(`/api/auth/reset-password/${token}`, {
      method: 'POST',
      body: {
        password: password.value,
      },
    })

    // Success! Redirect or show a success message
    navigateTo('/login')
  }
  catch (err) {
    console.error(err)
    error.value = err
  }
}
</script>

<template>
  <UContainer class="my-5 py-8 flex flex-col items-center">
    <h1>Reset Password</h1>

    <p class="max-w-lg">
      Please enter your new password.
    </p>

    <UForm :state="{}" @submit.prevent="resetPassword">
      <UFormGroup label="New Password" required>
        <UInput v-model="password" type="password" name="password" />
      </UFormGroup>

      <UButton type="submit" color="orange" class="mt-10">
        Reset Password
      </UButton>

      <p v-if="error" class="text-red-500 mt-5">
        {{ error }}
      </p>
    </UForm>
  </UContainer>
</template>
