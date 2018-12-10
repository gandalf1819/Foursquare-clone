DROP PROCEDURE IF EXISTS create_filter;

CREATE PROCEDURE `create_filter`(
	IN `userId` INT,
	IN `stateId` INT,
	IN `userType` VARCHAR(50),
	IN `locId` INT,
	IN `eventDate` DATE,
	IN `eventTime` TIME
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN

DECLARE filterId INT;
select filter_id into filterId from filter where user_id = userId and (case when stateId is null then state_id is null else state_id = stateId end) limit 1;

insert into filter(user_id, state_id, user_type, loc_id, event_date, event_time) values(userId, stateId, userType, locId, eventDate, eventTime)
on duplicate key update user_type =userType, loc_id = locId, event_date = eventDate, event_time = eventTime;


IF filterId IS NULL THEN
	select last_insert_id() as filter_id;
ELSE
	select filterId as filter_id;
END IF;

END
