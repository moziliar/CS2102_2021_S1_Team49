
// INPUT:
// user -> {email, password}
export const loginQuery = " \
SELECT *  \
FROM users \
WHERE email=$1 AND password=$2 \
";

// INPUT:
// user -> {email}
export const searchUserByEmailQuery = " \
SELECT *  \
FROM users \
WHERE email=$1 \
";

// INPUT:
// user -> {email, password, name, phone, pic_url, is_admin}
export const createUserQuery = " \
INSERT INTO users \
VALUES ($1, $2, $3, $4, $5, $6) \
";

// INPUT:
// user -> {email, name, phone, pic_url}
export const updateUserQuery = " \
UPDATE users \
SET name=$2, phone=$3, pic_url=$4 \
WHERE email=$1 \
";

// INPUT:
// user -> {email}
export const deleteUserQuery = " \
DELETE FROM users \
WHERE email=$1 \
";


// INPUT:
// pet -> {name, owner, description, special_requirements, gender, date_of_birth, category}
export const createPetQuery = " \
INSERT INTO pets \
VALUES ($1, $2, $3, $4, $5, $6, $7) \
";


// INPUT:
// user -> {name, owner, description, special_requirements, gender, date_of_birth, category}
export const queryPetQuery = " \
SELECT * FROM pets \
WHERE owner=$1 \
";


// INPUT:
// pet -> {name, owner, description, special_requirements, gender, date_of_birth, category}
// user- > {email}
export const updatePetQuery = " \
UPDATE pets \
SET description=$3, special_requirements=$4, gender=$5, \
    date_of_birth=$6, category=$7 \
WHERE name=$1 AND owner=$2 \
";

// INPUT:
// pet -> {name}
// user- > {email}
export const deletePetQuery = " \
DELETE FROM pets \
WHERE name=$1 AND owner=$2 \
";

export const listAllBids = " \
SELECT * \
FROM bids \
";

// INPUT:
// owner -> {email}
export const listTnxByOwnerId = " \
SELECT * \
FROM bids \
WHERE pet_owner=$1 \
";

// INPUT:
// bid -> {price, payment_method, transfer_method, cc_number}
// owner -> {email}
export const updateBid = " \
UPDATE bids \
SET total_price=$1, payment_method=$2 \
    transfer_method=$3, cc_number=$4 \
WHERE pet_owner=$5 \
";

// INPUT:
// owner -> {email}
export const deleteBid = " \
DELETE FROM bids \
WHERE pet_owner=$1 \
"

// OTHER QUERY

// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const addCreditCardQuery = " \
INSERT INTO credit_cards (owner, cc_number, holder_name, expiry_date) \
VALUES ($1, $2, $3, $4) \
";

// INPUT:
// owner -> {email, cc_number}
export const deleteCreditCardQuery = " \
DELETE FROM credit_cards \
WHERE owner=$1 AND cc_number=$2 \
";


// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const queryCreditCard = " \
SELECT * FROM credit_cards \
WHERE owner=$1 \
";

// INPUT:
// owner -> {email, is_part_time}
export const applyCareTakerQuery = " \
INSERT INTO caretakers \
VALUES ($1, $2) \
";

// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const queryCaretaker = " \
SELECT * FROM caretakers \
WHERE pcs_user=$1 \
";


// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const queryAvailabiliies = " \
SELECT * FROM part_time_availabilities \
WHERE caretaker=$1 \
";


// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const queryLeaves = " \
SELECT * FROM full_time_leaves \
WHERE caretaker=$1 \
";


// INPUT:
// price -> {pcs_user, category, price}
export const addDailyPrice = " \
INSERT INTO daily_prices (caretaker, category, price) \
VALUES ($1, $2, $3) \
";

export const getAllAvailCategories = " \
SELECT name FROM categories \
";
