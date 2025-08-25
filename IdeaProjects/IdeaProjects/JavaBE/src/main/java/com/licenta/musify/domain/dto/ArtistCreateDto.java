package com.licenta.musify.domain.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ArtistCreateDto {

    @NotEmpty(message = "Artist name mandatory")
    @Size(min = 1, max = 50, message = "Name length must be between 1 - 50")
    private String artistName;

    private String location;
    private Integer activePeriod;

    private boolean isPerson;

    @NotEmpty(message = "Artist must be at least one person")
    private List<Integer> userIds;
}
