package com.licenta.musify.domain.dao.impl;

import com.licenta.musify.domain.dao.SongDao;
import com.licenta.musify.domain.dto.*;
import com.licenta.musify.domain.mapper.SongMapper;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.exceptions.ArtistNotFoundException;
import com.licenta.musify.exceptions.SongNotFoundException;
import com.licenta.musify.repository.ArtistRepository;
import com.licenta.musify.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.licenta.musify.domain.dao.impl.ArtistDaoImpl.ARTIST_WITH_ID_S_NOT_FOUND;

@Component
@RequiredArgsConstructor
@Slf4j
public class SongsDaoImpl implements SongDao {

    private final SongRepository songRepository;
    private final ArtistRepository artistRepository;
    private final SongMapper songMapper;


    @Override
    @Transactional(readOnly = true)
    public SongDto getById(Long id) {
        Song song = songRepository.findById(id).orElseThrow(() -> new SongNotFoundException("Song with id '%s' not found".formatted(id)));
        return songMapper.toViewDto(song);
    }

    @Override
    @Transactional
    public void create(SongCreateDto songToCreate) {

        List<Integer> artisIds = songToCreate.getArtistIds();
        List<Artist> artistsFromDb = artistRepository.findAllById(artisIds);

        if (artistsFromDb.isEmpty()) {
            throw new ArtistNotFoundException("No artist found with the ID " + artisIds);
        }

        Set<Artist> artistSet = new HashSet<>(artistsFromDb);
        Song songEntity = songMapper.toEntity(songToCreate);
        songEntity.setArtistsOfASong(artistSet);
        songRepository.save(songEntity);

    }


    @Override
    @Transactional(readOnly = true)
    public List<SongDto> getSong() {
        List<Song> songs = songRepository.findAll();
        return songMapper.toListViewDto(songs);
    }

    @Override
    @Transactional
    public SongDto update(Long id, SongUpdateDto songDto) throws RuntimeException {
        Song song = songRepository.findById(id).orElseThrow(() -> new SongNotFoundException("Song not found"));
        song.setTitle(songDto.getTitle());
        song.setAlternative_title(songDto.getAlternative_title());
        song.setDuration(songDto.getDuration());
        return songMapper.toViewDto(songRepository.save(song));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        songRepository.deleteById(id);
    }


    @Override
    @Transactional
    public List<SongArtistDto> searchByArtistName(String artistName) {
        List<Song> songs = songRepository.findByArtistName(artistName);
        if (songs.isEmpty()) {
            throw new ArtistNotFoundException("No artist found with the name " + artistName);
        }
        return songMapper.toListViewSongArtist(songs);
    }

    @Override
    @Transactional
    public List<SongArtistDto> searchByName(String songName) {
        List<Song> songs = songRepository.findByTitleOrAlternativeTitle(songName);
        return songMapper.toListViewSongArtist(songs);
    }

    @Override
    public List<SongArtistDto> getSongByArtistId(Integer artistID) {
        List<Song> song = songRepository.findSongsByArtistID(artistID);
        if (song.isEmpty()) {
            throw new ArtistNotFoundException(((ARTIST_WITH_ID_S_NOT_FOUND).formatted(artistID)));
        }
        return songMapper.toListViewSongArtist(song);
    }

    @Override
    public List<SongDto> availableSongsForArtistAlbum(Integer artistId) {
        List<Song> song = songRepository.findSongsAvailableForArtistAlbum(artistId);
        return songMapper.toListViewDto(song);
    }


    @Override
    @Transactional
    public List<ArtistSongDto> searchByTitle(String searchTitle) {
        List<Artist> artists = artistRepository.findArtistBySongTitle(searchTitle);
        if (artists.isEmpty()) {
            throw new ArtistNotFoundException("No artist found for song title: " + searchTitle);
        }
        return songMapper.toListViewArtistSong(artists);
    }


}



