import type { AuthConfig } from '@auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import EmailProvider from '@auth/core/providers/email'
import Credentials from '@auth/core/providers/credentials'
import type { Adapter } from '@auth/core/adapters'
import { NuxtAuthHandler } from '#auth'

const runtimeConfig = useRuntimeConfig()

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  debug: true,
  secret: runtimeConfig.authJs.secret,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      server: {
        host: runtimeConfig.nodemailer.host,
        port: runtimeConfig.nodemailer.port,
        auth: {
          user: runtimeConfig.nodemailer.user,
          pass: runtimeConfig.nodemailer.password,
        },
      },
      from: runtimeConfig.nodemailer.from,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const { email, password } = credentials
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(password as string)

        // logic to verify if the user exists
        user = await getUserFromDB(email as string)

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          const user = createUser(email as string, password as string)
          if (!user) {
            throw new Error('User not found.')
          }

          return user
        }

        if (pwHash !== user.password) {
          throw new Error('Password incorrect')
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }

      return token
    },
    async session({ session }) {
      return session
    },
  },
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
