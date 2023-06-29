<script lang="ts" setup>
// const categories = ["Business", "I.T", "Fintech"]
const { data: categories } = await useFetch('/api/categories')
const categoriesList = categories.value != null
  ? [...new Set(await categories.value.categories.map(category => category.Category))]
  : ['Business', 'I.T', 'Fintech']
const sortOrder = ref('Ascending')
function sortBy() {
  sortOrder.value === 'Ascending' ? sortOrder.value = 'Descending' : sortOrder.value = 'Ascending'
}
</script>

<template>
  <nav>
    <div class="select-container">
      <label for="category-select">Choose a category:</label>
      <select id="category-select" name="categories">
        <option value="">
          Select By Category
        </option>

        <option v-for="(category, index) in categoriesList " :key="index" :value="category">
          {{ category }}
        </option>
      </select>
      <!-- <pre>
        {{ categoriesList }}
      </pre> -->
    </div>
    <input id="search-bar" type="search" name="search" placeholder="search">
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
  background-color: var(--color-background-soft);
  color: var(--color-text);
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
