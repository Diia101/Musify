alter table users
add column is_deleted bool;

alter table users
alter is_deleted set default false;

-- SONGS
insert into songs(title, alternative_title, duration, creation_date) values
('A','1',120,'2000-12-12'),
('B','2',87,'2001-11-13'),
('C','3',171,'1999-07-19');

-- ARTISTS
insert into artists(artist_name, "location", active_period, is_person) values
('Name1','Location1',1998,true),
('Name2','Location1',1999,false),
('Name3','Location2',1998,true);

-- ARTISTS SONGS
insert into artists_songs(artist_id, song_id) values
(1,1),
(1,3),
(2,2);

-- ALBUMS
insert into albums(title, description, artist_id, genre, release_date, "label") values
('Album1','D1',1,'g1','2000-11-11','l1'),
('Album2','D2',2,'g2','2000-10-11','l2');


-- ALBUMS SONGS
insert into albums_songs(album_id, song_id) values
(1,3),
(2,2);

-- ROLES
insert into roles("type") values
('admin'),
('regular');

-- USERS
insert into users(firstname, lastname, email, user_password, country, role_id, is_active, birthday) values
('FN1 - A','LN1 - A','em1@gmail.com','p1','C1',2,true,'1982-07-19'),
('FN2 - B','LN2 - B','em2@gmail.com','p2','C2',2,true,'1982-07-19'),
('FN3 - C','LN3 - C','em3@gmail.com','p3','C3',2,true,'1982-07-19'),
('ADMIN', 'ADMIN', 'admin@gmail.com','p_admin','C2',1,true,'1977-08-02');

-- PLAYLISTS
insert into playlists("name", owner_id, is_public, created_date, last_update_date) values
('Playlist - User 1', 1, false, '2023-12-12','2024-01-15');

-- USER PLAYLISTS
insert into users_playlists(playlist_id, user_id) values
(1,2);

-- PLAYLISTS SONGS
insert into playlists_songs(playlist_id, song_id, position_in_playlist) values
(1,1,2),
(1,3,1);

-- ARTISTS USERS
insert into artists_users(user_id, artist_id) values
(1,1),
(3,3);
