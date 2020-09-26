import { User, UserProfile } from '../../protos/user_pb';
import { Pet } from '../../protos/pet_pb';
import { mockPets } from './mockPets';

export const mockUsers = [
  {
    userID: 1,
    email: 'example@google.com',
    profile: {
      name: 'Paul',
      picture_url: '',
      phone: 12345678
    },
    status: User.Status.PET_OWNER,
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
        category: null,
        rate: 5000
      }
    ]
  }
]

export const mockUserMsgs = mockUsers.map((u: any) => {
  let user = new User();
  user.setUserId(u.userID);
  user.setEmail(u.email);

  let profile = new UserProfile();
  profile.setPhone(u.profile.phone);
  profile.setPictureUrl(u.profile.picture_url);
  user.setProfile(profile);

  user.setStatus(u.status);
  u.pets_owned.forEach((pet: Pet) => user.addPetsOwned(pet));

  return user
});