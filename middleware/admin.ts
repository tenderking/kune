export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  if (!user.value) {
    return navigateTo('/login')
  }
  if (user.value.role !== 'ADMIN') {
    return navigateTo('/profile')
  }
})
