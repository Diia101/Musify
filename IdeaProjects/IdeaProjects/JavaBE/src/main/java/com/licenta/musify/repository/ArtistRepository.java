package com.licenta.musify.repository;

import com.licenta.musify.domain.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Integer> {

    @Query(value = "SELECT artist_id, artist_name, location , active_period ,is_person " +
            " FROM artists", nativeQuery = true)
    List<Artist> findAll();

    @Query(value = "SELECT * FROM artists" +
            " WHERE (:searchName is null OR artist_name ILIKE %:searchName% )", nativeQuery = true)
    List<Artist> searchByName(@Param("searchName") String searchName);

    @Query(value =

            "SELECT a.artist_id, a.artist_name, a.location, a.active_period, a.is_person," +
                    "s.song_id, s.title, s.alternative_title, s.duration, s.creation_date " +
                    "FROM artists a " +
                    "JOIN artists_songs as2 ON a.artist_id = as2.artist_id " +
                    "JOIN songs s ON as2.song_id = s.song_id " +
                    "WHERE s.title ILIKE %:searchSong% ", nativeQuery = true)
    List<Artist> findArtistBySongTitle(@Param("searchSong") String searchSongName);

    @Query(value = "SELECT a.* FROM artists a " +
            "JOIN artists_users au ON a.artist_id = au.artist_id " +
            "WHERE au.user_id = :userId LIMIT 1", nativeQuery = true)
    Optional<Artist> findArtistByUserId(@Param("userId") Integer userId);
}
