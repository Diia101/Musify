package com.licenta.musify.repository;

import com.licenta.musify.domain.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    @Query(value = "SELECT * FROM playlists WHERE is_public=FALSE AND owner_id=%:ownerId% ", nativeQuery = true)
    List<Playlist> getPrivatePlaylists(@Param("ownerId") Integer ownerId);

    @Query(value = "SELECT * FROM playlists WHERE is_public=FALSE AND owner_id=%:ownerId% AND (name ILIKE %:playlistName%)", nativeQuery = true)
    List<Playlist> getPrivatePlaylists(@Param("ownerId") Integer ownerId, @Param("playlistName") String playlistName);

    @Query(value = "select * from playlists where is_public is true and (:playlistName is null or name ILIKE %:playlistName%)", nativeQuery = true)
    List<Playlist> getAllPublicPlaylistsByName(@Param("playlistName") String name);
}
