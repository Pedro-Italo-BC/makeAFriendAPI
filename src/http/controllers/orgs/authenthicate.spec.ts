import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/register/org').send({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password: 'imthebetter',
      name: 'johndoe',
      phone: '40028922',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@something.com',
      password: 'imthebetter',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
