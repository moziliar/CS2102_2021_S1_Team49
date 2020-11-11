-- DROP VIEW IF EXISTS salary, rating;
DROP TABLE IF EXISTS bids, pets, daily_prices, categories, credit_cards,
full_time_leaves, part_time_availabilities, caretakers, users;
DROP TYPE IF EXISTS transfer_method;

-- note that for triggers that execute at the same stage, they execute
-- in alphabetical order. Hence, validation triggers are implemented
-- in alphabetical order, if order is important, by <table><num>_<validation>

-- deletable entities:
-- leaves
-- conditionally deletable:
-- availabilities (if no selected bids), credit cards (if no bids)

-- also need a cron job to
-- automatically select a bid two days before start date if still active
-- make is_selected bids in_active


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
  pcs_user VARCHAR(256) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE PRIMARY KEY,
  is_part_time BOOLEAN NOT NULL
);
-- caretaker is opt in

CREATE TABLE part_time_availabilities (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) ON DELETE CASCADE ON UPDATE CASCADE,
  start_date DATE,
  end_date DATE CHECK (date(end_date) >= date(start_date)),
  PRIMARY KEY (caretaker, start_date, end_date)
);

CREATE TABLE full_time_leaves (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) ON DELETE CASCADE ON UPDATE CASCADE,
  start_date DATE,
  end_date DATE CHECK (date(end_date) >= date(start_date)),
  PRIMARY KEY (caretaker, start_date, end_date)
);

CREATE TABLE credit_cards (
  cc_number VARCHAR(50),
  holder_name VARCHAR(256) NOT NULL,
  expiry_date DATE NOT NULL CHECK (date(expiry_date) > CURRENT_DATE),
  owner VARCHAR(256) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (owner, cc_number)
);

CREATE TABLE categories (
  name VARCHAR(256) PRIMARY KEY,
  price INT NOT NULL CHECK (price > 0),
  parent VARCHAR(256) REFERENCES categories(name) ON DELETE RESTRICT ON UPDATE CASCADE
);
-- should only be set and updated by admin.
-- this should never be deleted. if it is deleted, there should be a 
-- trigger that updates all pets belonging to the category to the 
-- parent category. If there isn't a parent category, disallow the deletion

CREATE TABLE daily_prices (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) ON DELETE CASCADE ON UPDATE CASCADE,
  category VARCHAR(256) REFERENCES categories(name) ON DELETE CASCADE ON UPDATE CASCADE,
  price INT NOT NULL CHECK (price > 0),
  PRIMARY KEY (caretaker, category)
);

CREATE TABLE pets (
  name VARCHAR(256),
  owner VARCHAR(256) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
  description TEXT,
  special_requirements TEXT,
  gender VARCHAR(20),
  date_of_birth DATE,
  category VARCHAR(256) REFERENCES categories(name) ON DELETE RESTRICT ON UPDATE CASCADE NOT NULL,
  PRIMARY KEY (name, owner)
);

CREATE TYPE transfer_method AS ENUM ('deliver', 'pickup', 'pcs');

CREATE TABLE bids (
  pet_owner VARCHAR(256),
  pet VARCHAR(256),
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) ON DELETE RESTRICT ON UPDATE CASCADE NOT NULL,

  start_date DATE NOT NULL,
  end_date DATE NOT NULL CHECK (date(start_date) <= date(end_date)),

  transfer_method transfer_method NOT NULL, 
  location VARCHAR(256) NOT NULL,
  total_price INT NOT NULL CHECK (total_price > 0),
  is_active BOOLEAN NOT NULL,
  is_selected BOOLEAN NOT NULL,

  -- NULL implies cash
  -- NOT NULL implies credit card
  cc_number VARCHAR(50),

  rating SMALLINT
  CHECK (rating IS NULL OR (rating IS NOT NULL AND date(end_date) <= CURRENT_DATE AND is_selected)),
  review TEXT CHECK ((rating IS NULL AND review IS NULL) OR (rating IS NOT NULL AND review IS NOT NULL)),

  FOREIGN KEY (pet_owner, pet) REFERENCES pets(owner, name) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (pet_owner, cc_number) REFERENCES credit_cards(owner, cc_number),
  PRIMARY KEY (pet_owner, pet, caretaker, start_date, end_date)
);
-- note that is_active also acts as a soft delete

CREATE TYPE month AS ENUM ('1','2','3','4','5','6','7','8','9','10','11','12');

CREATE TABLE salary (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) ON UPDATE CASCADE,
  month month NOT NULL,
  year CHAR(4) NOT NULL,
  amount INT NOT NULL CHECK (amount >= 0),
  PRIMARY KEY (caretaker, month, year)
);

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
