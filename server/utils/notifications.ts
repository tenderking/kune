import { sendAppEmail } from './mailer'

export async function notifyUser(input: {
  userId: string
  email?: string | null
  type: string
  title: string
  body: string
  link?: string
  emailSubject?: string
}) {
  await prisma.notification.create({
    data: {
      user_id: input.userId,
      type: input.type,
      title: input.title,
      body: input.body,
      link: input.link || '',
    },
  })

  if (input.email) {
    await sendAppEmail(
      input.email,
      input.emailSubject || input.title,
      `<p>${input.title}</p><p>${input.body.replace(/\n/g, '<br>')}</p>${input.link ? `<p><a href="${input.link}">Open in Kune</a></p>` : ''}`,
    )
  }
}
