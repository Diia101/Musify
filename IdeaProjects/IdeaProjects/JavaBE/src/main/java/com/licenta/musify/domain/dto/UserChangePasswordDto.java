package com.licenta.musify.domain.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserChangePasswordDto {
    @NotEmpty(message = "Password mandatory")
    @Size(min = 6, max = 30, message = "Password length must be between 6-30 characters")
    private String oldPassword;

    @NotEmpty(message = "Password mandatory")
    @Size(min = 6, max = 30, message = "Password length must be between 6-30 characters")
    private String reEnteredOldPassword;

    @NotEmpty(message = "Password mandatory")
    @Size(min = 6, max = 30, message = "Password length must be between 6-30 characters")
    private String newPassword;
}
