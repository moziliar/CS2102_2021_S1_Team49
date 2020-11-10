export interface Transaction {
  pet_owner: string;
  pet_name: string;
  care_taker: string;
  location: string;
  date_begin: string;
  date_end: string;
  total_price: number;
  transfer_method: string;
  is_selected: boolean;
  is_active: boolean;
  cc_number: number | null
  rating: number | null
  review: string
}

export const TransferMethod = {
  PCS_ON_SITE: 'pcs',
  OWNER_DELIVER: 'deliver',
  TAKER_PICKUP: 'pickup',
}
