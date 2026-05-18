<script lang="ts" setup>
const router = useRouter()
const sortOrder = ref('ascending')
function sortBy() {
  if (sortOrder.value === 'ascending') {
    sortOrder.value = 'descending'
    router.push({ query: { sort: 'desc' } })
  }
  else {
    sortOrder.value = 'ascending'
    router.push({ query: { sort: 'asc' } })
  }
}

const categorySlug = ref('')
const nuxtApp = useNuxtApp()

const { data: categories } = await useFetch('/api/services/categories', {
  headers: { Accept: 'application/json' },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData)
      return
    return cachedData
  },
})

// Function to emit category slug when an option is selected
function getCategorySlug(slug: string) {
  categorySlug.value = slug
  if (slug === '') {
    router.push({ path: '/services', query: {} })
    return
  }

  router.push({ path: '/services', query: { category: slug } })
}
</script>

<template>
  <nav class="flex justify-between px-4 items-center">
    <div class="flex flex-col justify-center  items-start">
      <label for="category-select" class="font-bold">Choose a category:</label>
      <template v-if="categories">
        <select class="hover:font-bold" id="category-select" name="categories"
                @change="(event) => getCategorySlug((event.target as HTMLSelectElement)?.value)">
          <option value="">
            All
          </option>

          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
      </template>
    </div>
    <div class="flex flex-col justify-center items-end">
      <span class="font-bold">sort</span>
      <span class=" hover:font-bold" @click="sortBy()">{{ sortOrder }}</span>
    </div>
  </nav>
</template>

<style scoped>
select {
  background-color: var(--color--bg);
  color: var(--color--text);

}
</style>
