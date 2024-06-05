<!-- eslint-disable vue/no-unused-refs -->
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { useMediaQuery } from '@vueuse/core'

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false,
  },
})
const session = ref(null)
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
const isHidden = ref(true)
const isMobile = useMediaQuery('(max-width: 550px)')
// const favCount = computed(() => useFavoritesStore().favoritesCount)
function closeModal() {
  isHidden.value = true
}
function isFixed() {
  return props.fixed
    ? 'sticky  top-0 left-0 z-40 transition-transform -translate-x-full sm:translate-x-0'
    : ''
}

function openModal() {
  isHidden.value = false
}
</script>

<template>
  <header class="flex justify-between p-4 h-max relative bgDark" :class="isFixed()">
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
          <ClientOnly>
            <UButton
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              color="red"
              aria-label="Theme"
              @click="isDark = !isDark"
            >
              color mode
            </UButton>
            <template #fallback>
              <div>
                <p>poo</p>
              </div>
            </template>
          </ClientOnly>
        </li>
        <li>
          <UButton v-if="!session" to="#" external color="orange">
            Sign in
          </UButton>
          <UButton v-else to="#" external color="orange">
            Sign out
          </UButton>
        </li>
      </ul>
      <i v-if="isMobile" class="i-blue">
        <Icon
          v-if="isHidden"
          name="material-symbols:menu"
          class="i-green"
          @click="openModal"
        />
        <Icon v-else name="material-symbols:close" @click="closeModal" />
      </i>
    </nav>
  </header>
</template>

<style scoped>
.bgDark {
  background-color: var(--color--bg);
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
