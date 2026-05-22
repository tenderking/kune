<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { useMediaQuery } from '@vueuse/core'

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false,
  },
})

const user = useUser()
const colorMode = useColorMode()
const isMobile = useMediaQuery('(max-width: 550px)')
const isHidden = ref(true)
const isDashboard = useRoute().path === '/profile'

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

async function logout() {
  await $fetch('/api/auth/logout', {
    method: 'POST',
  })
  await navigateTo('/login')
  user.value = null
}

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
  <header class="navbar" :class="isFixed()">
    <NuxtLink class="logo" to="/" :class="isDashboard ? 'hidden-logo' : ''">
      <span class="logo__text">Kune</span>
    </NuxtLink>
    <nav>
      <ul v-on-click-outside="closeModal" :class="isHidden ? 'nav-hidden' : 'nav-show'">
        <li>
          <NuxtLink to="/services" class="nav-link" :class="{ active: $route.path.startsWith('/services') }" @click="closeModal">
            Browse Services
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="nav-link" :class="{ active: $route.path === '/about' }" @click="closeModal">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="nav-link" :class="{ active: $route.path === '/contact' }" @click="closeModal">
            Contact us
          </NuxtLink>
        </li>
        <li>
          <ClientOnly>
            <UButton
              :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
              color="primary"
              variant="ghost"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <UButton
                icon="i-heroicons-moon-20-solid"
                color="primary"
                variant="ghost"
              />
            </template>
          </ClientOnly>
        </li>
        <li>
          <UPopover v-if="user" mode="click">
            <UButton color="primary" icon="i-heroicons-user-circle-16-solid">
              {{ user?.name }}
            </UButton>
            <template #content>
              <div class="flex flex-row items-center gap-4 p-4">
                <UButton to="/profile" class="hover:underline">
                  Profile
                </UButton>
                <UButton class="bg-orange-500 hover:underline" @click="logout">
                  Logout
                </UButton>
              </div>
            </template>
          </UPopover>
          <UButton v-else to="/login" external color="primary">
            Sign in
          </UButton>
        </li>
      </ul>
      <button v-if="isMobile" class="menu-toggle" :aria-label="isHidden ? 'Open menu' : 'Close menu'" @click="isHidden ? openModal() : closeModal()">
        <Icon :name="isHidden ? 'material-symbols:menu' : 'material-symbols:close'" size="24" />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.5rem;
  background-color: var(--color--nav-bg, var(--color--bg));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color--card-border, transparent);
  transition: background-color 0.3s, border-color 0.3s;
}

.logo__text {
  font-size: var(--step-1);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--clr--primary);
}

.hidden-logo {
  visibility: hidden;
  pointer-events: none;
}

nav {
  display: flex;
  align-items: center;
}

ul {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
}

.nav-hidden {
  display: none;
}

.nav-show {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 1.5rem;
  gap: 0.75rem;
  background-color: var(--color--nav-bg, var(--color--bg));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color--card-border, transparent);
}

.nav-link {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: var(--step--1);
  color: var(--color--text);
  transition: color var(--transition-fast), background-color var(--transition-fast);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background-color: var(--clr--primary);
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform var(--transition-base);
  transform-origin: left;
}

.nav-link:hover {
  color: var(--clr--primary);
  background-color: var(--color--card-border, rgba(0,0,0,0.04));
}

.nav-link.active {
  color: var(--clr--primary);
  font-weight: 600;
}

.nav-link.active::after {
  transform: scaleX(1);
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color--text);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.menu-toggle:hover {
  background-color: var(--color--card-border, rgba(0,0,0,0.06));
}

.user-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}

@media (min-width: 550px) {
  .nav-hidden {
    display: flex;
  }

  .nav-show {
    display: flex;
    position: static;
    flex-direction: row;
    padding: 0;
    background: transparent;
    backdrop-filter: none;
    border: none;
  }
}
</style>
