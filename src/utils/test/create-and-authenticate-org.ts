import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const password = 'imthebetter'
  const password_hash = await hash(password, 6)

  await prisma.org.create({
    data: {
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password_hash,
      name: 'johndoe',
      phone: '40028922',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@something.com',
    password,
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
