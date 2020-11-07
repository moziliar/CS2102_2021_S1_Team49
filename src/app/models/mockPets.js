"use strict";
exports.__esModule = true;
var pet_pb_1 = require("../../protos/pet_pb");
exports.mockCategories = [
    {
        name: 'cat',
        parent_category: ''
    }
];
exports.mockCategoryMsgs = exports.mockCategories.map(function (c) {
    var cat = new pet_pb_1.Category();
    cat.setName(c.name);
    cat.setParentCategory(c.parent_category);
    return cat;
});
exports.mockPets = [
    {
        pet_id: 1,
        owner_id: 1,
        profile: {
            picture_url: '',
            name: 'kitty',
            special_reqs: [
                'must walk'
            ],
            gender: pet_pb_1.PetProfile.Gender.FEMALE,
            description: 'likes to play a lot',
            date_of_birth: '02.07.2018'
        },
        category: exports.mockCategories[0]
    }
];
exports.fromPetObject = function (p) {
    var pet = new pet_pb_1.Pet();
    pet.setPetId(p.pet_id);
    pet.setOwnerId(p.owner_id);
    var profile = new pet_pb_1.PetProfile();
    profile.setPictureUrl(p.profile.picture_url);
    profile.setName(p.profile.name);
    p.profile.special_reqs.forEach(function (req) { return profile.addSpecialReqs(req); });
    profile.setGender(p.profile.gender);
    profile.setDescription(p.profile.description);
    profile.setDateOfBirth(p.profile.date_of_birth);
    pet.setProfile(profile);
    var cat = new pet_pb_1.Category();
    cat.setName(p.category.name);
    cat.setParentCategory(p.category.parent_category);
    pet.setCategory(cat);
    return pet;
};
exports.mockPetMsgs = exports.mockPets.map(exports.fromPetObject);
