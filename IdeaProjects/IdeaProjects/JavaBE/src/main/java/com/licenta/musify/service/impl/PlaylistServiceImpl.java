package com.licenta.musify.service.impl;

import com.licenta.musify.domain.dao.PlaylistDao;
import com.licenta.musify.domain.dto.*;
import com.licenta.musify.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistDao playlistDao;

    @Override
    public PlaylistMyDto create(PlaylistCreateDto playlistCreateDto) {
        return playlistDao.create(playlistCreateDto);
    }

    @Override
    public void update(PlaylistUpdateDto playlistUpdateDto, Integer playlistId) {
        playlistDao.update(playlistUpdateDto, playlistId);
    }

    @Override
    public List<PlaylistMyDto> getAllPublicPlaylistsByName(String name) {
        return playlistDao.getAllPublicPlaylistsByName(name);
    }

    @Override
    public Set<PlaylistMyDto> getAllMyFollowedPlaylists() {
        return playlistDao.allMyFollowedPlaylists();
    }

    @Override
    public void removePlaylistById(Integer id) {
        playlistDao.removePlaylistById(id);
    }

    @Override
    public List<PlaylistMyDto> getPrivatePlaylists(Integer ownerId, String playlistName) {
        return playlistDao.getPrivatePlaylists(ownerId, playlistName);
    }

    @Override
    public void addSongToPlaylist(Integer playlistId, Integer songId) {
        playlistDao.addSongToPlaylist(playlistId, songId);
    }

    @Override
    public List<PlaylistsSongsViewDto> getSongs(Integer playlistId) {
        return playlistDao.getSongs(playlistId);
    }

    @Override
    public void deleteSong(Integer playlistId, Integer songId) {
        playlistDao.deleteSong(playlistId, songId);
    }

    @Override
    public void followPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto) {
        playlistDao.followPlaylist(playlistId, userFollowPlaylistDto);
    }

    @Override
    public void unfollowPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto) {
        playlistDao.unfollowPlaylist(playlistId, userFollowPlaylistDto);
    }

    @Override
    public void changeSongsOrder(Integer playlistId, PlaylistSongsOrderDto playlistSongsOrderDto) {
        playlistDao.changeSongsOrder(playlistId, playlistSongsOrderDto);
    }

    @Override
    public PlaylistViewDto findPlaylistById(Integer id) {
        return playlistDao.getPlaylistById(id);
    }

    @Override
    public Set<PlaylistMyDto> getAllOwnedPlaylist(Integer ownerId) {
        return playlistDao.getAllOwnedPlaylist(ownerId);
    }
}
