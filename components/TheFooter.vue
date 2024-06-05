<template>
  <footer class="p-10">
    <u-container class="flex justify-between align-center max-w-6xl">
      <div class="footer-logo">
        <NuxtLink class="logo" to="/">
          Kune
        </NuxtLink>
      </div>
      <nav>
        <ul class="bar">
          <li>
            <NuxtLink to="/about">
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact">
              Contact Us
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="footer-copyright">
        <p>© copyright {{ new Date().getFullYear() }}</p>
      </div>
    </u-container>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color--secondary);
}
</style>
