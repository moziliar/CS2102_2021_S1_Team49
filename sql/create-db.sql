-- DROP VIEW IF EXISTS salary, rating;
DROP TABLE IF EXISTS bids, pets, daily_prices, min_daily_prices, categories, credit_cards,
full_time_leaves, part_time_availabilities, caretakers, users;
DROP TYPE IF EXISTS payment_method, transfer_method;

CREATE TABLE users (
  email VARCHAR(256) PRIMARY KEY,
  password CHAR(64) NOT NULL,
  name VARCHAR(256) NOT NULL,
  phone VARCHAR(20),
  pic_url VARCHAR(256),
  is_admin BOOLEAN NOT NULL
);
-- if they are not an admin, everyone is a pet owner
-- do not let user update their email.

CREATE TABLE caretakers (
  pcs_user VARCHAR(256) REFERENCES users(email) PRIMARY KEY,
  is_part_time BOOLEAN NOT NULL
);
-- caretaker is opt in

CREATE TABLE part_time_availabilities (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user),
  start_date DATE,
  end_date DATE CHECK (date(end_date) >= date(start_date)),
  PRIMARY KEY (caretaker, start_date, end_date)
);

CREATE TABLE full_time_leaves (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user),
  start_date DATE,
  end_date DATE CHECK (date(end_date) >= date(start_date)),
  PRIMARY KEY (caretaker, start_date, end_date)
);
-- validation triggers
-- 1. check whether still possible to meet full-time requirement of
-- 2 x 150 consecutive days / yr. otherwise reject leave
-- 2. ensure part time availabilities and full time leaves have no overlaps for
-- the same user within the table.

CREATE TABLE credit_cards (
  cc_number VARCHAR(50),
  holder_name VARCHAR(256) NOT NULL,
  expiry_date DATE NOT NULL CHECK (date(expiry_date) > CURRENT_DATE),
  owner VARCHAR(256) REFERENCES users(email) ON DELETE CASCADE,
  PRIMARY KEY (owner, cc_number)
);

CREATE TABLE categories (
  name VARCHAR(256) PRIMARY KEY,
  parent VARCHAR(256) REFERENCES categories(name)
);
-- this should never be deleted. if it is deleted, there should be a 
-- trigger that updates all pets belonging to the category to the 
-- parent category. If there isn't a parent category, disallow the deletion

CREATE TABLE daily_prices (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user),
  category VARCHAR(256) REFERENCES categories(name),
  price INT NOT NULL CHECK (price > 0),
  PRIMARY KEY (caretaker, category)
);

CREATE TABLE min_daily_prices (
  category VARCHAR(256) REFERENCES categories(name) PRIMARY KEY,
  price INT NOT NULL CHECK (price > 0)
);
-- should only be set and updated by admin.


CREATE TABLE pets (
  name VARCHAR(256),
  owner VARCHAR(256) REFERENCES users(email) ON DELETE CASCADE,
  description TEXT,
  special_requirements TEXT,
  gender VARCHAR(20),
  date_of_birth DATE,
  category VARCHAR(256) REFERENCES categories(name) NOT NULL,
  PRIMARY KEY (name, owner)
);

CREATE TYPE transfer_method AS ENUM ('deliver', 'pickup', 'pcs');
CREATE TYPE payment_method AS ENUM ('cash', 'cc');

CREATE TABLE bids (
  pet_owner VARCHAR(256),
  pet VARCHAR(256),
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) NOT NULL,

  date_begin DATE NOT NULL,
  date_end DATE NOT NULL CHECK (date(date_begin) <= date(date_end)),

  transfer_method transfer_method NOT NULL, 
  location VARCHAR(256) NOT NULL,
  total_price INT NOT NULL CHECK (total_price > 0),
  is_active BOOLEAN NOT NULL,
  is_selected BOOLEAN NOT NULL,

  payment_method payment_method NOT NULL,
  cc_number VARCHAR(50) 
    CHECK ((payment_method = 'cash' AND cc_number IS NULL)
       OR (payment_method = 'cc' AND cc_number IS NOT NULL)),

  rating smallint
    CHECK (rating IS NULL OR (rating IS NOT NULL AND date(date_end) <= CURRENT_DATE)),
  review TEXT,

  FOREIGN KEY (pet_owner, pet) REFERENCES pets(owner, name),
  FOREIGN KEY (pet_owner, cc_number) REFERENCES credit_cards(owner, cc_number),
  PRIMARY KEY (pet_owner, pet, caretaker, date_begin, date_end)
);
-- note that is_active also acts as a soft delete
-- we'll need a couple of triggers here
-- 1. once a bid is selected, 
      -- a. bids for the same pet should be marked inactive across this period
      -- b. if bid causes caretaker to take care of the maximum number of 
      -- pets, all bids for those full dates should be marked inactive

-- 2. when a bid is created, check to ensure total_price > min_price
CREATE OR REPLACE FUNCTION validate_bid_price()
RETURNS TRIGGER AS
$$ DECLARE cat VARCHAR(256);
   DECLARE global_min NUMERIC;
   DECLARE caretaker_min NUMERIC;
   BEGIN
     SELECT P.category INTO cat
      FROM pets P
      WHERE P.owner = NEW.pet_owner AND P.name = NEW.pet;
     SELECT D.price * (date(NEW.date_end) - date(NEW.date_begin) + 1) INTO global_min
      FROM min_daily_prices D
      WHERE D.category = cat;
     SELECT D.price * (date(NEW.date_end) - date(NEW.date_begin) + 1) INTO caretaker_min
      FROM daily_prices D
      WHERE D.caretaker = NEW.caretaker AND D.category = cat;
     IF NEW.total_price < global_min 
        OR NEW.total_price < caretaker_min THEN
      RETURN NULL;
     ELSE
      RETURN NEW;
     END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER validate_bid_total_price
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE validate_bid_price();

-- 3. bid can only be created if start date is at least 2 days later
-- 4. bid cannot be created if caretaker is caring for max pets

-- full time leave validation
-- 1. to check whether the fulltimer is taking care of 
-- a pet anywhere in the duration. If they are, reject the leave.

-- also need a cron job to
-- automatically select a bid two days before start date if still active

--CREATE VIEW salary (caretaker, month_year, amount) AS
--  SELECT B.caretaker, DATE_TRUNC('month', B.date_end), SUM(B.total_price)
--  FROM bids B
--  WHERE B.is_selected AND B.date_end < CURRENT_DATE
--  GROUP BY B.caretaker, DATE_TRUNC('month', B.date_end);
-- we likely need a function or something to query for an individual user,
-- if we cannot select a specific user from this view.

--CREATE VIEW rating (caretaker, rating) AS
--  SELECT B.caretaker, AVG(B.rating)
--  FROM bids B
--  WHERE B.is_selected AND B.date_end <= CURRENT_DATE
--  GROUP BY B.caretaker
--  UNION
--  (SELECT C.pcs_user, 0
--   FROM caretakers C
-- EXCEPT
-- SELECT B1.caretaker, 0
-- FROM bids B1);
-- Can we improve this?


-- TODO views for
-- min prices, available caretakers for some date
-- number of pets a caretaker can take



-- throughout the database, only credit cards can be deleted, nothing else 
-- should be deletable.
