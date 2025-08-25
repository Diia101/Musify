package com.licenta.musify.domain.dao;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;

import java.util.List;

public interface AlbumDao {
    AlbumDto getById(Integer id);

    void createAlbum(AlbumsCreateDto albumsCreateDto);

    List<AlbumDto> getAlbums();

    AlbumDto updateAlbum(Integer id, AlbumsCreateDto albumDto);

    void deleteAlbum(Integer id);

    AlbumDto addSongsToAlbum(Integer id, Integer songId);

    List<String> getSongsByAlbumId(Integer id);

    List<AlbumDto> searchByName(String albumName);

    List<AlbumDto> getByGenre(String genre);
}
