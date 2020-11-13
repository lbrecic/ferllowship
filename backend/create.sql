create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
create table admin (iban varchar(34), id_photo_link varchar(200), player_id uuid not null, primary key (player_id))
create table ban (ban_id uuid not null, ban_end date, user_id uuid, primary key (ban_id))
create table card (card_id uuid not null, card_points int4, scale_factor int4, location_id uuid, player_id uuid, primary key (card_id))
create table cartograph (iban varchar(34) not null, id_photo_link varchar(200) not null, player_id uuid not null, primary key (player_id))
create table category (category_id uuid not null, category_name varchar(32), category_points int4, primary key (category_id))
create table confirmation (token_id uuid not null, token varchar(255), player_id uuid not null, primary key (token_id))
create table fight (fight_id uuid not null, duration int8, start timestamp, user_id uuid, primary key (fight_id))
create table location (location_id uuid not null, coordinates varchar(32), location_desc varchar(255), location_name varchar(32), location_photo_link varchar(200), location_status int4, category_id uuid, primary key (location_id))
create table path (path_id uuid not null, distance int4, location_id uuid, primary key (path_id))
create table player (player_id uuid not null, activity boolean, ban_status int4, email varchar(128), enabled boolean, expirience int4, pass_hash varchar(256) not null, photo_link varchar(200) not null, points int4, username varchar(32), primary key (player_id))
alter table player add constraint UK_oivbimcon0iqmb8efpv723h08 unique (email)
alter table player add constraint UK_o39xn8lmj05iew7d2tgw836jy unique (username)
alter table admin add constraint FKf8ra86ik6mw5kx879oi6nb8ow foreign key (player_id) references player
alter table ban add constraint FK42qqpshkmh09uu3fuwm7rcghw foreign key (user_id) references player
alter table card add constraint FKlr7aeeck4nhoeple2gl1xtbe5 foreign key (location_id) references location
alter table card add constraint FKbyb0u8pl0bms3a11dql17ut0b foreign key (player_id) references player
alter table cartograph add constraint FKb89m49vokploi39mbsjut289y foreign key (player_id) references player
alter table confirmation add constraint FKs99jlbqcqrcvhwmrqjxijtt8e foreign key (player_id) references player
alter table fight add constraint FKiyialopqu6iropj7v1s67f7hh foreign key (user_id) references player
alter table location add constraint FKjjaw7rfp3x8vxdv1qpo4mmc6k foreign key (category_id) references category
alter table path add constraint FK5gfu4xx257vyb5j3aw4s6c1p9 foreign key (location_id) references location
