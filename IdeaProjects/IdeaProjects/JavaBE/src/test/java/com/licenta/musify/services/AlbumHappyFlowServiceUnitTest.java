package com.licenta.musify.services;

import com.licenta.musify.domain.dao.impl.AlbumsDaoImpl;
import com.licenta.musify.domain.mapper.AlbumMapper;
import com.licenta.musify.domain.model.Album;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.repository.AlbumRepository;
import com.licenta.musify.repository.SongRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AlbumHappyFlowServiceUnitTest {

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private AlbumMapper albumMapper;

    @Mock
    private SongRepository songRepository;

    @InjectMocks
    private AlbumsDaoImpl albumDaoImpl;

    @Test
    public void whenAlbumFound_thenCorrectAlbumReturned() {
        Integer idToSearchBy = 1;
        Album albumDb = Album.builder()
                .albumId(idToSearchBy)
                .title("AlbumTitle")
                .description("AlbumDescription")
                .artist(new Artist())
                .genre("AlbumGenre")
                .releaseDate(Date.valueOf("2024-05-05"))
                .label("AlbumLabel")
                .build();

        when(albumRepository.findById(idToSearchBy)).thenReturn(Optional.of(albumDb));

        Optional<Album> result = albumRepository.findById(idToSearchBy);

        assertEquals(idToSearchBy, result.get().getAlbumId());
    }

    @Test
    public void whenSongAdded_thenSongLinkedToAlbum() {
        Album albumDb = Album.builder()
                .albumId(1)
                .title("AlbumTitle")
                .description("AlbumDescription")
                .artist(new Artist())
                .genre("AlbumGenre")
                .releaseDate(Date.valueOf("2024-05-05"))
                .label("AlbumLabel")
                .songs(new ArrayList<>())
                .build();

        Song firstSongDb = Song.builder()
                .id(1)
                .title("First Song")
                .alternative_title("Alt Title")
                .duration(1)
                .creation_date(Date.valueOf("2022-01-01"))
                .artistsOfASong(new HashSet<>())
                .build();

        when(albumRepository.findById(1)).thenReturn(Optional.of(albumDb));
        when(songRepository.findById(1L)).thenReturn(Optional.of(firstSongDb));
        when(albumRepository.save(albumDb)).thenReturn(albumDb);

        albumDaoImpl.addSongsToAlbum(1, 1);

        assertNotNull(firstSongDb.getAlbum());
        assertEquals(1, firstSongDb.getAlbum().getAlbumId());
        assertEquals(1, albumDb.getSongs().size());
    }
}
