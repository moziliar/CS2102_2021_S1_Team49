import { mockPets } from '../models/mockPets'

export const CreatePetHandler = (req, res) => {
  res.json(mockPets[0]);
}

export const UpdatePetHandler = (req, res) => {
  res.json(mockPets[0]);
}

export const DeletePetHandler = (req, res) => {
  res.json(mockPets[0]);
}
