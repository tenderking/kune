import { describe, expect, it } from 'vitest'
import { listServices } from './dynamodb'

// export const servicesTableName = process.env.SERVICES_TABLE_NAME
// test listServices
describe('listServices', () => {
  it('should return a list of services', async () => {
    const result = await listServices()
    expect(result).toBeDefined()
  })
})
