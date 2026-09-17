<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const toast = useToast()

const searchQuery = ref(String(route.query.q || ''))
const roleFilter = ref(String(route.query.role || ''))
const currentPage = ref(1)

const isEditModalOpen = ref(false)
const isResetPassModalOpen = ref(false)
const isInspectModalOpen = ref(false)

const selectedUser = ref<any>(null)
const inspectUserData = ref<any>(null)
const loadingInspect = ref(false)
const loadingAction = ref(false)

const editForm = reactive({
  name: '',
  email: '',
  username: '',
  role: 'USER',
  emailVerified: true,
})

const customPassword = ref('')
const generatedPasswordResult = ref('')

const url = computed(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (roleFilter.value) params.set('role', roleFilter.value)
  params.set('page', String(currentPage.value))
  return `/api/admin/users?${params.toString()}`
})

const { data: usersData, refresh, pending } = await useFetch<any>(() => url.value)

function openEditModal(user: any) {
  selectedUser.value = user
  editForm.name = user.name || ''
  editForm.email = user.email || ''
  editForm.username = user.username || ''
  editForm.role = user.role || 'USER'
  editForm.emailVerified = Boolean(user.emailVerified)
  isEditModalOpen.value = true
}

async function handleSaveUser() {
  if (!selectedUser.value) return
  loadingAction.value = true
  try {
    const updated = await $fetch(`/api/admin/users/${selectedUser.value.id}`, {
      method: 'PUT',
      body: {
        name: editForm.name,
        email: editForm.email,
        username: editForm.username,
        role: editForm.role,
        emailVerified: editForm.emailVerified,
      },
    })
    toast.add({ title: 'User account updated successfully', color: 'success' })
    isEditModalOpen.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function verifyEmail(user: any) {
  loadingAction.value = true
  try {
    await $fetch(`/api/admin/users/${user.id}/verify-email`, { method: 'POST' })
    toast.add({ title: `Email verified for ${user.email}`, color: 'success' })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Verification failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

function openResetPassModal(user: any) {
  selectedUser.value = user
  customPassword.value = ''
  generatedPasswordResult.value = ''
  isResetPassModalOpen.value = true
}

async function handleResetPassword() {
  if (!selectedUser.value) return
  loadingAction.value = true
  try {
    const res = await $fetch<any>(`/api/admin/users/${selectedUser.value.id}/reset-password`, {
      method: 'POST',
      body: { newPassword: customPassword.value.trim() },
    })
    generatedPasswordResult.value = res.temporaryPassword
    toast.add({ title: 'Password updated successfully', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Password reset failed', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingAction.value = false
  }
}

async function openInspectModal(user: any) {
  selectedUser.value = user
  inspectUserData.value = null
  isInspectModalOpen.value = true
  loadingInspect.value = true
  try {
    inspectUserData.value = await $fetch(`/api/admin/users/${user.id}`)
  } catch (err: any) {
    toast.add({ title: 'Could not load details', description: err.data?.statusMessage || err.message, color: 'error' })
  } finally {
    loadingInspect.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color--card-border)]">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-[var(--color--heading)]">
          User Accounts & Support
        </h1>
        <p class="text-sm opacity-80 mt-1">
          Resolve account issues: fix email typos, verify customer addresses, assign roles, and reset credentials.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          variant="outline"
          color="neutral"
          icon="i-heroicons-arrow-path"
          size="sm"
          :loading="pending"
          @click="refresh()"
        >
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="p-4 rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] flex flex-col md:flex-row items-center gap-3">
      <div class="w-full md:flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search by name, email, username, or ID..."
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        />
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <select
          v-model="roleFilter"
          class="p-2 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
        >
          <option value="">All Roles</option>
          <option value="USER">Regular User</option>
          <option value="SERVICE_OWNER">Service Owner</option>
          <option value="ADMIN">Admin</option>
          <option value="CONTENT_CREATOR_MANAGER">Creator Manager</option>
        </select>

        <UButton
          v-if="searchQuery || roleFilter"
          variant="ghost"
          color="neutral"
          size="sm"
          @click="searchQuery = ''; roleFilter = ''"
        >
          Clear
        </UButton>
      </div>
    </div>

    <!-- Users Table -->
    <div v-if="!usersData?.users?.length" class="p-12 text-center rounded-xl border-2 border-dashed border-[var(--color--card-border)] bg-[var(--color-card-bg)]">
      <Icon name="heroicons:user-group" class="w-12 h-12 opacity-30 mx-auto mb-2" />
      <p class="font-semibold text-base">No users found</p>
      <p class="text-sm opacity-70 mt-1">Try refining your search query.</p>
    </div>

    <div v-else class="rounded-xl border border-[var(--color--card-border)] bg-[var(--color-card-bg)] overflow-x-auto shadow-sm">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-[var(--color--card-border)] bg-[var(--color--bg)]/60 text-xs font-semibold text-[var(--color--heading)] uppercase tracking-wider">
            <th class="p-3.5">User</th>
            <th class="p-3.5">Role</th>
            <th class="p-3.5">Email Status</th>
            <th class="p-3.5">Entities</th>
            <th class="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color--card-border)]">
          <tr v-for="u in usersData.users" :key="u.id" class="hover:bg-[var(--color--bg)]/40 transition-colors">
            <!-- User -->
            <td class="p-3.5">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[var(--clr--primary)]/15 text-[var(--clr--primary)] flex items-center justify-center font-bold text-xs uppercase">
                  {{ (u.name || u.email || 'U')[0] }}
                </div>
                <div>
                  <p class="font-semibold text-[var(--color--heading)]">{{ u.name || 'No Name' }}</p>
                  <p class="text-xs opacity-75 font-mono">{{ u.email || 'No email' }}</p>
                  <p v-if="u.username" class="text-[11px] opacity-60">@{{ u.username }}</p>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td class="p-3.5">
              <UBadge
                :color="u.role === 'ADMIN' ? 'error' : u.role === 'SERVICE_OWNER' ? 'primary' : 'neutral'"
                size="sm"
              >
                {{ u.role }}
              </UBadge>
            </td>

            <!-- Email Status -->
            <td class="p-3.5">
              <div class="flex items-center gap-1.5">
                <Icon
                  :name="u.emailVerified ? 'heroicons:check-circle' : 'heroicons:x-circle'"
                  class="w-4 h-4"
                  :class="u.emailVerified ? 'text-emerald-500' : 'text-amber-500'"
                />
                <span class="text-xs" :class="u.emailVerified ? 'text-emerald-600 font-medium' : 'text-amber-600'">
                  {{ u.emailVerified ? 'Verified' : 'Unverified' }}
                </span>
              </div>
            </td>

            <!-- Entity counts -->
            <td class="p-3.5 text-xs opacity-75 whitespace-nowrap">
              <span>{{ u._count.owned_services }} listings</span> ·
              <span>{{ u._count.vouchers }} vouchers</span> ·
              <span>{{ u._count.payments }} orders</span>
            </td>

            <!-- Actions -->
            <td class="p-3.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1.5">
                <!-- 1-click verify if unverified -->
                <UButton
                  v-if="!u.emailVerified"
                  size="xs"
                  color="warning"
                  variant="subtle"
                  icon="i-heroicons-check"
                  title="Mark email as verified"
                  @click="verifyEmail(u)"
                >
                  Verify
                </UButton>

                <!-- Inspect entities -->
                <UButton
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-eye"
                  title="View user activity and owned items"
                  @click="openInspectModal(u)"
                />

                <!-- Edit user details -->
                <UButton
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-heroicons-pencil-square"
                  title="Edit user details / role"
                  @click="openEditModal(u)"
                >
                  Edit
                </UButton>

                <!-- Reset password -->
                <UButton
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-key"
                  title="Set or reset password"
                  @click="openResetPassModal(u)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Modal -->
    <UModal v-model:open="isEditModalOpen" title="Edit Customer Account">
      <template #body>
        <div v-if="selectedUser" class="space-y-4">
          <UFormField label="Full Name">
            <UInput v-model="editForm.name" placeholder="John Doe" class="w-full" />
          </UFormField>

          <UFormField label="Email Address" required>
            <UInput v-model="editForm.email" type="email" placeholder="customer@example.com" class="w-full" />
          </UFormField>

          <UFormField label="Username">
            <UInput v-model="editForm.username" placeholder="john_doe" class="w-full" />
          </UFormField>

          <UFormField label="Account Role" required>
            <select
              v-model="editForm.role"
              class="w-full p-2.5 text-sm rounded-lg border border-[var(--color--card-border)] bg-[var(--color--bg)] text-[var(--color--text)]"
            >
              <option value="USER">USER (Regular Shopper)</option>
              <option value="SERVICE_OWNER">SERVICE_OWNER (Can manage listings & deals)</option>
              <option value="CONTENT_CREATOR_MANAGER">CONTENT_CREATOR_MANAGER</option>
              <option value="ADMIN">ADMIN (Global platform manager)</option>
            </select>
          </UFormField>

          <div class="flex items-center gap-2 pt-2">
            <input id="verifyCheckbox" v-model="editForm.emailVerified" type="checkbox" class="rounded" />
            <label for="verifyCheckbox" class="text-sm font-medium cursor-pointer">
              Mark email as verified
            </label>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isEditModalOpen = false">Cancel</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleSaveUser">Save Account</UButton>
        </div>
      </template>
    </UModal>

    <!-- Reset Password Modal -->
    <UModal v-model:open="isResetPassModalOpen" title="Reset Customer Password">
      <template #body>
        <div v-if="selectedUser" class="space-y-4">
          <p class="text-sm opacity-80">
            Set a new password for <span class="font-semibold">{{ selectedUser.email || selectedUser.name }}</span>.
            Leave blank to auto-generate a secure temporary password.
          </p>

          <UFormField label="New Password (optional)">
            <UInput
              v-model="customPassword"
              type="text"
              placeholder="Leave blank for auto-generated password"
              class="w-full font-mono"
            />
          </UFormField>

          <div v-if="generatedPasswordResult" class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
            <p class="text-xs font-semibold uppercase">Password Set Successfully:</p>
            <p class="font-mono font-bold text-base mt-1 select-all">{{ generatedPasswordResult }}</p>
            <p class="text-xs opacity-75 mt-1">Share this with the customer so they can log in.</p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isResetPassModalOpen = false">Close</UButton>
          <UButton color="primary" :loading="loadingAction" @click="handleResetPassword">Set New Password</UButton>
        </div>
      </template>
    </UModal>

    <!-- Inspect User Modal -->
    <UModal v-model:open="isInspectModalOpen" title="Customer Overview & Activity" scrollable>
      <template #body>
        <div v-if="loadingInspect" class="p-8 text-center opacity-60">
          Loading customer history...
        </div>
        <div v-else-if="inspectUserData" class="space-y-6">
          <div class="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[var(--color--bg)] border border-[var(--color--card-border)] text-sm">
            <div>
              <p class="text-xs opacity-70">User ID</p>
              <p class="font-mono text-xs font-medium">{{ inspectUserData.id }}</p>
            </div>
            <div>
              <p class="text-xs opacity-70">Email & Status</p>
              <p class="font-medium">{{ inspectUserData.email }} ({{ inspectUserData.emailVerified ? 'Verified' : 'Unverified' }})</p>
            </div>
          </div>

          <!-- Owned Services -->
          <div>
            <h3 class="font-bold text-sm mb-2 text-[var(--color--heading)]">
              Owned Services ({{ inspectUserData.owned_services?.length || 0 }})
            </h3>
            <div v-if="!inspectUserData.owned_services?.length" class="text-xs opacity-60">No services listed.</div>
            <div v-else class="space-y-1.5">
              <div v-for="s in inspectUserData.owned_services" :key="s.id" class="p-2 rounded border border-[var(--color--card-border)] text-xs flex justify-between items-center">
                <span class="font-semibold">{{ s.name }}</span>
                <UBadge size="xs" :color="s.featured ? 'warning' : 'neutral'">{{ s.featured ? 'Featured' : 'Standard' }}</UBadge>
              </div>
            </div>
          </div>

          <!-- Vouchers Purchased -->
          <div>
            <h3 class="font-bold text-sm mb-2 text-[var(--color--heading)]">
              Purchased Vouchers ({{ inspectUserData.vouchers?.length || 0 }})
            </h3>
            <div v-if="!inspectUserData.vouchers?.length" class="text-xs opacity-60">No vouchers purchased.</div>
            <div v-else class="space-y-1.5">
              <div v-for="v in inspectUserData.vouchers" :key="v.id" class="p-2 rounded border border-[var(--color--card-border)] text-xs flex justify-between items-center">
                <div>
                  <span class="font-mono font-bold">{{ v.code }}</span>
                  <span class="opacity-75 ml-2">{{ v.deal?.title }}</span>
                </div>
                <UBadge size="xs" :color="v.status === 'paid' ? 'success' : v.status === 'redeemed' ? 'neutral' : 'warning'">{{ v.status }}</UBadge>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
