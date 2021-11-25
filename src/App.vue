<template>

 <NavBar />


  <router-view  />
  
  <footer>
    <div>
       <router-link 
      class="logo" 
      @click="isActive = false" 
      to="/"> Kune 
    </router-link>
    </div>
    <div>
      <ul>
        <li>About</li>
        <li>Contanct Us</li>
      </ul>
    </div>
    <div>
      <p>copyright 2021</p>
    </div>

  </footer>
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
