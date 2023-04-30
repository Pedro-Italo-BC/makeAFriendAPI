import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { GetPetInfoUseCase } from './get-pet-info'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetInfoUseCase

describe('Get Pet Info Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetInfoUseCase(petsRepository)
  })

  it('should be able to get pet info', async () => {
    const createdPet = await petsRepository.create({
      animal: 'Cachorro',
      animal_port: 'small',
      birth_date: '30/04/2007',
      city: 'São Paulo',
      description: 'Um doguinho bem legal',
      name: 'Snoopy',
      org_id: randomUUID(),
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
