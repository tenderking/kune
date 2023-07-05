<script setup>
import { useForm } from "vee-validate";

// Creates a form context
// This component now acts as a form
// Usually you will destruct the form context to get what you need
function handleSubmit() {
  console.log("submitted");
}
const { values } = useForm();
</script>

<template>
  <!-- Create form for adding item to db -->

  <form @submit.prevent="handleSubmit">
    <label for="service_name">Service Name</label>
    <input
      id="service_name"
      name="service_name"
      type="text"
      v-model="values.service_name"
    />

    <label for="service_description">Service Description</label>
    <input
      id="service_description"
      name="service_description"
      type="text"
      v-model="values.service_description"
    />

    <button type="submit">Submit</button>
  </form>

  <pre>{{ values }}</pre>
</template>
