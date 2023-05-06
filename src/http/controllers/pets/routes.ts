import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyOrgRole } from '@/http/middlewares/verify-org-role'
import { FastifyInstance } from 'fastify'
import { registerPet } from './register'
import { searchPets } from './search'
import { GetPet } from './pet'
import { AdoptPet } from './adopt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/register/pet',
    {
      onRequest: [verifyOrgRole('ADMIN')],
    },
    registerPet,
  )

  app.patch(
    '/adopt',
    {
      onRequest: [verifyOrgRole('ADMIN')],
    },
    AdoptPet,
  )

  app.get('/search', searchPets)

  app.get('/search/:petId', GetPet)
}
