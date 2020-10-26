
// INPUT:
// user -> {email, password}
const loginQuery = " \
SELECT *  \
FROM users \
WHERE email=${user.email} AND password=${user.password} \
";

// INPUT:
// user -> {email, password, name, phone, pic_url, is_admin}
const createUserQuery = " \
INSERT INTO users \
VALUES (${user.email}, ${user.password}, ${user.name}, \
    ${user.phone}, ${user.pic_url}, ${user.is_admin}) \
";

// INPUT:
// user -> {email, password, name, phone, pic_url, is_admin}
const updateUserQuery = " \
UPDATE users \
SET email=${user.email}, password=${user.password}, name=${user.name}, \
        phone=${user.phone}, pic_url=${user.pic_url}, is_admin=${user.is_admin} \
WHERE email=${user.email} \
";

// INPUT:
// user -> {email}
const deleteUserQuery = " \
DELETE FROM users \
WHERE email=${user.email} \
";


// INPUT:
// pet -> {name, owner, description, special_requirements, gender, date_of_birth, category}
const createPetQuery = " \
INSERT INTO pets \
VALUES (${pet.name}, ${pet.owner}, ${pet.description}, \
    ${pet.special_requirements}, ${pet.gender}, ${pet.date_of_birth}, ${pet.category}) \
";


// INPUT:
// pet -> {name, owner, description, special_requirements, gender, date_of_birth, category}
// user- > {email}
const updatePetQuery = " \
UPDATE pets \
SET name=${pet.name}, owner=${pet.owner}, description=${pet.description}, \
       special_requirements=${pet.special_requirements}, gender=${pet.gender}, \
       date_of_birth=${pet.date_of_birth}, category=${pet.category} \
WHERE name=${pet.name} AND owner=${user.email} \
";

// INPUT:
// pet -> {name}
// user- > {email}
const deletePetQuery = " \
DELETE FROM pets \
WHERE name=${pet.name} AND owner=${user.email} \
";

const listAllBids = " \
SELECT * \
FROM bids \
";

// INPUT:
// owner -> {email}
const listTnxByOwnerId = " \
SELECT * \
FROM bids \
WHERE pet_owner=${owner.email} \
";

// INPUT:
// bid -> {price, payment_method, transfer_method, cc_number}
const updateBid = " \
UPDATE bids \
SET total_price=$(bid.price), payment_method=$(bid.payment_method) \
    transfer_method=$(bid.transfer_method), cc_number=$(bid.cc_number) \
WHERE pet_owner=${owner.email} \
";

// INPUT:
// owner -> {email}
const deleteBid = " \
DELETE FROM bids \
WHERE pet_owner=${owner.email} \
"

// OTHER QUERY

// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
const addCreditCard = " \
INSERT INTO credit_cards (email, cc_number, holder_name, expiry_date) \
VALUES (${owner.email}, ${owner.cc_number}, ${owner.holder_name}, \
    ${owner.expiry_date}) \
";

// INPUT:
// price -> {pcs_user, category, price}
const addDailyPrice = " \
INSERT INTO daily_prices (caretaker, category, price) \
VALUES (${price.pcs_user}, ${price.category}, ${price.price}) \
";
