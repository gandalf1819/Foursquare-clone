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

select n.* from user u
inner join friend_list fl on u.id=fl.user_id
and fl.action ='Accepted'
inner join note n on n.user_id=fl.friend_id
inner join note_tag nt
on n.note_id = nt.note_id
inner join
location l on n.loc_id = l.loc_id
inner join filter f on
u.id=f.user_id
and f.filter_id = filterId
inner join location lo
on f.loc_id = lo.loc_id
inner join filter_tag ft
on ft.filter_id = f.filter_id
and nt.tag_id = ft.tag_id
where lat_lng_distance(l.latitude,l.longitude, lo.latitude, lo.longitude) <= n.radius_of_interest
and (case when f.event_date > n.start_date then 1 when f.event_date =    n.start_date then n.start_time <= f.event_time  end)
and (case when n.end_date is null and n.end_time is null and n.interval is not null then datediff(f.event_date, n.start_date)%n.interval = 0
when n.end_date is null and n.end_time is not null and n.interval is null then n.start_time <=f.event_time and n.end_time >= f.event_time
when n.end_date is null and n.end_time is not null and n.interval is not null then n.start_time <=f.event_time and n.end_time >= f.event_time and datediff(f.event_date, n.start_date)%n.interval = 0
when n.end_date is not null and n.end_time is null and n.interval is null then n.end_date >= f.event_date
when n.end_date is not null and n.end_time is null and n.interval is not null then n.end_date >= f.event_date and datediff(f.event_date, n.start_date)%n.interval = 0
when n.end_date is not null and n.end_time is not null and n.interval is null then n.end_date >= f.event_date and n.start_time <=f.event_time and n.end_time >= f.event_time
when n.end_date is not null and n.end_time is not null and n.interval is not null then n.end_date >= f.event_date and n.start_time <=f.event_time and n.end_time >= f.event_time and datediff(f.event_date, n.start_date)%n.interval = 0
else 1
end);

END
