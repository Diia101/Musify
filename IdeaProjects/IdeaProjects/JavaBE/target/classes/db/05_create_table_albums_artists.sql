create table albums_artists(
albums_artists_id serial primary key,
album_id integer,
artist_id integer,
constraint Albums_albums_artists_fk foreign key(album_id) references albums(album_id),
constraint Artists_albums_artists_fk foreign key(artist_id) references artists(artist_id)
);


insert into albums_artists (album_id, artist_id) values(1,1);
insert into albums_artists (album_id, artist_id) values(2,1);
insert into albums_artists (album_id, artist_id) values(3,3);


