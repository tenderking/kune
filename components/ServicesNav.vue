<script lang="ts" setup>
const sortOrder = ref("Ascending")
function sortBy() {
  sortOrder.value === "Ascending"
    ? (sortOrder.value = "Descending")
    : (sortOrder.value = "Ascending")
}

const categorySlug = ref("")
const { data: categories } = await useFetch("/api/services/categories")
const emit = defineEmits<{
  (event: "categorySlug", value: string): void
}>()

// Function to emit category slug when an option is selected
function emitCategorySlug(slug: string) {
  categorySlug.value = slug
  emit("categorySlug", slug)
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
          @change="(event) => emitCategorySlug((event.target as HTMLSelectElement)?.value)"
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
