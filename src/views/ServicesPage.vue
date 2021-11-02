<template>
  <div id="page-wrap">
    <ServicesGrid :services="services" />
  </div>
</template>

<script>
// import axios from "axios";
 import {services} from "../fake-data"
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
  // async created() {
  //   const result = await axios.get("/api/Services");
  //   const Services = result.data;
  //   this.Services = Services;
  // }
</script>
