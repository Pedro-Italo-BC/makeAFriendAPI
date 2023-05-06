import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AdoptPetUseCaseRequest {
  petId: string
}

interface AdoptPetUseCaseResponse {
  pet: Pet
}

export class AdoptPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: AdoptPetUseCaseRequest): Promise<AdoptPetUseCaseResponse> {
    const pet = await this.petsRepository.updateById(petId, {
      adopted_at: new Date(),
    })

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
