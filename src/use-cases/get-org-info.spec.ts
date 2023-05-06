import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetOrgInfoUseCase } from './get-org-info'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgInfoUseCase

describe('Get Org Info Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgInfoUseCase(orgsRepository)
  })

  it('should be able to get org info', async () => {
    const password_hash = await hash('imthebetter', 6)

    const createdOrg = await orgsRepository.create({
      address: 'Rua sem nome',
      cep: '30021-000',
      email: 'johndoe@something.com',
      password_hash,
      name: 'johndoe',
      phone: '40028922',
    })

    const { org } = await sut.execute({ orgId: createdOrg.id })

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
      return sut.execute({ orgId: 'not-valid' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
