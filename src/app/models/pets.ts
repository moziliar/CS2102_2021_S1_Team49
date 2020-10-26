export interface Pet {
  pet_id: number;
  owner_id: number;
  picture_url: string;
  name: string;
  special_reqs: Array<string>;
  gender: number;
  description: string;
  date_of_birth: string;
  category: Category;
}

export enum Gender {
  MALE,
  FEMALE,
}

export interface Category {
  name: string;
  parent_category: string;
}
