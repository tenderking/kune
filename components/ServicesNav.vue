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
  <nav class="services-nav">
    <div class="filter-group">
      <label for="category-select" class="filter-label">Category</label>
      <template v-if="categories">
        <select class="filter-select" id="category-select" name="categories"
                @change="(event) => getCategorySlug((event.target as HTMLSelectElement)?.value)">
          <option value="">
            All Categories
          </option>
          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
      </template>
    </div>

    <div class="filter-group sort-group">
      <span class="filter-label">Sort By</span>
      <button class="sort-btn" @click="sortBy()">
        <span>{{ sortOrder === 'ascending' ? 'Ascending' : 'Descending' }}</span>
        <Icon :name="sortOrder === 'ascending' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" class="sort-icon" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.services-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg, 1.25em);
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--color--heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-select {
  appearance: none;
  background-color: var(--color--bg);
  color: var(--color--text);
  border: 1px solid var(--color--card-border, rgba(128,128,128,0.2));
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: var(--radius-sm, 0.5em);
  font-size: var(--step--1);
  font-family: inherit;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  transition: border-color var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  border-color: var(--clr--primary);
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--color--text);
  font-size: var(--step--1);
  font-family: inherit;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm, 0.5em);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.sort-btn:hover {
  background-color: var(--color--card-border, rgba(0,0,0,0.06));
  color: var(--clr--primary);
}

.sort-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 550px) {
  .services-nav {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .filter-group {
    justify-content: space-between;
  }
}
</style>
