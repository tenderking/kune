import nodemailer from 'nodemailer'

function isDevMail(config: ReturnType<typeof useRuntimeConfig>, smtpHost: string) {
  const env = process.env
  return env.NODE_ENV !== 'production' || config.public?.nodeEnv === 'development' || smtpHost === 'localhost' || smtpHost === '127.0.0.1'
}

export async function sendAppEmail(to: string, subject: string, html: string) {
  if (!to)
    return { sent: false, reason: 'missing_email' }

  const config = useRuntimeConfig()
  const smtpHost = String(config.nodemailer?.host || '')
  const smtpPort = config.nodemailer?.port
  const smtpUser = config.nodemailer?.user || config.nodemailer?.from
  const smtpPass = config.nodemailer?.password
  const fromEmail = config.nodemailer?.from || smtpUser || 'noreply@kune.co.zw'

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined,
    } as any)

    await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    })
    return { sent: true }
  }
  catch (error: any) {
    if (isDevMail(config, smtpHost)) {
      console.warn(`[DEV EMAIL] ${subject} → ${to}`)
      console.warn(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
      return { sent: false, reason: 'dev_logged' }
    }
    console.error('Failed to send app email:', error)
    return { sent: false, reason: error.message }
  }
}
