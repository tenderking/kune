<template>
  <div id="page-nav">
    <div id="services-category-btn">
      <h1 id="services-category-btn-txt">Category</h1>
      <fa icon="chevron-down" />
    </div>
    <div id="sort-services">
      <h2 id="sort-services-heading">sort</h2>
      <h3 id="sort-services-type">Ascending</h3>
    </div>
  </div>
  <div id="page-wrap">
    <ServicesGrid :services="services" />
  </div>
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

