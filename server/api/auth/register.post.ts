import { Auth } from 'aws-amplify'

export default eventHandler(async (event) => {
  const { email, password, username } = await readBody(event)
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    })
    // eslint-disable-next-line no-console
    console.log(user)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error signing up:', error)
  }
  return {
    message: 'Successfully registered!',
  }
})
