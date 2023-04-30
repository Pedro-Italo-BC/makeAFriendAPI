import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      animal_port: data.animal_port,
      animal: data.animal,
      birth_date: data.birth_date,
      city: data.city,
      created_at: new Date(),
      description: data.description ?? null,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyPetsByCity(city: string) {
    const pets = this.items.filter(
      (pet) => pet.city.toLowerCase() === city.toLowerCase(),
    )

    return pets
  }
}
