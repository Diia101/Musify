package com.licenta.musify.domain.dao;

import com.licenta.musify.domain.dto.*;

import java.util.List;

public interface SongDao {

    SongDto getById(Long id);

    void create(SongCreateDto songCreateDto);

    List<SongDto> getSong();

    SongDto update(Long id, SongUpdateDto songDto);

    void delete(Long id);

    List<ArtistSongDto> searchByTitle(String searchTitle);

    List<SongArtistDto> searchByArtistName(String artistName);

    List<SongArtistDto> searchByName(String songName);

    List<SongArtistDto> getSongByArtistId(Integer artistID);

    List<SongDto> availableSongsForArtistAlbum(Integer artistId);
}

