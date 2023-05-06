import { Prisma } from '@prisma/client'
import {
  FilteredPetsProps,
  PetsRepository,
  UpdatePetsProps,
} from '../pets-repository'
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

  async updateById(id: string, data: UpdatePetsProps) {
    const pet = await prisma.pet.update({ data, where: { id } })

    return pet
  }
}
