<template>
  <header>
    <router-link class="logo" @click="isActive = false" to="/">
      Kune
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
      <li><a href="#" @click="toggleClass()">menu</a></li>
    </nav>
  </header>
   <!-- Drop-down menu -->
  <div class="menu-container" :class="{ 'menu-container-active': isActive }">
    <div class="bar">
      <router-link 
        @click="isActive = false" 
        to="/sites"
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
  <router-view />
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const isActive = ref(false);
    const toggleClass = () => {
      isActive.value = !isActive.value;
    };
    return { isActive, toggleClass };
  },
  //   data() {
  //     return{
  // isActive: true,
  //     }
  //   },
  //   methods: {
  //     toggleClass: function () {
  //       this.isActive = !this.isActive;
  //     },
  //   },
};
</script>
<style lang="scss">
@import "./styles/main";
</style>
