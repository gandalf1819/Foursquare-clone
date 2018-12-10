DROP PROCEDURE IF EXISTS create_note;

CREATE PROCEDURE `create_note`(
	IN `userId` INT,
	IN `locId` INT,
	IN `description` TEXT,
	IN `sharedWith` VARCHAR(50),
	IN `radiusOfInterest` INT,
	IN `setDate` TIMESTAMP,
	IN `startDate` DATE,
	IN `endDate` DATE,
	IN `startTime` TIME,
	IN `endTime` TIME,
	IN `intervalVal` INT,
	IN `areCommentsAllowed` VARCHAR(50)
)

LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN

insert into note(user_id, loc_id, description, shared_with, radius_of_interest, set_date, start_date, end_date, start_time, end_time, `interval`, are_comments_allowed) values(userId, locId, description, sharedWith, radiusOfInterest, setDate, startDate, endDate, startTime, endTime, intervalVal,areCommentsAllowed );

select last_insert_id() as note_id;

END
