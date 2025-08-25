package com.licenta.musify.domain.dao;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;

import java.util.List;

public interface ArtistDao {

    ArtistDto getById(Integer id);

    void createArtist(ArtistCreateDto artistCreateDto);

    ArtistDto updateArtist(Integer id, ArtistCreateDto artistCreateDto);

    List<ArtistDto> getArtists();

    List<ArtistDto> searchByName(String searchName);

    List<AlbumDto> getAlbumsByArtistId(Integer artistId);

    ArtistDto getByUserId();

    ArtistDto getByUserId(Integer userId);

    void deleteArtist(Integer id);
}
