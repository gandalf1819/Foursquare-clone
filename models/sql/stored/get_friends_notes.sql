DROP PROCEDURE IF EXISTS get_friends_notes;

CREATE PROCEDURE `get_friends_notes`(
	IN `filterId` INT
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN

DECLARE userId INT;
DECLARE userType VARCHAR(20);
DECLARE locId INT;
DECLARE latitudeValue DECIMAL(10,8) DEFAULT NULL;
DECLARE longitudeValue DECIMAL(10,8) DEFAULT NULL;
DECLARE eventDate DATE;
DECLARE eventTime TIME;
DECLARE tagsFlag INT DEFAULT 0;


select user_id ,loc_id, event_date, event_time into userId, locId, eventDate, eventTime from filter where filter_id = filterId;

IF locId is not null THEN
	select latitude, longitude into latitudeValue, longitudeValue from location where loc_id = locId;
END IF;

select count(1) into tagsFlag from filter_tag where filter_id = filterId;

select distinct n.*, nu.first_name, nu.last_name, l.area_name from user u
inner join friend_list fl on u.id=fl.user_id
and u.id = userId
and fl.action ='Accepted'
inner join note n on n.user_id=fl.friend_id
and n.shared_with!="Private"
inner join user nu
on n.user_id = nu.id
inner join note_tag nt
on n.note_id = nt.note_id
inner join
location l on n.loc_id = l.loc_id
where (case when latitudeValue is not null and longitudeValue is not null then lat_lng_distance(l.latitude,l.longitude, latitudeValue, longitudeValue) <= n.radius_of_interest else 1 end)
and (case when eventDate is not null then n.start_date <= eventDate else 1 end)
and (case when eventDate is null then 1 when eventDate > n.start_date then 1 when eventTime is null then 1 when eventDate = n.start_date then n.start_time <= eventTime else 1 end)
and (case when eventDate is null then 1 when n.end_date is null and n.end_time is null and n.interval is not null then datediff(eventDate, n.start_date)%n.interval = 0 else 1 end)
and (case when eventTime is null then 1 when n.end_date is null and n.end_time is not null and n.interval is null then n.start_time <=eventTime and n.end_time >= eventTime else 1 end)
and (case when eventDate is null and eventTime is null then 1 when n.end_date is null and n.end_time is not null and n.interval is not null then n.start_time <=eventTime and n.end_time >= eventTime and datediff(eventDate, n.start_date)%n.interval = 0 else 1 end)
and (case when eventDate is null then 1 when n.end_date is not null and n.end_time is null and n.interval is null then n.end_date >= eventDate else 1 end)
and (case when eventDate is null then 1 when n.end_date is not null and n.end_time is null and n.interval is not null then n.end_date >= eventDate and datediff(eventDate, n.start_date)%n.interval = 0 else 1 end)
and (case when eventDate is null and eventTime is null then 1 when n.end_date is not null and n.end_time is not null and n.interval is null then n.end_date >= eventDate and n.start_time <=eventTime and n.end_time >= eventTime else 1 end)
and (case when eventDate is null and eventTime is null then 1 when n.end_date is not null and n.end_time is not null and n.interval is not null then n.end_date >= eventDate and n.start_time <=eventTime and n.end_time >= eventTime and datediff(eventDate, n.start_date)%n.interval = 0 else 1 end)
and (case when tagsFlag > 0 then nt.tag_id in (select tag_id from filter_tag where filter_id = filterId) else 1 end);

END
