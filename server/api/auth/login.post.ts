import { Auth } from 'aws-amplify'

export default eventHandler(async (event) => {
  const session = await useAuthSession(event)
  const { password, username } = await readBody(event)
  try {
    const user = await Auth.signIn(username, password)
    if (!user) {
      throw createError({
        message: 'Email not found! Please register.',
        statusCode: 401,
      })
    }
    if (!user.password) {
      throw createError({
        message: 'Incorrect password!',
        statusCode: 401,
      })
    }
    await session.update({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    return session
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error signing in', error)
  }
})
