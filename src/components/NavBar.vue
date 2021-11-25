<template>

   <header>
    <router-link 
      class="logo" 
      @click="isActive = false" 
      to="/"> Kune 
    </router-link>
    <nav>
      <!-- Left-aligned links -->
      <li>
        <router-link @click="isActive = false" to="/sign-in"
          >sign in</router-link
        >
      </li>
      <li><a  @click="toggleClass()" v-if="isActive===false" >menu</a>  <fa  v-else icon="times" @click="toggleClass()"   /></li>
    </nav>
  </header>
   <!-- Drop-down menu -->
  <div class="menu-container" :class="{ 'menu-container-active': isActive }">
  
    <div class="bar">
      <router-link 
        @click="isActive = false" 
        to="/services"
        >Browse Services
      </router-link>
    </div>
    <div class="bar">
      <router-link @click="isActive = false" to="#">About</router-link>
    </div>
    <div class="bar">
      <router-link @click="isActive = false" to="#">Contact us</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "NavBar",
  setup() {
    
    const isActive = ref(false);
    const toggleClass = () => {
      isActive.value = !isActive.value;
    };
    return { isActive, toggleClass };
  },
  }
</script>

<style>

</style>