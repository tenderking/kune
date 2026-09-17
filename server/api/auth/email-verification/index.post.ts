export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { email, userId, username } = body

    const verificationLink = await createEmailVerificationLink(
      userId,
      email,
    )

    await sendVerificationEmail(username, email, verificationLink)

    return {
      ok: true,
    }
  }
  catch (error) {
    console.error('An error occurred in the main handler:', error)
    // You can customize the error response based on the error type if needed
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
