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

insert into filter(user_id, state_id, user_type, loc_id, event_date, event_time) values(userId, stateId, userType, locId, eventDate, eventTime);

select last_insert_id() as filter_id;


END
