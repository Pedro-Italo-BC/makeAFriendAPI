import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrgInfoUseCaseRequest {
  orgId: string
}

interface GetOrgInfoUseCaseResponse {
  org: Org
}

export class GetOrgInfoUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgInfoUseCaseRequest): Promise<GetOrgInfoUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
