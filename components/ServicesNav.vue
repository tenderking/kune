<script lang="ts" setup>
const { data: categories } = await useFetch('/api/services/categories')
const data: Set<string[]> = new Set(categories.value?.response as string[])
const sortOrder = ref('Ascending')
function sortBy() {
  sortOrder.value === 'Ascending'
    ? (sortOrder.value = 'Descending')
    : (sortOrder.value = 'Ascending')
}
</script>

<template>
  <nav>
    <div class="select-container">
      <label for="category-select">Choose a category:</label>
      <template v-if="data">
        <select id="category-select" name="categories">
          <option value="">
            Select By Category
          </option>

          <option
            v-for="(category, index) in data"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </template>
    </div>
    <!-- <input id="search-bar" type="search" name="search" placeholder="search"> -->
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
