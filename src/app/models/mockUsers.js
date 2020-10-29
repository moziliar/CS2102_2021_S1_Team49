"use strict";
exports.__esModule = true;
var user_pb_1 = require("../../protos/user_pb");
var mockPets_1 = require("./mockPets");
exports.mockUsers = [
    {
        userID: 1,
        email: 'example@google.com',
        profile: {
            name: 'Paul',
            picture_url: '',
            phone: 12345678
        },
        status: user_pb_1.User.Status.PET_OWNER,
        pets_owned: [
            mockPets_1.mockPets[0],
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
                category: mockPets_1.mockPets[0].category,
                rate: 5000
            }
        ]
    }
];
exports.fromUserObject = function (u) {
    var user = new user_pb_1.User();
    user.setUserId(u.userID);
    user.setEmail(u.email);
    var profile = new user_pb_1.UserProfile();
    profile.setPhone(u.profile.phone);
    profile.setPictureUrl(u.profile.picture_url);
    user.setProfile(profile);
    user.setStatus(u.status);
    u.pets_owned.forEach(function (pet) { return user.addPetsOwned(mockPets_1.fromPetObject(pet)); });
    return user;
};
exports.fromCreditCardObject = function (c) {
    var creditCard = new user_pb_1.CreditCard();
    creditCard.setCardNumber(c.card_number);
    creditCard.setExpiryDate(c.expiry_date);
    creditCard.setHolderName(c.holder_name);
    return creditCard;
};
exports.mockUserMsgs = exports.mockUsers.map(exports.fromUserObject);
