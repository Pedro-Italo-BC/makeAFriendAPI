import { FastifyReply } from 'fastify'
import { FastifyRequest } from 'fastify/types/request'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    animal: z.string().toLowerCase(),
    animalPort: z.string().toLowerCase(),
    birthDate: z.string().regex(/^[0-9]{2}[-][0-9]{2}[-][0-9]{4}$/),
    city: z.string().toLowerCase(),
    description: z.string().toLowerCase().optional(),
    name: z.string().toLowerCase(),
    orgId: z.string().uuid(),
  })

  const { animal, animalPort, birthDate, city, name, orgId, description } =
    registerPetBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()
    await registerPetUseCase.execute({
      animal,
      animalPort,
      birthDate,
      city,
      description: description ?? null,
      name,
      orgId,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: 'Invalid Crendentials.' })
    }
  }
}
