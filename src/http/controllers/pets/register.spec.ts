import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register-Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const orgInfo = await request(app.server)
      .get('/orgs/info')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        animal: 'Cachorro',
        animalPort: 'Small',
        birthDate: '30-04-2007',
        city: 'São Paulo',
        description: 'Muito show',
        name: 'Snoopy',
        orgId: orgInfo.body.org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
