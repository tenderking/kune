import EmailProvider from '@auth/core/providers/email'
// import Google from "@auth/core/providers/google"
import type { AuthConfig/* , Theme */ } from '@auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from '@auth/core/providers/credentials'
import type { Adapter } from '@auth/core/adapters'
// import * as nodemailer from "nodemailer"
import bcrypt from 'bcrypt'
import { NuxtAuthHandler } from '#auth'
// import { createTransport } from "nodemailer"

const runtimeConfig = useRuntimeConfig()
const adapter: Adapter = PrismaAdapter(prisma) as unknown as Adapter

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  // ignore the PrismaAdapter import error for now
  // adapter: adapter,
  secret: runtimeConfig.authJs.secret,
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        let user = null
        // Check credentials
        user = await getUserFromDb(credentials.username as string)
        if (
          user
          && bcrypt.compareSync(credentials.password as string, user.password)
        ) {
          // Password is correct, return the user object
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }
        else {
          // User not found or password is incorrect
          throw new Error('Invalid credentials')
        }
      },
    }),
    EmailProvider({
      server: {
        host: runtimeConfig.email.smtpHost,
        port: runtimeConfig.email.smtpPort,
        auth: {
          user: runtimeConfig.email.smtpUser,
          pass: runtimeConfig.email.smtpPassword,
        },
      },
      from: runtimeConfig.email.emailFrom,
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      // eslint-disable-next-line no-console
      console.log('jwt callback', { token, user, session })

      return token
    },
  },
  adapter,
}

export default NuxtAuthHandler(authOptions, runtimeConfig)

async function getUserFromDb(username: string): Promise<any> {
  const user = await prisma.user
    .findUnique({
      where: {
        email: username,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    })
    .catch((error) => {
      console.error(`Error finding user ${username} in the database:`, error)
    })

  return user
}
// function html(params: { url: string, host: string, theme: Theme }) {
//   const { url, host, theme } = params

//   const escapedHost = host.replace(/\./g, '&#8203;.')

//   const brandColor = theme.brandColor || '#346df1'
//   const color = {
//     background: '#f9f9f9',
//     text: '#444',
//     mainBackground: '#fff',
//     buttonBackground: brandColor,
//     buttonBorder: brandColor,
//     buttonText: theme.buttonText || '#fff',
//   }

//   return `
// <body style="background: ${color.background};">
//   <table width="100%" border="0" cellspacing="20" cellpadding="0"
//     style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
//     <tr>
//       <td align="center"
//         style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//         Sign in to <strong>${escapedHost}</strong>
//       </td>
//     </tr>
//     <tr>
//       <td align="center" style="padding: 20px 0;">
//         <table border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
//                 target="_blank"
//                 style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
//                 in</a></td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//     <tr>
//       <td align="center"
//         style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//         If you did not request this email you can safely ignore it.
//       </td>
//     </tr>
//   </table>
// </body>
// `
// }

// // Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
// function text({ url, host }: { url: string, host: string }) {
//   return `Sign in to ${host}\n${url}\n\n`
// }
