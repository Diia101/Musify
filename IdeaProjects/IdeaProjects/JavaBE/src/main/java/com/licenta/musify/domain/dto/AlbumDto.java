package com.licenta.musify.domain.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AlbumDto {
    private Integer albumId;
    private String title;
    private String description;
    private ArtistDto artist;
    private String genre;
    private String releaseDate;
    private String label;
    private List<SongDto> songs = new ArrayList<>();
}
