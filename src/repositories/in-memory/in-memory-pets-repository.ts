import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  create(data: Prisma.PetCreateInput) {
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
      org_id: data.org,
    }

    this.items.push(pet)

    return pet
  }
}
