<template>
	<nav>
		<div class="select-container">
			<label for="category-select">Choose a category:</label>
			<select name="categories" id="category-select">
				<option value="">
					Select By Category
				</option>
				<option v-for="category in  data.categories  " :value="category">
					{{ category }}
				</option>
			</select>
		</div>
		<input type="search" name="search" id="search-bar" placeholder="search">
		<div class="sort-services">
			<span class="sort-services-heading">sort</span>
			<span class="sort-services-type" @click="sortBy()">{{ sortOrder }}</span>
		</div>

	</nav>
</template>
<script lang="ts" setup>
// const categories = ["Business", "I.T", "Fintech"]
const { data } = await useFetch('/api/categories')

console.log("API response:", data);


const sortOrder = ref('Ascending')
const sortBy = () => {
	sortOrder.value === 'Ascending' ? sortOrder.value = 'Descending' : sortOrder.value = 'Ascending'
}
</script>

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