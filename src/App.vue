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
          >Sign in</router-link
        >
      </li>
      <li><a  href="#" @click="toggleClass()">Menu <fa :class="{'icon-chevron':isActive}" icon="chevron-down" /></a>
    </li>
    </nav>
  </header>
   <!-- Drop-down menu -->
   <transition name="slide-fade"> 

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
   </transition>
  <router-view class="container" />
  <footer>
    <p>here is a footer</p>
  </footer>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const isActive = ref(false);
    const toggleClass = () => {
      isActive.value = !isActive.value;
      style
    };
    return { isActive, toggleClass };
  },

};
</script>
<style lang="scss">
@import "./styles/main";
</style>
