-- DROP VIEW IF EXISTS salary, rating;
DROP TRIGGER IF EXISTS ft1_validate_no_overlap ON full_time_leaves;
DROP TRIGGER IF EXISTS ft2_validate_no_selected_bids ON full_time_leaves;
DROP TRIGGER IF EXISTS ft3_validate_meet_reqs ON full_time_leaves;
DROP TRIGGER IF EXISTS ft4_mark_active_bids_inactive ON full_time_leaves;
DROP TRIGGER IF EXISTS pt1_validate_no_overlap ON part_time_availabilities;
DROP TRIGGER IF EXISTS pt2_validate_no_selected_bids ON part_time_availabilities;
DROP TRIGGER IF EXISTS pt3_mark_active_bids_inactive ON part_time_availabilities;
DROP TRIGGER IF EXISTS bid1_validate_starts_mt_2_days_later ON bids;
DROP TRIGGER IF EXISTS bid3_validate_caretaker_can_care_category ON bids;
DROP TRIGGER IF EXISTS bid4_caretaker_is_available ON bids;
DROP TRIGGER IF EXISTS bid5_caretaker_not_full ON bids;
DROP TRIGGER IF EXISTS bid6_validate_total_price ON bids;
DROP TRIGGER IF EXISTS bid7_remove_others_if_selected ON bids;
DROP TRIGGER IF EXISTS bid8_select_bid_if_full_timer ON bids;
DROP TRIGGER IF EXISTS mdp1_update_daily_price ON min_daily_prices;
DROP TRIGGER IF EXISTS dp1_check_more_than_global ON daily_prices;
DROP TRIGGER IF EXISTS cat1_add_global_min_price ON categories;
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
  parent VARCHAR(256) REFERENCES categories(name) ON DELETE RESTRICT ON UPDATE CASCADE
);
-- this should never be deleted. if it is deleted, there should be a 
-- trigger that updates all pets belonging to the category to the 
-- parent category. If there isn't a parent category, disallow the deletion

CREATE TABLE daily_prices (
  caretaker VARCHAR(256) REFERENCES caretakers(pcs_user) ON DELETE CASCADE ON UPDATE CASCADE,
  category VARCHAR(256) REFERENCES categories(name) ON DELETE CASCADE ON UPDATE CASCADE,
  price INT NOT NULL CHECK (price > 0),
  PRIMARY KEY (caretaker, category)
);

CREATE TABLE min_daily_prices (
  category VARCHAR(256) REFERENCES categories(name) ON DELETE CASCADE ON UPDATE CASCADE PRIMARY KEY,
  price INT NOT NULL CHECK (price > 0)
);
-- should only be set and updated by admin.


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
CREATE TYPE payment_method AS ENUM ('cash', 'cc');

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

  payment_method payment_method NOT NULL,
  cc_number VARCHAR(50) 
  CHECK ((payment_method = 'cash' AND cc_number IS NULL)
    OR (payment_method = 'cc' AND cc_number IS NOT NULL)),

  rating SMALLINT
  CHECK (rating IS NULL OR (rating IS NOT NULL AND date(end_date) <= CURRENT_DATE)),
  review TEXT CHECK ((rating IS NULL AND review IS NULL) OR (rating IS NOT NULL AND review IS NOT NULL)),

  FOREIGN KEY (pet_owner, pet) REFERENCES pets(owner, name) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (pet_owner, cc_number) REFERENCES credit_cards(owner, cc_number) ON DELETE RESTRICT ON UPDATE RESTRICT,
  PRIMARY KEY (pet_owner, pet, caretaker, start_date, end_date)
);
-- note that is_active also acts as a soft delete


-- 1. bid can only be created if start date is more than 2 days later
-- can't be a check as it is only on insert
CREATE OR REPLACE FUNCTION bid_starts_mt_2_days_later()
RETURNS TRIGGER AS
$$ BEGIN
  IF NEW.start_date <= CURRENT_DATE + 2
  THEN RAISE EXCEPTION 'cannot create bid that starts less than 2 days from today';
  ELSE RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid1_validate_starts_mt_2_days_later
BEFORE INSERT ON bids
FOR EACH ROW EXECUTE PROCEDURE bid_starts_mt_2_days_later();

-- 3. caretaker should be able to care for pet category
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
  RAISE EXCEPTION 'caretaker % cannot care for this pet', NEW.caretaker;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid3_validate_caretaker_can_care_category
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE caretaker_can_care_category();

-- 4. disallow bid if caretaker not available
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
    -- TODO or maybe we should instead check to make sure every single day has an availability?
    -- that way it would allow for availability as 1-2, 3-4, and a bid for 1-4.
    IF EXISTS (
      SELECT 1
      FROM part_time_availabilities P
      WHERE P.caretaker = NEW.caretaker 
      AND P.start_date <= NEW.start_date AND NEW.end_date <= P.end_date)
      THEN
      RETURN NEW;
    ELSE
      RAISE EXCEPTION 'caretaker is not available';
    END IF;
  ELSE
  IF EXISTS (
    -- reject if any overlapping. we + 1 on both ends because we want it to be inclusive
    SELECT 1
    FROM full_time_leaves F
    WHERE F.caretaker = NEW.caretaker 
    AND (F.start_date, F.end_date + 1) OVERLAPS (NEW.start_date, NEW.end_date + 1)
  THEN RAISE EXCEPTION 'caretaker is not available';
  ELSE RETURN NEW;
  END IF;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid4_caretaker_is_available
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE caretaker_is_available();

CREATE OR REPLACE FUNCTION get_average_rating(caretaker_user VARCHAR(256))
RETURNS NUMERIC AS
$$ BEGIN
RETURN (SELECT COALESCE(AVG(rating), 0)
  FROM bids B
  WHERE B.caretaker = caretaker_user AND B.is_selected AND B.end_date <= CURRENT_DATE);
END; $$
LANGUAGE plpgsql;

-- 5. bid cannot be created if caretaker is caring for max pets
-- once bid is created, but rating dips below requirement, then 
-- caretaker cannot accept the bid unless they increase their rating
-- if we reach the 2 day mark, then the bid will be marked inactive
CREATE OR REPLACE FUNCTION caretaker_not_full()
RETURNS TRIGGER AS
$$ DECLARE max_pet INTEGER := 5;
DECLARE i DATE = NEW.start_date;
BEGIN
  -- for part time, calculate rating then determine if 2 or 5 pets max
  IF (SELECT C.is_part_time
    FROM caretakers C
    WHERE C.pcs_user = NEW.caretaker)
    AND get_average_rating(NEW.caretaker) < 4
    THEN 
    max_pet := 2;
  END IF;
  WHILE i <= NEW.end_date LOOP
    IF (SELECT COUNT(*) 
      FROM bids B
      WHERE B.caretaker = NEW.caretaker 
        AND B.is_selected 
        AND i BETWEEN B.start_date AND B.end_date) >= max_pet
    THEN RAISE EXCEPTION 'caretaker is already caring for max pets';
    END IF;
    i := i + 1;
  END LOOP;
  RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid5_caretaker_not_full
BEFORE INSERT ON bids
FOR EACH ROW EXECUTE PROCEDURE caretaker_not_full();

-- 6. when a bid is created, check to ensure total_price > min_price
CREATE OR REPLACE FUNCTION validate_bid_price()
RETURNS TRIGGER AS
$$ DECLARE cat VARCHAR(256);
BEGIN
  SELECT P.category INTO cat
  FROM pets P
  WHERE P.owner = NEW.pet_owner AND P.name = NEW.pet;
  IF NEW.total_price < (
      SELECT D.price * (date(NEW.end_date) - date(NEW.start_date) + 1)
      FROM min_daily_prices D
      WHERE D.category = cat
    )
    OR NEW.total_price < (
      SELECT D.price * (date(NEW.end_date) - date(NEW.start_date) + 1)
      FROM daily_prices D
      WHERE D.caretaker = NEW.caretaker AND D.category = cat;
    ) 
  THEN
    RAISE EXCEPTION 'price % is less than minimum possible price', NEW.price;
  ELSE
    RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid6_validate_total_price
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE validate_bid_price();

-- 7. once a bid is selected, (AFTER UPDATE)
-- a. bids for the same pet should be marked inactive across this period
-- b. if bid causes caretaker to take care of the maximum number of 
-- pets, all bids for those full dates should be marked inactive
CREATE OR REPLACE FUNCTION remove_other_bids_if_selected()
RETURNS TRIGGER AS
$$ DECLARE max_pet INTEGER := 5;
   DECLARE i DATE := NEW.start_date;
BEGIN
  IF (NOT OLD.is_selected) AND NEW.is_selected
  THEN 
    IF (SELECT C.is_part_time
      FROM caretakers C
      WHERE C.pcs_user = NEW.caretaker)
      AND get_average_rating(NEW.caretaker) < 4
    THEN max_pet := 2;
    END IF;
    -- remove all bids for the pet where there is an overlap
    UPDATE bids B
    SET is_active = false
    WHERE B.pet_owner = NEW.pet_owner AND B.pet = NEW.pet
    AND is_active = true 
    AND (B.start_date, B.end_date + 1) OVERLAPS (NEW.start_date, NEW.end_date + 1);
    -- remove all bids involving days where caretaker is now full
    WHILE i <= NEW.end_date LOOP
      IF (
        SELECT COUNT(*) 
        FROM bids B
        WHERE B.caretaker = NEW.caretaker 
        AND B.is_selected 
        AND i BETWEEN B.start_date AND B.end_date) = max_pet
        -- not sure if this condition works, it is 
        -- assuming that there will only be 1 update at a time.
      THEN 
        UPDATE bids B
        SET is_active = false
        WHERE B.caretaker = NEW.caretaker 
          AND B.is_active AND NOT B.is_selected
          AND (i BETWEEN B.start_date AND B.end_date
          OR i BETWEEN B.start_date and B.end_date);
      END IF;
      i := i + 1;
    END LOOP;
  END IF; 
  RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid7_remove_others_if_selected
AFTER UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE remove_other_bids_if_selected();

-- 8. After inserting, if bid is for full timer, select it immediately.
CREATE OR REPLACE FUNCTION select_bid_if_full_timer()
RETURNS TRIGGER AS
$$ BEGIN
-- if new entry that is for a full timer, select it
-- at this point, the previous triggers would have guaranteed
-- that the fulltimer is available
  IF NEW.is_selected = false AND NOT (
    SELECT C.is_part_time
    FROM caretakers C
    WHERE C.pcs_user = NEW.caretaker)
  THEN 
    -- this should trigger the other triggers again
    UPDATE bids B
    SET selected = true
    WHERE B.pet_owner = NEW.pet_owner AND B.pet = NEW.pet 
    AND B.caretaker = NEW.caretaker AND B.start_date = NEW.start_date 
    AND B.end_date = NEW.end_date;
  END IF; 
RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid8_select_bid_if_full_timer
AFTER INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE select_bid_if_full_timer();

-- also need a cron job to
-- automatically select a bid two days before start date if still active

--CREATE VIEW salary (caretaker, month_year, amount) AS
--  SELECT B.caretaker, DATE_TRUNC('month', B.end_date), SUM(B.total_price)
--  FROM bids B
--  WHERE B.is_selected AND B.end_date < CURRENT_DATE
--  GROUP BY B.caretaker, DATE_TRUNC('month', B.end_date);
-- we likely need a function or something to query for an individual user,
-- if we cannot select a specific user from this view.

-- part-time availabilities triggers
-- 1. no overlaps
CREATE OR REPLACE FUNCTION pt_no_overlaps()
RETURNS TRIGGER AS
$$ BEGIN
IF EXISTS (
  SELECT 1 
  FROM part_time_availabilities PTA 
  WHERE NEW.caretaker = PTA.caretaker
  AND (NEW.start_date, NEW.end_date + 1) OVERLAPS (PTA.start_date, PTA.end_date + 1)
  THEN
  RAISE EXCEPTION 'this availability overlaps with an existing availability';
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
  AND (B.start_date, B.end_date + 1) OVERLAPS (OLD.start_date, OLD.end_date + 1)
  THEN 
    RAISE EXCEPTION 'cannot remove availability when there is already an accepted bid';
  ELSE
    RETURN OLD;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER pt2_validate_no_selected_bids
BEFORE DELETE ON part_time_availabilities
FOR EACH ROW EXECUTE PROCEDURE pt_reject_if_any_selected();

-- 3. if availabilities is deleted, mark all active unselected bids as inactive
CREATE OR REPLACE FUNCTION pt_deactive_active_bids()
RETURNS TRIGGER AS
$$ BEGIN
UPDATE bids B
SET is_active = false
WHERE OLD.caretaker = B.caretaker
AND B.is_active
AND (OLD.start_date, OLD.end_date + 1) OVERLAPS (B.start_date, B.end_date);
RETURN OLD;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER pt3_mark_active_bids_inactive
AFTER DELETE ON part_time_availabilities
FOR EACH ROW EXECUTE PROCEDURE pt_deactive_active_bids();


-- full-time leaves triggers
-- 1. ensure no overlaps for the same user within the table.
CREATE OR REPLACE FUNCTION ft_no_overlaps()
RETURNS TRIGGER AS
$$ BEGIN
IF EXISTS (
  SELECT 1 
  FROM full_time_leaves FTL 
  WHERE NEW.caretaker = FTL.caretaker
  AND (NEW.start_date, NEW.end_date + 1) OVERLAPS (FTL.start_date, FTL.end_date + 1))
THEN
  RAISE EXCEPTION 'this leave overlaps with an existing leave';
ELSE
  RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft1_validate_no_overlap
BEFORE INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_no_overlaps();

-- 2. only allow leave if they do not have any selected in that period
CREATE OR REPLACE FUNCTION ft_reject_if_any_selected()
RETURNS TRIGGER AS 
$$ BEGIN
IF EXISTS (
  SELECT 1
  FROM bids B
  WHERE NEW.caretaker = B.caretaker
  AND B.is_selected AND B.is_active
  AND (NEW.start_date, NEW.end_date + 1) OVERLAPS (B.start_date, B.end_date + 1))
THEN 
  RAISE EXCEPTION 'cannot take leave there is already a bid for this period';
ELSE
  RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft2_validate_no_selected_bids
BEFORE INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_reject_if_any_selected();

-- cur year is the first day of the current year (1st Jan XXXX)
CREATE OR REPLACE FUNCTION ft_year_can_meet_req(year_to_check DATE, caretaker_user VARCHAR(256))
RETURNS BOOLEAN
AS 
$$ DECLARE num_match INTEGER := 0;
   DECLARE prev_end DATE; -- day before working day, so if working day was 1st jan, this would be 31st dec
   DECLARE first_iter BOOLEAN := true;
   DECLARE temprow full_time_leaves%ROWTYPE;
BEGIN
  FOR temprow IN (
    SELECT F.start_date, F.end_date
    FROM full_time_leaves F
    WHERE F.caretaker = caretaker_user
    AND (year_to_check = date_trunc('year', F.start_date)
    OR year_to_check = date_trunc('year', F.end_date))
    ORDER BY F.start_date
  ) LOOP
    IF first_iter AND date_trunc('year', temprow.start_date) != year_to_check
    THEN 
      prev_end := temprow.end_date;
      first_iter := false;
      CONTINUE;
    ELSE 
      prev_end := year_to_check - interval '1 day';
      first_iter := false;
    END IF;
    IF temprow.start_date - prev_end - interval '1 day' >= interval '150 days'
    THEN num_match := num_match + 1;
    END IF;
    prev_end := temprow.end_date;
  END LOOP;
  -- to count remaining days in the year after the last leave
  IF date_trunc('year', prev_end) = year_to_check 
  AND year_to_check + interval '1 year' - prev_end - interval '1 day' >= interval '150 days'
  THEN num_match := num_match + 1;
  END IF;
  IF date_trunc('year', prev_end) = year_to_check 
  AND year_to_check + interval '1 year' - prev_end - interval '1 day' >= interval '300 days'
  THEN num_match := num_match + 1;
  END IF;
  IF num_match >= 2 OR first_iter
  THEN RETURN true;
  ELSE RETURN false;
  END IF;
END; $$
LANGUAGE plpgsql;

-- 1. check whether still possible to meet full-time requirement of
-- 2 x 150 conseucitve days / yr. otherwise reject leave
CREATE OR REPLACE FUNCTION ft_meets_req()
RETURNS TRIGGER AS
$$ BEGIN
-- reject if more than 365 days, as that would mean fail to 
-- meet requirement in one of the years.
IF NEW.end_date - NEW.start_date + 1 >= 365
THEN RAISE EXCEPTION 'full time requirements will fail if this leave is accepted';
END IF;
-- same year
IF date_trunc('year', NEW.start_date) = date_trunc('year', NEW.end_date)
  AND ft_year_can_meet_req(date(date_trunc('year', NEW.start_date)), NEW.caretaker)
THEN
  RETURN NEW;
-- different years
ELSIF date_trunc('year', NEW.start_date) != date_trunc('year', NEW.end_date)
  AND ft_year_can_meet_req(date(date_trunc('year', NEW.start_date)), NEW.caretaker)
  AND ft_year_can_meet_req(date(date_trunc('year', NEW.end_date)), NEW.caretaker)
THEN
  RETURN NEW;
ELSE 
  RAISE EXCEPTION 'full time requirements will fail if this leave is accepted';
END IF;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft3_validate_meet_reqs
BEFORE INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_meets_req();

-- 4. if leave is allowed, mark all active bids in that period as inactive. there shouldn't be
-- any selected by the previous trigger
CREATE OR REPLACE FUNCTION ft_deactive_active_bids()
RETURNS TRIGGER AS
$$ BEGIN
UPDATE bids B
SET is_active = false
WHERE NEW.caretaker = B.caretaker
AND B.is_active
AND (NEW.start_date, NEW.end_date + 1) OVERLAPS (B.start_date, B.end_date + 1);
RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER ft4_mark_active_bids_inactive
AFTER INSERT OR UPDATE ON full_time_leaves
FOR EACH ROW EXECUTE PROCEDURE ft_deactive_active_bids();

-- categories trigger
-- after creating a category, set a min price of 1, and have admin update it afterwards
CREATE OR REPLACE FUNCTION add_global_min_price()
RETURNS TRIGGER AS
$$ BEGIN
INSERT into min_daily_prices
VALUES (NEW.name, 1);
RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER cat1_add_global_min_price
AFTER INSERT ON categories
FOR EACH ROW EXECUTE PROCEDURE add_global_min_price();

-- daily prices trigger
-- before inserting or updating, ensure that it is greater than or equal to the global rpice
CREATE OR REPLACE FUNCTION check_daily_price()
RETURNS TRIGGER AS
$$ BEGIN
IF NEW.price < (SELECT price FROM min_daily_prices WHERE category = NEW.category)
THEN RAISE EXCEPTION 'Entered daily price is less than minimum set by PCS %', min_price;
ELSE RETURN NEW;
END IF;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER dp1_check_more_than_global
BEFORE INSERT OR UPDATE ON daily_prices
FOR EACH ROW EXECUTE PROCEDURE check_daily_price();

-- min_daily_prices trigger
-- after inserting or updating, update all daily_prices for the same categories that is less than it to be equals to it
CREATE OR REPLACE FUNCTION update_daily_price()
RETURNS TRIGGER AS
$$ 
BEGIN
UPDATE daily_prices D
SET price = NEW.price
WHERE NEW.category = D.category AND D.price < NEW.price;
RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER mdp1_update_daily_price
AFTER INSERT OR UPDATE ON min_daily_prices
FOR EACH ROW EXECUTE PROCEDURE check_daily_price();

