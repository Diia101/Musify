package com.licenta.musify.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlaylistViewDto {
    private Integer playlistId;
    private String name;
    private Boolean isPublic;
    private UserDto owner;
    private String createdDate;
    private String lastUpdateDate;
    private List<SongDto> songs;
    private Boolean isFollowed;
}
