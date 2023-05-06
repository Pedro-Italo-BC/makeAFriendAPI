import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgInfoUseCase } from '../get-org-info'

export function makeGetOrgInfoUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getOrgInfoUseCase = new GetOrgInfoUseCase(orgsRepository)

  return getOrgInfoUseCase
}
