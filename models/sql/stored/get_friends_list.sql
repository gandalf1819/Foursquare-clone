DROP PROCEDURE IF EXISTS get_friends_list;

CREATE PROCEDURE `get_friends_list`(
IN `userId` INT,
)

LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN

DECLARE filterId INT;

SELECT u.first_name FROM USER AS u INNER JOIN friend_list AS fl ON u.id=fl.friend_id WHERE fl.user_id=userid;

/*
IF filterId IS NULL THEN
select last_insert_id() as filter_id;
ELSE
select filterId as filter_id;
END IF;

END FROM USER AS u INNER JOIN friend_list AS fl ON u.id=fl.friend_id WHERE fl.user_id=${regData.id};*?