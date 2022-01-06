<template>
  <header>
    <router-link class="logo" @click="isActive = false" to="/">
      Kune
    </router-link>
    <nav>
      <!-- Left-aligned links -->
      <ul class="nav-small-screen" >
        <li>
          <router-link @click="isActive = false" to="/services"
            >Browse Services
          </router-link>
        </li>

        <li>
          <router-link @click="isActive = false" to="/about">About</router-link>
        </li>
        <li>
          <router-link @click="isActive = false" to="#">Contact us</router-link>
        </li>
        <li>
          <router-link @click="isActive = false" to="/sign-in"
            >Sign in</router-link
          >
        </li>
       
      </ul>
          <a class="bars-menu" @click="toggleClass()" v-if="isActive === false"
            ><fa icon="bars"
          /></a>
          <fa class="bars-menu"  v-else icon="times" @click="toggleClass()" />
    </nav>
  </header>
  <!-- Drop-down menu -->
  <transition name="fade">

  <div class="menu-container" :class="{ 'menu-container-active': isActive }">
    <div class="bar">
      <router-link @click="isActive = false" to="/sign-in">Sign in</router-link>
    </div>
    <div class="bar">
      <router-link @click="isActive = false" to="/services"
        >Browse Services
      </router-link>
    </div>
    <div class="bar">
      <router-link @click="isActive = false" to="/about">About</router-link>
    </div>
    <div class="bar">
      <router-link @click="isActive = false" to="#">Contact us</router-link>
    </div>
  </div>
  </transition>
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
};
</script>

<style></style>
