<template>

 <NavBar />


  <router-view  />
  

</template>
<script>
import NavBar from "./components/NavBar.vue"

import { ref } from "vue";
export default {
  components:{NavBar} ,
  setup() {
    const isActive = ref(false);
    const toggleClass = () => {
      isActive.value = !isActive.value;
      
    };
    return { isActive, toggleClass };
  },

};
</script>
<style lang="scss">
@import "./styles/main";
</style>
