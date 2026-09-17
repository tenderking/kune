<script setup lang="ts">
const colorMode = useColorMode()
const user = useUser()
const route = useRoute()
const isSidebarOpen = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const navLinks = [
  {
    label: 'Overview',
    icon: 'i-heroicons-chart-pie',
    to: '/admin',
    exact: true,
  },
  {
    label: 'Voucher Rescue',
    icon: 'i-heroicons-qr-code',
    to: '/admin/vouchers',
  },
  {
    label: 'User Accounts',
    icon: 'i-heroicons-users',
    to: '/admin/users',
  },
  {
    label: 'Services Catalog',
    icon: 'i-heroicons-building-office-2',
    to: '/admin/services',
  },
  {
    label: 'Deals & Coupons',
    icon: 'i-heroicons-ticket',
    to: '/admin/deals',
  },
  {
    label: 'Payments & Revenue',
    icon: 'i-heroicons-credit-card',
    to: '/admin/payments',
  },
  {
    label: 'Categories & Tags',
    icon: 'i-heroicons-tag',
    to: '/admin/categories',
  },
]

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  user.value = null
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[var(--color--bg)] text-[var(--color--text)]">
    <!-- Top Admin Header -->
    <header class="sticky top-0 z-40 w-full border-b border-[var(--color--card-border)] bg-[var(--color-card-bg)]/90 backdrop-blur-md">
      <div class="flex h-16 items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <button
            class="sm:hidden p-2 rounded-md hover:bg-[var(--color--card-border)]/50 cursor-pointer"
            aria-label="Toggle menu"
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <Icon :name="isSidebarOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
          </button>
          
          <NuxtLink to="/admin" class="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span class="text-[var(--clr--primary)]">Kune</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded bg-[var(--clr--primary)]/15 text-[var(--clr--primary)] border border-[var(--clr--primary)]/30">
              Admin
            </span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <UButton
            to="/"
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-heroicons-arrow-left-on-rectangle"
            class="hidden sm:inline-flex"
          >
            Exit to Site
          </UButton>

          <UButton
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Toggle theme"
            @click="isDark = !isDark"
          />

          <UPopover mode="click">
            <UButton color="primary" variant="soft" size="sm" icon="i-heroicons-shield-check">
              {{ user?.name || user?.username || 'Admin' }}
            </UButton>
            <template #content>
              <div class="flex flex-col gap-2 p-3 min-w-[200px] bg-[var(--color-card-bg)] rounded-lg shadow-lg border border-[var(--color--card-border)]">
                <div class="px-2 py-1 border-b border-[var(--color--card-border)] text-xs opacity-75 truncate">
                  {{ user?.email }}
                </div>
                <UButton to="/profile" variant="ghost" color="neutral" size="sm" class="justify-start">
                  My Profile
                </UButton>
                <UButton to="/" variant="ghost" color="neutral" size="sm" class="justify-start">
                  Main Site
                </UButton>
                <UButton variant="ghost" color="error" size="sm" class="justify-start" @click="logout">
                  Log out
                </UButton>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <aside
        class="fixed inset-y-0 left-0 top-16 z-30 w-64 border-r border-[var(--color--card-border)] bg-[var(--color-card-bg)] transition-transform duration-200 ease-in-out sm:translate-x-0"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
          <nav class="space-y-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === link.to || (link.to !== '/admin' && route.path.startsWith(link.to))
                ? 'bg-[var(--clr--primary)] text-white shadow-sm font-semibold'
                : 'opacity-80 hover:opacity-100 hover:bg-[var(--color--bg)]'"
              @click="isSidebarOpen = false"
            >
              <Icon :name="link.icon.replace('i-', '').replace('-', ':')" class="w-5 h-5" />
              <span>{{ link.label }}</span>
            </NuxtLink>
          </nav>

          <div class="pt-4 border-t border-[var(--color--card-border)]">
            <div class="p-3 rounded-lg bg-[var(--color--bg)] border border-[var(--color--card-border)] text-xs space-y-1">
              <p class="font-semibold text-[var(--color--heading)]">Customer Support Mode</p>
              <p class="opacity-75">Changes take effect immediately across the platform.</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 sm:ml-64 p-4 sm:p-8 min-h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color--card-border);
  border-radius: var(--radius-md, 0.75rem);
}
</style>
