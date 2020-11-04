DROP TRIGGER IF EXISTS ft1_validate_no_overlap ON full_time_leaves;
DROP TRIGGER IF EXISTS ft2_validate_no_selected_bids ON full_time_leaves;
DROP TRIGGER IF EXISTS ft3_validate_meet_reqs ON full_time_leaves;
DROP TRIGGER IF EXISTS ft4_mark_active_bids_inactive ON full_time_leaves;
DROP TRIGGER IF EXISTS pt1_validate_no_overlap ON part_time_availabilities;
DROP TRIGGER IF EXISTS pt2_validate_no_selected_bids ON part_time_availabilities;
DROP TRIGGER IF EXISTS pt3_mark_active_bids_inactive ON part_time_availabilities;
DROP TRIGGER IF EXISTS bid1_validate_starts_mt_2_days_later ON bids;
DROP TRIGGER IF EXISTS bid2_selected_make_inactive ON bids;
DROP TRIGGER IF EXISTS bid3_validate_caretaker_can_care_category ON bids;
DROP TRIGGER IF EXISTS bid4_caretaker_is_available ON bids;
DROP TRIGGER IF EXISTS bid5_caretaker_not_full ON bids;
DROP TRIGGER IF EXISTS bid6_validate_total_price ON bids;
DROP TRIGGER IF EXISTS bid7_remove_others_if_selected ON bids;
DROP TRIGGER IF EXISTS bid8_select_bid_if_full_timer ON bids;
DROP TRIGGER IF EXISTS dp1_check_more_than_global ON daily_prices;
DROP TRIGGER IF EXISTS cat1_update_daily_price ON categories;

-- 1. bid can only be created if start date is more than 2 days later
-- can't be a check as it is only on insert
CREATE OR REPLACE FUNCTION bid_starts_mt_2_days_later()
RETURNS TRIGGER AS
$$ BEGIN
  IF NEW.is_active AND NEW.start_date <= CURRENT_DATE + 2
  THEN RAISE EXCEPTION 'cannot create bid that starts less than 2 days from today';
  ELSE RETURN NEW;
END IF; END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid1_validate_starts_mt_2_days_later
BEFORE INSERT ON bids
FOR EACH ROW EXECUTE PROCEDURE bid_starts_mt_2_days_later();

CREATE OR REPLACE FUNCTION bid_selected_make_inactive()
RETURNS TRIGGER AS
$$ BEGIN
  IF NEW.is_selected AND NEW.is_active
  THEN NEW.is_active = false;
  END IF;
  RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid2_selected_make_inactive
BEFORE INSERT OR UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE bid_selected_make_inactive();

-- 3. caretaker should be able to care for pet category
CREATE OR REPLACE FUNCTION caretaker_can_care_category()
RETURNS TRIGGER AS
$$ BEGIN
  IF NOT NEW.is_active THEN RETURN NEW; END IF;
  IF NEW.start_date <= (CURRENT_DATE + 2) OR EXISTS (
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
$$ DECLARE i DATE := NEW.start_date;
BEGIN
  IF (SELECT C.is_part_time
  FROM caretakers C
  WHERE C.pcs_user = NEW.caretaker)
  THEN 
    WHILE i <= NEW.end_date LOOP
      IF NOT EXISTS (
        SELECT 1
        FROM part_time_availabilities P
        WHERE P.caretaker = NEW.caretaker 
        AND i BETWEEN P.start_date AND P.end_date)
      THEN RAISE EXCEPTION 'caretaker is not available';
      END IF;
      i := i + 1;
    END LOOP;
  ELSIF EXISTS (
    -- reject if any overlapping. we + 1 on both ends because we want it to be inclusive
      SELECT 1
      FROM full_time_leaves F
      WHERE F.caretaker = NEW.caretaker 
      AND (F.start_date, F.end_date + 1) OVERLAPS (NEW.start_date, NEW.end_date + 1))
  THEN RAISE EXCEPTION 'caretaker is not available';
  END IF;
  RETURN NEW;
END; $$
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
  IF NOT NEW.is_active THEN RETURN NEW; END IF;
  SELECT P.category INTO cat
  FROM pets P
  WHERE P.owner = NEW.pet_owner AND P.name = NEW.pet;
  IF NEW.total_price < (
      SELECT C.price * (date(NEW.end_date) - date(NEW.start_date) + 1)
      FROM categories C
      WHERE C.name = cat
    ) * (SELECT CASE 
            WHEN get_average_rating(NEW.caretaker) > 4.5 THEN 1.15
            WHEN get_average_rating(NEW.caretaker) > 4 THEN 1.1
            WHEN get_average_rating(NEW.caretaker) > 3 THEN 1.05
            ELSE 1
            END)
    OR NEW.total_price < (
      SELECT D.price * (date(NEW.end_date) - date(NEW.start_date) + 1)
      FROM daily_prices D
      WHERE D.caretaker = NEW.caretaker AND D.category = cat
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
        AND i BETWEEN B.start_date AND B.end_date) >= max_pet
      THEN 
        UPDATE bids B
        SET is_active = false
        WHERE B.caretaker = NEW.caretaker 
          AND B.is_active
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
    SET is_selected = true
    WHERE B.pet_owner = NEW.pet_owner AND B.pet = NEW.pet 
    AND B.caretaker = NEW.caretaker AND B.start_date = NEW.start_date 
    AND B.end_date = NEW.end_date;
  END IF; 
RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER bid8_select_bid_if_full_timer
AFTER INSERT ON bids
FOR EACH ROW EXECUTE PROCEDURE select_bid_if_full_timer();


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
  AND (NEW.start_date, NEW.end_date + 1) OVERLAPS (PTA.start_date, PTA.end_date + 1))
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
  AND (B.start_date, B.end_date + 1) OVERLAPS (OLD.start_date, OLD.end_date + 1))
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
    IF temprow.start_date - prev_end - 1 >= 150
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

-- daily prices trigger
-- before inserting or updating, ensure that it is greater than or equal to the global rpice
CREATE OR REPLACE FUNCTION check_daily_price()
RETURNS TRIGGER AS
$$ BEGIN
IF NEW.price < (SELECT C.price FROM categories C WHERE C.name = NEW.category)
THEN RAISE EXCEPTION 'Entered daily price is less than minimum set by PCS %', min_price;
ELSE RETURN NEW;
END IF;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER dp1_check_more_than_global
BEFORE INSERT OR UPDATE ON daily_prices
FOR EACH ROW EXECUTE PROCEDURE check_daily_price();

-- categories trigger
-- after inserting or updating, update all daily_prices for the same categories that is less than it to be equals to it
CREATE OR REPLACE FUNCTION update_daily_price()
RETURNS TRIGGER AS
$$ 
BEGIN
UPDATE daily_prices D
SET price = NEW.price
WHERE NEW.name = D.category AND D.price < NEW.price;
RETURN NEW;
END; $$
LANGUAGE plpgsql;

CREATE TRIGGER cat1_update_daily_price
AFTER INSERT OR UPDATE ON categories
FOR EACH ROW EXECUTE PROCEDURE update_daily_price();

