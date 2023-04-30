import { Pet, Prisma } from '@prisma/client'

export interface FilteredPetsProps {
  name?: string
  animal_port?: string
  animal?: string
  birth_date?: string
  description?: string
  city: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findManyFilteredPets(data: FilteredPetsProps): Promise<Pet[]>
}
