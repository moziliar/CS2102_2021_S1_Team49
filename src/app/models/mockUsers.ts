import { User, Status, CreditCard, CareTaker } from './users';
import { mockPets } from './mockPets';

export const mockTakers: Array<CareTaker> = [
  {
    email: 'example@google.com',
    name: 'Paul Peterson',
    pic_url: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
    phone: 12345678,
    rating: 3.9,
    rate: [
      {
        category: 'Dog',
        price: 30
      },
      {
        category: 'Cat',
        price: 70
      }
    ],
    reviews: [
      {
        owner_name: 'Paul Guy',
        rating: 3.8,
        review: 'Very Cool Guy!'
      },
      {
        owner_name: 'Varian Vir',
        rating: 3.8,
        review: 'Very a good and kind person'
      }
    ]
  },
  {
    email: 'example@google.com',
    name: 'Amy Reisha',
    pic_url: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
    phone: 12345678,
    rating: 3.9,
    rate: [
      {
        category: 'Dog',
        price: 30
      },
      {
        category: 'Cat',
        price: 70
      }
    ],
    reviews: [
      {
        owner_name: 'text',
        rating: 3.8,
        review: 'Very Cool Guy!'
      }
    ]
  }
]

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
    is_admin: false,
    leave_or_avail: [
      {
        start_date: '05/10/2020',
        end_date: '05/12/2020'
      }
    ],
    categories: [
      {
        category: mockPets[0].category,
        price: 5000
      }
    ]
  }
]
