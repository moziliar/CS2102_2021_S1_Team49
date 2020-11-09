import { Transaction, TransferMethod } from './txns';
import { mockUsers } from './mockUsers';
import { mockPets } from './mockPets';

export const mockTransactions: Array<Transaction> = [
  {
    pet_owner: 'test',
    pet: 'Doggy',
    care_taker: 'Peter',
    location: 'Singapore',
    date_begin: '2020-06-06',
    date_end: '2021-07-06',
    total_price: 7000,
    transfer_method: 'delivery',
    is_selected: true,
    is_active: false,
    payment_method: 'cash',
    cc_number: null,
    rating: 3,
    review: 'Good'
  },
  {
    pet_owner: 'Peter',
    pet: 'Doggy',
    care_taker: 'test',
    location: 'Singapore',
    date_begin: '2020-06-06',
    date_end: '2021-07-06',
    total_price: 7000,
    transfer_method: 'delivery',
    is_selected: true,
    is_active: false,
    payment_method: 'cash',
    cc_number: null,
    rating: null,
    review: ''
  },
  {
    pet_owner: 'test',
    pet: 'Doggy',
    care_taker: 'Peter',
    location: 'Singapore',
    date_begin: '2020-06-06',
    date_end: '2020-07-06',
    total_price: 7000,
    transfer_method: 'delivery',
    is_selected: true,
    is_active: true,
    payment_method: 'cash',
    cc_number: null,
    rating: null,
    review: ''
  },
  {
    pet_owner: 'test',
    pet: 'Doggy',
    care_taker: 'dd',
    location: 'Singapore',
    date_begin: '2020-06-06',
    date_end: '2020-07-06',
    total_price: 7000,
    transfer_method: 'delivery',
    is_selected: false,
    is_active: true,
    payment_method: 'cash',
    cc_number: null,
    rating: 0,
    review: ''
  },
]
