package com.licenta.musify.repository;

import com.licenta.musify.domain.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {


    @Query(value = "SELECT * FROM songs WHERE (:searchTitle is null OR title ILIKE %:searchTitle% OR alternative_title ILIKE %:searchTitle%)", nativeQuery = true)
    List<Song> findByTitleOrAlternativeTitle(@Param("searchTitle") String searchTitle);


    @Query(value = "SELECT s.* " +
            "FROM songs s " +
            "JOIN artists_songs as2 ON s.song_id = as2.song_id " +
            "JOIN artists a ON as2.artist_id = a.artist_id " +
            "WHERE artist_name ILIKE %:searchName%", nativeQuery = true)
    List<Song> findByArtistName(@Param("searchName") String artistName);


    @Query(value = "SELECT s.* " +
            "FROM songs s " +
            "JOIN artists_songs as2 ON s.song_id = as2.song_id " +
            "JOIN artists a ON as2.artist_id = a.artist_id " +
            "WHERE a.artist_id = :artistId", nativeQuery = true)
    List<Song> findSongsByArtistID(@Param("artistId") Integer artistId);

    @Query(value = "SELECT s.* " +
            "FROM songs s " +
            "JOIN artists_songs as2 ON s.song_id = as2.song_id " +
            "WHERE as2.artist_id = :artistId AND s.album_id IS NULL", nativeQuery = true)
    List<Song> findSongsAvailableForArtistAlbum(@Param("artistId") Integer artistId);
}
