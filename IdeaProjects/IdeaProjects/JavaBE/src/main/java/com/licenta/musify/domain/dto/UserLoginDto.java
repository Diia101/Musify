package com.licenta.musify.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserLoginDto {
    @Email
    @NotEmpty(message = "Email mandatory")
    private String email;

    @NotEmpty(message = "Password mandatory")
    private String userPassword;
}
