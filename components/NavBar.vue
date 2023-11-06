<!-- eslint-disable vue/no-unused-refs -->
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { useMediaQuery } from '@vueuse/core'

const isHidden = ref(true)
const isMobile = useMediaQuery('(max-width: 550px)')
const favCount = computed(() => useFavoritesStore().favoritesCount)
function closeModal() {
  isHidden.value = true
}

function openModal() {
  isHidden.value = false
}
</script>

<template>
  <header>
    <NuxtLink class="logo" to="/">
      <span> Kune </span>
    </NuxtLink>
    <nav>
      <!-- Left-aligned links -->

      <ul
        v-on-click-outside="closeModal"
        class="nav-small-screen"
        :class="isHidden ? 'hidden' : 'show'"
      >
        <li>
          <NuxtLink to="/services" @click="closeModal">
            Browse Services
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/about" @click="closeModal">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" @click="closeModal">
            Contact us
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/signin" class="cta__link" @click="closeModal">
            Sign in
          </NuxtLink>
        </li>
      </ul>
      <i v-if="isMobile" class="i-blue">
        <Icon v-if="isHidden" name="material-symbols:menu" class="i-green" @click="openModal" />
        <Icon v-else name="material-symbols:close" @click="closeModal" />
      </i>
      <p>{{ favCount }}</p>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  height: max-content;
  position: relative;
}

i {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hidden {
  display: none;
}

.show {
  display: flex;
}

ul {
  position: absolute;
  right: 1em;
  left: 1em;
  top: 100%;

  margin-inline: 1em;
  background-color: var(--color--bg);

  display: none;
  margin-inline: auto;
}

button {
  border: none;
  background-color: inherit;
  color: var(--color--text);
}

.show {
  display: flex;
  padding: 2em;
  border-radius: 1em;
  flex-direction: column;
}

nav ul {
  gap: 1rem;
}

@media (min-width: 550px) {
  ul {
    position: static;
    display: flex;
    background-color: var(--color--bg);
  }

  button {
    display: none;
  }

  .hidden {
    display: flex;
  }
}
</style>
