<script setup lang="ts">

</script>

<template>
  <h1>Contact Us</h1>

  <p class="max-w-lg">
    We're always happy to hear from you. Please feel free to reach out with any questions,
    suggestions, or feedback.
  </p>

  <UForm action="mailto:info@kune.com" method="post" enctype="text/plain">
    <UFormGroup label="Your Name" required>
      <UInput type="text" name="name" />
    </UFormGroup>

    <UFormGroup label="Your Email" required class="mt-5">
      <UInput type="email" name="email" />
    </UFormGroup>
    <UFormGroup label="Subject" required class="mt-5">
      <UInput type="text" name="subject" />
    </UFormGroup>
    <UFormGroup label="Message" required class="mt-5">
      <UTextarea name="message"></UTextarea>
    </UFormGroup>

    <UButton type="submit" class="mt-10">Send Message</UButton>
  </UForm>
</template>
<style scoped>
main {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

p {
  line-height: 1.5;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 500px;
}

label {
  display: block;
  margin-bottom: 5px;
  margin-top: 1em;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: var(--radius-sm);
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: var(--radius-sm);
}

input[type="submit"] {
  background-color: var(--clr--primary);
  color: var(--clr--text);
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  margin-top: 1em;
}
</style>
