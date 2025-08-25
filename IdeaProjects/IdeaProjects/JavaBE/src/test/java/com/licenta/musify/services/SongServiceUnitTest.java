package com.licenta.musify.services;

import com.licenta.musify.domain.dao.impl.SongsDaoImpl;
import com.licenta.musify.domain.dto.*;
import com.licenta.musify.domain.mapper.SongMapper;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.ArtistNotFoundException;
import com.licenta.musify.exceptions.SongNotFoundException;
import com.licenta.musify.repository.ArtistRepository;
import com.licenta.musify.repository.SongRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SongServiceUnitTest {

    @Mock
    private SongRepository songRepository;
    @Mock
    private ArtistRepository artistRepository;
    @Mock
    private SongMapper songMapper;

    @InjectMocks
    private SongsDaoImpl songsDao;

    @Test
    public void whenSongUpdated_thenHappyFlow() {
        SongUpdateDto songUpdateDto = new SongUpdateDto("song1", "song1.2", 160);
        Long songId = 4L;
        Song songDB = Song.builder()
                .id(4)
                .title("title1")
                .alternative_title("string3")
                .duration(40)
                .build();

        given(songRepository.findById(songId)).willReturn(Optional.of(songDB));
        given(songRepository.save(songDB)).willReturn(songDB);

        songsDao.update(songId, songUpdateDto);

        assertEquals("song1", songDB.getTitle());
        assertEquals("song1.2", songDB.getAlternative_title());
        assertEquals(160, songDB.getDuration());
    }

    @Test
    public void whenSongUpdated_thenThrowException() {
        SongUpdateDto songUpdateDto = new SongUpdateDto("song1", "song1.2", 160);
        Long songId = 2L;
        when(songRepository.findById(songId)).thenThrow(new SongNotFoundException("Song not found"));

        SongNotFoundException exception = assertThrows(
                SongNotFoundException.class, () -> songsDao.update(songId, songUpdateDto)
        );
        assertEquals("Song not found", exception.getMessage());
    }

    @Test
    public void whenSongCreated_thenHappyFlow() {
        SongCreateDto dto = new SongCreateDto("acasa", "acasa departe", 130,
                Date.valueOf("2020-10-10"), "url", List.of(3));

        Artist artist = Artist.builder()
                .artistId(3)
                .artistName("name3")
                .songsOfAnArtist(Set.of())
                .location("Location2")
                .activePeriod(1998)
                .isPerson(true)
                .userList(List.of(new User()))
                .albums(List.of())
                .build();

        Song song = Song.builder()
                .title("acasa")
                .alternative_title("acasa departe")
                .duration(130)
                .creation_date(Date.valueOf("2020-10-10"))
                .artistsOfASong(Set.of(artist))
                .build();

        given(artistRepository.findAllById(List.of(3))).willReturn(List.of(artist));
        given(songMapper.toEntity(dto)).willReturn(song);
        given(songRepository.save(song)).willReturn(song);

        songsDao.create(dto);

        assertEquals("acasa", song.getTitle());
        assertEquals("acasa departe", song.getAlternative_title());
        assertEquals(130, song.getDuration());
        assertEquals(Date.valueOf("2020-10-10"), song.getCreation_date());
        assertTrue(song.getArtistsOfASong().contains(artist));
    }

    @Test
    public void whenSongCreated_thenThrowException() {
        SongCreateDto dto = new SongCreateDto("acasa", "acasa departe", 130, Date.valueOf("2020-10-10"), "url", List.of(4));

        ArtistNotFoundException exception = assertThrows(
                ArtistNotFoundException.class, () -> songsDao.create(dto)
        );
        assertEquals("No artist found with the ID [4]", exception.getMessage());
    }

    @Test
    void whenSongSearchByArtistName_thenHappyFlow() {
        String artistName = "name1";

        Song song = Song.builder()
                .title("piesa mea preferata")
                .alternative_title("psm")
                .duration(120)
                .creation_date(Date.valueOf("2024-07-17"))
                .build();

        SongArtistDto songArtistDto = new SongArtistDto();

        given(songRepository.findByArtistName(artistName)).willReturn(List.of(song));
        given(songMapper.toListViewSongArtist(List.of(song))).willReturn(List.of(songArtistDto));

        List<SongArtistDto> result = songsDao.searchByArtistName(artistName);

        assertEquals(List.of(songArtistDto), result);
    }

    @Test
    void whenSongsByArtistIds_thenHappyFlow() {
        Integer artistId = 1;
        Artist artist = Artist.builder()
                .artistId(1)
                .artistName("name1")
                .songsOfAnArtist(Set.of())
                .location("Location1")
                .activePeriod(1998)
                .isPerson(true)
                .userList(List.of(new User()))
                .albums(List.of())
                .build();

        Song song = Song.builder()
                .title("piesa mea preferata")
                .alternative_title("psm")
                .duration(120)
                .creation_date(Date.valueOf("2024-07-17"))
                .artistsOfASong(Set.of(artist))
                .build();

        SongArtistDto songArtistDto = new SongArtistDto();
        given(songRepository.findSongsByArtistID(artistId)).willReturn(List.of(song));
        given(songMapper.toListViewSongArtist(List.of(song))).willReturn(List.of(songArtistDto));

        List<SongArtistDto> result = songsDao.getSongByArtistId(artistId);

        assertEquals(List.of(songArtistDto), result);
    }

}
