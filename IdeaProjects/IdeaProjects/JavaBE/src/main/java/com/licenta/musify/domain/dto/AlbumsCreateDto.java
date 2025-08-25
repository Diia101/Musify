package com.licenta.musify.domain.dto;


import lombok.Data;

import java.sql.Date;

@Data
public class AlbumsCreateDto {
    private String title;
    private String description;
    private Integer artistId;
    private String genre;
    private Date releaseDate;
    private String label;
}
