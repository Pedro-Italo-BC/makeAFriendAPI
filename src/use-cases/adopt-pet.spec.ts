import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { AdoptPetUseCase } from './adopt-pet'
import { randomUUID } from 'crypto'

let petsRepository: InMemoryPetsRepository

let sut: AdoptPetUseCase

describe('Adopt Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new AdoptPetUseCase(petsRepository)
  })

  it('should be able to adopt a pet', async () => {
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
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to adopt a pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
