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
  <header class="flex justify-between p-4 h-max relative bgDark" :class="isFixed()">
    <NuxtLink class="logo" to="/" :class="isDashboard? 'hidden' : ''">
      <span> Kune </span>
    </NuxtLink>
    <nav>
      <!-- Left-aligned links -->
      <ul v-on-click-outside="closeModal" class="z-10 shadow-lg sm:shadow-none" :class="isHidden ? 'hidden' : 'show'">
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
          <UButton
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'" color="orange"
            @click="isDark = !isDark"
            class="outline outline-1 "
          />
        </li>
        <li>
          <UPopover v-if="user" mode="click">
           
            <UButton   class="outline outline-1" color="orange" icon="i-heroicons-user-circle-16-solid">
              {{ user?.name }}
            </UButton>
            <template #panel>
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
          <UButton v-else to="/login" external color="orange">
            Sign in
          </UButton>
        </li>
      </ul>
      <i v-if="isMobile" class="i-blue">
        <Icon v-if="isHidden" name="material-symbols:menu" class="i-green" @click="openModal" />
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

  .hidden {
    display: flex;
  }
}
</style>
