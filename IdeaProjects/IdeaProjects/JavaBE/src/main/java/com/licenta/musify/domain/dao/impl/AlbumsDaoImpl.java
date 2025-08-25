package com.licenta.musify.domain.dao.impl;


import com.licenta.musify.domain.dao.AlbumDao;
import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;
import com.licenta.musify.domain.mapper.AlbumMapper;
import com.licenta.musify.domain.mapper.SongMapper;
import com.licenta.musify.domain.model.Album;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.exceptions.AlbumNotFoundException;
import com.licenta.musify.exceptions.ArtistNotFoundException;
import com.licenta.musify.exceptions.SongNotFoundException;
import com.licenta.musify.repository.AlbumRepository;
import com.licenta.musify.repository.ArtistRepository;
import com.licenta.musify.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlbumsDaoImpl implements AlbumDao {

    private final AlbumRepository albumRepository;

    private final SongRepository songRepository;

    private final AlbumMapper albumMapper;

    private final SongMapper songMapper;

    private final ArtistRepository artistRepository;



    @Override
    @Transactional(readOnly = true)
    public AlbumDto getById(Integer id) {
        Album album = albumRepository.findById(id).orElseThrow(() -> new AlbumNotFoundException("Album  with id '%s' not found".formatted(id)));

        return albumMapper.toViewDto(album);
    }

    @Override
    @Transactional
    public void createAlbum(AlbumsCreateDto albumCreateDto) {
        Album album = albumMapper.toEntity(albumCreateDto);
        Integer artistId = albumCreateDto.getArtistId();
        Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new ArtistNotFoundException("Artist with id '%s' does not exists.Try with another ID".formatted(artistId)));

        album.setArtist(artist);
        albumRepository.save(album);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlbumDto> getAlbums() {
        List<Album> albums = albumRepository.findAll();
        return albumMapper.toListViewDto(albums);

    }

    @Override
    @Transactional
    public AlbumDto updateAlbum(Integer id, AlbumsCreateDto albumDto) {
        Album album = albumRepository.findById(id).orElseThrow(() -> new AlbumNotFoundException("Album with id '%s' does not exists.Try with another ID".formatted(id)));

        Integer artistId = albumDto.getArtistId();
        Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new ArtistNotFoundException("Artist with id '%s' does not exists.Try with another ID".formatted(artistId)));

        album.setTitle(albumDto.getTitle());
        album.setDescription(albumDto.getDescription());
        album.setArtist(artist);
        album.setReleaseDate(albumDto.getReleaseDate());
        album.setLabel(albumDto.getLabel());
        album.setGenre(albumDto.getGenre());
        return albumMapper.toViewDto(albumRepository.save(album));
    }

    @Override
    @Transactional
    public void deleteAlbum(Integer id) {
        albumRepository.deleteById(id);
    }


    @Override
    @Transactional
    public AlbumDto addSongsToAlbum(Integer albumId, Integer songId) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new AlbumNotFoundException("Album not found"));

        Song song = songRepository.findById(Long.valueOf(songId)).orElseThrow(() -> new SongNotFoundException("Song not found"));

        album.addSongsToAlbum(song);
        albumRepository.save(album);

        AlbumDto albumDto = albumMapper.toViewDto(album);
        return albumDto;

    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getSongsByAlbumId(Integer id) {
        Album album = albumRepository.findById(id).orElseThrow(() -> new AlbumNotFoundException("Album with id '%s' not found".formatted(id)));

        List<Song> songs = album.getSongs();
        List<String> songTitles = new ArrayList<>();

        for (Song song : songs) {
            songTitles.add(song.getTitle());
        }

        return songTitles;


    }

    @Override
    public List<AlbumDto> searchByName(String albumName) {
        List<Album> albums = albumRepository.findByTitle(albumName);
        return albumMapper.toListViewDto(albums);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlbumDto> getByGenre(String genre) {
        List<Album> albums = albumRepository.findByGenre(genre);
        return albumMapper.toListViewDto(albums);
    }


}
