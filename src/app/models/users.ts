import { Pet, Category } from './pets';

export interface CareTaker {
  email: string;
  name: string;
  pic_url: string;
  phone: number;
  rating: number;
  rate: Array<DailyRate>;
  reviews?: Array<Review>;
  leave_or_avail?: Array<Leave>;
  is_part_time?: boolean;
}

export interface TopCareTaker {
  email: string;
  name: string;
  is_part_time: boolean;
  avg_rating: number;
}

export interface Review {
  owner_name: string;
  review: string;
  rating: number;
}

export interface User {
  is_admin: boolean;
  email: string;
  name: string;
  pic_url: string;
  phone: number;
  status: number;
  pets_owned: Array<Pet>;
  credit_card: Array<CreditCard>;
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
  cc_number: number;
  expiry_date: string;
  holder_name: string;
}

export interface Leave {
  start_date: string;
  end_date: string;
}

export interface CategoryRate {
  name: string;
  parent: string;
  price: number;
}

export interface DailyRate {
  caretaker: string;
  category: string;
  price: number;
}

