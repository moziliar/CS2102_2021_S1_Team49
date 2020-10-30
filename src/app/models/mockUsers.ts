import { User, Status, CreditCard } from './users';
import { mockPets } from './mockPets';

export const mockUsers: Array<User> = [
  {
    email: 'test',
    name: 'Paul Peterson',
    pic_url: '',
    phone: 12345678,
    status: Status.BOTH,
    pets_owned: [
      mockPets[0],
    ],
    credit_card: [{
      cc_number: 5555444433332222,
      expiry_date: '01/02/2021',
      holder_name: 'Paul'
    }],
    is_part_time: false,
    leave_or_avail: [
      {
        start_date: '05/10/2020',
        end_date: '05/12/2020'
      }
    ],
    categories: [
      {
        category: mockPets[0].category,
        rate: 5000
      }
    ]
  }
]
