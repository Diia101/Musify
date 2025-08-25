package com.licenta.musify.service.impl;

import com.licenta.musify.domain.dao.SongDao;
import com.licenta.musify.domain.dto.*;
import com.licenta.musify.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongDao songDao;

    @Override
    public SongDto getSongById(Long id) {
        return songDao.getById(id);
    }

    @Override
    public void create(SongCreateDto songCreateDto) {
        songDao.create(songCreateDto);
    }

    @Override
    public List<SongDto> getSongs() {
        return songDao.getSong();
    }

    @Override
    public SongDto updateSong(Long id, SongUpdateDto songDto) {
        return songDao.update(id, songDto);
    }

    @Override
    public void deleteSong(Long id) {
        songDao.delete(id);
    }

    @Override
    public List<ArtistSongDto> searchSongByTitle(String searchTitle) {
        return songDao.searchByTitle(searchTitle);
    }


    @Override
    public List<SongArtistDto> searchByArtistName(String artistName) {
        return songDao.searchByArtistName(artistName);
    }

    @Override
    public List<SongArtistDto> getSongsByArtistId(Integer id) {
        return songDao.getSongByArtistId(id);
    }

    @Override
    public List<SongArtistDto> searchByName(String searchName) {
        return songDao.searchByName(searchName);
    }

    @Override
    public List<SongDto> getAvailableSongsForArtistAlbum(Integer artistId) {
        return songDao.availableSongsForArtistAlbum(artistId);
    }

}

