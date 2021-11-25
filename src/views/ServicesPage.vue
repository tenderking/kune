<template>
  <main>
    <div id="page-nav">
      <div>
        <select id="services-category-btn" v-model="services.category">
          <option default value="">Category</option>
          <option
            v-for="choice in services"
            :key="choice.id"
            @click="onCategoryClick(choice)"
            
            value="choice"
          >
            {{ choice.category }}
          </option>
        </select>

        <!-- <fa icon="chevron-down" /> -->
      </div>

      <div id="sort-services">
        <h2 id="sort-services-heading">sort</h2>
        <h3 id="sort-services-type" @click="sortClick">Ascending</h3>
      </div>
    </div>

    <div id="page-wrap"   >

            <ServicesGrid :services="services" />
          
    </div>
  </main>
</template>

<script>
import { services } from "../fake-data";
import ServicesGrid from "../components/ServicesGrid.vue";
export default {
  components: {
    ServicesGrid,
  },

 data() {
    return {
      services,
    };
  },
};
</script>
