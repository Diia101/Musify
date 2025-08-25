package com.licenta.musify.domain.dto;

import lombok.Data;

@Data
public class PlaylistMyDto {
    private Integer playlistId;
    private String name;
    private Boolean isPublic;
    private UserDto owner;
    private String createdDate;
    private String lastUpdateDate;
}
