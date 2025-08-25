package com.licenta.musify.service;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;

import java.util.List;

public interface ArtistService {

    ArtistDto getArtistById(Integer id);

    void createArtist(ArtistCreateDto artistCreateDto);

    ArtistDto updateArtist(Integer id, ArtistCreateDto artistCreateDto);

    List<ArtistDto> getArtists();

    List<ArtistDto> searchArtistByName(String searchName);

    List<AlbumDto> getAlbumsByArtistId(Integer artistId);

    ArtistDto getByUserId();

    void deleteArtist(Integer id);
}
