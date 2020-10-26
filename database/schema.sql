-- Drop table if already exists
drop table locations;

-- Create table dept_manager
create table locations (
	loc_id serial primary key,
	location varchar(100) not null,
    description varchar not null,
	city varchar(50) not null,
	state varchar(50) not null,
	state_abbrev varchar(2) not null,
	country varchar(50) not null,
	longitude double precision not null,
	latitude double precision not null,
	city_longitude double precision not null,
	city_latitude double precision not null
);