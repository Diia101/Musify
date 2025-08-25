package com.licenta.musify.controller;

import com.licenta.musify.domain.dto.*;
import com.licenta.musify.service.PlaylistService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PlaylistMyDto createPlaylist(@RequestBody PlaylistCreateDto playlistCreateDto) {
        return playlistService.create(playlistCreateDto);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePlaylist(@PathVariable Integer id, @RequestBody PlaylistUpdateDto playlistUpdateDto) {
        playlistService.update(playlistUpdateDto, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlaylist(@PathVariable Integer id) {
        playlistService.removePlaylistById(id);
    }

    @GetMapping("/private")
    @ResponseStatus(HttpStatus.OK)
    public List<PlaylistMyDto> privatePlaylists(@RequestParam Integer ownerId, @RequestParam(required = false) String playlistName) {
        return playlistService.getPrivatePlaylists(ownerId, playlistName);
    }

    @GetMapping("/public")
    public List<PlaylistMyDto> getAllPublicPlaylists(@RequestParam(required = false) String name) {
        return playlistService.getAllPublicPlaylistsByName(name);
    }

    @PutMapping("/{playlistId}/song/{songId}")
    @ResponseStatus(HttpStatus.OK)
    public void addSongToPlaylist(@PathVariable Integer playlistId, @PathVariable Integer songId) {
        playlistService.addSongToPlaylist(playlistId, songId);
    }

    @GetMapping("/{playlistId}/songs")
    public List<PlaylistsSongsViewDto> getSongsFromPlaylist(@PathVariable Integer playlistId) {
        return playlistService.getSongs(playlistId);
    }

    @DeleteMapping("/{playlistId}/song/{songId}")
    public void deleteSong(@PathVariable Integer playlistId, @PathVariable Integer songId) {
        playlistService.deleteSong(playlistId, songId);
    }

    @GetMapping("/followed")
    public Set<PlaylistMyDto> getAllMyFollowedPlaylists() {
        return playlistService.getAllMyFollowedPlaylists();
    }

    @PutMapping("/{playlistId}/follow")
    @ResponseStatus(HttpStatus.OK)
    public void followPlaylist(@PathVariable Integer playlistId, @RequestBody UserFollowPlaylistDto userFollowPlaylistDto) {
        playlistService.followPlaylist(playlistId, userFollowPlaylistDto);
    }

    @PutMapping("/{playlistId}/unfollow")
    @ResponseStatus(HttpStatus.OK)
    public void unfollowPlaylist(@PathVariable Integer playlistId, @RequestBody UserFollowPlaylistDto userFollowPlaylistDto) {
        playlistService.unfollowPlaylist(playlistId, userFollowPlaylistDto);
    }

    @PutMapping("/{playlistId}/song")
    public void changeSongsOrder(@PathVariable Integer playlistId, @RequestBody PlaylistSongsOrderDto playlistSongsOrderDto) {
        playlistService.changeSongsOrder(playlistId, playlistSongsOrderDto);
    }

    @GetMapping("/{id}")
    public PlaylistViewDto findPlaylistById(@PathVariable Integer id) {
        return playlistService.findPlaylistById(id);
    }

    @GetMapping("/{ownerId}/owned")
    public Set<PlaylistMyDto> getAllOwnedPlaylist(@PathVariable Integer ownerId) {
        return playlistService.getAllOwnedPlaylist(ownerId);
    }
}
