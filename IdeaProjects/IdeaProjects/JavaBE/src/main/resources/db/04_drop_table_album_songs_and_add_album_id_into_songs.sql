drop table albums_songs ;

alter table songs 
add column album_id integer;

ALTER TABLE songs
ADD constraint fk_album_id foreign key (album_id) references albums(album_id);

update songs
set album_id = 2
where song_id = 1;

update songs
set album_id = 2
where song_id = 2;

update songs
set album_id = 1
where song_id = 3;
