-- DROP VIEW IF EXISTS salary, rating;
DROP TRIGGER IF EXISTS ft1_validate_no_overlap, ft2_validate_no_selected_bids, 
ft3_mark_active_bids_inactive ON full_time_leaves;
DROP TRIGGER IF EXISTS ft2_validate_no_selected_bids ON full_time_leaves;
DROP TRIGGER IF EXISTS ft3_mark_active_bids_inactive ON full_time_leaves;
DROP TRIGGER IF EXISTS pt1_validate_no_overlap ON part_time_availabilities;
DROP TRIGGER IF EXISTS bid1_validate_total_price ON bids;
DROP TABLE IF EXISTS bids, pets, daily_prices, min_daily_prices, categories, credit_cards,
full_time_leaves, part_time_availabilities, caretakers, users;
DROP TYPE IF EXISTS payment_method, transfer_method;

-- note that for triggers that execute at the same stage, they execute
-- in alphabetical order. Hence, validation triggers are implemented
-- in alphabetical order, if order is important, by <table><num>_<validation>

-- deletable entities:
-- credit cards, leaves
-- conditionally deletable:
-- availabilities (if no active bids)


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

  start_date DATE NOT NULL CHECK (date(start_date) >= CURRENT_DATE + 2),
  end_date DATE NOT NULL CHECK (date(start_date) <= date(end_date)),

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
  CHECK (rating IS NULL OR (rating IS NOT NULL AND date(end_date) <= CURRENT_DATE)),

  FOREIGN KEY (pet_owner, pet) REFERENCES pets(owner, name),
  FOREIGN KEY (pet_owner, cc_number) REFERENCES credit_cards(owner, cc_number),
  PRIMARY KEY (pet_owner, pet, caretaker, start_date, end_date)
);
-- note that is_active also acts as a soft delete

-- 1. pet should belong to pet_owner
CREATE OR REPLACE FUNCTION bids_pet_belongs_to_pet_owner()
RETURNS TRIGGER AS
$$ BEGIN
IF (SELECT COUNT(*)
  FROM pets P
  WHERE P.name = NEW.pet AND P.owner = NEW.pet_owner) = 1
  THEN 
  RETURN NEW;
ELSE
  RETURN NULL;
END IF; END; $$

CREATE TRIGGER bid1_validate_pet_belongs_to_owner
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE bids_pet_belongs_to_pet_owner();

-- 2. caretaker should be able to care for pet category
CREATE OR REPLACE FUNCTION caretaker_can_care_category()
  RETURNS TRIGGER AS
  $$ BEGIN
  IF EXISTS (
    SELECT 1 
    FROM pets P, daily_prices D
    WHERE P.name = NEW.pet AND P.owner = NEW.pet_owner 
    AND P.category = D.category AND D.caretaker = NEW.caretaker
  ) THEN
  RETURN NEW;
ELSE
  RETURN NULL;
END IF; END; $$

CREATE TRIGGER bid2_validate_caretaker_can_care_category
BEFORE INSERT_OR_UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE caretaker_can_care_category();

  -- 3. disallow bid if caretaker not available
CREATE OR REPLACE FUNCTION caretaker_is_available()
RETURNS TRIGGER AS
$$ DECLARE is_part_time BOOLEAN;
BEGIN
  IF (
    SELECT C.is_part_time
    FROM caretakers C
    WHERE C.pcs_user = NEW.caretaker)
    THEN
    -- look for an availability that fully contains the bid
    IF EXISTS (
      SELECT 1
      FROM part_time_availabilities P
      WHERE P.caretaker = NEW.caretaker 
      AND P.start_date <= NEW.start_date AND NEW.end_date <= P.end_date)
      THEN
      RETURN NEW;
    ELSE
      RETURN NULL;
    END IF;
  ELSE
  IF EXISTS (
    -- likewise, if there is some leave that starts or ends inside the
    -- bid, reject
    SELECT 1
    FROM full_time_leaves F
    WHERE F.caretaker = NEW.caretaker 
    AND ((F.end_date BETWEEN NEW.start_date AND NEW.end_date)
      OR (F.start_date BETWEEN NEW.start_date AND NEW.end_date)))
  THEN RETURN NULL;
  ELSE RETURN NEW;
  END IF;
END IF; END; $$

CREATE TRIGGER bid3_caretaker_is_available
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE caretaker_is_available();

-- 4. bid cannot be created if caretaker is caring for max pets
CREATE OR REPLACE FUNCTION caretaker_not_full()
RETURNS TRIGGER AS
$$ BEGIN
RETURN NEW;
END; $$

CREATE TRIGGER bid4_caretaker_is_available
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE caretaker_not_full();

-- 5. when a bid is created, check to ensure total_price > min_price
CREATE OR REPLACE FUNCTION validate_bid_price()
RETURNS TRIGGER AS
$$ DECLARE cat VARCHAR(256);
DECLARE global_min NUMERIC;
DECLARE caretaker_min NUMERIC;
BEGIN
  SELECT P.category INTO cat
  FROM pets P
  WHERE P.owner = NEW.pet_owner AND P.name = NEW.pet;
  SELECT D.price * (date(NEW.end_date) - date(NEW.start_date) + 1) INTO global_min
  FROM min_daily_prices D
  WHERE D.category = cat;
  SELECT D.price * (date(NEW.end_date) - date(NEW.start_date) + 1) INTO caretaker_min
  FROM daily_prices D
  WHERE D.caretaker = NEW.caretaker AND D.category = cat;
  IF NEW.total_price < global_min 
    OR NEW.total_price < caretaker_min THEN
    RETURN NULL;
  ELSE
    RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid5_validate_total_price
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE validate_bid_price();

  -- 6. bid can only be created if start date is at least 2 days later
  -- check constraint

  -- 7. once a bid is selected, (AFTER UPDATE)
  -- a. bids for the same pet should be marked inactive across this period
  -- b. if bid causes caretaker to take care of the maximum number of 
  -- pets, all bids for those full dates should be marked inactive

  -- full time leave validation
  -- 1. to check whether the fulltimer is taking care of 
  -- a pet anywhere in the duration. If they are, reject the leave.

  -- also need a cron job to
  -- automatically select a bid two days before start date if still active

  --CREATE VIEW salary (caretaker, month_year, amount) AS
  --  SELECT B.caretaker, DATE_TRUNC('month', B.end_date), SUM(B.total_price)
  --  FROM bids B
  --  WHERE B.is_selected AND B.end_date < CURRENT_DATE
  --  GROUP BY B.caretaker, DATE_TRUNC('month', B.end_date);
  -- we likely need a function or something to query for an individual user,
  -- if we cannot select a specific user from this view.

  --CREATE VIEW rating (caretaker, rating) AS
  --  SELECT B.caretaker, AVG(B.rating)
  --  FROM bids B
  --  WHERE B.is_selected AND B.end_date <= CURRENT_DATE
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


  -- part-time availabilities triggers
  -- 1. no overlaps
  CREATE OR REPLACE FUNCTION pt_no_overlaps()
  RETURNS TRIGGER AS
  $$ BEGIN
  IF EXISTS (
    SELECT 1 
    FROM part_time_availabilities PTA 
    WHERE NEW.caretaker = PTA.caretaker
    AND (NEW.start_date BETWEEN PTA.start_date AND PTA.end_date
      OR NEW.end_date BETWEEN PTA.start_date AND PTA.end_date))
    THEN
    RETURN NULL;
  ELSE
    RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER pt1_validate_no_overlap
BEFORE INSERT OR UPDATE ON part_time_availabilities
FOR EACH ROW EXECUTE PROCEDURE pt_no_overlaps();

  -- 2. only allow delete if no selected bids in that period
  CREATE OR REPLACE FUNCTION pt_reject_if_any_selected()
  RETURNS TRIGGER AS 
  $$ BEGIN
  IF EXISTS (
    SELECT 1
    FROM bids B
    WHERE OLD.caretaker = B.caretaker
    AND B.is_selected AND B.is_active
    AND (OLD.start_date between B.start_date AND B.end_date
      OR OLD.end_date BETWEEN B.start_date AND B.end_date))
    THEN 
    RETURN NULL;
  ELSE
    RETURN OLD;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER pt2_validate_no_selected_bids
BEFORE DELETE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE pt_reject_if_any_selected();

  -- 3. if availabilities is deleted, mark all active unselected bids as inactive
  CREATE OR REPLACE FUNCTION pt_deactive_active_bids()
  RETURNS TRIGGER AS
  $$ BEGIN
  UPDATE bids B
  SET is_active = false
  WHERE OLD.caretaker = B.caretaker
  AND B.is_active
  AND (OLD.start_date BETWEEN B.start_date AND B.end_date
    OR OLD.end_date BETWEEN B.start_date AND B.end_date);
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft3_mark_active_bids_inactive
AFTER DELETE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_deactive_active_bids();


  -- full-time leaves triggers
  -- 1. check whether still possible to meet full-time requirement of
  -- 2 x 150 conseucitve days / yr. otherwise reject leave
  -- TODO
  -- 2. ensure no overlaps for the same user within the table.
  CREATE OR REPLACE FUNCTION ft_no_overlaps()
  RETURNS TRIGGER AS
  $$ BEGIN
  IF EXISTS (
    SELECT 1 
    FROM full_time_leaves FTL 
    WHERE NEW.caretaker = FTL.caretaker
    AND (NEW.start_date BETWEEN FTL.start_date AND FTL.end_date
      OR NEW.end_date BETWEEN FTL.start_date AND FTL.end_date))
    THEN
    RETURN NULL;
  ELSE
    RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft1_validate_no_overlap
BEFORE INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_no_overlaps();

  -- 3. only allow leave if they do not have any selected in that period
  CREATE OR REPLACE FUNCTION ft_reject_if_any_selected()
  RETURNS TRIGGER AS 
  $$ BEGIN
  IF EXISTS (
    SELECT 1
    FROM bids B
    WHERE NEW.caretaker = B.caretaker
    AND B.is_selected AND B.is_active
    AND (NEW.start_date between B.start_date AND B.end_date
      OR NEW.end_date BETWEEN B.start_date AND B.end_date))
    THEN 
    RETURN NULL;
  ELSE
    RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft2_validate_no_selected_bids
BEFORE INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_reject_if_any_selected();

  -- 4. if leave is allowed, mark all active bids in that period as inactive
  CREATE OR REPLACE FUNCTION ft_deactive_active_bids()
  RETURNS TRIGGER AS
  $$ BEGIN
  UPDATE bids B
  SET is_active = false
  WHERE NEW.caretaker = B.caretaker
  AND B.is_active
  AND (NEW.start_date BETWEEN B.start_date AND B.end_date
    OR NEW.end_date BETWEEN B.start_date AND B.end_date);
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft3_mark_active_bids_inactive
AFTER INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_deactive_active_bids();

