<template>
  <header>
    <router-link class="logo" to="/">Kune</router-link>
    <nav>
      <!-- Left-aligned links -->

      <li><router-link to="/sign-in">sign in</router-link></li>
      <li><a href="#"  @click="toggleClass()">menu</a></li>
    </nav>
  </header>
  <div
    class="menu-container"
    :class="{'menu-container-active': isActive}"
   
  >
    <div class="bar">hello</div>
    <div class="bar">i am</div>
    <div class="bar">the menu</div>
  </div>
  <router-view />
</template>
<script>
/* import MenuToggleCross from './components/MenuToggleCross.vue'
export default {
  components: {
    MenuToggleCross
  },
  // ...
} */
export default {
  data() {
    return{
isActive: true,
    }
  },
  methods: {
    toggleClass: function () {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style lang="scss">
@import "./styles/main";
</style>
