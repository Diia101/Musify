package com.licenta.musify.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {

    @NotEmpty(message = "Id mandatory")
    private Integer userId;

    @NotEmpty(message = "First name mandatory")
    @Size(min = 1, max = 50, message = "First name length must be between 1 - 50")
    private String firstname;

    @NotEmpty(message = "Last name mandatory")
    @Size(min = 1, max = 50, message = "Last name length must be between 1 - 50")
    private String lastname;

    @Email(message = "Invalid email format")
    private String email;

    @NotEmpty(message = "Password mandatory")
    @Size(min = 6, max = 30, message = "Password length must be between 6-30 characters")
    private String userPassword;

    @NotEmpty(message = "Country mandatory")
    @Size(min = 1, max = 50, message = "Country name length must be between 1-50")
    private String country;

    private String birthday;
}
