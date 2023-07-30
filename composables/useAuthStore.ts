import { acceptHMRUpdate } from 'pinia'

/**
 *  * Simulate a login
 */
function apiLogin(a: string, p: string) {
  if (a === 'ed' && p === 'ed')
    return Promise.resolve({ isAdmin: true })
  if (p === 'ed')
    return Promise.resolve({ isAdmin: false })
  return Promise.reject(new Error('invalid credentials'))
}
// async function adminInitiateAuth({
//   clientId,
//   userPoolId,
//   username,
//   password,
// }) {
//   const client = createClientForDefaultRegion(CognitoIdentityProviderClient)

//   const command = new AdminInitiateAuthCommand({
//     ClientId: clientId,
//     UserPoolId: userPoolId,
//     AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
//     AuthParameters: { USERNAME: username, PASSWORD: password },
//   })

//   return client.send(command)
// }

export const useUserStore = defineStore('auth', () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.isAdmin || false
  const isAuth = user.isAuth || false
  async function login(username: string, password: string) {
    const result = await apiLogin(username, password)
    localStorage.setItem('user', JSON.stringify(result))
    return result
  }
  async function logout() {
    localStorage.removeItem('user')
  }
  return {
    isAdmin,
    isAuth,
    login,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
