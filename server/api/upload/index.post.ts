import fs from 'node:fs'
import path from 'node:path'
import { defineEventHandler, readMultipartFormData } from 'h3'
import { randomUUID } from 'uncrypto'
import { hash } from 'ohash'

const runtimeConfig = useRuntimeConfig()

// Load environment variables
export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  let newPath

  files?.forEach((file) => {
    // Generate a secure hash for the filename
    const uniqueId = randomUUID()
    const hashedFilename = hash(uniqueId)
    const ext = path.extname(file.filename || '')
    const safeFilename = `${hashedFilename}${ext}`

    // Construct the full path using the environment variable
    newPath = path.join(runtimeConfig.public.uploadsDir, safeFilename)

    // Write the file securely
    fs.writeFileSync(newPath, file.data)

    // Return the new path
    return newPath
  })

  return { path: newPath }
})
