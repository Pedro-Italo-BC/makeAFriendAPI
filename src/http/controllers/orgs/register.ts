import { OrgAredyExistsError } from '@/use-cases/errors/org-aredy-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    address: z.string(),
    cep: z.string(),
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    phone: z.string(),
  })

  const { address, cep, email, name, password, phone } =
    registerOrgBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      address,
      cep,
      email,
      name,
      password,
      phone,
    })
  } catch (err) {
    if (err instanceof OrgAredyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
  }

  return reply.status(201).send()
}
