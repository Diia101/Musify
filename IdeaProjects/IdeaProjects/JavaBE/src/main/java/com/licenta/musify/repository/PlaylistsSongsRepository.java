package com.licenta.musify.repository;

import com.licenta.musify.domain.model.Playlist;
import com.licenta.musify.domain.model.PlaylistsSongs;
import com.licenta.musify.domain.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistsSongsRepository extends JpaRepository<PlaylistsSongs, Integer> {
    List<Song> findByPlaylist(Playlist playlist);
}
