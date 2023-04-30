import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
interface FetchPetsByCityUseCaseRequest {
  city: string
}
interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    if (!city) {
      throw new InvalidCredentialsError()
    }

    const pets = await this.petsRepository.findManyPetsByCity(city)

    return { pets }
  }
}
