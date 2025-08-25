package com.licenta.musify.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginViewDto {
    Integer userId;
    Boolean isAdmin;
    ArtistDto artist;
    String jwt;
}
