import { Pet, PetProfile, Category } from '../../protos/pet_pb';

export const mockCategories = [
  {
    name: 'cat',
    parent_category: '',
  }
]

export const mockCategoryMsgs = mockCategories.map(c => {
  let cat = new Category();
  cat.setName(c.name);
  cat.setParentCategory(c.parent_category);

  return cat;
})

export const mockPets = [
  {
    pet_id: 1,
    owner_id: 1,
    profile: {
      picture_url: '',
      name: 'kitty',
      special_reqs: [
        'must walk'
      ],
      gender: PetProfile.Gender.FEMALE,
      description: 'likes to play a lot',
      date_of_birth: '02.07.2018'
    },
    category: mockCategories[0],
  }
]

export const fromPetObject = (p: PetObject) => {
  let pet = new Pet();
  pet.setPetId(p.pet_id);
  pet.setOwnerId(p.owner_id);

  let profile = new PetProfile();
  profile.setPictureUrl(p.profile.picture_url);
  profile.setName(p.profile.name);
  p.profile.special_reqs.forEach((req: string) => profile.addSpecialReqs(req))
  profile.setGender(p.profile.gender);
  profile.setDescription(p.profile.description);
  profile.setDateOfBirth(p.profile.date_of_birth);
  pet.setProfile(profile);

  let cat = new Category();
  cat.setName(p.category.name);
  cat.setParentCategory(p.category.parent_category);
  pet.setCategory(cat);

  return pet;
};

export const mockPetMsgs = mockPets.map(fromPetObject);

export interface PetObject {
  pet_id: number;
  owner_id: number;
  profile: {
    picture_url: string;
    name: string;
    special_reqs: Array<string>;
    gender: number;
    description: string;
    date_of_birth: string;
  };
  category: CategoryObject;
}

export interface CategoryObject {
  name: string;
  parent_category: string;
}
