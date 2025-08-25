package com.licenta.musify.services;

import com.licenta.musify.domain.dao.impl.PlaylistDaoImpl;
import com.licenta.musify.domain.model.Playlist;
import com.licenta.musify.domain.model.PlaylistSongComparator;
import com.licenta.musify.domain.model.PlaylistsSongs;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.exceptions.SongAlreadyExists;
import com.licenta.musify.repository.PlaylistRepository;
import com.licenta.musify.repository.PlaylistsSongsRepository;
import com.licenta.musify.repository.SongRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.TreeSet;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PlaylistServiceUnitTest {

    @InjectMocks
    private PlaylistDaoImpl playlistDao;

    @Mock
    private PlaylistRepository playlistRepository;

    @Mock
    private SongRepository songRepository;

    @Mock
    private PlaylistsSongsRepository playlistsSongsRepository;

    @Test
    public void whenSongAddedToPlaylist_thenFlowAsExpected() {
        Integer playlistId = 11111;
        int songId = 88888;

        Song songFromDb = Song.builder()
                .id(songId)
                .title("Song Test")
                .alternative_title("Song Test")
                .duration(0)
                .creation_date(Date.valueOf("2024-07-12"))
                .build();

        Playlist playlistFromDb = Playlist.builder()
                .playlistId(playlistId)
                .name("Playlist Test")
                .isPublic(true)
                .createdDate(Date.valueOf("2024-07-10"))
                .lastUpdateDate(Date.valueOf("2024-07-10"))
                .playlistsSongs(new TreeSet<>(new PlaylistSongComparator()))
                .build();

        PlaylistsSongs playlistsSongs = PlaylistsSongs.builder()
                .song(songFromDb)
                .playlist(playlistFromDb)
                .positionInPlaylist(0)
                .build();

        when(songRepository.findById((long) songId)).thenReturn(Optional.of(songFromDb));
        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlistFromDb));
        when(playlistsSongsRepository.save(any())).thenReturn(playlistsSongs);

        playlistDao.addSongToPlaylist(playlistId, songId);

        assertEquals(1, playlistFromDb.getPlaylistsSongs().size());

        PlaylistsSongs saved = playlistFromDb.getPlaylistsSongs().iterator().next();
        assertEquals(songFromDb, saved.getSong());
        assertEquals(0, saved.getPositionInPlaylist());
    }

    @Test
    public void whenSongAlreadyInPlaylist_thenThrowsError() {
        Integer playlistId = 11111;
        int songId = 88888;

        Song songFromDb = Song.builder()
                .id(songId)
                .title("Song Test")
                .alternative_title("Song Test")
                .duration(0)
                .creation_date(Date.valueOf("2024-07-12"))
                .build();

        PlaylistsSongs existingLink = PlaylistsSongs.builder()
                .song(songFromDb)
                .positionInPlaylist(0)
                .build();

        Playlist playlistFromDb = Playlist.builder()
                .playlistId(playlistId)
                .name("Playlist Test")
                .isPublic(true)
                .createdDate(Date.valueOf("2024-07-10"))
                .lastUpdateDate(Date.valueOf("2024-07-10"))
                .playlistsSongs(new TreeSet<>(new PlaylistSongComparator()))
                .build();

        playlistFromDb.getPlaylistsSongs().add(existingLink);
        existingLink.setPlaylist(playlistFromDb);

        when(songRepository.findById((long) songId)).thenReturn(Optional.of(songFromDb));
        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlistFromDb));

        SongAlreadyExists exception = assertThrows(
                SongAlreadyExists.class,
                () -> playlistDao.addSongToPlaylist(playlistId, songId)
        );

        assertEquals("Song already exists in playlist", exception.getMessage());
    }
}
