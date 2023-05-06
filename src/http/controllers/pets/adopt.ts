import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeAdoptPetUseCase } from '@/use-cases/factories/make-adopt-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AdoptPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetBodySchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetBodySchema.parse(request.body)

  try {
    const adoptPetUseCase = makeAdoptPetUseCase()

    const { pet } = await adoptPetUseCase.execute({ petId })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource Not Found.' })
    }
  }
}
