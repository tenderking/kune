<script lang="ts" setup>
const router = useRouter()
const sortOrder = ref("Ascending")
function sortBy() {
  sortOrder.value === "Ascending"
    ? (sortOrder.value = "Descending")
    : (sortOrder.value = "Ascending")
}

const categorySlug = ref("")
const nuxtApp = useNuxtApp()

const { data: categories } = await useFetch("/api/services/categories", {
  headers: { Accept: "application/json" },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData) return
    return cachedData
  },
})

// Function to emit category slug when an option is selected
function getCategorySlug(slug: string) {
  categorySlug.value = slug
  if (slug === "") {
    router.push({ path: "/services", query: {} })
    return
  }

  router.push({ path: "/services", query: { category: slug } })
}
</script>

<template>
  <nav>
    <div class="select-container">
      <label for="category-select">Choose a category:</label>
      <template v-if="categories">
        <select
          id="category-select"
          name="categories"
          @change="(event) => getCategorySlug((event.target as HTMLSelectElement)?.value)"
        >
          <option value="">Select By Category</option>

          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
      </template>
    </div>
    <div class="sort-services">
      <span class="sort-services-heading">sort</span>
      <span class="sort-services-type" @click="sortBy()">{{ sortOrder }}</span>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}

.select-container {
  display: flex;
  flex-direction: column;
}

select {
  outline: none;
  background-color: var(--color--bg);
  color: var(--color--text);
  padding: 0.25em 1em;

  border-radius: 6px;
}

.sort-services {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.25em 1em;
  text-align: right;
}
</style>
