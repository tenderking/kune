<template>
  <main>
    <div id="page-nav">
      <div>
        <select id="services-category-btn" v-model="uniqueCategories.category" name="Category">
          <option value=""  v-on:click="userFilterKey = 'all'"  >Category</option>
          <option
            v-for="choice in uniqueCategories"
            :key="choice.id"
            @click="onCategoryClick"
            
            :value="choice.category"
          >
            {{ choice.category }}
          </option>
        </select>

        
      </div>

      <div id="sort-services">
        <h4 id="sort-services-heading">sort</h4>
        <h5 id="sort-services-type" @click="sortClick">Ascending</h5>
      </div>
    </div>

    <div id="page-wrap"   >
<p>{{uniqueCategories.category}}</p>
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
  methods: {
    onCategoryClick(evt){
      const clicked = evt.target
      console.log('you have clicked on',clicked.value)

    },
    
  },
 computed: {
    uniqueCategories() {
      return this.services.reduce((seed, current) => {
        return Object.assign(seed, {
          [current.category]: current
        });
      }, {});
    }
  }

};
</script>
