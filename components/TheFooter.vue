<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <NuxtLink to="/" class="logo__link">
          <span class="logo__text">Kune</span>
        </NuxtLink>
        <p class="footer-tagline">
          Curated directory of Zimbabwean digital services, businesses, and online platforms.
        </p>
      </div>

      <div class="footer-links-grid">
        <div class="footer-col">
          <h4 class="footer-heading">Directory</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/deals" class="footer-link">Deals & coupons</NuxtLink></li>
            <li><NuxtLink to="/services" class="footer-link">All Services</NuxtLink></li>
            <li><NuxtLink to="/services?category=Banking" class="footer-link">Banking & Finance</NuxtLink></li>
            <li><NuxtLink to="/services?category=Ecommerce" class="footer-link">Ecommerce & Retail</NuxtLink></li>
            <li><NuxtLink to="/services?category=Software" class="footer-link">Software & Tech</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Product</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/profile/deals" class="footer-link">Create a deal</NuxtLink></li>
            <li><NuxtLink to="/services/post" class="footer-link">Submit Service</NuxtLink></li>
            <li><NuxtLink to="/about" class="footer-link">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact Support</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} Kune. All rights reserved.</p>
        <span class="footer-tag">Empowering Zimbabwean Digital Economy 🇿🇼</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-card-bg);
  border-top: 1px solid var(--color--card-border, transparent);
  margin-top: 5rem;
}

.footer-container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .footer-container {
    padding: 3rem 1.5rem 2rem;
  }
}

@media (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.footer-brand {
  max-width: 320px;
}

.logo__link {
  text-decoration: none;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.logo__text {
  font-size: var(--step-1);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--clr--primary);
}

.footer-tagline {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.75;
  line-height: 1.6;
}

.footer-links-grid {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.footer-heading {
  font-size: var(--step--1);
  font-weight: 700;
  color: var(--color--heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-link {
  font-size: var(--step--1);
  color: var(--color--text);
  opacity: 0.75;
  text-decoration: none;
  transition: opacity var(--transition-fast), color var(--transition-fast);
}

.footer-link:hover {
  opacity: 1;
  color: var(--clr--primary);
}

.footer-bottom {
  border-top: 1px solid var(--color--card-border, rgba(0, 0, 0, 0.05));
  padding: 1.25rem 1.5rem;
}

.footer-bottom-inner {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--step--2);
  color: var(--color--text);
  opacity: 0.65;
}

@media (min-width: 640px) {
  .footer-bottom-inner {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
