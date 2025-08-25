package com.licenta.musify.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserValidationDto {

    private Integer status;
    private Boolean userExists;
}
