import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAredyExistsError } from './errors/org-aredy-exists-error'
import { Org } from '@prisma/client'

interface RegisterOrgUseCaseRequest {
  name: string
  phone: string
  email: string
  cep: string
  password: string
  address: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    address,
    cep,
    email,
    name,
    password,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAredyExistsError()
    }

    const org = await this.orgsRepository.create({
      address,
      cep,
      email,
      name,
      phone,
      password_hash,
    })

    return { org }
  }
}
