import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Gym Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      animal: 'Cachorro',
      animalPort: 'Small',
      birthDate: '30/04/2007',
      city: 'São Paulo',
      description: 'Um doguinho bem legal',
      name: 'Snoopy',
      orgId: randomUUID(),
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
