import { User, UserProfile, CreditCard } from '../protos/user_pb';
import { Pet } from '../protos/pet_pb';
import { mockPets, PetObject, CategoryObject, fromPetObject } from './mockPets';

export const mockUsers: Array<UserObject> = [
  {
    userID: 1,
    email: 'example@google.com',
    profile: {
      name: 'Paul Peterson',
      picture_url: '',
      phone: 12345678
    },
    status: User.Status.BOTH,
    pets_owned: [
      mockPets[0],
    ],
    credit_card: {
      card_number: 5555444433332222,
      expiry_date: '01.02.2021',
      holder_name: 'Paul'
    },
    is_part_time: false,
    leave_or_avail: [
      {
        start_date: '10.05.2020',
        end_date: '12.05.2020'
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

export const fromUserObject = (u: UserObject): User => {
  let user = new User();
  user.setUserId(u.userID);
  user.setEmail(u.email);

  let profile = new UserProfile();
  profile.setPhone(u.profile.phone);
  profile.setPictureUrl(u.profile.picture_url);
  user.setProfile(profile);

  user.setStatus(u.status);
  u.pets_owned.forEach((pet: PetObject) => user.addPetsOwned(fromPetObject(pet)));

  return user
}

export const fromCreditCardObject = (c: CreditCardObject): CreditCard => {
  let creditCard = new CreditCard();
  creditCard.setCardNumber(c.card_number);
  creditCard.setExpiryDate(c.expiry_date);
  creditCard.setHolderName(c.holder_name);

  return creditCard;
}

export const mockUserMsgs = mockUsers.map(fromUserObject);

export interface UserObject {
  userID: number;
  email: string;
  profile: {
    name: string;
    picture_url: string;
    phone: number;
  },
  status: number;
  pets_owned: Array<PetObject>;
  credit_card: CreditCardObject;
  is_part_time: boolean;
  leave_or_avail: Array<LeaveObject>;
  categories: Array<CategoryRateObject>;
}

export interface CreditCardObject {
  card_number: number;
  expiry_date: string;
  holder_name: string;
}

export interface LeaveObject {
  start_date: string;
  end_date: string;
}

export interface CategoryRateObject {
  category: CategoryObject;
  rate: number;
}
