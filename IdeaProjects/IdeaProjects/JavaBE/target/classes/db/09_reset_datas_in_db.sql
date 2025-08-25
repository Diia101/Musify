delete from artists_songs;

delete from playlists_songs;

delete from users_playlists ;

delete from songs;

delete from users;

delete from artists_users ;

delete from albums;

delete from playlists ;

delete from artists;

alter sequence users_user_id_seq restart with 1;

alter sequence artists_users_artist_user_id_seq restart with 1;

alter sequence artists_artist_id_seq restart with 1;

alter sequence artists_songs_artist_song_id_seq restart with 1;

alter sequence songs_song_id_seq restart with 1;

alter sequence playlists_songs_playlist_song_id_seq restart with 1;

alter sequence playlists_playlist_id_seq restart with 1;

alter sequence users_playlists_user_playlist_id_seq restart with 1;

alter sequence albums_album_id_seq restart with 1;
