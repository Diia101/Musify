package com.licenta.musify.service.impl;

import com.licenta.musify.domain.dao.ArtistDao;
import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistServiceImpl implements ArtistService {

    private final ArtistDao artistDao;

    @Override
    public ArtistDto getArtistById(Integer id) {
        return artistDao.getById(id);
    }

    @Override
    public void createArtist(ArtistCreateDto artistCreateDto) {
        artistDao.createArtist(artistCreateDto);
    }


    @Override
    public ArtistDto updateArtist(Integer id, ArtistCreateDto artistCreateDto) {
        return artistDao.updateArtist(id, artistCreateDto);
    }

    @Override
    public List<ArtistDto> getArtists() {
        return artistDao.getArtists();
    }

    @Override
    public List<ArtistDto> searchArtistByName(String searchName) {
        return artistDao.searchByName(searchName);
    }


    public List<AlbumDto> getAlbumsByArtistId(Integer artistId) {
        return artistDao.getAlbumsByArtistId(artistId);
    }

    @Override
    public ArtistDto getByUserId() {
        return artistDao.getByUserId();
    }

    @Override
    public void deleteArtist(Integer id) {
        artistDao.deleteArtist(id);
    }
}
