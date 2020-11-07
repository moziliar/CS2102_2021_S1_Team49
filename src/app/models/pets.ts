export interface Pet {
  pet_id: number;
  owner_id: number;
  picture_url: string;
  name: string;
  special_requirements: string;
  gender: string;
  description: string;
  date_of_birth: string;
  category: string;
}

export interface Category {
  name: string;
  parent_category: string;
}
