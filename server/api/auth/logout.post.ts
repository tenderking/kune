import { Auth } from 'aws-amplify'

export default eventHandler(async () => {
  try {
    await Auth.signOut()
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error signing out: ', error)
  }
})
