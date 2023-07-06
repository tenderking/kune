<script lang="ts" setup>
import { useFieldArray, useForm } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()

interface Service {
  Category: string
  Description: string
  Address: string
  ServiceName: string
  Website: string
  ImgUrl: string
  Tags: string[]
  ServiceID: number
}

const schema = yup.object<Service>({
  Category: yup.string().required(),
  Description: yup.string().required(),
  Address: yup.string().required(),
  ServiceName: yup.string().required(),
  Website: yup.string().required(),
  ImgUrl: yup.string().required(),
  Tags: yup.array(yup.string()),
  ServiceID: yup.number().required(),
})
const { defineInputBinds, errors, handleSubmit } = useForm({
  validationSchema: schema,
})

const Category = defineInputBinds('Category')
const Description = defineInputBinds('Description')
const Address = defineInputBinds('Address')
const ServiceName = defineInputBinds('ServiceName')
const Website = defineInputBinds('Website')
const ImgUrl = defineInputBinds('ImgUrl')
const { remove, push, fields } = useFieldArray('Tags')
const ServiceID = defineInputBinds('ServiceID')

const onSubmit = handleSubmit (async (values) => {
  // alert(JSON.stringify(values, null, 2))
  await useFetch('/api/services/create', {
    method: 'POST',
    body: JSON.stringify(values, null, 2),
  })
  router.push('/services')
})
</script>

<template>
  <form @submit="onSubmit">
    <label for="Category">Category</label>
    <input type="text" v-bind="Category" name="Category">
    <span> {{ errors.Category }}</span>
    <label for="Description">Description</label>
    <input type="text" v-bind="Description" name="Description">
    <span> {{ errors.Description }}</span>
    <label for="Address">Address</label>
    <input type="text" v-bind="Address" name="Address">
    <span> {{ errors.Address }}</span>
    <label for="ServiceName">ServiceName</label>
    <input type="text" v-bind="ServiceName" name="ServiceName">
    <span> {{ errors.ServiceName }}</span>
    <label for="Website">Website</label>
    <input type="text" v-bind="Website" name="Website">
    <span> {{ errors.Website }}</span>
    <label for="ImgUrl">ImgUrl</label>
    <input type="text" v-bind="ImgUrl" name="ImgUrl">
    <span> {{ errors.ImgUrl }}</span>
    <div>
      <label>Tag</label>
      <div v-for="(field, idx) in fields" :key="field.key">
        <input v-model="field.value" type="text">

        <button type="button" @click="remove(idx)">
          Remove
        </button>
      </div>

      <button type="button" @click="push('')">
        Add
      </button>

      <button>Submit</button>
    </div>
    <label for="ServiceID">ServiceID</label>
    <input type="text" v-bind="ServiceID" name="ServiceID">
    <span> {{ errors.ServiceID }}</span>

    <button type="submit">
      Submit
    </button>
  </form>
</template>
