package com.licenta.musify.domain.dto;

import lombok.Data;

import java.sql.Date;
import java.util.Set;

@Data
public class PlaylistSongsDto {
    private Integer playlistId;
    private String name;
    private Integer ownerId;
    private Set<SongDto> playlistSongs;
    private Boolean isPublic;
    private Date createdDate;
    private Date lastUpdateDate;
}
