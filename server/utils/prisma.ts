import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['warn', 'error', 'query', 'info'],
})

export default prisma
