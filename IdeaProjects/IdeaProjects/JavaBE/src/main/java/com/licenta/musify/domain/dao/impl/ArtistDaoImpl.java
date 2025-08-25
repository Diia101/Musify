package com.licenta.musify.domain.dao.impl;

import com.licenta.musify.domain.dao.ArtistDao;
import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.domain.mapper.AlbumMapper;
import com.licenta.musify.domain.mapper.ArtistMapper;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.ArtistIncorrectUserNumberException;
import com.licenta.musify.exceptions.ArtistNotFoundException;
import com.licenta.musify.exceptions.UserNotFoundException;
import com.licenta.musify.repository.ArtistRepository;
import com.licenta.musify.repository.UserRepository;
import com.licenta.musify.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class ArtistDaoImpl implements ArtistDao {

    public static final String ARTIST_WITH_ID_S_NOT_FOUND = "Artist  with id '%s' not found";
    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;
    private final AlbumMapper albumMapper;
    private final ArtistMapper artistMapper;

    @Override
    @Transactional(readOnly = true)
    public ArtistDto getById(Integer id) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ArtistNotFoundException((ARTIST_WITH_ID_S_NOT_FOUND.formatted(id))));

        return artistMapper.toViewDto(artist);
    }

    @Override
    @Transactional
    public void createArtist(ArtistCreateDto artistCreateDto) {
        Artist artist = artistMapper.toEntity(artistCreateDto);

        if(artist.getUserList() == null)
            artist.setUserList(new ArrayList<>());

        for (Integer id : artistCreateDto.getUserIds()) {
            User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Invalid user id '%s'".formatted(id)));
            artist.getUserList().add(user);
        }

        if (artist.getUserList().size() == 1 && !artist.isPerson() || artist.getUserList().size() > 1 && artist.isPerson()) {
            throw new ArtistIncorrectUserNumberException("Number of members and artist type don't match");
        }

        artistRepository.save(artist);
    }


    @Override
    @Transactional
    public ArtistDto updateArtist(Integer id, ArtistCreateDto artistCreateDto) {

        Artist artistToUpdate = artistRepository.findById(id)
                .orElseThrow(() -> new ArtistNotFoundException((ARTIST_WITH_ID_S_NOT_FOUND).formatted(id)));

        artistToUpdate.setUserList(new ArrayList<>());
        artistToUpdate.setArtistName(artistCreateDto.getArtistName());
        artistToUpdate.setLocation(artistCreateDto.getLocation());
        artistToUpdate.setActivePeriod(artistCreateDto.getActivePeriod());
        artistToUpdate.setPerson(artistCreateDto.isPerson());

        for (Integer i : artistCreateDto.getUserIds()) {
            User user = userRepository.findById(i).orElseThrow(() -> new UserNotFoundException("Invalid user id '%s'".formatted(i)));
            artistToUpdate.getUserList().add(user);
        }

        if (artistToUpdate.getUserList().size() == 1 && !artistToUpdate.isPerson() || artistToUpdate.getUserList().size() > 1 && artistToUpdate.isPerson()) {
            throw new ArtistIncorrectUserNumberException("Number of members and artist type don't match");
        }

        return artistMapper.toViewDto(artistRepository.save(artistToUpdate));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtistDto> getArtists() {
        List<Artist> allArtist = artistRepository.findAll();
        return artistMapper.toListView(allArtist);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtistDto> searchByName(String searchName) {
        List<Artist> artistByName = artistRepository.searchByName(searchName);
        return artistMapper.toListView(artistByName);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlbumDto> getAlbumsByArtistId(Integer artistId) {
        Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new ArtistNotFoundException("Artist not found"));

        return artist.getAlbums().stream().map(albumMapper::toViewDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ArtistDto getByUserId() {
        Integer userId = SecurityUtil.getAuthenticatedUserId();
        Artist artist = artistRepository.findArtistByUserId(userId).orElseThrow(() -> new ArtistNotFoundException("Artist not found"));

        return artistMapper.toViewDto(artist);
    }

    @Override
    @Transactional(readOnly = true)
    public ArtistDto getByUserId(Integer userId) {
        Artist artist = artistRepository.findArtistByUserId(userId).orElseThrow(() -> new ArtistNotFoundException("Artist not found"));

        return artistMapper.toViewDto(artist);
    }

    @Override
    public void deleteArtist(Integer id) {
        artistRepository.deleteById(id);
    }
}
