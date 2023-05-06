import { makeGetOrgInfoUseCase } from '@/use-cases/factories/make-get-org-info-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function orgInfo(request: FastifyRequest, reply: FastifyReply) {
  const getOrgInfo = makeGetOrgInfoUseCase()

  const { org } = await getOrgInfo.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
