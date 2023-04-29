import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  animalPort: string
  animal: string
  birthDate: string
  description: string | null
  city: string
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    animal,
    animalPort,
    birthDate,
    city,
    description,
    name,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      animal,
      animal_port: animalPort,
      birth_date: birthDate,
      city,
      name,
      org_id: orgId,
      description,
    })

    return {
      pet,
    }
  }
}
