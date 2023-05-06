import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a new pet', async () => {
    const { id: orgId } = await orgsRepository.create({
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

  it('should not be able to register with wrong org id', async () => {
    await expect(() => {
      return sut.execute({
        animal: 'Cachorro',
        animalPort: 'Small',
        birthDate: '30/04/2007',
        city: 'São Paulo',
        description: 'Um doguinho bem legal',
        name: 'Snoopy',
        orgId: 'dont-exist',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
