<script lang="ts" setup>
const router = useRouter()

interface PostService {
  Category: string
  Description: string
  Address: string
  ServiceName: string
  Website: string
  ImgUrl: string
  Tags: string[]
  ServiceID: number
}

const Category = ref("")
const Description = ref("")
const Address = ref("")
const ServiceName = ref("")
const Website = ref("")
const ImgUrl = ref("")
const taginput = ref("")
const errors = ref({
  Category: "",
  Description: "",
  Address: "",
  ServiceName: "",
  Website: "",
  ImgUrl: "",
  Tags: "",
  ServiceID: "",
})

const onSubmit = handleSubmit()
// async (values) => {
// alert(JSON.stringify(values, null, 2))
// await useFetch("/api/services/create", {
//   method: "POST",
//   body: JSON.stringify(values, null, 2),
// })
// router.push("/services")
// }
function handleSubmit() {
  alert("submitted")
}
const fields = ref([{ key: 0, value: "" }])
function remove(idx: number) {
  fields.value.splice(idx, 1)
}
function push(value: string) {
  fields.value.push({ key: fields.value.length, value })
  taginput.value = ""
}
</script>

<template>
  <UForm>
    <UFormGroup label="Category">
      <UInput v-model="Category" name="Category" />
    </UFormGroup>
    <UFormGroup label="Description">
      <UInput type="text" v-model="Description" name="Description" />
      <span> {{ errors.Description }}</span>
    </UFormGroup>
    <UFormGroup label="Address">
      <UInput type="text" v-model="Address" name="Address" />
      <span> {{ errors.Address }}</span>
    </UFormGroup>
    <UFormGroup label="ServiceName">
      <UInput type="text" v-model="ServiceName" name="ServiceName" />
      <span> {{ errors.ServiceName }}</span>
    </UFormGroup>
    <UFormGroup label="Website">
      <UInput type="text" v-model="Website" name="Website" />
      <span> {{ errors.Website }}</span>
    </UFormGroup>
    <UFormGroup label="ImgUrl">
      <UInput type="text" v-model="ImgUrl" name="ImgUrl" />
      <span> {{ errors.ImgUrl }}</span>
    </UFormGroup>

    <UFormGroup label="Tag">
      <UFormGroup v-for="(field, idx) in fields" :key="field.key">
        <UBadge size="md" class="mr-2" v-if="field.value.length">
          {{ field.value }}</UBadge
        >
        <UButton size="xs" @click="remove(idx)" v-if="field.value.length">Remove</UButton>
      </UFormGroup>
      <UInput v-model="taginput" type="text" />
      <UButton size="xs" class="border-gray-600" @click="push(taginput)">Add Tag</UButton>
    </UFormGroup>

    <UButton @click="onSubmit">Submit</UButton>
  </UForm>
</template>
