import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(petsRepository)

  return registerPetUseCase
}
