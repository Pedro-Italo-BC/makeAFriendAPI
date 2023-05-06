import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { registerOrg } from './register'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { orgInfo } from './org-info'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/register/org', registerOrg)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticated Routes */

  app.get('/orgs/info', { onRequest: [verifyJwt] }, orgInfo)
}
