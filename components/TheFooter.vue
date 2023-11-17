<script setup lang="ts"></script>

<template>
  <footer>
    <u-container class="container">
      <div class="footer-logo">
        <router-link class="logo" to="/">
          Kune
        </router-link>
      </div>
      <nav>
        <ul class="bar">
          <li>
            <router-link to="/about">
              About
            </router-link>
          </li>
          <li>
            <router-link to="/contact">
              Contact Us
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="footer-copyright">
        <p>© copyright 2022</p>
      </div>
    </u-container>
  </footer>
</template>

<style scoped>
footer {

  background-color: var(--color--secondary);
  padding: 3em 1em;

  grid-row-start: 3;
  grid-row-end: 4;
  width: 100%;
  margin-top: 4em;
}

footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: auto;
}

nav ul {
  display: flex;
  gap: 1rem;
}
</style>
