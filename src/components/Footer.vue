<template>
    <footer>
    <div class="footer-logo">
       <router-link 
      class="logo" 
      @click="isActive = false" 
      to="/"> Kune 
    </router-link>
    </div>
    <div class="footer-links">
      <ul>
        <li>About</li>
        <li>Contanct Us</li>
      </ul>
    </div>
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