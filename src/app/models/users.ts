import { Pet, Category } from './pets';

export interface User {
  email: string;
  name: string;
  picture_url: string;
  phone: number;
  status: number;
  pets_owned: Array<Pet>;
  credit_card: CreditCard;
  is_part_time: boolean;
  leave_or_avail: Array<Leave>;
  categories: Array<CategoryRate>;
}

export enum Status {
  PET_OWNER,
  CARE_TAKER,
  BOTH,
  PCS_ADMIN,
}

export interface CreditCard {
  card_number: number;
  expiry_date: string;
  holder_name: string;
}

export interface Leave {
  start_date: string;
  end_date: string;
}

export interface CategoryRate {
  category: Category;
  rate: number;
}

