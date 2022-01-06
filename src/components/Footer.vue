<template>
    <footer>
    <div class="footer-logo">
       <router-link 
      class="logo" 
      @click="isActive = false" 
      to="/"> Kune 
    </router-link>
    </div>
    <nav >
      <ul class="bar">
        <li>   <router-link @click="isActive = false" to="/about">About</router-link></li>
        <li>   <router-link @click="isActive = false" to=#> Contact Us</router-link></li>
      </ul>
    </nav>
    <div class="footer-copyright">
      <p>copyright 2021</p>
    </div>

  </footer>
</template>

<script>
export default {
name: "Footer",

}
</script>

<style>

</style>