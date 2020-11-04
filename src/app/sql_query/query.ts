
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


export const searchUserQuery = " \
SELECT * FROM users U \
WHERE  get_average_rating(U.email) > $2 \
    AND EXISTS ( \
    SELECT * FROM daily_prices P \
    WHERE U.email=P.caretaker \
      AND P.category= $1 \
      AND P.price<$3) \
  AND \
    CASE \
      WHEN U.email IN (SELECT caretaker FROM full_time_leaves) \
        THEN NOT EXISTS ( \
          SELECT * FROM full_time_leaves L \
          WHERE L.caretaker=U.email \
            AND L.start_date>$4 AND L.start_date<$5 \
             OR L.end_date>$4 AND L.end_date<$5) \
      WHEN U.email IN (SELECT caretaker FROM part_time_availabilities) \
        THEN EXISTS ( \
          SELECT * FROM part_time_availabilities A \
          WHERE A.caretaker=U.email \
            AND A.start_date>$4 AND A.start_date<$5 \
             OR A.end_date>$4 AND A.end_date<$5) \
      ELSE FALSE\
    END; \
";


export const getRatesByUserQuery = " \
SELECT category, price \
FROM daily_prices \
WHERE caretaker=$1 \
";


export const getReviewsByUserQuery = " \
SELECT category, price \
FROM daily_prices \
WHERE caretaker=$1 \
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
WHERE pet_owner=$1 AND is_selected=true\
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


export const createTransactionInfo = " \
INSERT INTO bids \
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) \
";


export const updateTransactionInfo = " \
UPDATE bids \
SET pet_owner=$1, pet=$2, caretaker=$3, date_begin=$4, \
    date_end=$5, transfer_method=$6, location=$7, total_price=$8, \
    is_active=$9, is_selected=$10, payment_method=$11, cc_number=$12, \
    rating=$13, review=$14 \
WHERE pet_owner=$1 AND caretaker=$3 AND date_begin=$4 AND date_end=$5 AND is_selected=true AND $10=true \
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

export const getAllCategoryPrices = " \
SELECT * FROM min_daily_prices \
ORDER BY category \
";

// INPUT:
// category -> {name, parent_category}
export const addCategoryQuery = " \
INSERT INTO categories \
VALUES ($1, $2) \
";

// INPUT:
// category -> {category, price}
export const updateCategoryQuery = " \
UPDATE min_daily_prices \
SET price=$2 \
WHERE category=$1 \
";

// ==================================
export const getHighRatingCaretakerDetails = " \
SELECT U.name, U.phone, C.pcs_user, C.is_part_time  \
FROM (bids B INNER JOIN caretakers C ON B.caretaker = C.pcs_user) \
    INNER JOIN users U ON C.pcs_user = U.email \
WHERE (rating != NULL) AND ( \
    SELECT COUNT(*) \
    FROM caretakers C2 INNER JOIN bids B2 ON C2.caretaker = B2.caretaker \
    WHERE rating = 1) = 0 \
HAVING AVG(rating) >= 4 \
"