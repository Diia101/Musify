package com.licenta.musify.domain.dao;

import com.licenta.musify.domain.dto.*;

import java.util.List;
import java.util.Set;

public interface PlaylistDao {

    PlaylistMyDto create(PlaylistCreateDto playlistCreateDto);

    void removePlaylistById(Integer id);

    void update(PlaylistUpdateDto playlistUpdateDto, Integer playlistId);

    List<PlaylistMyDto> getAllPublicPlaylistsByName(String name);

    List<PlaylistMyDto> getPrivatePlaylists(Integer ownerId, String playlistName);

    void addSongToPlaylist(Integer playlistId, Integer songId);

    void changeSongsOrder(Integer playlistId, PlaylistSongsOrderDto playlistSongsOrderDto);

    List<PlaylistsSongsViewDto> getSongs(Integer playlistId);

    void deleteSong(Integer playlistId, Integer songId);

    Set<PlaylistMyDto> allMyFollowedPlaylists();

    void followPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto);

    void unfollowPlaylist(Integer playlistId, UserFollowPlaylistDto userFollowPlaylistDto);

    PlaylistViewDto getPlaylistById(Integer id);

    Set<PlaylistMyDto> getAllOwnedPlaylist(Integer ownerId);
}
