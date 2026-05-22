<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <NuxtLink to="/">
          <span class="logo__text">Kune</span>
        </NuxtLink>
      </div>
      <nav class="footer-nav">
        <ul>
          <li>
            <NuxtLink to="/about" class="footer-link">
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="footer-link">
              Contact Us
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="footer-copyright">
        <p>&copy; {{ new Date().getFullYear() }} Kune. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-card-bg);
  border-top: 1px solid var(--color--card-border, transparent);
  padding: 2.5rem 1.5rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.logo__text {
  font-size: var(--step-0);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--clr--primary);
}

.footer-nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: var(--color--text);
  opacity: 0.8;
  font-size: var(--step--1);
  transition: color var(--transition-fast), opacity var(--transition-fast);
}

.footer-link:hover {
  color: var(--clr--primary);
  opacity: 1;
}

.footer-copyright {
  font-size: var(--step--2);
  color: var(--color--text);
  opacity: 0.6;
}

@media (min-width: 600px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
