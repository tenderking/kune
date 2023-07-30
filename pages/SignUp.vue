<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'

import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

function handleSubmit(values: yup.Asserts<typeof schema> | any) {
  alert(JSON.stringify(values, null, 2))
  signUp({ username: values.email, password: values.password })
}
</script>

<template>
  <Form :validation-schema="schema" @submit="handleSubmit">
    <Field name="email" type="email" />
    <ErrorMessage name="email" />

    <Field name="password" type="password" />
    <ErrorMessage name="password" />

    <button>Submit</button>
  </Form>
</template>
