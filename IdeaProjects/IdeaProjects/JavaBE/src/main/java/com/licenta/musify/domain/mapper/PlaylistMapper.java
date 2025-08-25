package com.licenta.musify.domain.mapper;

import com.licenta.musify.domain.dto.*;
import com.licenta.musify.domain.model.Playlist;
import com.licenta.musify.domain.model.Song;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;


@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class PlaylistMapper {

    public abstract Playlist playlistCreateDtoToPlaylist(PlaylistCreateDto playlistCreateDto);

    public abstract Playlist playlistUpdateDtoToPlaylist(PlaylistUpdateDto playlistUpdateDto);

    public abstract List<PlaylistMyDto> toListViewPrivateDto(List<Playlist> playlist);

    public abstract Set<PlaylistMyDto> toSetViewPlaylists(Set<Playlist> playlists);

    @Mapping(target = "createdDate", source = "createdDate", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "lastUpdateDate", source = "lastUpdateDate", dateFormat = "yyyy-MM-dd")
    public abstract PlaylistMyDto toViewDto(Playlist playlist);

    @Mapping(target = "createdDate", source = "createdDate", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "lastUpdateDate", source = "lastUpdateDate", dateFormat = "yyyy-MM-dd")
    public abstract PlaylistViewDto toPlaylistViewDto(Playlist playlist);

    @AfterMapping
    public void setListOfSongs(@MappingTarget PlaylistViewDto playlistViewDto, Playlist playlist) {
        playlistViewDto.setSongs(playlist.getPlaylistsSongs().stream().map(ps -> toSongViewDto(ps.getSong())).toList());
    }

    public abstract SongDto toSongViewDto(Song song);
}