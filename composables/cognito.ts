import { Amplify, Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: process.env.COGNITO_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    clientId: process.env.COGNITO_APP_CLIENT_ID,
  },
})

// You can get the current config object
const currentConfig = Auth.configure()

interface SignUpParameters {
  username: string
  password: string
}

interface SignInParameters {
  username: string
  password: string
}

export async function signUp({ username, password }: SignUpParameters) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,

      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    })

    // eslint-disable-next-line no-console
    console.log(user)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error signing up:', error)
  }
}

export async function signIn({ username, password }: SignInParameters) {
  try {
    const user = await Auth.signIn(username, password)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error signing in', error)
  }
}

export async function signOut() {
  try {
    await Auth.signOut()
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error signing out: ', error)
  }
}
