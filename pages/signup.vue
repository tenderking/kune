<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'

const { signIn } = useAuth()
const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
})
function validate(state: any): FormError[] {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  return errors
}
const form = ref()
async function onSubmit(_event: FormSubmitEvent<any>) {
  form.value.clear()
  try {
    // Send the form values as JSON
    // include isNewUser: true to create a new user
    // include role as user to create a new user
    await signIn('credentials', {
      redirect: false,
      username: state.email,
      password: state.password,
      isNewUser: true,
      role: 'user',
    })

    // ...
  }
  catch (err) {
    if (err.statusCode === 422) {
      form.value.setErrors(
        err.data.errors.map(err => ({
          // Map validation errors to { path: string, message: string }
          message: err.message,
          path: err.path,
        })),
      )
    }
  }
}
</script>

<template>
  <div>
    <h1>Sign up</h1>

    <UForm
      ref="form"
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<style></style>
