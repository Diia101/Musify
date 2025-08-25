package com.licenta.musify.domain.dto;

import lombok.Data;

@Data
public class PlaylistsSongsViewDto {
    SongDto song;
    Integer positionInPlaylist;

    public PlaylistsSongsViewDto(SongDto viewDto, Integer positionInPlaylist) {
        this.song = viewDto;
        this.positionInPlaylist = positionInPlaylist;
    }
}
