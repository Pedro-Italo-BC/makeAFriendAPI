import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Org Info (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org info', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    console.log(token)

    const orgInfo = await request(app.server)
      .get('/orgs/info')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(orgInfo.statusCode).toEqual(200)

    expect(orgInfo.body.org).toEqual(
      expect.objectContaining({
        email: 'johndoe@something.com',
      }),
    )
  })
})
