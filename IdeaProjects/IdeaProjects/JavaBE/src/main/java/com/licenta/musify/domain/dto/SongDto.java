package com.licenta.musify.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SongDto {
    private Integer id;
    private String title;
    private String alternative_title;
    private Integer duration;
    private String creation_date;
    private String url;
}
