<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()

const searchQuery = ref((route.query.q as string) || '')
const selectedCategory = computed(() => (route.query.category as string) || '')
const currentSort = computed(() => (route.query.sort as string) || 'desc')

const { data: categories } = await useFetch<string[]>('/api/services/categories', {
  headers: { Accept: 'application/json' },
  getCachedData(key) {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData)
      return
    return cachedData
  },
})

// Debounce search update to URL
let searchTimeout: any = null
function onSearchInput(val: string) {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    const query = { ...route.query }
    if (val.trim()) {
      query.q = val.trim()
    } else {
      delete query.q
    }
    router.push({ path: '/services', query })
  }, 250)
}

function onCategoryChange(event: Event) {
  const slug = (event.target as HTMLSelectElement)?.value || ''
  const query = { ...route.query }
  if (slug) {
    query.category = slug
  } else {
    delete query.category
  }
  router.push({ path: '/services', query })
}

function toggleSort() {
  const nextSort = currentSort.value === 'asc' ? 'desc' : 'asc'
  router.push({ path: '/services', query: { ...route.query, sort: nextSort } })
}

function clearAllFilters() {
  searchQuery.value = ''
  router.push({ path: '/services', query: {} })
}

const hasActiveFilters = computed(() => Boolean(route.query.category || route.query.q || route.query.tags))
</script>

<template>
  <nav class="services-nav">
    <div class="nav-controls">
      <!-- Search Input -->
      <div class="search-wrap">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search services, keywords..."
          size="md"
          class="w-full"
          @update:model-value="onSearchInput"
        />
      </div>

      <!-- Category Filter -->
      <div class="filter-group">
        <label for="category-select" class="sr-only">Category</label>
        <select
          id="category-select"
          class="filter-select"
          name="categories"
          :value="selectedCategory"
          @change="onCategoryChange"
        >
          <option value="">
            All Categories
          </option>
          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Sort Toggle -->
      <button class="sort-btn" :title="`Sort order: ${currentSort === 'asc' ? 'Ascending' : 'Descending'}`" @click="toggleSort">
        <Icon :name="currentSort === 'asc' ? 'heroicons:bars-arrow-up-20-solid' : 'heroicons:bars-arrow-down-20-solid'" class="sort-icon" />
        <span class="hidden sm:inline">{{ currentSort === 'asc' ? 'Asc' : 'Desc' }}</span>
      </button>

      <!-- Clear Filters -->
      <UButton
        v-if="hasActiveFilters"
        variant="ghost"
        color="neutral"
        size="sm"
        icon="i-heroicons-x-mark"
        class="text-xs"
        @click="clearAllFilters"
      >
        Clear
      </UButton>
    </div>

    <!-- Active Filter Indicator -->
    <div v-if="route.query.tags" class="active-tag-row">
      <span class="text-xs opacity-75">Active tag:</span>
      <UBadge color="primary" variant="subtle" size="sm">
        #{{ route.query.tags }}
        <button class="ml-1 hover:text-red-500" @click="clearAllFilters">×</button>
      </UBadge>
    </div>
  </nav>
</template>

<style scoped>
.services-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg, 1.25em);
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.nav-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.search-wrap {
  flex: 1 1 240px;
  min-width: 200px;
}

.filter-group {
  display: flex;
  align-items: center;
  flex: 0 1 auto;
}

.active-tag-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color--card-border, rgba(0, 0, 0, 0.06));
}

.filter-select {
  appearance: none;
  background-color: var(--color--bg);
  color: var(--color--text);
  border: 1px solid var(--color--card-border, rgba(128,128,128,0.2));
  padding: 0.5rem 2.25rem 0.5rem 0.85rem;
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
  gap: 0.4rem;
  background: var(--color--bg);
  border: 1px solid var(--color--card-border, rgba(128,128,128,0.2));
  color: var(--color--text);
  font-size: var(--step--1);
  font-family: inherit;
  cursor: pointer;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm, 0.5em);
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.sort-btn:hover {
  border-color: var(--clr--primary);
}

.sort-icon {
  width: 1.15rem;
  height: 1.15rem;
}
</style>
