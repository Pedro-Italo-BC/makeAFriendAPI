import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

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
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    animal,
    animalPort,
    birthDate,
    city,
    description,
    name,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const doesOrgIdExist = await this.orgsRepository.findById(orgId)

    if (!doesOrgIdExist) {
      throw new InvalidCredentialsError()
    }

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
