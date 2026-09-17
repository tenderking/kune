<script setup lang="ts">
useSeoMeta({
  title: 'About — Kune',
  description: 'Kune is a curated directory of Zimbabwean digital services. Discover, connect, and grow.',
})
</script>

<template>
  <div class="about">
    <!-- Hero -->
    <section class="about__hero">
      <p class="about__eyebrow">About Kune</p>
      <h1 class="about__title">
        Your gateway to<br>
        <span class="kune">Zimbabwean</span> digital services
      </h1>
      <p class="about__lead">
        In Zimbabwe's bustling digital landscape, Kune emerges as a beacon of discovery —
        a comprehensive platform connecting people to the digital solutions they need.
      </p>
    </section>

    <!-- Stats strip -->
    <div class="about__stats">
      <div class="stat">
        <span class="stat__num">100+</span>
        <span class="stat__label">Services listed</span>
      </div>
      <div class="stat-divider" />
      <div class="stat">
        <span class="stat__num">10+</span>
        <span class="stat__label">Categories</span>
      </div>
      <div class="stat-divider" />
      <div class="stat">
        <span class="stat__num">ZW</span>
        <span class="stat__label">Zimbabwe-focused</span>
      </div>
    </div>

    <!-- Sections -->
    <div class="about__sections">
      <section class="about__section">
        <span class="section__num">01</span>
        <div class="section__content">
          <h2>Addressing the need for visibility</h2>
          <p>
            Many Zimbabweans remain unaware of the vast array of digital services at their disposal.
            Kune bridges that gap — meticulously curating and vetting each service entry for relevance
            and functionality across e-commerce, finance, healthcare, and education.
          </p>
        </div>
      </section>

      <section class="about__section">
        <span class="section__num">02</span>
        <div class="section__content">
          <h2>Simplified access to essential information</h2>
          <p>
            Every listing comes with contact details, website links, and a concise overview.
            This user-centric approach streamlines the process of finding and connecting
            with the right service — fast.
          </p>
        </div>
      </section>

      <section class="about__section">
        <span class="section__num">03</span>
        <div class="section__content">
          <h2>Empowering collaborative features</h2>
          <p>
            Kune's vision goes beyond a static directory. Users will soon suggest new services,
            share experiences, and build personalised favourites — fostering a vibrant,
            ever-evolving community resource.
          </p>
        </div>
      </section>

      <section class="about__section">
        <span class="section__num">04</span>
        <div class="section__content">
          <h2>A catalyst for digital transformation</h2>
          <p>
            Kune embodies Zimbabwe's digital renaissance. By centralising discovery and access,
            it empowers Zimbabweans to embrace technology and unlock its transformative potential
            for everyday life and business.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem 0;
  max-width: 72ch;
}

/* Hero */
.about__hero {
  margin-bottom: 3rem;
}

.about__eyebrow {
  font-size: var(--step--2);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--clr--primary);
  margin-bottom: 1rem;
}

.about__title {
  font-size: var(--step-3);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  color: var(--color--heading);
}

.about__lead {
  font-size: var(--step-0);
  line-height: 1.7;
  opacity: 0.8;
  max-width: 58ch;
}

.kune {
  color: var(--clr--primary);
}

/* Stats */
.about__stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 2rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border, transparent);
  border-radius: var(--radius-lg, 1.25em);
  margin-bottom: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat__num {
  font-size: var(--step-2);
  font-weight: 800;
  color: var(--clr--primary);
  line-height: 1;
}

.stat__label {
  font-size: var(--step--2);
  opacity: 0.65;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background-color: var(--color--card-border, rgba(128,128,128,0.2));
}

/* Sections */
.about__sections {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.about__section {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1.5rem;
  padding: 2rem 0;
  border-top: 1px solid var(--color--card-border, rgba(128,128,128,0.15));
}

.about__section:last-child {
  border-bottom: 1px solid var(--color--card-border, rgba(128,128,128,0.15));
}

.section__num {
  font-size: var(--step--2);
  font-weight: 700;
  color: var(--clr--primary);
  opacity: 0.5;
  padding-top: 0.3rem;
  font-variant-numeric: tabular-nums;
}

.section__content h2 {
  font-size: var(--step-0);
  font-weight: 700;
  color: var(--color--heading);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.section__content p {
  line-height: 1.75;
  opacity: 0.8;
  max-width: 60ch;
}
</style>

