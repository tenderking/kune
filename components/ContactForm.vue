<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters long'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, email, subject, message } = event.data
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  window.location.href = `mailto:info@kune.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <div class="bg-[var(--color-card-bg)] border border-[var(--color--card-border)] rounded-[var(--radius-lg)] p-8 md:p-10 shadow-md w-full">
    <UForm :schema="schema" :state="state" class="flex flex-col gap-6" @submit="onSubmit">
      <UFormField label="Your Name" name="name" required>
        <UInput
          v-model="state.name"
          placeholder="John Doe"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Your Email" name="email" required>
        <UInput
          v-model="state.email"
          type="email"
          placeholder="john@example.com"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Subject" name="subject" required>
        <UInput
          v-model="state.subject"
          placeholder="How can we help?"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Message" name="message" required>
        <UTextarea
          v-model="state.message"
          placeholder="Write your message here..."
          class="w-full"
          :rows="5"
        />
      </UFormField>

      <UButton type="submit" size="md" color="primary" class="mt-4 font-semibold hover:-translate-y-0.5 transition-transform duration-200 justify-center">
        Send Message
      </UButton>
    </UForm>
  </div>
</template>
