import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface FetchFilteredPetsUseCaseRequest {
  name?: string
  animal_port?: string
  animal?: string
  birth_date?: string
  description?: string
  city: string
}
interface FetchFilteredPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchFilteredPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: FetchFilteredPetsUseCaseRequest,
  ): Promise<FetchFilteredPetsUseCaseResponse> {
    if (!data.city) {
      throw new InvalidCredentialsError()
    }

    const pets = await this.petsRepository.findManyFilteredPets(data)

    return { pets }
  }
}
