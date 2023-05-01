import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      cep: data.cep,
      password_hash: data.password_hash,
      address: data.address,
      role: data.role ?? 'ADMIN',
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((orgItem) => orgItem.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((orgItem) => orgItem.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
