package com.licenta.musify.domain.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class ArtistSongDto {

    private Integer artistId;
    private String artistName;
    private String location;
    private Integer activePeriod;
    private boolean isPerson;

    private Set<SongDto> songsOfAnArtist = new HashSet<>();


}
