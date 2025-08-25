create table songs if not exists(
	song_id serial primary key,
	title varchar(100) not null,
	alternative_title varchar(100) not null,
	duration integer,
	creation_date date
);

create table artists if not exists(
	artist_id serial primary key,
	artist_name varchar(100) not null,
	location varchar(100) not null,
	active_period integer not null,
	is_person bool default true
);

create table artists_songs if not exists(
	artist_song_id serial primary key,
	artist_id integer,
	song_id integer,
	constraint Albums_Songs_Albums_fk
		foreign key (artist_id) references artists(artist_id),
	constraint Albums_Songs_Songs_fk
		foreign key (song_id) references songs(song_id)
);

create table albums if not exists(
	 album_id serial primary key, 
	 title varchar(100) not null,
	 description varchar(100), 
	 artist_id integer not null,
	 genre varchar(100),
	 release_date date not null,
	 label varchar(100),
	 constraint Albums_Artist_fk
	  	foreign key (artist_id) references artists(artist_id)
);


create table albums_songs if not exists(
  	album_song_id serial primary key, 
  	album_id integer not null, 
  	song_id integer not null,
  	constraint Albums_Songs_Albums_fk
  		foreign key (album_id) references albums(album_id),
  	constraint Albums_Songs_Songs_fk
  		foreign key (song_id) references songs(song_id)
);


create table roles if not exists(
  	role_id serial primary key, 
 	type varchar(100)
);


create table users if not exists(
	user_id serial primary key, 
	firstname varchar(100) not null, 
	lastname varchar(100) not null, 
	email varchar(100) unique not null, 
	user_password varchar(100) not null, 
	country varchar(100) not null, 
	role_id integer not null, 
	is_active bool default true, 
	birthday date not null,
	constraint Users_Roles_fk
		foreign key (role_id) references roles(role_id)
);


create table playlists if not exists(
	playlist_id serial primary key,
	name varchar(100) not null,
	owner_id integer not null, 
	is_public bool not null, 
	created_date date not null, 
	last_update_date date not null,
	constraint Playlists_Owner_User_fk
		foreign key (owner_id) references users(user_id)
);


create table users_playlists if not exists(
  	user_playlist_id serial primary key,
  	playlist_id integer not null,
  	user_id integer not null,
  	constraint Users_Playlists_Users_fk
		foreign key (user_id) references users(user_id),
  	constraint Users_Playlists_Playlist_fk
		foreign key (playlist_id) references playlists(playlist_id)
);


create table playlists_songs if not exists(
	playlist_song_id serial primary key,
  	playlist_id integer not null,
	song_id integer not null,
	position_in_playlist integer not null,
  	constraint Playlists_Songs_Playlists_fk
		foreign key (playlist_id) references playlists(playlist_id),
  	constraint Playlists_Songs_Songs_fk
		foreign key (song_id) references songs(song_id)
);


create table artists_users if not exists(
	artist_user_id serial primary key,
	user_id integer not null,
	artist_id integer not null,
	constraint Artists_Users_Users_fk	
		foreign key (user_id) references users(user_id),
	constraint Artists_Users_Artists_fk
		foreign key (artist_id) references artists(artist_id)
);