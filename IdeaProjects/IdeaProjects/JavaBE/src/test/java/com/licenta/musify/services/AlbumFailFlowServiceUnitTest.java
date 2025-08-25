package com.licenta.musify.services;

import com.licenta.musify.domain.dao.impl.AlbumsDaoImpl;
import com.licenta.musify.domain.model.Album;
import com.licenta.musify.exceptions.AlbumNotFoundException;
import com.licenta.musify.exceptions.SongNotFoundException;
import com.licenta.musify.repository.AlbumRepository;
import com.licenta.musify.repository.SongRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class AlbumFailFlowServiceUnitTest {

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private SongRepository songRepository;

    @InjectMocks
    private AlbumsDaoImpl albumDao;

    @Test
    public void whenSongAddedToAlbum_thenFail() {
        Integer albumId = 3;
        Integer songId = 4;

        given(albumRepository.findById(albumId)).willReturn(Optional.of(new Album()));
        given(songRepository.findById(Long.valueOf(songId))).willReturn(Optional.empty());

        SongNotFoundException exception = assertThrows(SongNotFoundException.class, () -> {
            albumDao.addSongsToAlbum(albumId, songId);
        });

        assertEquals("Song not found", exception.getMessage());
    }

    @Test
    public void whenAlbumNotFound_thenThrowAlbumNotFoundException() {
        Integer albumId = 4;
        Integer songId = 2;

        given(albumRepository.findById(albumId)).willReturn(Optional.empty());

        AlbumNotFoundException exception = assertThrows(AlbumNotFoundException.class, () -> {
            albumDao.addSongsToAlbum(albumId, songId);
        });

        assertEquals("Album not found", exception.getMessage());
    }
}
