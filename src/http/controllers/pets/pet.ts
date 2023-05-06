import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-info'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetParamsSchema.parse(request.params)

  try {
    const getPetInfoUseCase = makeGetPetUseCase()

    const { pet } = await getPetInfoUseCase.execute({ petId })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource Not Found.' })
    }
  }
}
