import { User, Status, CreditCard, CareTaker, TopCareTaker } from './users';
import { mockPets } from './mockPets';

export const mockTopCareTakers: Array<TopCareTaker> = [
  {
    email: 'example@facebook.com',
    name: 'Paul Peterson',
    is_part_time: false,
    avg_rating: 4.5
  },
  {
    email: 'example@google.com',
    name: 'Amy Peterson',
    is_part_time: true,
    avg_rating: 4.2
  },
  {
    email: 'example@yahoo.com',
    name: 'Jack Han',
    is_part_time: false,
    avg_rating: 4.1
  }
]

export const mockTakers: Array<CareTaker> = [
  {
    email: 'example@google.com',
    name: 'Paul Peterson',
    pic_url: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
    phone: 12345678,
    rating: 3.9,
    is_part_time: true,
    rate: [
      {
        category: 'Dog',
        caretaker:'example@google.com',
        price: 30
      },
      {
        category: 'Dog',
        caretaker:'example@google.com',
        price: 70
      }
    ],
    leave_or_avail: [
      {
        start_date: '2020-11-13',
        end_date: '2020-11-25'
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
    is_part_time: false,
    rate: [
      {
        category: 'Dog',
        caretaker:'example@google.com',
        price: 30
      },
      {
        category: 'Dog',
        caretaker:'example@google.com',
        price: 70
      }
    ],
    leave_or_avail: [
      {
        start_date: '2020-11-13',
        end_date: '2020-11-25'
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
        name: mockPets[0].category,
        parent: 'Dog',
        price: 5000
      }
    ]
  }
]
