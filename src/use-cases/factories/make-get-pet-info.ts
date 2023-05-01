import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { GetPetInfoUseCase } from '../get-pet-info'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const getPetInfoUseCase = new GetPetInfoUseCase(
    petsRepository,
    orgsRepository,
  )

  return getPetInfoUseCase
}
