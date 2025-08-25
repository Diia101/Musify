package com.licenta.musify.domain.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class ArtistDto {

    @NotEmpty(message = "Id mandatory")
    private Integer artistId;

    @NotEmpty(message = "Artist name mandatory")
    @Size(min = 1, max = 50)
    private String artistName;

    private String location;
    private Integer activePeriod;

    @NotNull(message = "Artist cannot be null")
    private boolean isPerson;

    @NotEmpty(message = "Artist must be at least one person")
    private List<UserDto> artists;
}
