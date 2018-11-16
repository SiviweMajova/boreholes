-- create table borehole (
--  id int not null AUTO_INCREMENT,
--  name varchar(100) not null,
--  latitude decimal(11,7) not null,
--  longitude decimal(11,7) not null,
--  elevation double not null,
--  primary key (id)
-- ) DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- ALTER TABLE borehole
-- ADD COLUMN b_type varchar(50) AFTER name;

create table waterlevel (
id int not null AUTO_INCREMENT,
read_date date not null,
reading double not null,
borehole_id int not null,

primary key (id),
constraint borehole_waterlevel foreign key(borehole_id) references borehole(id)
on delete cascade

)DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;