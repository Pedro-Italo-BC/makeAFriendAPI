import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetInfoUseCase } from './get-pet-info'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetInfoUseCase

describe('Get Pet Info Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetInfoUseCase(petsRepository, orgsRepository)
  })

  it('should be able to get pet info', async () => {
    const createdOrg = await orgsRepository.create({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password_hash: 'imthebetter',
      name: 'johndoe',
      phone: '40028922',
    })

    const orgId = createdOrg.id

    const createdPet = await petsRepository.create({
      animal: 'Cachorro',
      animal_port: 'small',
      birth_date: '30/04/2007',
      city: 'São Paulo',
      description: 'Um doguinho bem legal',
      name: 'Snoopy',
      org_id: orgId,
    })

    const petId = createdPet.id

    const { pet } = await sut.execute({ petId })

    expect(pet).toEqual(
      expect.objectContaining({
        animal: 'Cachorro',
        animal_port: 'small',
        birth_date: '30/04/2007',
        city: 'São Paulo',
        description: 'Um doguinho bem legal',
        name: 'Snoopy',
      }),
    )
  })

  it('should not be able to get pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
