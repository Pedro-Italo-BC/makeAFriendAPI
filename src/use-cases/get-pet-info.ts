import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetPetInfoUseCaseRequest {
  petId: string
}

interface GetPetInfoUseCaseResponse {
  pet: {
    id: string
    name: string
    animal_port: string
    animal: string
    birth_date: string
    description: string | null
    city: string
    created_at: Date
    adopted_at: Date | null
    org_id: string
    org_phone: string
  }
}

export class GetPetInfoUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { pet: { ...pet, org_phone: org.phone } }
  }
}
