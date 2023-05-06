import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeFetchFilteredPetsUseCase } from '@/use-cases/factories/make-fetch-filtered-pets'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    name: z.string().toLowerCase().optional(),
    animal_port: z.string().toLowerCase().optional(),
    animal: z.string().toLowerCase().optional(),
    birth_date: z.string().optional(),
    description: z.string().toLowerCase().optional(),
    city: z.string().toLowerCase(),
  })

  const { city, animal, animal_port, birth_date, description, name } =
    searchPetsQuerySchema.parse(request.query)

  try {
    const fetchFilteredPetsUseCase = makeFetchFilteredPetsUseCase()

    const { pets } = await fetchFilteredPetsUseCase.execute({
      city,
      animal,
      animal_port,
      birth_date,
      description,
      name,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: 'Invalid Crendentials.' })
    }
  }
}
