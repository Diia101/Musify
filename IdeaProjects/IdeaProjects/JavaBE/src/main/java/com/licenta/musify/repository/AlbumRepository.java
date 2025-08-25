package com.licenta.musify.repository;


import com.licenta.musify.domain.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer> {
    @Query(value = "SELECT album_id, title, description, artist_id, genre, release_date, label FROM albums", nativeQuery = true)
    List<Album> findAll();

    @Query(value = "SELECT * FROM albums WHERE (:name is null or title ILIKE %:name%)", nativeQuery = true)
    List<Album> findByTitle(@Param("name") String name);

    @Query(value = "SELECT * FROM albums WHERE (:genre is null or genre ILIKE %:genre%)", nativeQuery = true)
    List<Album> findByGenre(@Param("genre") String genre);
}
