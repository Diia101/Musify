package com.licenta.musify.service.impl;


import com.licenta.musify.domain.dao.AlbumDao;
import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;
import com.licenta.musify.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {
    private final AlbumDao albumDao;


    @Override
    public AlbumDto getAlbumById(Integer id) {
        return albumDao.getById(id);
    }

    @Override
    public void createAlbum(AlbumsCreateDto albumcreateDto) {
        albumDao.createAlbum(albumcreateDto);
    }

    @Override
    public List<AlbumDto> getAlbums() {
        return albumDao.getAlbums();
    }

    @Override
    public AlbumDto updateAlbum(Integer id, AlbumsCreateDto albumDto) {
        return albumDao.updateAlbum(id, albumDto);
    }

    @Override
    public void deleteAlbum(Integer id) {
        albumDao.deleteAlbum(id);
    }

    @Override
    public AlbumDto addSongsToAlbum(Integer albumId, Integer songId) {
        return albumDao.addSongsToAlbum(albumId, songId);
    }

    @Override
    public List<String> getSongsByAlbumId(Integer id){
        return albumDao.getSongsByAlbumId(id);
    }

    @Override
    public List<AlbumDto> searchByName(String albumName) {
        return albumDao.searchByName(albumName);
    }

    @Override
    public List<AlbumDto> getAlbumsByGenre(String genre) {
        return albumDao.getByGenre(genre);
    }

}
