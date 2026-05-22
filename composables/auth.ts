export interface User {
  id: string
  username: string | null
  email: string | null
  name: string | null
}

export function useUser() {
  const user = useState<User | null>('user', () => null)
  return user
}

export function useAuthenticatedUser() {
  const user = useUser()
  return computed(() => {
    const userValue = unref(user)
    if (!userValue) {
      throw createError('useAuthenticatedUser() can only be used in protected pages')
    }
    return userValue
  })
}
