<script lang="ts" setup>
const store = useApiStore()
const sortOrder = ref('Ascending')
function sortBy() {
  sortOrder.value === 'Ascending'
    ? (sortOrder.value = 'Descending')
    : (sortOrder.value = 'Ascending')
}
onMounted(() => {
  store.fetchCategories()
})
</script>

<template>
  <nav>
    <div class="select-container">
      <label for="category-select">Choose a category:</label>
      <template v-if="store.categoryList">
        <select id="category-select" name="categories">
          <option value="" @click="store.$patch({ category: '' })">
            Select By Category
          </option>

          <option
            v-for="(category, index) in store.categoryList"
            :key="index"
            :value="category"
            @click="store.$patch({ category })"
          >
            {{ category }}
          </option>
        </select>
      </template>
    </div>
    <pre>{{ store.category }}</pre>
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
