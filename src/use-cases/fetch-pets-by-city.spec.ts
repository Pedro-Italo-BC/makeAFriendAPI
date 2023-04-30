import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Register Gym Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by a city', async () => {
    await petsRepository.create({
      animal: 'Cachorro',
      animal_port: 'small',
      birth_date: '30/04/2007',
      city: 'São Paulo',
      description: 'Um doguinho bem legal',
      name: 'Snoopy',
      org_id: randomUUID(),
    })

    await petsRepository.create({
      animal: 'Gato',
      animal_port: 'small',
      birth_date: '30/04/2007',
      city: 'São Paulo',
      description: 'Um doguinho bem legal',
      name: 'Snoopy',
      org_id: randomUUID(),
    })

    const petsByCity = await sut.execute({ city: 'São Paulo' })

    expect(petsByCity.pets).toEqual([
      expect.objectContaining({
        animal: 'Cachorro',
        animal_port: 'small',
        birth_date: '30/04/2007',
        city: 'São Paulo',
        description: 'Um doguinho bem legal',
        name: 'Snoopy',
      }),
      expect.objectContaining({
        animal: 'Gato',
        animal_port: 'small',
        birth_date: '30/04/2007',
        city: 'São Paulo',
        description: 'Um doguinho bem legal',
        name: 'Snoopy',
      }),
    ])
  })

  it('should not be able to fetch pets with empty city propriety', async () => {
    await expect(() => sut.execute({ city: '' })).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })
})
