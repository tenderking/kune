import { hash } from '@node-rs/argon2';
import { Prisma, PrismaClient } from '@prisma/client';
import isValidEmail, { generateSessionToken, createSession, setSessionTokenCookie } from '~/server/utils/auth';
import { generateRandomString } from '~/server/utils/utils';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  try {
    const formData = await readFormData(event);

    // Input Validation (with potential improvements)
    const name = formData.get('name');
    if (typeof name !== 'string' || name.length < 1 || name.length > 255) {
      throw createError({ message: 'Invalid name', statusCode: 400 });
    }

    const username = formData.get('username');
    if (
      typeof username !== 'string' ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      throw createError({ message: 'Invalid username', statusCode: 400 });
    }

    const password = formData.get('password');
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      throw createError({ message: 'Invalid password', statusCode: 400 });
    }
    // Consider adding more robust password strength checks here (e.g., using zxcvbn)

    const email = formData.get('email');
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      throw createError({ message: 'Invalid email', statusCode: 400 });
    }

    // Hash the password
    const passwordHash = await hash(password, {
      memoryCost: 19456, // Consider increasing these values over time
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Generate user ID
    const userId = generateRandomString(15);

    // Create the user using Prisma
    const user = await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        password_hash: passwordHash,
        name,
      },
    });

    // Send verification email (ideally, refactor this into a separate function)
    try {
      let requestOrigin = getHeader(event, 'Origin')
      if (!requestOrigin) {
        const host = getHeader(event, 'Host')
        requestOrigin = host ? (host.startsWith('localhost') ? `http://${host}` : `https://${host}`) : 'http://localhost:3000'
      }

      const emailVerificationResponse = await $fetch('/api/auth/email-verification', {
        method: 'POST',
        body: { email: user.email, userId: user.id, username: user.username },
        headers: new Headers({
          'Content-Type': 'application/json',
          'Origin': requestOrigin,
        }),
      });
      console.log("response email verification", emailVerificationResponse)
      // Check for success status
      if (!emailVerificationResponse ) {
        throw createError({
          statusCode: 500,
          message: 'Failed to send verification email',
        });
      }

      console.log('Verification email sent successfully.');
    } catch (error) {
        console.error("Error sending verification email:", error);
      // Handle the error (log, potentially update user status, etc.)
        throw createError({
            statusCode: 500, // Or a more specific error code
            message: 'Failed to send verification email',
        });
    }

    // Create a session (consider doing this only after email verification in a more robust flow)
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(event, token, session.expiresAt);

    return { message: 'User created successfully' };
  } catch (error) {
    // Granular error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw createError({
          message: 'Username or email already used', // More specific message
          statusCode: 400,
        });
      } else {
        console.error("Database Error:", error); // Log the specific Prisma error
        throw createError({
          message: 'Database error',
          statusCode: 500,
        });
      }
    } else if (error instanceof Error && error.message === 'Failed to send verification email') {
        throw createError({
            statusCode: 500,
            message: 'Failed to send verification email',
        });
    } else {
      console.error("Signup Error:", error);
      throw createError({
        message: 'An unknown error occurred',
        statusCode: 500,
      });
    }
  }
});
