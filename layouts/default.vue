<script setup lang="ts">

</script>

<template>
  <NavBar class="main" />
  <main class="main">
    <slot />
  </main>
  <TheFooter />
</template>

<style scoped>
.main{
margin: 0 1em;
}

@media (min-width: 950px) {
  .main{

  margin: 0 15%;
}

}
</style>
```
