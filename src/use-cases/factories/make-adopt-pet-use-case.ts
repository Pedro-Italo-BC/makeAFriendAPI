import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { AdoptPetUseCase } from '../adopt-pet'

export function makeAdoptPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const adoptPetUseCase = new AdoptPetUseCase(petsRepository)

  return adoptPetUseCase
}
