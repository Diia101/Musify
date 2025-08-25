package com.licenta.musify.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SongUpdateDto {
    private String title;
    private String alternative_title;
    private Integer duration;
}
