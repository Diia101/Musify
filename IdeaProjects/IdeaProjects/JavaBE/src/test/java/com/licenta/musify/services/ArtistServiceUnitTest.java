package com.licenta.musify.services;

import com.licenta.musify.domain.dao.impl.ArtistDaoImpl;
import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.domain.mapper.ArtistMapper;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.ArtistIncorrectUserNumberException;
import com.licenta.musify.exceptions.ArtistNotFoundException;
import com.licenta.musify.repository.ArtistRepository;
import com.licenta.musify.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ArtistServiceUnitTest {

    @Mock
    private ArtistRepository artistRepository;

    @Mock
    private ArtistMapper artistMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ArtistDaoImpl artistDao;

    @Test
    public void whenArtistAdded_thenFlowAsExpected() {
        List<Integer> userIds = Arrays.asList(10);
        ArtistCreateDto artistCreateDto = new ArtistCreateDto("Taylor", "Cluj", 10, true, userIds);
        Integer idArtist = 10;

        Artist artistDB = Artist.builder()
                .artistId(10)
                .artistName("maroon")
                .location("string")
                .activePeriod(0)
                .isPerson(true)
                .build();

        Artist updatedArtist = Artist.builder()
                .artistId(10)
                .artistName("Taylor")
                .location("Stockholm")
                .activePeriod(10)
                .isPerson(true)
                .build();

        given(artistRepository.findById(idArtist)).willReturn(Optional.of(artistDB));
        given(userRepository.findById(10)).willReturn(Optional.of(new User()));
        given(artistRepository.save(artistDB)).willReturn(updatedArtist);
        given(artistMapper.toViewDto(updatedArtist)).willReturn(new ArtistDto());

        ArtistDto result = artistDao.updateArtist(idArtist, artistCreateDto);

        verify(artistRepository).findById(idArtist);
        verify(userRepository).findById(10);
        verify(artistRepository).save(artistDB);
        verify(artistMapper).toViewDto(updatedArtist);
    }

    @Test
    public void whenArtistUpdated_thenThrowException() {
        List<Integer> userId = Arrays.asList(6);
        ArtistCreateDto artistCreateDto = new ArtistCreateDto("Taylor", "Cluj", 10, true, userId);
        Integer artistID = 2;

        when(artistRepository.findById(artistID)).thenThrow(new ArtistNotFoundException("Artist not found"));

        ArtistNotFoundException exception = assertThrows(ArtistNotFoundException.class, () -> {
            artistDao.updateArtist(artistID, artistCreateDto);
        });

        assertEquals("Artist not found", exception.getMessage());
    }

    @Test
    public void whenArtistAdded_thenFlowShouldFail() {
        List<Integer> userIds = Arrays.asList(1, 2);
        ArtistCreateDto artistCreateDto = new ArtistCreateDto("Taylor", "Cluj", 10, true, userIds);
        Integer idArtist = 4;

        Artist artistDb = Artist.builder()
                .artistId(idArtist)
                .artistName("maroon")
                .location("string")
                .activePeriod(0)
                .isPerson(true)
                .build();

        given(artistRepository.findById(idArtist)).willReturn(Optional.of(artistDb));
        given(userRepository.findById(1)).willReturn(Optional.of(new User()));
        given(userRepository.findById(2)).willReturn(Optional.of(new User()));

        ArtistIncorrectUserNumberException exception = assertThrows(ArtistIncorrectUserNumberException.class, () -> {
            artistDao.updateArtist(idArtist, artistCreateDto);
        });

        assertEquals("Number of members and artist type don't match", exception.getMessage());

        verify(artistRepository).findById(idArtist);
        verify(userRepository).findById(1);
        verify(userRepository).findById(2);
        verify(artistRepository, never()).save(any());
    }
}
