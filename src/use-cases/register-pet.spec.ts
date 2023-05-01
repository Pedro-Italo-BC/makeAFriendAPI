import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const orgRepo = new InMemoryOrgsRepository()

    const { id: orgId } = await orgRepo.create({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password_hash: 'password',
      name: 'johndoe2',
      phone: '40028922',
    })

    const { pet } = await sut.execute({
      animal: 'Cachorro',
      animalPort: 'Small',
      birthDate: '30/04/2007',
      city: 'São Paulo',
      description: 'Um doguinho bem legal',
      name: 'Snoopy',
      orgId,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
