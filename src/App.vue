<template>
  <div id="nav">
    <router-link class="logo" to="/"> Kune </router-link>
    <div class="nav-left">
      <div class="search-input">Search</div>
      <router-link to="/about">
        <button>Sign in</button>
      </router-link>
      <div class="menu-div">
        <div class="menu-text">Menu</div>
        <div class="menu-text" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
html,
body {
  margin: auto;
  padding: 0.5rem 0;
  background: $secondaryLight;
  max-width: 1400px;
}
.logo{
  font-size: 1.5em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
}

#nav {
  min-height: 2.75rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}
.nav-left {
  display: flex;
  gap: 1em;
}

#nav a {
  font-weight: bold;
  color: $primary;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: $primary;
}
button {
  background: $secondaryLight;
  border: 2px solid $secondaryDark;
  box-sizing: border-box;
  border-radius: 5px;
  color: $dark;
  padding: 0.5em 2em;
}
</style>
