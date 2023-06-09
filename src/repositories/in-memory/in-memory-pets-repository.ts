import { randomUUID } from 'crypto'
import {
  FilteredPetsProps,
  PetsRepository,
  UpdatePetsProps,
} from '../pets-repository'
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

  async findManyFilteredPets(data: FilteredPetsProps) {
    const pets = this.items.filter((pet) => {
      const petEntries = Object.entries(pet)
      const dataEntries = Object.entries(data)
      return dataEntries.every(([dataKey, dataValue]) => {
        return petEntries.some(
          ([petKey, petValue]) =>
            petKey.toLowerCase() === dataKey.toLowerCase() &&
            String(petValue).toLowerCase() === String(dataValue).toLowerCase(),
        )
      })
    })

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((petItem) => petItem.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async updateById(id: string, data: UpdatePetsProps) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index < 0) {
      return null
    }

    const oldPet = this.items[index]

    const pet = { ...oldPet, ...data }

    this.items[index] = pet

    return pet
  }
}
