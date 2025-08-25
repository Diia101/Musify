package com.licenta.musify.domain.dao.impl;

import com.licenta.musify.domain.dao.PlaylistDao;
import com.licenta.musify.domain.dto.*;
import com.licenta.musify.domain.mapper.PlaylistMapper;
import com.licenta.musify.domain.mapper.SongMapper;
import com.licenta.musify.domain.model.Playlist;
import com.licenta.musify.domain.model.PlaylistsSongs;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.*;
import com.licenta.musify.repository.PlaylistRepository;
import com.licenta.musify.repository.PlaylistsSongsRepository;
import com.licenta.musify.repository.SongRepository;
import com.licenta.musify.repository.UserRepository;
import com.licenta.musify.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class PlaylistDaoImpl implements PlaylistDao {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;

    private final PlaylistMapper playlistMapper;

    private final SongMapper songMapper;

    private final SongRepository songRepository;

    private final PlaylistsSongsRepository playlistsSongsRepository;

    @Override
    @Transactional
    public PlaylistMyDto create(PlaylistCreateDto playlistCreateDto) {
        Playlist playlist = playlistMapper.playlistCreateDtoToPlaylist(playlistCreateDto);

        Date currentDate = Date.valueOf(LocalDate.now());
        playlist.setCreatedDate(currentDate);
        playlist.setLastUpdateDate(currentDate);

        User owner = userRepository.getReferenceById(Objects.requireNonNull(SecurityUtil.getAuthenticatedUserId()));
        playlist.setOwner(owner);
        return playlistMapper.toViewDto(playlistRepository.save(playlist));
    }

    @Override
    @Transactional
    public void update(PlaylistUpdateDto playlistUpdateDto, Integer playlistId) {

        Playlist playlist = playlistRepository.getReferenceById(playlistId);
        Playlist playlistWithUpdatedData = playlistMapper.playlistUpdateDtoToPlaylist(playlistUpdateDto);
        playlistWithUpdatedData.setLastUpdateDate(java.sql.Date.valueOf(LocalDate.now()));

        playlist.setLastUpdateDate(playlistWithUpdatedData.getLastUpdateDate());
        playlist.setName(playlistWithUpdatedData.getName());
        playlist.setIsPublic(playlistWithUpdatedData.getIsPublic());

        playlistRepository.save(playlist);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlaylistMyDto> getAllPublicPlaylistsByName(String name) {
        List<Playlist> publicPlaylists = playlistRepository.getAllPublicPlaylistsByName(name);
        return playlistMapper.toListViewPrivateDto(publicPlaylists);
    }

    @Override
    @Transactional
    public void removePlaylistById(Integer id) {
        playlistRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlaylistMyDto> getPrivatePlaylists(Integer ownerId, String playlistName) {
        List<Playlist> privatePlaylists;
        if (playlistName == null || playlistName.isBlank())
            privatePlaylists = playlistRepository.getPrivatePlaylists(ownerId);
        else
            privatePlaylists = playlistRepository.getPrivatePlaylists(ownerId, playlistName);
        return playlistMapper.toListViewPrivateDto(privatePlaylists);
    }

    @Override
    @Transactional
    public void addSongToPlaylist(Integer playlistId, Integer songId) {
        Song song = songRepository.findById(Long.valueOf(songId)).orElseThrow(() -> new SongNotFoundException("Song with id '%s' not found".formatted(songId)));
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new PlaylistNotFoundException("Playlist with id '%s' not found".formatted(playlistId)));
        verifySongExistence(playlist, songId);
        int pozList = playlist.getPlaylistsSongs().size();

        PlaylistsSongs playlistsSongs = new PlaylistsSongs();
        playlistsSongs.setPlaylist(playlist);
        playlistsSongs.setSong(song);
        playlistsSongs.setPositionInPlaylist(pozList);
        playlistsSongsRepository.save(playlistsSongs);

        playlist.getPlaylistsSongs().add(playlistsSongs);
        playlistRepository.save(playlist);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlaylistsSongsViewDto> getSongs(Integer playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new PlaylistNotFoundException("Playlist with id '%s' not found".formatted(playlistId)));
        List<PlaylistsSongs> playlistsSongs = playlist.getPlaylistsSongs().stream().toList();
        List<PlaylistsSongsViewDto> playlistsSongsViewDtos = new ArrayList<>();
        for (PlaylistsSongs p : playlistsSongs) {
            playlistsSongsViewDtos.add(new PlaylistsSongsViewDto(songMapper.toViewDto(p.getSong()), p.getPositionInPlaylist()));
        }
        return playlistsSongsViewDtos;
    }

    @Override
    @Transactional
    public void deleteSong(Integer playlistId, Integer songId) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new PlaylistNotFoundException("Playlist with id '%s' not found".formatted(playlistId)));

        PlaylistsSongs songInPlaylist = playlist.getPlaylistsSongs().stream()
                .filter(playlistsSongs1 -> playlistsSongs1.getSong().getId().equals(songId))
                .findFirst()
                .orElse(null);

        if (songInPlaylist != null) {
            int positionDeletedSong = songInPlaylist.getPositionInPlaylist();
            playlist.getPlaylistsSongs().remove(songInPlaylist);
            playlistsSongsRepository.deleteById(songInPlaylist.getId());
            updateOrderSongs(positionDeletedSong, playlist.getPlaylistsSongs());
        }
    }

    private void updateOrderSongs(int positionDeletedSong, Set<PlaylistsSongs> playlistsSongs) {
        playlistsSongs.stream()
                .filter(p -> p.getPositionInPlaylist() > positionDeletedSong)
                .forEach(p -> p.setPositionInPlaylist(p.getPositionInPlaylist() - 1));
    }

    private void verifySongExistence(Playlist playlist, Integer songId) {
        Optional<PlaylistsSongs> first = playlist.getPlaylistsSongs().stream()
                .filter(s -> s.getSong().getId().equals(songId))
                .findFirst();
        if (first.isPresent()) throw new SongAlreadyExists("Song already exists in playlist");
    }

    private static Function<PlaylistsSongs, PlaylistsSongs> getChangePositionMethod(Integer oldIndex, Integer newIndex) {
        Function<PlaylistsSongs, PlaylistsSongs> decreasePosition = playlistSong -> new PlaylistsSongs(playlistSong.getId(), playlistSong.getSong(), playlistSong.getPlaylist(), playlistSong.getPositionInPlaylist() - 1);
        Function<PlaylistsSongs, PlaylistsSongs> increasePosition = playlistSong -> new PlaylistsSongs(playlistSong.getId(), playlistSong.getSong(), playlistSong.getPlaylist(), playlistSong.getPositionInPlaylist() + 1);
        return (oldIndex < newIndex) ? decreasePosition : increasePosition;
    }

    private void shiftSongsOrder(Set<PlaylistsSongs> playlistsSongs, PlaylistSongsOrderDto playlistSongsOrderDto) {

        Integer oldIndex = playlistSongsOrderDto.getOldIndex();
        Integer newIndex = playlistSongsOrderDto.getNewIndex();

        Predicate<PlaylistsSongs> songsWithPositionBetweenGivenOnes = playlistSong -> playlistSong.getPositionInPlaylist() >= Math.min(oldIndex, newIndex) && playlistSong.getPositionInPlaylist() <= Math.max(oldIndex, newIndex);

        Function<PlaylistsSongs, PlaylistsSongs> changePosition = getChangePositionMethod(oldIndex, newIndex);

        Function<PlaylistsSongs, PlaylistsSongs> makePositionMinusOne = playlistSong -> new PlaylistsSongs(playlistSong.getId(), playlistSong.getSong(), playlistSong.getPlaylist(), -1);
        Function<PlaylistsSongs, PlaylistsSongs> makePositionNewOne = playlistSong -> new PlaylistsSongs(playlistSong.getId(), playlistSong.getSong(), playlistSong.getPlaylist(), newIndex);

        playlistsSongs = playlistsSongs
                .stream()
                .map(playlistSong -> (Objects.equals(playlistSong.getPositionInPlaylist(), oldIndex)) ? makePositionMinusOne.apply(playlistSong) : playlistSong)
                .map(playlistSong -> (songsWithPositionBetweenGivenOnes.test(playlistSong)) ? changePosition.apply(playlistSong) : playlistSong)
                .map(playlistSong -> (playlistSong.getPositionInPlaylist() == -1) ? makePositionNewOne.apply(playlistSong) : playlistSong)
                .collect(Collectors.toSet());

        for (PlaylistsSongs playlistsSong : playlistsSongs)
            playlistsSongsRepository.save(playlistsSong);
    }

    private void swapSongsOrder(Set<PlaylistsSongs> playlistsSongs, PlaylistSongsOrderDto playlistSongsOrderDto) {

        Integer oldIndex = playlistSongsOrderDto.getOldIndex();
        Integer newIndex = playlistSongsOrderDto.getNewIndex();

        PlaylistsSongs oldPositionPlaylistsSong = playlistsSongs.stream().filter(playlistsSong1 -> Objects.equals(playlistsSong1.getPositionInPlaylist(), oldIndex)).toList().getFirst();
        PlaylistsSongs newPositionPlaylistsSong = playlistsSongs.stream().filter(playlistsSong1 -> Objects.equals(playlistsSong1.getPositionInPlaylist(), newIndex)).toList().getFirst();

        oldPositionPlaylistsSong.setPositionInPlaylist(newIndex);
        newPositionPlaylistsSong.setPositionInPlaylist(oldIndex);

        playlistsSongsRepository.save(oldPositionPlaylistsSong);
        playlistsSongsRepository.save(newPositionPlaylistsSong);
    }

    @Override
    @Transactional
    public void changeSongsOrder(Integer playlistId, PlaylistSongsOrderDto playlistSongsOrderDto) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new PlaylistNotFoundException("Playlist with id '%s' not found".formatted(playlistId)));
        Set<PlaylistsSongs> playlistsSongs = playlist.getPlaylistsSongs();

        verifyChangeOrderParameters(playlistSongsOrderDto, playlist);

        switch (playlistSongsOrderDto.getChangeType()) {
            case SHIFT:
                shiftSongsOrder(playlistsSongs, playlistSongsOrderDto);
                return;
            case SWAP:
                swapSongsOrder(playlistsSongs, playlistSongsOrderDto);
                return;
            default:
        }

    }

    private void verifyChangeOrderParameters(PlaylistSongsOrderDto playlistSongsOrderDto, Playlist playlist) {
        Integer oldIndex = playlistSongsOrderDto.getOldIndex();
        Integer newIndex = playlistSongsOrderDto.getNewIndex();
        int numberOfSongsInPlaylist = playlist.getPlaylistsSongs().size();

        if (oldIndex < 0 || oldIndex > numberOfSongsInPlaylist || newIndex < 0 || newIndex > numberOfSongsInPlaylist)
            throw new InvalidChangeOrderParameters("You try to move song from position %d to position %d but your playlist has only %d songs".formatted(oldIndex, newIndex, numberOfSongsInPlaylist));
    }
    @Override
    @Transactional(readOnly = true)
    public Set<PlaylistMyDto> allMyFollowedPlaylists() {
        Integer userId = SecurityUtil.getAuthenticatedUserId();

        Predicate<Playlist> playlistIsFollowedByUser = playlist -> playlist.getFollowers().stream().anyMatch(follower -> Objects.equals(follower.getUserId(), userId));

        List<Playlist> ownedPlaylists = playlistRepository.findAll()
                .stream()
                .filter(playlist -> Objects.equals(playlist.getOwner().getUserId(), userId))
                .toList();

        List<Playlist> followedPlaylists = playlistRepository.findAll()
                .stream()
                .filter(playlistIsFollowedByUser)
                .toList();

        Set<Playlist> allMyPlaylists = new HashSet<>() {
            {
                addAll(ownedPlaylists);
                addAll(followedPlaylists);
            }
        };

        return playlistMapper.toSetViewPlaylists(allMyPlaylists);
    }

    @Override
    @Transactional
    public void followPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto) {
        User user = userRepository.findById(userFollowPlaylistDto.getUserId()).orElseThrow(() -> new UserNotFoundException("Invalid user id provided"));
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new PlaylistNotFoundException("Invalid playlist id provided"));

        if (playlist.getOwner().getEmail().equals(user.getEmail()) || !playlist.getIsPublic() || user.getFollowedPlaylists().contains(playlist)) {
            throw new PlaylistCannotBeFollowedException("Playlist isn't public or is already followed");
        }

        user.getFollowedPlaylists().add(playlist);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void unfollowPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto) {
        User user = userRepository.findById(userFollowPlaylistDto.getUserId()).orElseThrow(() -> new UserNotFoundException("Invalid user id provided"));
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new PlaylistNotFoundException("Invalid playlist id provided"));

        if (playlist.getOwner().getEmail().equals(user.getEmail()) || !user.getFollowedPlaylists().contains(playlist)) {
            throw new PlaylistCannotBeUnfollowedException("Playlist is owned or hasn't been followed yet");
        }

        user.getFollowedPlaylists().remove(playlist);
        userRepository.save(user);
    }


    @Override
    public PlaylistViewDto getPlaylistById(Integer id) {
        Optional<Playlist> playlistOpt = playlistRepository.findById(id);

        if (playlistOpt.isEmpty()) {
            throw new PlaylistNotFoundException("Playlist with id=%d not found".formatted(id));
        }

        Playlist playlist = playlistOpt.get();
        Integer userId = SecurityUtil.getAuthenticatedUserId();
        User user = userRepository.getReferenceById(userId);

        boolean isOwner = playlist.getOwner().getUserId().equals(userId);
        boolean isFollower = playlist.getFollowers().stream().anyMatch(f -> f.getUserId().equals(userId));

        if (!playlist.getIsPublic() && !isOwner && !isFollower) {
            throw new AccessDeniedException("You are not allowed to access this playlist");
        }

        PlaylistViewDto playlistViewDto = playlistMapper.toPlaylistViewDto(playlist);
        playlistViewDto.setIsFollowed(isFollower);

        return playlistViewDto;
    }


    @Override
    public Set<PlaylistMyDto> getAllOwnedPlaylist(Integer ownerId) {
        Set<Playlist> ownedPlaylists = playlistRepository.findAll().
                stream().
                filter(playlist -> Objects.equals(playlist.getOwner().getUserId(), ownerId)).
                collect(Collectors.toSet());
        return playlistMapper.toSetViewPlaylists(ownedPlaylists);
    }
}
