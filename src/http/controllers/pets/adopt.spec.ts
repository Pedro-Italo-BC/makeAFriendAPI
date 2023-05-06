import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Adopt Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to adopt a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const orgInfo = await request(app.server)
      .get('/orgs/info')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const orgId = orgInfo.body.org.id

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        animal: 'Cachorro',
        animalPort: 'Small',
        birthDate: '30-04-2007',
        city: 'Curitiba',
        description: 'Muito show',
        name: 'Snoopy',
        orgId,
      })

    const listOfPets = await request(app.server)
      .get('/search?city=Curitiba')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const petId = listOfPets.body.pets[0].id

    const response = await request(app.server)
      .patch('/adopt')
      .set('Authorization', `Bearer ${token}`)
      .send({
        petId,
      })

    expect(response.statusCode).toEqual(200)

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: petId,
        adopted_at: expect.any(String),
      }),
    )
  })
})
