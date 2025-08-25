package com.licenta.musify.domain.dto;

import lombok.Data;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class SongArtistDto {

    private Integer id;
    private String title;
    private String alternative_title;
    private Integer duration;
    private Date creation_date;
    private String url;

    private Set<ArtistDto> artistsOfASong = new HashSet<>();


}
