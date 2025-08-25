package com.licenta.musify.service;

import com.licenta.musify.domain.dto.*;

import java.util.List;

public interface SongService {

    SongDto getSongById(Long id);

    void create(SongCreateDto songCreateDto);

    List<SongDto> getSongs();

    SongDto updateSong(Long id, SongUpdateDto songDto);

    void deleteSong(Long id);

    List<ArtistSongDto> searchSongByTitle(String searchTitle);

    List<SongArtistDto> searchByArtistName(String artistName);

    List<SongArtistDto> getSongsByArtistId(Integer id);


    List<SongArtistDto> searchByName(String searchName);

    List<SongDto> getAvailableSongsForArtistAlbum(Integer artistId);
}
