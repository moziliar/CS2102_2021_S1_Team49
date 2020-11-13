// INPUT:
// user -> {email, password}
export const loginQuery =
  " \
SELECT *  \
FROM users \
WHERE email=$1 AND password=$2 \
";

// INPUT:
// user -> {email}
export const searchUserByEmailQuery =
  " \
SELECT *  \
FROM users \
WHERE email=$1 \
";

// INPUT:
// user -> {email, password, name, phone, pic_url, is_admin}
export const createUserQuery =
  " \
INSERT INTO users \
VALUES ($1, $2, $3, $4, $5, $6) \
";

// INPUT:
// user -> {email, name, phone, pic_url}
export const updateUserQuery =
  " \
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

export const searchUserQuery =
`
SELECT * FROM users U 
WHERE  get_average_rating(U.email) >= $2 
  AND EXISTS ( 
    SELECT * FROM daily_prices P 
    WHERE U.email=P.caretaker 
      AND P.category=$1 
      AND P.price<$3) 
  AND 
    CASE 
      WHEN U.email IN (SELECT pcs_user FROM caretakers WHERE pcs_user=U.email AND is_part_time=false) 
        THEN NOT EXISTS ( 
          SELECT * FROM full_time_leaves L 
          WHERE L.caretaker=U.email 
            AND (date(L.start_date), date(L.end_date) + 1) OVERLAPS (date($4), date($5) + 1)) 
      WHEN U.email IN (SELECT pcs_user FROM caretakers WHERE pcs_user=U.email AND is_part_time=true) 
        THEN (
          SELECT COUNT(*) 
          FROM (SELECT generate_series(date($4), date($5), '1 day') AS day) D
          WHERE EXISTS (
            SELECT * FROM part_time_availabilities A
            WHERE caretaker=U.email 
              AND D.day BETWEEN A.start_date AND A.end_date
          )
        ) = (date($5) - date($4) + 1)
      ELSE FALSE 
    END
  AND NOT EXISTS (
    SELECT * FROM (SELECT generate_series(date($4), date($5), '1 day') AS day) D
    WHERE (SELECT COUNT(*) 
      FROM bids
      WHERE is_selected=TRUE
      AND D.day BETWEEN start_date AND end_date
      AND bids.caretaker=U.email
    ) >= (
      CASE
        WHEN EXISTS (
          SELECT pcs_user FROM caretakers 
          WHERE pcs_user=U.email
            AND is_part_time=FALSE) 
          THEN 5
        WHEN EXISTS (
          SELECT pcs_user FROM caretakers 
          WHERE pcs_user=U.email
            AND is_part_time=TRUE)
          THEN 
            CASE
              WHEN get_average_rating(U.email) <= 4
                THEN 2
              ELSE 5
            END
        ELSE 5
      END
    )
  ); 
`;

export const applyLeaveQuery = `
INSERT INTO full_time_leaves
VALUES ($1, $2, $3)
`;

export const applyAvailabilityQuery = `
INSERT INTO part_time_availabilities
VALUES ($1, $2, $3)
`;

export const getRatesByUserQuery =
  " \
SELECT * \
FROM daily_prices \
WHERE caretaker=$1 \
";

export const getReviewsByUserQuery =
  " \
SELECT category, price \
FROM daily_prices \
WHERE caretaker=$1 \
";

// INPUT:
// pet -> {name, owner, description, special_requirements, gender, date_of_birth, category}
export const createPetQuery =
  " \
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
export const updatePetQuery =
  " \
UPDATE pets \
SET description=$3, special_requirements=$4, gender=$5, \
    date_of_birth=$6, category=$7 \
WHERE name=$1 AND owner=$2 \
";

// INPUT:
// pet -> {name}
// user- > {email}
export const deletePetQuery =
  " \
DELETE FROM pets \
WHERE name=$1 AND owner=$2 \
";

export const listAllBids = " \
SELECT * \
FROM bids \
";

export const listBidsByUserId = `
SELECT *
FROM bids
WHERE caretaker=$1 AND is_active=true AND is_selected=false
`;

// INPUT:
// owner -> {email}
export const listTnxByUserId = `
SELECT *
FROM bids
WHERE pet_owner=$1 OR caretaker=$1 AND is_active=false AND is_selected=true
`;

// INPUT:
// owner -> {email}
export const listDoneTnxByTakerId = `
SELECT * 
FROM bids 
WHERE caretaker=$1 
  AND is_selected=true
  AND end_date <= CURRENT_DATE 
`;

export const getTxnByTxnInfo = `
SELECT * 
FROM bids 
WHERE pet_owner=$1 AND pet=$2 AND caretaker=$3 AND start_date=$4 AND end_date=$5 AND is_selected=$6
`;

// INPUT:
// bid -> {price, payment_method, transfer_method, cc_number}
// owner -> {email}
export const updateBid = `
UPDATE bids 
SET total_price=$1, payment_method=$2 
    transfer_method=$3, cc_number=$4 
WHERE pet_owner=$5 
`;

export const createTransactionInfo = `
INSERT INTO bids 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
`;

export const updateTransactionInfo = `
UPDATE bids 
SET pet_owner=$1, pet=$2, caretaker=$3, date_begin=$4,
    date_end=$5, transfer_method=$6, location=$7, total_price=$8,
    is_active=$9, is_selected=$10, payment_method=$11, cc_number=$12,
    rating=$13, review=$14
WHERE pet_owner=$1 AND caretaker=$3 AND start_date=$4 AND end_date=$5 AND is_selected=true AND $10=true
`;

export const reviewTransactionQuery = 
" \
UPDATE bids \
SET rating=$6, review=$7 \
WHERE pet_owner=$1 AND pet=$2 AND caretaker=$3 AND start_date=$4 AND end_date=$5 \
";

export const acceptBidByParams = `
UPDATE bids
SET is_selected=true, is_active=false
WHERE pet_owner=$1 AND pet=$2 AND caretaker=$3 AND start_date=$4 AND end_date=$5
`;

// INPUT:
// owner -> {email}
export const deleteBid = " \
DELETE FROM bids \
WHERE pet_owner=$1 \
";

// OTHER QUERY

// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const addCreditCardQuery =
  " \
INSERT INTO credit_cards (owner, cc_number, holder_name, expiry_date) \
VALUES ($1, $2, $3, $4) \
";

// INPUT:
// owner -> {email, cc_number}
export const deleteCreditCardQuery =
  " \
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
export const applyCareTakerQuery =
  " \
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
export const queryAvailabiliies =
  " \
SELECT * FROM part_time_availabilities \
WHERE caretaker=$1 \
";

// INPUT:
// owner -> {email, cc_number, holder_name, expiry_date}
export const queryLeaves =
  " \
SELECT * FROM full_time_leaves \
WHERE caretaker=$1 \
";

// INPUT:
// price -> {caretaker, category, price}
export const addDailyPrice =
  " \
INSERT INTO daily_prices (caretaker, category, price) \
VALUES ($1, $2, $3) \
";

// INPUT:
// caretaker -> {caretaker, category, price}
export const updateDailyPriceQuery = " \
UPDATE daily_prices \
SET price=$3 \
WHERE caretaker=$1 AND category=$2 \
"

export const getSalaryQuery = 
" \
SELECT year, month, amount \
FROM salary \
WHERE caretaker=$1 AND month=$2 AND year=$3 \
";

// INPUT:
// caretaker -> {caretaker, category}
export const deleteDailyPriceQuery = " \
DELETE FROM daily_prices \
WHERE caretaker=$1 AND category=$2 \
"

// INPUT:
// caretaker => {email}
export const getAllCareTakerDailyPrice = " \
SELECT * from daily_prices \
WHERE caretaker=$1 \
";

export const getAllCategoriesQuery = " \
SELECT * FROM categories \
ORDER BY name \
";

// INPUT:
// category -> {name, price, parent}
export const addCategoryQuery = " \
INSERT INTO categories \
VALUES ($1, $2, $3) \
";

// INPUT:
// category -> {name, price}
export const updateCategoryQuery =
  " \
UPDATE categories \
SET price=$2 \
WHERE name=$1 \
";

/* Select the top 5 highest ranking caretakers with details
   for the past one month sorted in the highest ranking first
*/

export const getHighRatingCaretakerDetailsWithinNmonths = (N) => {
  return (
    " \
        SELECT DISTINCT U1.email, U1.name, C1.is_part_time, AVG(B1.rating) AS avg_rating, COUNT(*) \
        FROM (caretakers AS C1 INNER JOIN users AS U1 ON C1.pcs_user = U1.email) \
                INNER JOIN bids B1 ON B1.caretaker = C1.pcs_user \
        WHERE B1.rating is NOT NULL \
            AND B1.is_selected = true \
            AND B1.end_date > date_trunc('month', current_date - interval '" +
    N +
    " month') \
            AND B1.end_date <= date_trunc('month', current_date) \
        GROUP BY B1.caretaker, C1.pcs_user, U1.email \
        HAVING AVG(B1.rating) >= 4 \
        ORDER BY avg_rating DESC \
        LIMIT 5; \
    "
  );
};

// see which full time caretaker is currently underperforming
// an underperforming full time caretaker is one whose overall rating is between 1 and 3
// or has not completed 30 pet-days for previous month,
// or has not taken a job in the recent 10 days (including today) despite not being on leave
export const getUnderperformingCaretakers = ` 
-- helper functions
CREATE OR REPLACE FUNCTION first_day_of_month(some_date date)
RETURNS DATE AS
$$ BEGIN
RETURN date(date_trunc('month', some_date));
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION last_day_of_month(some_date date)
RETURNS DATE AS
$$ BEGIN
RETURN date(date_trunc('month', some_date) + interval '1 month - 1 day');
END; $$
LANGUAGE plpgsql;

SELECT U.email AS email, U.name AS name, U.phone AS phone, U.pic_url AS pic_url
FROM caretakers C INNER JOIN users U ON C.pcs_user = U.email
WHERE NOT C.is_part_time AND (
  get_average_rating(C.pcs_user) >= 1 AND get_average_rating(C.pcs_user) <= 3
  OR (
  SELECT COALESCE(SUM((SELECT
    CASE 
      WHEN B.end_date > last_day_of_month(date(CURRENT_DATE - interval '1 month'))
      THEN last_day_of_month(date(CURRENT_DATE - interval '1 month'))
      ELSE B.end_date
    END end_date
    ) - (SELECT CASE 
      WHEN B.start_date < first_day_of_month(date(CURRENT_DATE - interval '1 month'))
      THEN first_day_of_month(date(CURRENT_DATE - interval '1 month'))
      ELSE B.start_date
    END end_date) + 1), 0)
    FROM bids B
    WHERE B.caretaker = C.pcs_user AND B.is_selected
    AND (first_day_of_month(date(CURRENT_DATE - interval '1 month')), 
      last_day_of_month(date(CURRENT_DATE - interval '1 month')) + 1) 
      OVERLAPS (B.start_date, B.end_date + 1)) <= 30
  OR NOT EXISTS ( 
    SELECT 1 
    FROM bids B
    WHERE B.caretaker = C.pcs_user AND B.is_selected 
      AND (CURRENT_DATE - 9, CURRENT_DATE + 1) 
        OVERLAPS (B.start_date, B.end_date + 1)
    UNION
    (SELECT 1
    FROM full_time_leaves F
    WHERE F.caretaker = C.pcs_user 
      AND (CURRENT_DATE - 9, CURRENT_DATE + 1) 
        OVERLAPS (F.start_date, F.end_date + 1)
      )))
ORDER BY C.pcs_user ASC;
`;

// get summary information for past month
// total number of pet taken care of
// total pet-day
// total revenue
// highest revenue
// average revenue
// total salary given
// average salary given
// total full time salary
// average full time salary
// highest full time salary
// best performing full timer
// total part time salary
// average part time salary
// highest part time salary
// best performing part timer
// total bids made
// percentage of successful bids
export const getAdminPastMonthSummary = `
`;

// INPUT:
// $1 - some date in month you're interested in as a SQL date
// OUTPUT:
// caretaker, is_part_time, pet_days, revenue, salary
export const getSalariesForCaretakersInMonthQuery = ` 
WITH pet_days(day, pet_owner, pet, caretaker, daily_price, transfer_method, location, payment_method, rating) AS (
  SELECT D.day, B.pet_owner, B.pet, B.caretaker, B.total_price / (B.end_date + 1 - B.start_date) AS daily_price, B.transfer_method,
    B.location, B.payment_method, B.rating
  FROM (SELECT date(generate_series(first_day_of_month($1), last_day_of_month($1), interval '1 day')) 
    AS day) D INNER JOIN bids B ON D.day BETWEEN B.start_date AND B.end_date
  GROUP BY B.caretaker, B.pet, B.pet_owner, B.start_date, B.end_date, D.day
  ORDER BY D.day
)
SELECT C.pcs_user AS caretaker, C.is_part_time AS is_part_time, COUNT(pet_days.day) AS pet_days, 
  COALESCE(SUM(pet_days.daily_price), 0) AS revenue, 
  CASE
    WHEN C.is_part_time THEN COALESCE(SUM(pet_days.daily_price),0) * 0.75
    ELSE 3000 + (SELECT COALESCE(SUM(PD.daily_price),0)
                           FROM (SELECT * FROM pet_days 
                            WHERE pet_days.caretaker = C.pcs_user 
                            OFFSET 60) PD) * 0.8
  END salary
FROM caretakers C LEFT OUTER JOIN pet_days ON C.pcs_user = pet_days.caretaker
GROUP BY C.pcs_user, C.is_part_time
ORDER BY salary DESC;
`;
