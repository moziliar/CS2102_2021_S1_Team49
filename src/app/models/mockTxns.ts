import { Transaction, TransactionInfo, TransferMethod, Review } from './txns';
import { mockUsers } from './mockUsers';
import { mockPets } from './mockPets';

export const mockTransactions: Array<Transaction> = [
  {
    info: {
      owner: mockUsers[0],
      care_taker: mockUsers[0],
      pet: mockPets[0],
      location: 'central',
      start_date: '05/12/2020',
      end_date: '07/12/2020',
      total_price: 7000,
      transfer_method: TransferMethod.OWNER_DELIVER,
      use_card: true,
      credit_card: mockUsers[0].credit_card,
    },
    review: {
      description: 'good care taker!',
      rating: 5
    }
  },
  {
    info: {
      owner: mockUsers[0],
      care_taker: mockUsers[0],
      pet: mockPets[0],
      location: 'central',
      start_date: '05/12/2020',
      end_date: '07/12/2020',
      total_price: 7000,
      transfer_method: TransferMethod.OWNER_DELIVER,
      use_card: true,
      credit_card: mockUsers[0].credit_card,
    },
    review: {
      description: '',
      rating: 0
    }
  },
  {
    info: {
      owner: mockUsers[0],
      care_taker: mockUsers[0],
      pet: mockPets[0],
      location: 'central',
      start_date: '05/12/2020',
      end_date: '07/12/2021',
      total_price: 7000,
      transfer_method: TransferMethod.OWNER_DELIVER,
      use_card: true,
      credit_card: mockUsers[0].credit_card,
    },
    review: {
      description: '',
      rating: 0
    }
  }
]
