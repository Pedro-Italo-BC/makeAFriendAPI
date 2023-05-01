import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAredyExistsError } from './errors/org-aredy-exists-error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password: 'imthebetter',
      name: 'johndoe',
      phone: '40028922',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with an email aredy registred', async () => {
    await sut.execute({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password: 'imthebetter',
      name: 'johndoe',
      phone: '40028922',
    })

    await expect(() =>
      sut.execute({
        address: 'Rua sem nome',
        cep: '30021-000',
        email: 'johndoe@something.com',
        password: 'password',
        name: 'johndoe2',
        phone: '40028922',
      }),
    ).rejects.toBeInstanceOf(OrgAredyExistsError)
  })

  it('should be able to hash the password upon registration', async () => {
    const { org } = await sut.execute({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password: 'imthebetter',
      name: 'johndoe',
      phone: '40028922',
    })

    const isPasswordCorrectlyHashed = await compare(
      'imthebetter',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })
})
