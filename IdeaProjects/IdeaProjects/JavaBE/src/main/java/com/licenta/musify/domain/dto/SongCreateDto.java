package com.licenta.musify.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class SongCreateDto {
    private String title;
    private String alternative_title;
    private Integer duration;
    private Date creation_date;
    private String url;

    private List<Integer> artistIds;

}
