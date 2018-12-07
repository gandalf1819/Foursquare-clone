DROP PROCEDURE IF EXISTS get_public_notes;

CREATE PROCEDURE `get_public_notes`(
	IN `filterId` INT
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN

select distinct n.*, nu.first_name, nu.last_name from note n
inner join user nu
on n.user_id = nu.id
inner join note_tag nt
on n.note_id = nt.note_id
and n.shared_with ="Public"
inner join
location l on n.loc_id = l.loc_id
inner join
(select f.*, lo.latitude, lo.longitude, ft.tag_id from user u
inner join filter f on
u.id=f.user_id
inner join location lo
on f.loc_id = lo.loc_id
inner join filter_tag ft
on ft.filter_id = f.filter_id
and f.filter_id = filterId) filter_data
on nt.tag_id = filter_data.tag_id
where lat_lng_distance(l.latitude,l.longitude, filter_data.latitude, filter_data.longitude) <= n.radius_of_interest
and (case when filter_data.event_date > n.start_date then 1 when filter_data.event_date =    n.start_date then n.start_time <= filter_data.event_time  end)
and (case when n.end_date is null and n.end_time is null and n.interval is not null then datediff(filter_data.event_date, n.start_date)%n.interval = 0
when n.end_date is null and n.end_time is not null and n.interval is null then n.start_time <=filter_data.event_time and n.end_time >= filter_data.event_time
when n.end_date is null and n.end_time is not null and n.interval is not null then n.start_time <=filter_data.event_time and n.end_time >= filter_data.event_time and datediff(filter_data.event_date, n.start_date)%n.interval = 0
when n.end_date is not null and n.end_time is null and n.interval is null then n.end_date >= filter_data.event_date
when n.end_date is not null and n.end_time is null and n.interval is not null then n.end_date >= filter_data.event_date and datediff(filter_data.event_date, n.start_date)%n.interval = 0
when n.end_date is not null and n.end_time is not null and n.interval is null then n.end_date >= filter_data.event_date and n.start_time <=filter_data.event_time and n.end_time >= filter_data.event_time
when n.end_date is not null and n.end_time is not null and n.interval is not null then n.end_date >= filter_data.event_date and n.start_time <=filter_data.event_time and n.end_time >= filter_data.event_time and datediff(filter_data.event_date, n.start_date)%n.interval = 0
else 1
end);

END
