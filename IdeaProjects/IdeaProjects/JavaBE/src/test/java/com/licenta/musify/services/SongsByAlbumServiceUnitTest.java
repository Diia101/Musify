package com.licenta.musify.services;

import com.licenta.musify.domain.dao.impl.AlbumsDaoImpl;
import com.licenta.musify.domain.model.Album;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.exceptions.AlbumNotFoundException;
import com.licenta.musify.repository.AlbumRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class SongsByAlbumServiceUnitTest {

    @Mock
    private AlbumRepository albumRepository;

    @InjectMocks
    private AlbumsDaoImpl albumDao;

    @BeforeAll
    public static void beforeAll() {
        MockitoAnnotations.openMocks(SongsByAlbumServiceUnitTest.class);
    }

    @Test
    public void whenGetSongsByAlbumId_thenHappyFlow() {
        Integer albumId = 3;
        List<Song> songs = Arrays.asList(Song.builder().id(1).title("A").alternative_title("1").duration(120).creation_date(Date.valueOf("2000-12-12")).build(), Song.builder().id(2).title("BB").alternative_title("22").duration(87).creation_date(Date.valueOf("2001-11-13")).build());

        Album album = Album.builder().albumId(3).title("Album3").description("D3").artist(new Artist()).genre("g3").releaseDate(Date.valueOf("2024-07-16")).label("l3").songs(songs).build();

        given(albumRepository.findById(albumId)).willReturn(Optional.of(album));

        List<String> expectedTitles = Arrays.asList("A", "BB");

        List<String> retrievedTitles = albumDao.getSongsByAlbumId(albumId);

        assertEquals(expectedTitles, retrievedTitles);
    }

    @Test
    public void whenGetSongsByAlbumId_thenThrowAlbumNotFoundException() {
        Integer albumId = 3;

        given(albumRepository.findById(albumId)).willReturn(Optional.empty());

        AlbumNotFoundException exception = assertThrows(AlbumNotFoundException.class, () -> {
            albumDao.getSongsByAlbumId(albumId);
        });

        assertEquals("Album with id '3' not found", exception.getMessage());
    }
}
