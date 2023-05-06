import { Pet, Prisma } from '@prisma/client'

export interface FilteredPetsProps {
  name?: string
  animal_port?: string
  animal?: string
  birth_date?: string
  description?: string
  city: string
}

export interface UpdatePetsProps {
  name?: string
  animal_port?: string
  animal?: string
  birth_date?: string
  description?: string
  city?: string
  adopted_at?: Date
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyFilteredPets(data: FilteredPetsProps): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  updateById(id: string, data: UpdatePetsProps): Promise<Pet | null>
}
