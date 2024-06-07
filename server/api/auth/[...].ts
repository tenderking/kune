import type { AuthConfig } from '@auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import EmailProvider from '@auth/core/providers/email'
import { NuxtAuthHandler } from '#auth'

const runtimeConfig = useRuntimeConfig()

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  debug: true,
  secret: runtimeConfig.authJs.secret,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
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
  ],
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
