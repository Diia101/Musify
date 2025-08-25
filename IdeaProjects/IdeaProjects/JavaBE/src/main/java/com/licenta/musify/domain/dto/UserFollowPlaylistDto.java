package com.licenta.musify.domain.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserFollowPlaylistDto {

    @NotEmpty(message = "Id mandatory")
    private Integer userId;
}
