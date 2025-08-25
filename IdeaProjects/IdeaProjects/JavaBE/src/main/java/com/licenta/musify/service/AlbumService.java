package com.licenta.musify.service;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;

import java.util.List;

public interface AlbumService {


    AlbumDto getAlbumById(Integer id);

    void createAlbum(AlbumsCreateDto albumcreateDto);

    List<AlbumDto> getAlbums();

    AlbumDto updateAlbum(Integer id, AlbumsCreateDto albumDto);

    void deleteAlbum(Integer id);

    AlbumDto addSongsToAlbum(Integer albumId, Integer songId);

    List<String> getSongsByAlbumId(Integer id);

    List<AlbumDto> searchByName(String albumName);

    List<AlbumDto> getAlbumsByGenre(String genre);
}
