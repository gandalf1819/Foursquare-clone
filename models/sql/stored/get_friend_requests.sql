DROP PROCEDURE IF EXISTS get_friend_requests;

CREATE PROCEDURE `get_friends_requests`(
IN `userId` INT,
IN `friendId` INT,
IN `actionRequest` VARCHAR(50)
)

LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN

DECLARE filterId INT;

INSERT INTO friend_list(user_id, friend_id, action) VALUES (userId, friendId, actionRequest);

/*
IF filterId IS NULL THEN
select last_insert_id() as filter_id;
ELSE
select filterId as filter_id;
END IF;

END FROM USER AS u INNER JOIN friend_list AS fl ON u.id=fl.friend_id WHERE fl.user_id=${regData.id};*/