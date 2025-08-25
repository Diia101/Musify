package com.licenta.musify.service;

import com.licenta.musify.domain.dto.*;

import java.util.List;
import java.util.Set;

public interface PlaylistService {

    PlaylistMyDto create(PlaylistCreateDto playlistCreateDto);

    void update(PlaylistUpdateDto playlistUpdateDto, Integer playlistId);

    void removePlaylistById(Integer id);

    List<PlaylistMyDto> getPrivatePlaylists(Integer ownerId, String playlistName);

    List<PlaylistMyDto> getAllPublicPlaylistsByName(String name);

    void addSongToPlaylist(Integer playlistId, Integer songId);

    List<PlaylistsSongsViewDto> getSongs(Integer playlistId);

    void deleteSong(Integer playlistId, Integer songId);

    Set<PlaylistMyDto> getAllMyFollowedPlaylists();

    void followPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto);

    void unfollowPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto);

    void changeSongsOrder(Integer playlistId, PlaylistSongsOrderDto playlistSongsOrderDto);

    PlaylistViewDto findPlaylistById(Integer id);

    Set<PlaylistMyDto> getAllOwnedPlaylist(Integer ownerId);
}
