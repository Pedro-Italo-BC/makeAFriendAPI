import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const password_hash = await hash('imthebetter', 6)

    await orgsRepository.create({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password_hash,
      name: 'johndoe',
      phone: '40028922',
    })

    const { org } = await sut.execute({
      email: 'johndoe@something.com',
      password: 'imthebetter',
    })

    expect(org).toEqual(
      expect.objectContaining({
        address: 'Rua sem nome',
        cep: '30021-000',
        email: 'johndoe@something.com',
        name: 'johndoe',
        phone: '40028922',
      }),
    )
  })

  it('should not be able to authenticate wrong email', async () => {
    await expect(() => {
      return sut.execute({ email: 'dont exist email', password: '123' })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate wrong password', async () => {
    const password_hash = await hash('imthebetter', 6)

    await orgsRepository.create({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password_hash,
      name: 'johndoe',
      phone: '40028922',
    })

    await expect(() => {
      return sut.execute({
        email: 'johndoe@something.com',
        password: 'wrongPassword',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
