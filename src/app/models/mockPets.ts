import { Pet, Category } from './pets';

export const mockCategories: Array<Category> = [
  {
    name: 'cat',
    parent_category: '',
  }
]

export const mockPets: Array<Pet> = [
  {
    pet_id: 1,
    owner_id: 1,
    picture_url: '',
    name: 'kitty',
    special_requirements: 'must_walk',
    gender: "Female",
    description: 'likes to play a lot',
    date_of_birth: '02/07/2018',
    category: 'dog',
  }
]
