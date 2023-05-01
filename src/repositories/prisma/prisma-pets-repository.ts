import { Prisma } from '@prisma/client'
import { FilteredPetsProps, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyFilteredPets(data: FilteredPetsProps) {
    const pets = await prisma.pet.findMany({
      where: data,
    })

    return pets
  }
}
