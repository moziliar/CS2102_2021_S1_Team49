import { User, CreditCard } from './users';
import { Pet } from './pets';

export interface Transaction {
  info: TransactionInfo;
  review: Review;
}

export interface TransactionInfo {
  owner: User;
  care_taker: User;
  pet: Pet;
  location: string;
  start_date: string;
  end_date: string
  total_price: number
  transfer_method: TransferMethod;
  use_card: boolean;
  credit_card: CreditCard;
  is_selected: boolean;
}

export enum TransferMethod {
  PCS_ON_SITE,
  OWNER_DELIVER,
  TAKER_PICKUP,
}

export interface Review {
  description: string;
  rating: number;
}
